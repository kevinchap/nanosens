(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function( options ) {

	this.name = options.name;
	console.log( this.name );

	// this.attrPublique = '...';
	// var unTrucPrive = 42;

	// this.unTrucPublique = function() { 
	// 	return unTrucPrive; 
	// };

}
},{}],2:[function(require,module,exports){
module.exports = (function() {

	var self = {};

	self.hasClass = function( element, classString ) { 
		
		if( element.classList ){

			return element.classList.contains( classString );
			
		}else{

			return new RegExp('(^| )' + classString + '( |$)', 'gi').test( element.classString );

		}

	};

	return self;

})();
},{}],3:[function(require,module,exports){
"use strict";

var Utils = require('./modules/utils');
var Popup = require('./modules/popup');

function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function init() {
	
	// pre-order animation
	document.getElementById( 'pre-order-btn' ).addEventListener( 'click', openOrClosePreorder );
	document.getElementById( 'pre-order-btn-close' ).addEventListener( 'click', openOrClosePreorder );


	// var options1 = {
	// 	name: 'Max',
	// 	lastname: 'Chap'
	// };

	// var popup1 = new Popup( options1 );

	// var options2 = {
	// 	name: 'Kev',
	// 	lastname: 'Chapipo'
	// };

	// var popup2 = new Popup( options2 );
	
}

function openOrClosePreorder() {

	var openAttribute = !( typeof this.getAttribute( 'data-open' ) === 'undefined' ) && !( this.getAttribute( 'data-open' ) === null );

	var popup = document.getElementById( 'pre-order-popup' );

	var whichClass = 'display';

	var hasClass = Utils.hasClass( popup, whichClass );

	if( !hasClass && openAttribute ){

		document.body.classList.add( 'no-scroll' );

		popup.classList.add( whichClass );

	}

	if( hasClass && !openAttribute ){

		document.body.classList.remove( 'no-scroll' );

		popup.classList.remove( whichClass );

	}

}

ready(init);
},{"./modules/popup":1,"./modules/utils":2}]},{},[3]);
