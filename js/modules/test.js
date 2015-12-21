// FOR A MODULE WITHOUT INSTANCIATION

// module.exports = (function() {

// 	var self = {};
// 	var unTrucPrive = 12;

// 	self.unTrucPublique = function() { 
// 		return unTrucPrive; 
// 	};

// 	return self;

// })();


// FOR A MODULE WITH INSTANCIATION

// module.exports = function() {

// 	this.attrPublique = '...';
// 	var unTrucPrive = 42;

// 	this.unTrucPublique = function() { 
// 		return unTrucPrive; 
// 	};

// }