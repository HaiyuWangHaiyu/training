window.onload = function () {
	var btnSubmit = document.getElementById('btn-submit');
	var loadingPanel = document.getElementById('shelter');
	var message = document.getElementById('message');
	message.innerText = 'Tips : User=alva/Password=1234';
	
	function showLoadingPanel () {
		loadingPanel.style.display = 'block';
	}

	function hideLoadingPanel () {
		loadingPanel.style.display = 'none';
	}

	function loginSuccessCallBack (res) {
		window.location.href = 'index.html';
	}

	function loginCheck () {
		if(document.getElementById('userName').value === 'alva' && document.getElementById('passWord').value === '1234'){
			window.location.href = 'index.html';
		} else {
			message.innerText = 'Error : Invalid username/password';
		}
	}

	function loginSErrorCallBack (res) {
		hideLoadingPanel();
		message.innerText = 'Error : Invalid username/password';
	}
	
	btnSubmit.addEventListener('click', function (e) {
		var userName = document.getElementById('userName').value;
		var passWord = document.getElementById('passWord').value;
		if (!userName || !passWord) {
			message.innerText = 'Username/Password is required.';
		} else {
			var login = new Login();
			login.login(userName, passWord, loginCheck, loginSErrorCallBack);
		}
	}, false);
}