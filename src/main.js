import { render } from 'react-dom';
import React, {Component, PropTypes} from 'react';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { Router,browserHistory, Link } from 'react-router';
import _ from 'lodash';
import IndexRoute from './indexRoute.js';
import getRoute from "./test/route.js"

import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'

class App extends Component {
  
  static contextTypes = {
      router: PropTypes.object.isRequired
  }
  constructor(props, context) {
      super(props, context);
  }
  pathTo(){
    this.context.router.push("/one");
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
        {props.children}
      </div>
    );
  }
} 

var Layout = (props) => (
  <div>
    <ul>
      <li><Link to="/one">One</Link></li>
      <li><Link to="/two">Two</Link></li>
    </ul>
    {props.children}
  </div>
)
var Layout22 = (props) => (
  <div>
    <ul>
      <li><Link to="/one">One22</Link></li>
      <li><Link to="/two">Two22</Link></li>
    </ul>
    {props.children}
  </div>
)
// var getRouteConfig = function( getPageBundle ,options){

//   var returnArray = [];
//   let routeConfig = { path: '/',
//                       component: Layout,
//                       childRoutes: [{
//                         path: '*',
//                         getComponents(location, callback){
//                           try {
//                             var pageName = location.pathname.slice(1);
//                             console.log(location);
//                             console.log(121211212)
//                             // var pageBundle = require("./containers/" + pageName + '/index');
//                             var pageBundle = getPageBundle( pageName );
//                           } catch(e) {
//                             console.log(e)
//                             return callback(e);
//                           }
//                           pageBundle(function(page) {
//                             callback(null, page);
//                           })
//                         }
//                       }]
//                     }
  
//   // routeConfig = _.extend(, );
//    routeConfig = _.extend(routeConfig, options);
//   console.log(routeConfig);
//   return routeConfig;
// }
var getPageBundl = function(pageName){
  // alert(pageName)
  return require("./containers/" + pageName + '/index');
}
var routeConfigo = getRoute(getPageBundl, {gaoyang:1111})

var store = createStore(combineReducers({reduxAsyncConnect}) );

export default class Root extends Component {
  render() {
    return (
<Provider store={store}>
  <Router
    render={(props) => <ReduxAsyncConnect {...props}/>}
    routes={routeConfigo}
    history={browserHistory} />
</Provider>
    );
  }
}






const dest = document.getElementById('content');
render(<Root title="TalentUI" />, dest);