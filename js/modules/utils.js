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