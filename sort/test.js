var nativeSortCalled;
var oldSort = Array.prototype.sort;
Array.prototype.sort = function() {
  nativeSortCalled = true;
  return oldSort.apply(this, arguments);
};

var assert = require('assert');
var sort = require('./');

describe('sort', function() {

  it('will sort an array', function() {
    var arr = [5, 1, 2, 4, 3];
    nativeSortCalled = false;
    var sorted = sort(arr);
    assert(!nativeSortCalled);
    assert.deepEqual(sorted, [1, 2, 3, 4, 5]);
  });

  it('sorts better than n^2', function() {
    var arr = [];
    for (var i = 0; i < 10000; i++) {
      arr.push(Math.random());
    }
    nativeSortCalled = false;
    sorted = sort(arr);
    var lastNumber = sorted[0];
    for (i = 1; i < 10000; i++) {
      if (lastNumber > sorted[i]) {
        throw new Error("array isn't sorted");
      }
      lastNumber = sorted[i];
    }
    assert(!nativeSortCalled);
  });
});
function sort(myArr)
{
  //var marks = new Array(10,12,11,20,2);
        for(var i=0;i<myArr .length;i++) //Hold the first element
	{
		for(var j=i+1;j<myArr.length;j++) //Hold the next element from the first element
		{
			if(Number(myArr[i]) > Number(myArr[j]))	//comparing first and next element
			{
				tempValue = myArr[j];
				myArr[j] = myArr[i];
				myArr[i] = tempValue;
			}
		}
	}
        document.write(myArr);
}

