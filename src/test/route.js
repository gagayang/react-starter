import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { Router,browserHistory, Link } from 'react-router';
// var Layout = (props) => (
//   <div>
//     <ul>
//       <li><Link to="/one">One</Link></li>
//       <li><Link to="/two">Two</Link></li>
//     </ul>
//     {props.children}
//   </div>
// )

class Layout extends Component {
  
  static contextTypes = {
      router: PropTypes.object.isRequired
  }
  constructor(props, context) {
      super(props, context);
  }
  pathTo(){
    // this.context.router.push("/one");
    this.context.router.push({
      pathname:'%2Fone'
    })
  }
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/one">One</Link></li>
          <li><Link to="/two">Two</Link></li>
        </ul>
        <div>
          <button name="test" value="testButton" onClick={::this.pathTo}/>
        </div>
        {this.props.children}
      </div>
    );
  }
} 
var getRouteConfig = function( getPageBundle ,options){

  var returnArray = [];
  let routeConfig = { path: '/',
                      component: Layout,
                      childRoutes: [{
                        path: '*',
                        getComponents(location, callback){
                          try {
                            var pageName = location.pathname.slice(1);
                            console.log(location);
                            console.log(121211212)
                            // var pageBundle = require("./containers/" + pageName + '/index');
                            var pageBundle = getPageBundle( pageName );
                          } catch(e) {
                            console.log(e)
                            return callback(e);
                          }
                          pageBundle(function(page) {
                            callback(null, page);
                          })
                        }
                      }]
                    }
  
   routeConfig = _.extend(routeConfig, options);
  console.log(routeConfig);
  return routeConfig;
}

export default getRouteConfig