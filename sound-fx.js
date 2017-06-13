var sounds = {
    shipMissile: new Audio('res/ship-missile.wav'),
    saucerMissile: new Audio('res/saucer-missile.wav'),
    explosion1: new Audio('res/explosion1.wav'),
    explosion2: new Audio('res/explosion2.wav'),
    explosion3: new Audio('res/explosion3.wav')
};

function playSound(name) {
    sounds[name].play();
}