<h1>aer - More power to your JS!</h1>

<h3>What is't?</h3>
<p>aer is a API extension for JavaScript that adds great features to the language.</p>

<h3>How it works?</h3>
The best way to explain is with code snipets!!!

<hr />

<h3>No more need of instanceof!!!</h3>
<p>aer adds powerfull data typing to functions params:</p>
```javascript
  // It's common to verify the type of a received param
  function someFunc(param) {
    switch (instanceof param) {
      case 'string':
        // do something
        break;
      case 'object':
        // do something
        break;
    }
  }
  
  // with aer, you verify the param data type!!!
  var someFunc = aer['@overload']({
    '' : function() {
      alert('No params!!!');
    },
    'Object' : function(obj) {
      var i;
      
      for (i in obj) {
        console.log(obj[i] + ' > ' + i);
      }
    },
    'String' : function(str) {
      console.log(str + ' is some word');
    },
    'Number,Number' : function(n1, n2) {
      return n1 + n2;
    }
  });
  
  // now, you just need to call your function
  someFunc(); // alerts 'No params'
  someFunc({ foo : 'bar' }); // logs on the console 'foo > bar'
  someFunc(function(){}); // returns an error because have no signature
  someFunc(2); // returns an error because have no signature
  someFunc(13, 24); // returns 37
  someFunc('13', 24); // returns an error because have no signature. The first param is a string!!!
```
