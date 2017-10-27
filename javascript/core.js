function Core() {
}

/**
 * @param 
 * {String} url
 * {String} settings 
 * {
 * 	type: ...
 * 	headers: {}
 *  data: {}
 * }
 * {Function} successCallBack
 * {Function} errorCallBack
 * @return 
 * @example......
 */
Core.prototype.get = function (url,  successCallBack, errorCallBack){
	this.ajax(url, {'type': 'GET'}, successCallBack, errorCallBack);
}
Core.prototype.post = function (url, data, successCallBack, errorCallBack) {
	this.ajax(url, 
		{
			'type': 'POST',
			'data': data
			
		}, 
		successCallBack, 
		errorCallBack
		);
}
Core.prototype.put = function (url, data, successCallBack, errorCallBack) {
	this.ajax(url, 
		{
			'type': 'PUT',
			'data': data
		}, 
		successCallBack, 
		errorCallBack
		);
}
Core.prototype.delete = function (url, successCallBack, errorCallBack) {
	this.ajax(url, {'type': 'DELETE'}, successCallBack, errorCallBack);
}
Core.prototype.ajax = function (url, settings, successCallBack, errorCallBack) {
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open(settings.type, url);
	for (var header in settings.headers) {
		xhr.setRequestHeader(header,settings.headers[header]);
	}
	settings.data ? xhr.send(JSON.stringify(settings.data)) : xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var res = xhr.responseText;
			if(xhr.status >= 200 && xhr.status <= 300) {
				successCallBack(res);
			} else {
				errorCallBack(res);
			}
		}
	}
}