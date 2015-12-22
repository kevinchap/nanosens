(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Utils = require('./utils');

module.exports = function( options ) {

	this.openBtnSelector = options.selectorBtnOpen;
	this.containerSelector = options.selectorContainer;
	if( options.selectorBtnClose ){
		this.closeBtnSelector = options.selectorBtnClose;
	}
	this.whichClass = options.classToAdd;

	var openBtn = document.querySelector( this.openBtnSelector );

	var containerPopup = document.querySelector( this.containerSelector );

	if( this.closeBtnSelector ){
		var closeBtn = document.querySelector( this.closeBtnSelector );
	}

	this.nameOpenEvent = 'open' + Utils.createUniqueId();
	this.openEvent = new Event( this.nameOpenEvent );

	this.nameCloseEvent = 'close' + Utils.createUniqueId();
	this.closeEvent = new Event( this.nameCloseEvent );

	this.init = function() {

		openBtn.addEventListener( 'click', openOrClosePopup );
		closeBtn.addEventListener( 'click', openOrClosePopup );

	};

	var _this = this;

	function openOrClosePopup() {

		var openAttribute = !( typeof this.getAttribute( 'data-open' ) === 'undefined' ) && !( this.getAttribute( 'data-open' ) === null );

		var hasClass = Utils.hasClass( containerPopup, _this.whichClass );

		if( !hasClass && openAttribute ){

			document.body.classList.add( 'no-scroll' );

			containerPopup.classList.add( _this.whichClass );

			document.dispatchEvent( _this.openEvent );

		}

		if( hasClass && !openAttribute ){

			document.body.classList.remove( 'no-scroll' );

			containerPopup.classList.remove( _this.whichClass );

			document.dispatchEvent( _this.closeEvent );

		}

	}

}
},{"./utils":4}],2:[function(require,module,exports){
module.exports = function( cbFct ) {

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				window.oRequestAnimationFrame      ||
				window.msRequestAnimationFrame     ||
				function(/* function */ callback, /* DOMElement */ element){
					window.setTimeout(callback, 1000 / 60);
				};
	})();

	this.raf = null;

	this.callbackFunction = cbFct;

	var _this = this;

	this.createRAF = function(  ) {
		_this.callbackFunction();
		_this.raf = window.requestAnimFrame( _this.createRAF );
	};

	this.killRAF = function() {
		window.cancelAnimationFrame( _this.raf );
	}

}
},{}],3:[function(require,module,exports){
var RAF = require('./raf');

module.exports = function( options ) {

	// set vars

	var container = document.querySelector( options.selectorContainer );
	var items = document.querySelectorAll( options.itemsSelector );
	items[0].classList.add( 'selected' );
	var nbItems = items.length;
	if( options.navSelector ){
		var navItems = document.querySelectorAll( options.navSelector + ' li' );
		navItems[0].classList.add( 'selected' );
	}

	this.delta = 0;
	this.scrollDelta = 0;
	this.scrolling = false;

	if( options.orientation === 'horizontal' ){
		this.slideDelta = items[0].offsetWidth;
	}
	if( options.orientation === 'vertical' ){
		this.slideDelta = items[0].offsetHeight;
	}

	this.moveTarget = 0;
	this.movePos = 0;
	this.moveEase = 0.1;
	this.moveEaseLimit = 1;
	this.moveSaved = 0;

	this.deltaLimit = 10;
	this.delta = 0;
	this.currentSlide = 0;
	this.previousSlide = 0;
	this.currentPos = 0;

	// // touch
	// this.isDragged = false;
	// this.mouseStartX = 0;
	// this.mouseMoveX = 0;
	// this.direction = '';


	// this.slidesContainerEvent = null;
	// this.slidesContainer = null;
	// this.slides = null;
	// this.classContainer = null;

	// if ( this.isDesktop ) {
	// 	this.bigSlideWidth = 285;
	// 	this.slideWidth = 285;
	// }
	// if ( this.isTablet ) {
	// 	this.bigSlideWidth = 235;
	// 	this.slideWidth = 235;
	// }
	// if ( this.isMobile ) {
	// 	this.bigSlideWidth = 185;
	// 	this.slideWidth = 185;
	// 	if ( this.id === 'message' ) {
	// 		this.slideWidth = 130;
	// 	}
	// }

	// if ( this.isDesktop ) {

	this.mousewheelevt = ( /Firefox/i.test( navigator.userAgent ) ) ? 'DOMMouseScroll' : 'mousewheel';
	container.addEventListener( this.mousewheelevt, scrollContainer );

	// 	} else {

	// 		this.removeTouchMove = true;

	// 		this.isSlided = false;
	// 		this.touchStart = 0;

	// 		var _this = this;

	// 		window.addEventListener( 'touchmove', function( e ) {

	// 			if ( _this.removeTouchMove ) {
	// 				e.preventDefault();
	// 			}

	// 		} );

	// 		this.$.container.addEventListener( 'touchstart', function( e ) {

	// 			_this.isSlided = true;

	// 			_this.touchStart = e.changedTouches[ 0 ].pageY;

	// 		} );

	// 		this.$.container.addEventListener( 'touchend', this.onScrollProfile.bind( this ) );

	// 		this.$.container.querySelector('.text-content').addEventListener( 'click', this.clickScrollProfile.bind( this ) );
	// 	}

	var _this = this;

	function scrollContainer( event ){

		if ( _this.mousewheelevt === 'mousewheel' ) {

			if ( event.deltaY ) {

				_this.delta = event.deltaY;

			} else {

				_this.delta = -( event.wheelDelta );

			}

		} else {

			_this.delta = 40 * event.detail;

		}

		_this.scrollDelta += _this.delta;

		if( _this.scrollDelta < 0 ){
			_this.scrollDelta = 0;
		}

		if( _this.scrollDelta > _this.slideDelta * (nbItems - 1) ){
			_this.scrollDelta = _this.slideDelta * (nbItems - 1);
		}

		// _this.moveTarget = _this.scrollDelta;

		if( _this.delta !== 0 && ( _this.delta >= _this.deltaLimit || _this.delta <= -( _this.deltaLimit ) ) ){
			limit();
			if( _this.scrollDelta > 0 || _this.scrollDelta < _this.slideDelta * (nbItems - 1) ){
				_this.scrolling = true;
			}
			// force();
		}

	}

	// onScrollProfile: function( event ) {

	// 	var delta = 0;

	// 	if ( this.isDesktop ) {

	// 		if ( this.mousewheelevt === 'mousewheel' ) {

	// 			if ( event.deltaY ) {

	// 				delta = event.deltaY;

	// 			} else {

	// 				delta = -( event.wheelDelta );

	// 			}

	// 		} else {

	// 			delta = 40 * event.detail;

	// 		}

	// 	} else {

	// 		if ( this.isSlided ) {

	// 			delta = this.touchStart - event.changedTouches[ 0 ].pageY;

	// 		}

	// 	}

	// 	if ( delta > 0 && this.$.container.className.indexOf( 'scrolled' ) === -1 ) {

	// 		this.$.container.classList.add( 'scrolled' );

	// 	}
	// 	if ( delta < 0 && this.$.container.className.indexOf( 'scrolled' ) !== -1 ) {

	// 		this.$.container.classList.remove( 'scrolled' );

	// 	}

	// },

	function limit() {
		// console.log(_this.delta);
		// console.log(_this.deltaLimit);

		// console.log( _this.scrolling );

		if( !_this.scrolling  ){

			_this.previousSlide = parseInt( _this.currentSlide );

			if ( _this.delta >= _this.deltaLimit ) {
				nextSlide();
			}
			if ( _this.delta <= -( _this.deltaLimit ) ) {
				prevSlide();
			}

			_this.currentPos = _this.slideDelta * _this.currentSlide;
			this.delta = 0;

			force();

		}

	}

	function prevSlide() {
		_this.currentSlide = parseInt( _this.currentSlide - 1 );
		if (_this.currentSlide < 0 ) {
			_this.currentSlide = 0;
		}
	}

	function nextSlide() {
		_this.currentSlide = parseInt( _this.currentSlide + 1 );
		if ( _this.currentSlide > nbItems - 1 ) {
			_this.currentSlide = parseInt( nbItems - 1 );
		}
	}

	function force() {
		_this.moveTarget = _this.slideDelta * _this.currentSlide;

		items[ _this.previousSlide ].classList.remove( 'selected' );
		items[ _this.currentSlide ].classList.add( 'selected' );

		navItems[ _this.previousSlide ].classList.remove( 'selected' );
		navItems[ _this.currentSlide ].classList.add( 'selected' );

	}

	this.renderSlide = function() {

		if ( _this.moveTarget !== _this.movePos ) {

			if ( Math.abs( _this.movePos - _this.moveTarget ) < _this.moveEaseLimit ) {
				_this.movePos = _this.moveTarget;
				_this.scrolling = false;
			}

			_this.movePos += ( _this.moveTarget - _this.movePos ) * _this.moveEase;

			// console.log( _this.movePos );

			transform( _this.movePos );

		}

	}

	function transform( movePos ) {

		var translate = 'translate3d(0px,' + -( movePos ) + 'px, 0px)';

		container.style.webkitTransform = translate;
		container.style.MozTransform = translate;
		container.style.msTransform = translate;
		container.style.OTransform = translate;
		container.style.transform = translate;

	}


		// this.slides = this.slidesContainer.querySelectorAll( 'li' );

		// this.slidesContainerEvent.addEventListener( 'touchstart', function( e ) {

		// 	_this.isDragged = true;

		// 	_this.mouseStartX = e.changedTouches[ 0 ].pageX;
		// 	_this.moveSaved = _this.movePos;

		// } );

		// this.slidesContainerEvent.addEventListener( 'touchmove', function( e ) {

		// 	if ( _this.isDragged ) {

		// 		_this.mouseMoveX = _this.moveSaved + _this.mouseStartX - e.changedTouches[ 0 ].pageX;

		// 		// send target position to RAF
		// 		_this.moveTarget = _this.mouseMoveX;

		// 		// know delta nd direction
		// 		_this.delta = _this.mouseStartX - e.changedTouches[ 0 ].pageX;

		// 		if ( _this.delta > 0 ) {
		// 			_this.direction = 'right';
		// 		}
		// 		if ( _this.delta < 0 ) {
		// 			_this.direction = 'left';
		// 		}

		// 	}

		// } );

		// this.slidesContainerEvent.addEventListener( 'touchend', function() {

		// 	if ( _this.delta !== 0 ) {
		// 		_this.limit();
		// 		_this.force();
		// 	}

		// 	_this.isDragged = false;
		// 	_this.mouseStartX = 0;
		// 	_this.mouseMoveX = 0;

		// } );




	var slideRaf = new RAF( this.renderSlide );
	slideRaf.createRAF();

}
},{"./raf":2}],4:[function(require,module,exports){
module.exports = (function() {

	var self = {};

	self.hasClass = function( element, classString ) { 
		
		if( element.classList ){

			return element.classList.contains( classString );
			
		}else{

			return new RegExp('(^| )' + classString + '( |$)', 'gi').test( element.classString );

		}

	};

	self.createUniqueId = function() {
		return '_' + Math.random().toString( 36 ).substr( 2, 16 );
	};

	return self;

})();
},{}],5:[function(require,module,exports){
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
},{"./modules/popup":1,"./modules/slide":3}]},{},[5]);
