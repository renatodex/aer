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

<hr />

<h3>Create classes with aer['@class']()['@']()['@prototype']()!</h3>
```javascript
  // the ['@'] directive receives a function, that is the implementation of your object and
  // the ['@prototype'] directive receives an object that is the methods of your class (all public!!!)
  aer['@class']('namespace.myapp.MyClass')['@'](function() {
    this.prop1 = 'some string';
    this.prop2 = 25;
  })['@prototype']({
    method1 : function() {
      return this.prop1;
    }
  });
  
  var instance = new aer['@']['namespace.myapp.MyClass']();
```
<hr />

<h3>Overload your class methods!!!</h3>
```javascript
  // the ['@'] directive receives a function, that is the implementation of your object and
  // the ['@prototype'] directive receives an object that is the methods of your class (all public!!!)
  aer['@class']('namespace.myapp.MyClass')['@'](function() {
    this.prop1 = 'some string';
    this.prop2 = 25;
  })['@prototype']({
    method1 : aer['@overload']({
      '' : function() {
        return this.prop1;
      }
      'RegExp,Object' : function(regex, obj) {
        return this.prop2;
      }
    })
  });
  
  var instance = new aer['@']['namespace.myapp.MyClass']();
  
  instance.method1(); // returns 'some string'
  instance.method2(/abc/g, {}); // returns 25
```
