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