var keyPressed = {};

function initKeyboard() {
	document.addEventListener('keydown', function(event) {
		keyPressed[event.keyCode] = true;
	}, true);

	addEventListener('keyup', function(event) {
		if (gameState == "playing") {
			keyPressed[event.keyCode] = false;

			if (event.keyCode == "78" || event.keyCode == "32") {
				ship.fire();
			}
		}
	}, true);

	window.addEventListener('blur', function() {
	        keyPressed = {};
	});
}

function checkKeyboardInput() {
	if (gameState == "playing") {
		if (keyPressed["37"] || keyPressed["90"]) {
			ship.rotate(1);
		}

		if (keyPressed["39"] || keyPressed["88"]) {
			ship.rotate(-1);
		}

		if (keyPressed["38"] || keyPressed["77"]) {
			ship.thrust();
		}
	} else if (gameState == "attract") {
		if (keyPressed["13"]) {
		    startGame();
		}
	}
}

