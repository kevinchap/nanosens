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