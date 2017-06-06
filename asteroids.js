var ctx = initCanvas();
var actors = [];
var ship;
var lives = 0;
var gameState = "attract";
var numRocks = 4;
var score = 0;
var highScore = 0;
var canvas;

createRocks();
initKeyboard();
runGame();

function initCanvas() {
	canvas = document.getElementById("canvas");
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	return canvas.getContext("2d");
}

function startGame() {
    actors = [];
    gameState = "playing";
    lives = 3;
    createShip();
    numRocks = 4;
    createRocks();
    score = 0;
}

function createRocks() {
	for (var i = 0; i < numRocks; i++) {
		var rock = new RockSprite(0, 0, 0);
		actors.push(rock);
	}
}

function createShip() {
    keyPressed = {};
	ship = new ShipSprite(canvas.width / 2, canvas.height / 2);
	actors.push(ship);
}

function runGame() {
	requestAnimationFrame(runGame);
	clearScreen();
	checkKeyboardInput();
	moveAndRenderActors();
	checkCollisions();
	displayText();
}

function clearScreen() {
	ctx.color = "black";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveAndRenderActors() {
	actors.forEach(function(actor) {
		actor.move();
		drawPolygon(actor.sprite.polygon, actor.sprite.x, actor.sprite.y);
	});
}

function levelUp() {
    numRocks++;
    createRocks();
}
