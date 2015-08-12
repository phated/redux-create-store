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

  var reducer = redux.combineReducers(reducers);
  var middleware = defaultMiddleware.concat(extraMiddleware);
  var middlewareStack = redux.applyMiddleware.apply(null, middleware);
  var enhancers = defaultEnhancers.concat(middlewareStack, extraEnhancers, redux.createStore);
  var storeCreator = redux.compose.apply(null, enhancers);
  return storeCreator(reducer);
}

module.exports = createStore;
