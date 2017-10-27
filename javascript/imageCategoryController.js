var imagesManager = new ImagesManager();

function fillEditModal (filename) {
	var successCallback = function(res){
		$('#editModal').modal('show');
		var result = JSON.parse(res);
		document.getElementById('textarea-editImg').innerText = result.data.value;
		document.getElementById('input-editFile').value = result.data.filename;
		document.getElementById('input-editDescription').value = result.data.description;
		document.getElementById('img-editPreview').src = result.data.value;	
	}
	var errorCallback = function(){
		alert('Error');
	}
	imagesManager.getImageByFilename(filename, successCallback, errorCallback);
}

function clearAddModal () {
	document.getElementById('input-addFile').value = '';
	document.getElementById('input-addDescription').value = '';
	document.getElementById('textarea-addImg').innerText = '';
	document.getElementById('input-addImg').value = null;
	document.getElementById('img-addPreview').src = './images/icon-preview.png';
	$('#addModal').modal('show');
}

function delImg (filename) {
	imagesManager.deleteList(filename
		,function () {
			alert('Delete Successed')
			imagesManager.getList(getImageListSucCallBack);
		},function () {
			alert('Delete failed');
		});
}

window.onload = function () {
	var addSaveBtn = document.getElementById('btn-addSave');
	var addImgInput = document.getElementById('input-addImg');
	var editSaveBtn = document.getElementById('btn-editSave');
	var editImgInput = document.getElementById('input-editImg');
	imagesManager.getLists(getListSucCallBack, getListErrorCallBack);

	function getListSucCallBack (res) {
		var result = JSON.parse(res);
		var length = result.data.length;
		var indexContent = document.getElementById('index-content');
		indexContent.innerHTML = "";
		for (var i = 0; i < 10; i++) {
			var recordImage =  result.data[i];
			var newTr = 
					'<tr>'
					+	'<td>'
					+		'<p class="tit-img">' + recordImage.filename + '</p>'
					+	'</td>'
					+	'<td>'
					+		'<p>' + recordImage.description + '</p>'
					+	'</td>'
					+	'<td>'
					+		'<img src="' + recordImage.value + '" class="index-content-img">'
					+	'</td>'
					+	'<td>'
					+		'<button type="button" class="btn btn-index btn-editImg" onclick="window.fillEditModal(' + "'" + recordImage.filename + "'" + ')">'
					+			'<span class="glyphicon glyphicon-pencil"></span>'
					+		'</button>'
					+		'<button type="button" class="btn btn-index btn-delImg" onclick="window.delImg(' + "'" + recordImage.filename + "'" + ')">'
					+			'<span class="glyphicon glyphicon-trash"></span>'
					+		'</button>'
					+	'</td>'
					+'</tr>';
				indexContent.innerHTML += newTr;
		}
	}
	function getListErrorCallBack() {
		alert('Get failed');
	}

	addImgInput.addEventListener('change', function (e) {
		var input = e.target;
		var reader = new FileReader();
		reader.onload = function () {
			var dataURL = reader.result;
			var fileName = input.files[0].name;
			document.getElementById('input-addFile').value = fileName;
			document.getElementById('textarea-addImg').innerText = dataURL;
			document.getElementById('img-addPreview').src = dataURL;
		}
		reader.readAsDataURL(input.files[0]);
	}, false);

	editImgInput.addEventListener('change', function (e) {
		var input = e.target;
		var reader = new FileReader();
		reader.onload = function () {
			var dataURL = reader.result;
			var fileName = input.files[0].name;
			document.getElementById('textarea-editImg').innerText = dataURL;
			document.getElementById('img-editPreview').src = dataURL;
		}
		reader.readAsDataURL(input.files[0]);
	}, false);

	addSaveBtn.addEventListener('click', function () {
		var filename = document.getElementById('input-addFile').value;
		var description = document.getElementById('input-addDescription').value;
		var value = document.getElementById('textarea-addImg').value;
		if( filename && description && value){
			imagesManager.createList(filename, description, value,
				function () {
					alert('Create Successed');
					$('#addModal').modal('hide');
					imagesManager.getList(getListSucCallBack, getListErrorCallBack);
				},
				function () {
					alert('Create Failed');
				});
		} else {
			document.querySelector('#addModal .modal-footer-errormes').innerHTML = 'Error : Image / Filename / Description are all required.';
		}
	}, false);
		
	
	editSaveBtn.addEventListener('click', function () {
		var filename = document.getElementById('input-editFile').value;
		var description = document.getElementById('input-editDescription').value;
		var value = document.getElementById('img-editPreview').src;
		imagesManager.updateList(filename, description, value,
			function () {
				alert('Update Successed');
				$('#editModal').modal('hide');
				imagesManager.getList(getListSucCallBack, getListErrorCallBack);
			},
			function () {
				alert('Edit Failed');
			})
	}, false);
}

