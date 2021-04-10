window.onload = function() {
	let canvas = document.getElementById("paint-canvas");
	let context = canvas.getContext("2d");
	let boundings = canvas.getBoundingClientRect();
	let range = document.getElementById("brush").value;

	let mouseX = 0;
	let mouseY = 0;
	let isDrawing = false;
	context.strokeStyle = 'black';

	//Handle brush size
	let brush = document.getElementById('brush');

	brush.addEventListener('input', function(brush){
		context.lineWidth = brush.target.value;
	});

	// Handle Colors
	let colors = document.getElementsByClassName('colors')[0];

	colors.addEventListener('click', function(event) {
		context.strokeStyle = event.target.value || 'black';
	});


	// Mouse Down Event
	canvas.addEventListener('mousedown', function(event) {
		setMouseCoordinates(event);
		isDrawing = true;

		// Start Drawing
		context.beginPath();
		context.moveTo(mouseX, mouseY);
	});

	// Mouse Move Event
	canvas.addEventListener('mousemove', function(event) {
		setMouseCoordinates(event);

		if(isDrawing) {
			context.lineTo(mouseX, mouseY);
			context.stroke();
		}
	});

	// Mouse Up Event
	canvas.addEventListener('mouseup', function(event) {
		setMouseCoordinates(event);
		isDrawing = false;
	});

	// Handle Mouse Coordinates
	function setMouseCoordinates(event) {
		mouseX = event.clientX - boundings.left;
		mouseY = event.clientY - boundings.top;
	}


	// Handle Clear Button
	let clearButton = document.getElementById('clear');

	clearButton.addEventListener('click', function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	});


	// Handle Save Button
	let saveButton = document.getElementById('save');

	saveButton.addEventListener('click', function() {
		let imageName = prompt('Please enter image name');
		let canvasDataURL = canvas.toDataURL();
		let a = document.createElement('a');
		a.href = canvasDataURL;
		a.download = imageName || 'drawing';
		a.click();
	});
}