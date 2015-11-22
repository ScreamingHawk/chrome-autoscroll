function save_options() {
	var speed = document.getElementById('speed').value;
	chrome.storage.sync.set({
		speed: speed
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Saved!';
		setTimeout(function() {
			status.textContent = '';
		}, 1000);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		speed: 25
	}, function(items) {
		document.getElementById('speed').value = items.speed;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

document.getElementById('date').textContent = new Date().getFullYear();