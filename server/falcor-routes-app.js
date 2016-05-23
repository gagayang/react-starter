import jsong from 'falcor-json-graph';
import Router from "falcor-router";
import AV from "leanengine";
import fs from 'fs';
import atob from 'atob';

var log = function(d) {
  if(typeof(d) == 'object'){
    d = JSON.stringify(d,null,4);
  }
  fs.appendFile('/tmp/talent.log', d + '\n', {flag:'a'});
};


var Todo = AV.Object.extend("Todo");
var TestObject = AV.Object.extend("TestObject");

export default Router.createClass([
  {
    route: "todosById[{keys:ids}].content",
    set: function (jsonGraphArg) {
      // log(jsonGraphArg)
      const query = new AV.Query(Todo);
      let ids = Object.keys(jsonGraphArg.todosById);
      var reqs =  ids.map(id => {
        return query.select('content').get(id).then(record => {
          record.set('content', jsonGraphArg.todosById[id].content)
          return record.save();
        })
      });

      return Promise.all(reqs).then(function(ret) {
        // log(ret)
        let cnt = 0;
        return ids.map(id => {
          return {
            path: ['todosById', id, 'content'],
            value: ret[cnt++].get('content')
          };
        });
      });
    }
  },
  {
    route: 'todosById[{keys:ids}][{keys:fields}]',
    get: function(pathSet) {
      const query = new AV.Query(Todo);
      query.containedIn('objectId', pathSet.ids);
      query.select.apply(query, pathSet.fields);
      // pathSet[2].forEach((field)=>query.select(field));
      // query.select('content');
      // query.select('status');
      log(pathSet.fields)

      let jsonGraph = {
        todosById: {}
      };

      return query.find().then(records => {
        var objMapping = records.reduce((r, o) => {
          r[o.getObjectId()] = pathSet.fields.reduce((r,field) => {
            if(field == 'id'){
              r[field] = o.getObjectId()
            }else{
              r[field] = o.get(field);
            }
            return r;
          }, {});
          return r;
        }, {});
        pathSet[1].forEach(function(id) {
            jsonGraph['todosById'][id] = {};
            pathSet.fields.forEach(attr => {
              jsonGraph['todosById'][id][attr] = objMapping[id][attr];
            });
        });
        log(jsonGraph)
        return { jsonGraph };
      });
    }
  },
  {
    route: 'todos.query.[{keys:queries}][{ranges:indexRanges}]',
    get: function(pathSet) {
      const query = new AV.Query(Todo);
      JSON.parse(atob(pathSet.queries[0])).forEach(q => {
        query[q.method].apply(query, q.params);
      });
      pathSet.indexRanges.forEach(indexRange => {
        query.skip(indexRange.from);
        query.limit(indexRange.to - indexRange.from);
      });

      query.select("objectId");
      return query.find().then(records => {
              log(records.length)
        var cnt = 0;
        // var index
        return records.map(o => {
                  return {
                    path: ["todos","query", pathSet.queries, cnt++],
                    value: {
                      "$type": "ref",
                      "value": ['todosById', o.getObjectId() ]
                    }
                  };
                });
      });
    }
  },
  {
    route: 'todos[{keys:ids}]',
    get: function(pathSet) {
      const query = new AV.Query(Todo);
      query.containedIn('objectId', pathSet.ids);
      query.select('objectId');
      return query.find().then(records => {
        return records.map(o => {
                  return {
                    path: ["todos",o.getObjectId() ],
                    value: {
                      "$type": "ref",
                      "value": ['todosById', [o.getObjectId()] ]
                    }
                  };
        });
      });
    }
  },
  {
    route: 'todos.lastest',
    get: function(pathSet) {
      const query = new AV.Query(Todo);
      query.descending("updatedAt");
      return query.first().then(record => {
        return {
          path: ["todos","lastest"],
          value: {
            "$type":"ref",
            "value": ['todosById', [record.getObjectId()] ]
          }
        };
      });
    }
  },
  {
    route: "notificationCount",
    // respond with a PathValue with the value of "Hello World."
    get: function() {
      const query = new AV.Query(TestObject);
      query.equalTo("type", "notification");
      return query.first().then(record => {
        return {path:["notificationCount"], value: record.get('count') };
      });
      // throw new Error('debug message!!');
    }
  },
  {
    route: "todosCount",
    // respond with a PathValue with the value of "Hello World."
    get: function() {
      const query = new AV.Query(TestObject);
      query.equalTo("type", "todos");
      return query.first().then(record => {
        return {path:["todosCount"], value: record.get('count') };
      });
      // throw new Error('debug message!!');
    }
  }
]);
