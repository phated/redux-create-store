'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var createStore = require('../');

lab.experiment('createStore', function(){

  var reducers;
  var middlewareCalls;

  function testMiddleware(){
    return function(next){
      return function(action){
        middlewareCalls++;
        next(action);
      };
    };
  }

  lab.beforeEach(function(done){
    middlewareCalls = 0;
    reducers = {
      test: function(state, action){
        switch(action.type){
          case 'TEST':
            return 2;
          default:
            return 1;
        }
      }
    };
    done();
  });

  lab.test('takes an object of reducers and returns a store', function(done){
    var store = createStore(reducers);
    code.expect(store.dispatch).to.be.a.function();
    code.expect(store.getState).to.be.a.function();
    var state = store.getState();
    code.expect(state).to.contain({ test: 1 });
    done();
  });

  lab.test('allows for no extra middleware', function(done){
    var store = createStore(reducers);
    code.expect(store.dispatch).to.be.a.function();
    code.expect(store.getState).to.be.a.function();
    store.dispatch({ type: 'TEST' });
    var state = store.getState();
    code.expect(state).to.contain({ test: 2 });
    done();
  });

  lab.test('takes an array of middleware and returns a store', function(done){
    var store = createStore(reducers, { middleware: [testMiddleware] });
    code.expect(store.dispatch).to.be.a.function();
    code.expect(store.getState).to.be.a.function();
    store.dispatch({ type: 'TEST' });
    code.expect(middlewareCalls).to.equal(1);
    done();
  });

  lab.test('takes a single middleware and returns a store', function(done){
    var store = createStore(reducers, { middleware: testMiddleware });
    code.expect(store.dispatch).to.be.a.function();
    code.expect(store.getState).to.be.a.function();
    store.dispatch({ type: 'TEST' });
    code.expect(middlewareCalls).to.equal(1);
    done();
  });
});
