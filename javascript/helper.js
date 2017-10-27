function constructorExtend(Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
}

function addEventToNodes(nodes, event, action) {
	var len = htmlCollection.length;
	for (var i = 0; i < len; i++) {
		htmlCollection[i].addEventListener(event, action, false);
	}
}