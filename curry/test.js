var assert = require('assert');
var curry = require('./');

describe('curry', function() {

  it('curries the function at least once', function() {
    var add = curry(function(a, b) {
      return a + b;
    });
    assert.equal(add(1)(2), 3);
  });

  it('curries the function even with a single argument', function() {
    var output = curry(function(n) {
      return n;
    });
    assert.equal(output(1), 1);
  });

  it('curries the function until the arguments needed are given at least once', function() {
    var add = curry(function(a, b, c) {
      return a + b + c;
    });
    assert.equal(add(1, 2)(3), 6);
  });

  it('curries the function until the arguments needed are given mutliple times', function() {
    var add = curry(function(a, b, c) {
      return a + b + c;
    });
    assert.equal(add(1)(2)(3), 6);
  });

  it("doesn't share state between calls", function() {
    var add = curry(function(a, b, c) {
      return a + b + c;
    });
    assert.equal(add(1)(2)(3), 6);
    assert.equal(add(2)(3)(4), 9);
  });
  
  it("doesn't only work with addition", function() {
    var merge = curry(function(a, b, c) {
      return [a, b, c].join(', ');
    });
    assert.equal(merge('1')(2)(3), '1, 2, 3');
  });

  it("doesn't share state between inner calls", function() {
    var add = curry(function(a, b, c, d) {
        return a + b + c + d;
    });
    var firstTwo = add(1)(2);
    assert.equal(firstTwo(3)(4), 10);
    var firstThree = firstTwo(5);
    assert.equal(firstThree(6), 14);
  });

});

function curry(func,args,space) {
    var n  = func.length - args.length; //arguments still to come
    var sa = Array.prototype.slice.apply(args); // saved accumulator array
    function accumulator(moreArgs,sa,n) {
        var saPrev = sa.slice(0); // to reset
        var nPrev  = n; // to reset
        for(var i=0;i<moreArgs.length;i++,n--) {
            sa[sa.length] = moreArgs[i];
        }
        if ((n-moreArgs.length)<=0) {
            var res = func.apply(space,sa);
            // reset vars, so curried function can be applied to new params.
            sa = saPrev;
            n  = nPrev;
            return res;
        } else {
            return function (){
                // arguments are params, so closure bussiness is avoided.
                return accumulator(arguments,sa.slice(0),n);
            }
        }
    }
    return accumulator([],sa,n);
}

function add (a,b,c){
    if (arguments.length < this.add.length) {
      return curry(this.add,arguments,this);
    }
    return a+b+c;
}
function testCurry{
	alert(add()(1,2,4));      // 7
	alert(add(1)(2)(5));      // 8
	alert(add(1)()(2)()(6));  // 9
	alert(add(1,2,7,8));      // 10
}
