'use strict';

var redux = require('redux');
var promiseMiddleware = require('redux-promise');

var defaultEnhancers = [];
var defaultMiddleware = [promiseMiddleware];

function createStore(reducers, config){
  config = config || {};

  var extraEnhancers = config.enhancers;
  if(extraEnhancers == null){
    extraEnhancers = [];
  }

  var extraMiddleware = config.middleware;
  if(extraMiddleware == null){
    extraMiddleware = [];
  }

  var reducer;
  if(typeof reducers === 'function'){
    reducer = reducers;
  } else {
    reducer = redux.combineReducers(reducers);
  }
  var middleware = defaultMiddleware.concat(extraMiddleware);
  var middlewareStack = redux.applyMiddleware.apply(null, middleware);
  var enhancers = defaultEnhancers.concat(middlewareStack, extraEnhancers);
  var composed = redux.compose.apply(null, enhancers);
  var storeCreator = composed(redux.createStore);
  return storeCreator(reducer);
}

module.exports = createStore;
