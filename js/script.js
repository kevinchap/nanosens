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