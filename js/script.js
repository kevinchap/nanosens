"use strict";

// var Utils = require('./modules/utils');
var Popup = require('./modules/popup');
var Slide = require('./modules/slide');

function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function init() {

	// popup pre order
	var popupPreOrder = new Popup( {
		selectorBtnOpen: '#pre-order-btn',
		selectorContainer: '#pre-order-popup',
		selectorBtnClose: '#pre-order-btn-close',
		classToAdd: 'display'
	} );
	popupPreOrder.init();


	// popup video
	var popupVideo = new Popup( {
		selectorBtnOpen: '#video-popup-btn',
		selectorContainer: '#video-iframe',
		selectorBtnClose: '#video-popup-btn-close',
		classToAdd: 'display'
	} );

	popupVideo.init();

	document.addEventListener( popupVideo.nameOpenEvent, function (e) {
		document.querySelector( '#video-iframe iframe' ).src = document.getElementById( 'video-iframe' ).getAttribute( 'data-src' );
	}, false);

	document.addEventListener( popupVideo.nameCloseEvent, function (e) {
		document.querySelector( '#video-iframe iframe' ).src = '';
	}, false);

	// slide section
	var slideSection = new Slide({
		selectorContainer: '#content',
		itemsSelector: '.slide-section',
		orientation: 'vertical',
		navSelector: '#slide-nav'
	});

}

ready(init);