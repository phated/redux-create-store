'use strict';

var redux = require('redux');
var promiseMiddleware = require('redux-promise');

var defaultMiddleware = [promiseMiddleware];

function createStore(reducers, extraMiddleware){
  if(extraMiddleware == null){
    extraMiddleware = [];
  }

  var reducer = redux.combineReducers(reducers);
  var middleware = defaultMiddleware.concat(extraMiddleware);
  var middlewareStack = redux.applyMiddleware.apply(null, middleware);
  var storeCreator = middlewareStack(redux.createStore);
  return storeCreator(reducer);
}

module.exports = createStore;
