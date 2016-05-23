import React, {Component} from 'react';

import { connect } from 'react-redux'

import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'

import $ from 'jquery';

@asyncConnect({
  lunch: (params, helpers) => {
   
        return Promise.resolve({id: 1, name: 'Borsch'})
  }
})
export default class Root extends Component {
  render() {
    
    return (
<div>
  <h1>One112</h1>
  <h2>Async Data: {this.props.lunch.data.name}</h2>
</div>
    );
  }
}