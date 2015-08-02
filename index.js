'use strict';

var redux = require('redux');
var promiseMiddleware = require('redux-promise');
var devtools = require('redux-devtools');

var defaultMiddleware = [promiseMiddleware];

function createStore(reducers, extraMiddleware){
  if(extraMiddleware == null){
    extraMiddleware = [];
  }

  var reducer = redux.combineReducers(reducers);
  var middleware = defaultMiddleware.concat(extraMiddleware);
  var middlewareStack = redux.applyMiddleware.apply(null, middleware);
  var stack = [middlewareStack];
  if(process.env.NODE_ENV !== 'production'){
    stack.push(devtools.devTools());

    if(typeof window !== 'undefined'){
      var sessionId = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      stack.push(devtools.persistState(sessionId));
    }
  }
  stack.push(redux.createStore);
  var storeCreator = redux.compose.apply(null, stack);
  return storeCreator(reducer);
}

module.exports = createStore;
