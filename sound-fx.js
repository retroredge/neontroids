var sounds = {
    shipMissile: new Audio('res/ship-missile.mp3'),
    saucerMissile: new Audio('res/saucer-missile.mp3'),
    explosion1: new Audio('res/explosion1.mp3'),
    explosion2: new Audio('res/explosion2.mp3'),
    explosion3: new Audio('res/explosion3.mp3')
};

function playSound(name) {
    sounds[name].play();
}