function ImagesManager () {
	this.baseUri = 'http://192.168.0.80:9001/api/';
	Core.apply(this);
}
constructorExtend(ImagesManager, Core);


ImagesManager.prototype.getLists = function (successCallBack, errorCallBack) {
	this.get(this.baseUri + 'image/get/', successCallBack, errorCallBack);
}

ImagesManager.prototype.getImageByFilename = function (filename, successCallBack, errorCallBack) {
	this.get(this.baseUri + 'image/GetByName?name=' + filename, successCallBack, errorCallBack);
}

ImagesManager.prototype.createList = function (filename, description, value, successCallBack, errorCallBack) {
	this.post(this.baseUri + 'image/create/', 
		{
			'filename': filename,
			'description': description,
			'value': value
		}, 
		successCallBack, 
		errorCallBack
	);
}

ImagesManager.prototype.updateList = function (filename, description, value, successCallBack, errorCallBack) {
	this.put(this.baseUri + 'image/update/',
		{
			'filename': filename,
			'description': description,
			'value': value
		}, 
		successCallBack,
		errorCallBack);
}

ImagesManager.prototype.deleteList = function (filename, successCallBack, errorCallBack) {
	this.delete(this.baseUri + 'v1/image/delete?name=' + filename, successCallBack, errorCallBack);
}


