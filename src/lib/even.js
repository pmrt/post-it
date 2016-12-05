"use strict";
////////////////////////////////////////////////////////////////////
// NAME:
// 	even.js
// DESCRIPTION:
// 	The super easy way to maintain your code. No dependencies,
// 	no useless functions, just magic.
// VERSION:
// 	0.0.1-alpha
// AUTHORS:
// 	Pedro J. Martínez <pedrojmrt@gmail.com>
// COMPATIBILITY:
// 	- ECMAScript5 and later.
// 	- See ES5 compatibility table here (http://caniuse.com/#feat=es5)
// 	- If you want need even more compatibility, this
// 	are the elements causing incompatibility in earlier ES5 versions:
// 		- Object.keys().
////////////////////////////////////////////////////////////////////

(function (factory) {
  if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals
    window.$Even = factory();
    window.$watch = window.$Even.$watch;
    window.$watchClass = window.$Even.$watchClass;
    window.$bindElement = window.$Even.$bindElement;
    window.$bindAll = window.$Even.$bindAll;
  }
}(function () {

	var $Even = {

		isVersionSupported : function () {
			/*
				Check :: ES6 Support
				@Return <boolean>
			*/
			try {
				if (typeof __$test$__ == undefined) {
					class __$test$__ {};
				}
			} catch(e) {
				return false;
			}
			return true;
		},

		$watch : function (obj, property, callback, overwrite=false) {
			/*
				Watch a 'property' from 'obj',
				whenever this property changes in
				the original model, it'll
				call the 'callback' passing the
				new value as parameter.

				You can customize your app coding
				your own callback.

				oldValue will be implemented on
				future versions.
			*/
			try {

				if ($Even.isEmptyObj(obj)) {
					throw "TypeError: obj is empty";
				}

				if (!obj.hasOwnProperty(property)) {
					throw "ReferenceError : '"+property+"' property doesn't exist";
				}

				if (obj.hasOwnProperty("$"+property) && !overwrite) {
					throw "TypeError: There is an existing $watcher for " + property + ". Use overwrite parameter";
				}

				Object.defineProperty(obj, "$"+property, {
					configurable:  true,
					set: function(newValue) {
						this[property] = newValue;
						callback.call(obj, newValue);
					}
				})

			} catch(err) {
				console.log(err);
			}
		},

		$watchClass : function(watchedClass, callback, ...args) {
			/*
				Watch a Class. 						Not a instance!
				When you install a watcher for a class with
				this function it'll create a new variable with
				the passed class and '$' as prefix.

				E.g. A passed 'Hello' will be created as $Hello.

				With the new $variable you can instance new objects
				as you would do with the original class but it will
				execute a passed 'callback' when a new object is
				created.

				@Return: <$EvenObj object>
			*/
			if ($Even.isVersionSupported()) {

				class $EvenObj extends watchedClass {
					constructor() {
						super();
						callback.apply(this, args);
					}
				}
				window['$'+watchedClass.name] = $EvenObj;
			    return $EvenObj;

			} else {

				var $EvenObj = function newConstructor() {
					watchedClass.call(this);
					callback.apply(this, arguments);
				}
				$EvenObj.prototype = Object.create(watchedClass.prototype);
				$EvenObj.prototype.constructor = $EvenObj;

				window['$'+watchedClass.name] = $EvenObj;
			    return $EvenObj;
			}
		},

		$bindAll : function (obj, elements, overwrite=false) {
			/*
				Bind all the passed 'obj' attribs
				to the listed 'elements' (array).

				Whenever an attrib changes in the
				model, it'll update its linked
				element.

				Attribs order MUST match with
				its corresponding view elements.

				E.g.
					myObj = {name: 'Peter', phone: '44353454' }

					$bindAll(myObj, ['#name-text', '#phone-text']);
			*/
			let attrbLen = Object.keys(obj).length;

			try {

				if ( attrbLen !== elements.length) {
					throw "MatchError : object attribs length doesn't match with the passed elements";
				}

				for (let i=0; i<attrbLen; i++) {

					let element = $Even.getElement(elements[i]);

					if (!$Even.isValidElement(element)) {
						throw "TypeError: Element does no exist";
					}

					let attrib = Object.keys(obj)[i];
					$watch(obj, attrib, function(newValue) {
						element.innerHTML = obj[attrib];
					}, overwrite);
				}

			} catch(err) {
				console.log(err);
			}
		},

		$bindElement : function (obj, data, overwrite=false) {
			/*
				Bind the passed 'data' for 'obj'.

				Whenever the attrib changes in the
				model, it'll update its linked element.

				Multiple attribs/elements support.

				E.g.
					myObj = {name: 'Peter', phone: '44353454' }

					$bindElement(myObj, {'name': '#name-text'});

			*/
			try {

				if ($Even.isEmptyObj(data)) {
					throw "TypeError: data is empty";
				}

				for (let attrib in data) {

					let element = $Even.getElement(data[attrib]);

					if (!$Even.isValidElement(element)) {
						throw "TypeError: Element does no exist";
					}

					$watch(obj, attrib, function(newValue) {
						element.innerHTML = newValue;
					}, overwrite);
				}

			} catch(err) {
				console.log(err);
			}
		},

	    isEmptyObj : function (obj) {
			/*
				Check if a object is empty.

				Generally, Object.getOwnPropertyNames
				is a better method. However, we intentionally
				want just the enumerable properties of 'obj'.

				@Return: boolean
			*/
			return Object.keys(obj).length === 0;
		},

		isValidElement : function (element) {
			/*
				Valid a given element.
				@Return: <boolean>;
			*/
			return element !== null;
		},


		getElement : function (elementExp) {
			/*
				Get the Element given an expression,
				it could be a selector or a object.
				@Return: <element obj>
			*/
			try {
				if (typeof elementExp == "string") {
					return $Even.getElementBySelector(elementExp);

				} else if (typeof elementExp == "object") {
					return elementExp;
				}

			} catch(err) {
				console.log(err);
			}
		},

		getElementBySelector : function(selector) {
			/*
				Get the Element given a selector.
				@Return: <element obj>
			*/
			let element;

			if (selector.match(/\#/)) {
				element = document.getElementById(selector.replace('#', ''));
			} else if (selector.match(/\./)) {
				element = document.getElementsByClassName(selector.replace('.',''))[0];
			}
			return element;
		}
	};

	return $Even;
}));
