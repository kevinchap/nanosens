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