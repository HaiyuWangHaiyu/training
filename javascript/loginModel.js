function Login () {
	this.userInfo = null;
}

Login.prototype = Object.create(Core.prototype);
Login.prototype.constructor = Login;
Login.prototype.login = function (userName, passWord, successCallBack, errorCallBack) {
	return successCallBack();
	//
	this.ajax(
		'login-check.php',
		{
			'type': 'POST',
			'headers': {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
			'data': {
						'username': userName,
						'password': passWord
					}
		},
		successCallBack,
		errorCallBack,
	);
}

Login.prototype.logout = function () {
	this.userInfo = null;
}