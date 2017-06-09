var ctx = initCanvas();
var actors = [];
var ship;
var lives = 0;
var gameState = "attract";
var numRocks = 2;
var score = 0;
var highScore = 0;
var canvas;
var level = 1;
var saucer;

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
    numRocks = 4;
    score = 0;
    level = 1;
    saucer = null;
    createShip();
    createRocks();
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

function createSaucer() {
    if ((totalFrameCount % 1200 === 0) && (!saucer) && (gameState === 'playing')) {
        var size = level === 1 ? 0 : Math.random() < 0.80 ? 0 : 1;
        saucer = new Saucer(0, Math.random() * canvas.height, size);
        actors.push(saucer);
    }
}

function runGame() {
    requestAnimationFrame(runGame);
    clearScreen();
    checkKeyboardInput();
    moveAndRenderActors();
    checkCollisions();
    checkForEndOfGame();
    displayText();
    createSaucer();
}

function clearScreen() {
    ctx.color = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveAndRenderActors() {
    actors.forEach(function (actor) {
        actor.move();
        drawPolygon(actor.sprite.polygon, actor.sprite.x, actor.sprite.y);
    });
}

function levelUp() {
    numRocks++;
    level++;
    createRocks();
}

function checkForEndOfGame() {
    if (gameState === "exploding") {
        explodingCount += 1;
        if (explodingCount > 150) {
            gameState = 'playing';
            if (lives === 0) {
                gameState = "attract";
                if (score > highScore) {
                    highScore = score;
                }
            } else {
                createShip();
            }
        }
    }
}
