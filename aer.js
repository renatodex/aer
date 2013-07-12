/**
 * FOUNDATION
 * 
 * @author Fernando Faria
 */
(function($global) { 'use strict';
  // normalize the aer$classname prototype attribute to the core javascript
	Object.prototype.aer$classname = 'Object';Number.prototype.aer$classname = 'Number';Array.prototype.aer$classname = 'Array';String.prototype.aer$classname = 'String';Boolean.prototype.aer$classname = 'Boolean';RegExp.prototype.aer$classname = 'RegExp';Error.prototype.aer$classname = 'Error';Function.prototype.aer$classname = 'Function';Date.prototype.aer$classname = 'Date';
	
	// normalize the aer$classname prototype attribute
	for (var i in window) {//console.log(i);
		if (window[i] != null) {
			if (window[i].prototype != null) {
				if (window[i].prototype.constructor != null) {
					window[i].prototype.aer$classname = /function\s+(\w+)s*/.exec(window[i].prototype.constructor.toString()) != null ? /function\s+(\w+)s*/.exec(window[i].prototype.constructor.toString())[1] : '';
				}
			}
		}
	}

	// environment internals
	var _$aerclass = {},
		_$all = false,
		_$protos = 0,
		_$classes = [],
		_$dependencies = [],
		_$namespaces = {},
		_$loading = [],
		_$loaded = 0,
		_$new = {},
		_$config = {},
		_$overloaded,
		_$root = '',
		_$mainprog;
	
	
	// directives
	var aer = {
		'@' : _$new,
		'@class' : _$class,
		'@overload' : _$over,
		'@require' : _$require,
		'@main' : _$main
	};
	
	/**
	 * Define the main program
	 * 
	 * @function _$main
	 * @param fn {Function} The main program that runs after resolved dependencies and classes heritage.
	 * @return {null}
	 */
	function _$main(fn) { 'use strict';
		_$mainprog = fn;
		var check = setInterval(function() {
			_$check(check);
		}, 100);
	}
	
	/**
	 * Check the dependencies, than run the main program
	 * 
	 * @function _$check
	 * @for _$main
	 * @param timevar {setInterval} The reference to the timer to stop
	 * @return {null}
	 * @author Fernando Faria
	 */
	function _$check(timevar) { 'use strict';
		var i, l;
		
		for (i=0, l=_$dependencies.length; i<l; i++) {
			if (!_$new[_$dependencies[i]]) {
				return;
			}
		}
		
		if (_$protos > 0) {
			return;
		}
		
		clearInterval(timevar);
		
		_$mainprog();
	}
	
	/**
	 * @function _$class
	 * @param namespace {String} The namespace of the class
	 * @return {_$transitory} The _$transitory object that construct the class
	 * @author Fernando Faria
	 */
	function _$class(namespace) { 'use strict';
		var transitory = new _$transitory();
		
		transitory.namespace = namespace;
		
		return transitory;
	}
	
	/**
	 * Transitory object
	 * 
	 * @constructor
	 * @chainable
	 * @class _$transitory
	 * @author Fernando Faria
	 */
	function _$transitory() { 'use strict';
		this.namespace;
		this.extended;
		this.o;
	}
	_$transitory.prototype = {
		aer$classname : '_$transitory',
		/**
		 * Config the extended classes
		 * 
		 * @method '@extend'
		 * @author Fernando Faria
		 */
		'@extend' : function() { 'use strict';
			this.extended = arguments;
			return this;
		},
		/**
		 * The interface that implements and return a new class
		 * 
		 * @method '@'
		 * @param fn {Function} The implementation of the class
		 * @author Fernando Faria
		 */
		'@' : function(fn) { 'use strict';
			var _o = {
				'Function' : function(implementation) {
					var o = _$chain(this.namespace, implementation, this.extended !== undefined ? this.extended : '');
					
					_$classes.push(this.namespace);
					_$new[this.namespace] = o;
					
					this.o = o;
					
					if (this.extended != undefined) {
						_$protos += 1;
						_$proto(this.o, this.extended, this.namespace);
					}
					
					return this;
				}
			};
			
			return _$overload(_o, arguments, this);
		},
		/**
		 * The interface that config and implements the class prototype
		 * 
		 * @method '@prototype'
		 * @param o {Object} The object that is the prototype of the class
		 * @author Fernando Faria
		 */
		'@prototype' : function(o) { 'use strict';
			var _o = {
				'Object' : function(obj) {
					var _class = this.o.prototype.aer$classname;
					
					if(this.arguments != undefined) {
						return;
					}
					
					this.o.prototype = obj;
					this.o.prototype.aer$classname = _class;
					
					return this;
				}
			}
			
			return _$$overload(_o, arguments, this);
		}
	}
	
	/**
	 * For the implementation and config of the inherited classes prototypes
	 * 
	 * @function _$proto
	 * @for _$transitory['@']
	 * @param o {Function}
	 * @param x {Object}
	 * @param n {String}
	 * @return {null}
	 * @author Fernando Faria
	 */
	function _$proto(o, x, n) { 'use strict';
		var ok = setInterval(function() {
			_$async(o, x, n, ok);
		}, 100);
	}
	
	/**
	 * As we can use the Aer['@import'] interface, asynchronous config and implements the
	 * inherited classes prototypes because we must wait the dependencies, if have
	 * 
	 * @function _$async
	 * @for _$proto
	 * @param o {Function} The implementation of the class
	 * @param x {Array} The 
	 * @param n {String}
	 * @param timevar {setInterval} The reference to the timer to stop
	 * @return {null}
	 * @author Fernando Faria
	 */
	function _$async(o, x, n, timevar) { 'use strict';
		var i, l;
		
		for (i=0, l=_$dependencies.length; i<l; i++) {
			if (!_$new[_$dependencies[i]]) {
				return;
			}
		}
		
		o.prototype = _$mix(x);
		o.prototype.aer$classname = n;
		
		clearInterval(timevar);
		_$protos -= 1;
	}
	
	/**
	 * Imports required classes
	 * 
	 * @function _$import
	 * @param namespace {String} the namespace of the class to import
	 * @return {null}
	 * @author Fernando Faria
	 */
	function _$import(namespace) { 'use strict';
		if (_$classes[namespace]) { return; }
		
		_$dependencies.push(namespace);
		
		var klass = document.createElement('script');
		var _n = namespace.split('.');
		
		klass.type = 'text/javascript';
		klass.src = _$root + namespace.replace(/\./g, '/') + '/' + _n[_n.length - 1] + '.js';
		
		document.getElementsByTagName('head')[0].appendChild(klass);
	}
	
	/**
	 * Import required classes synchronously
	 */
	function _$require(namespace) { 'use strict';
		_$import(namespace, false);
	}
	
	/**
	 * Mix objects
	 * TODO Há um bug em que não está mixando os prototypes corretamente, não havendo herança de métodos
	 * 
	 * @function _$mix
	 * @param array {Array} An array of objects to mix
	 * @return {Object} The mixed object
	 * @author Fernando Faria
	 */
	function _$mix(array) { 'use strict';
		var obj = {}, i, prop;
		
		for (i = 0; i < array.length; i++) {
			for (prop in _$new[array[i]].prototype) {
				if (prop !== 'aer$classname') {
					obj[prop] = _$new[array[i]].prototype[prop];
				}
			}
		}

		return obj;
	}
	
	/**
	 * Creates the namespace and attaches the implementation of the class in it
	 * 
	 * @function _$chain
	 * @for _$transitory
	 * @param namespace {String} The namespace to create
	 * @param fn {Function} The implmentation of the class that refers to the namespace
	 * @param dependencies {Array} The dependencies if the implmentation extends another classes
	 * @return {Function} The configured implmentation of the class
	 * @author Fernando Faria
	 */
	function _$chain(namespace, fn, dependencies) { 'use strict';
		var n = namespace.split('.'), i, l, prop, clone = {}, scope = _$aerclass;
		
		for (i = 0, l = n.length; i < l; i++) {
			if (!scope[n[i]]) {
				scope[n[i]] = {};
			}
			
			if (i === (l-1)) {
				for (prop in scope[n[i]]) {
					if (prop !== 'aer$classname') {
						clone[prop] = scope[n[i]][prop];
					}
				}

				scope[n[i]] = (typeof dependencies == 'string') ? fn : new _$injector(fn, [dependencies]).inject();
				
				for (prop in clone) {
					scope[n[i]][prop] = clone[prop];
				}
			} else {
				scope = scope[n[i]];
			}
		}
		
		scope[n[i-1]].prototype.aer$classname = namespace;
		
		return scope[n[i-1]];
	}
	
	/**
	 * For security reasons with the evaluated function that is created when extend other classes,
	 * we use an secure overload method based on the constructor that ignores aer$classname
	 */
	function _$overload(pointer, args, context) { "use strict";
		var regex = /function\s+(\w+)s*/, types = [];
	
		for (var i = 0; i < args.length; i++) {
			types.push(regex.exec(args[i].constructor.toString())[1]);
		}
	
		return pointer[types.toString()].apply(context, args);
	}
	
	/**
	 * A great way to overload functions!!! XD
	 * The modified overload that works with the aer$classname prototype attribute
	 */
	function _$$overload(pointer, args, context) { 'use strict';
		var types = [], i;
		
		for (i = 0; i < args.length; i++) {
			types.push(args[i].aer$classname);
		}
		
		return pointer[types.toString()].apply(context, args);
	}
	
	/**
	 * This must be an object that Aer['@class'] can recognize overloaded classes implementations
	 */
	function _$over() { 'use strict';
		return _$$overload(_$over, arguments, this);
	}
	_$over.prototype.aer$classname = '_$over';
	
	/**
	 * 
	 */
	_$over['Object'] = function(o) { 'use strict';
		return function() {
			return _$$overload(o, arguments, this);
		}
	}
	
	/**
	 * The injector
	 * As JavaScript supports reflection via eval() method and Function() constructor,
	 * it's easy to inject dependencies into functions and constructor. As you can see,
	 * we can return an evalued function definition or anything else by the eval() XD.
	 * 
	 * @method _$injector
	 * @param fn {Function} The function to inject the inherited classes
	 * @param dependencies {Array} The inherited classes
	 * @return {Function} The implementation of the class with the injectd inherited classes 
	 * @author Fernando Faria
	 */
	function _$injector(fn, dependencies) { 'use strict';
		return _$$overload(_$injector, arguments, this);
	}
	_$injector.prototype = {
		aer$classname : '_$injector',
		/**
		 * @method inject
		 * @return {Function} An evalued function with injected dependencies
		 * @author Fernando Faria
		 */
		inject : function() {
			var FN_PARTS = /(^function\s*\([\s\S]*\)\s*\{)([\s\S]*)(\}$)/m,
				fnstr = this.fn.toString(),
				fndeclaration = fnstr.match(FN_PARTS)[1],
				fnbody = fnstr.match(FN_PARTS)[2],
				fnclose = fnstr.match(FN_PARTS)[3],
				injected = '',
				dependencies = this.dependencies,
				i, l,
				o = this.o;
			
			for (i = 0, l = dependencies.length; i < l; i++) {
				injected += _$new[dependencies[i]] ? '_$new[\'' + dependencies[i] + '\'].apply(this, arguments);' : dependencies[i] + '.apply(this, arguments);';
			}
			
			fndeclaration += (injected + fnbody + fnclose);
			
			return eval('(' + fndeclaration + ')');
		}
	}
	_$injector['Function,Array'] = function(fn, dependencies) {
		this.fn = fn;
		this.dependencies = dependencies[0];
	}
	_$injector['Function,Array,Object'] = function(fn, dependencies, o) {
		this.fn = fn;
		this.dependencies = dependencies;
		this.o = o;
	}
	
	$global.Aer = Aer;
	
})(window);
