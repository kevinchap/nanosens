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