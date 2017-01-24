var explodingCount = 0;
function checkCollisions() {

    if (gameState != "attract") {
        var foundARock = false;
        for (var i = actors.length - 1; i >= 0; i--) {
            var actor = actors[i];
            if (actor.name == "rock") {
                foundARock = true;
                checkRockCollisions(actor)
            }
        }

        if (foundARock == false) {
            levelUp();
        }

        if (gameState == "exploding") {
            explodingCount += 1;
            if (explodingCount > 150) {
                gameState = 'playing';
                if (lives == 0) {
                    gameState = "attract";
                } else {
                    createShip();
                }
            }
        }
    }
}

function checkRockCollisions(rock) {
    if (gameState == "playing") {
        var rockHit = false;
        var shipHit = false;
        ship.missiles.forEach(function(missile) {
            if (missile.sprite.collidesWith(rock.sprite)) {
                removeSprite(actors, missile);
                removeSprite(ship.missiles, missile);
                rockHit = true;
            }
        });

        if (ship.sprite.collidesWith(rock.sprite)) {
            rockHit = true;
            shipHit = true;
        }

        if (rockHit) {
            doRockHit(rock);
        }

        if (shipHit) {
            doShipHit();
        }
    }
}

function doRockHit(rock) {
    removeSprite(actors, rock);
    addDebris(rock.sprite.x, rock.sprite.y);
    var newRockSize = null;
    if (rock.sizeIndex == 0) {
        newRockSize = 1;
        score += 50;
    } else if (rock.sizeIndex == 1) {
        newRockSize = 2;
        score += 100;
    } else {
        score += 200;
    }

    if (newRockSize != null) {
        for (var i = 0; i < 2; i++) {
            var newRock = new RockSprite(rock.sprite.x, rock.sprite.y, newRockSize);
            actors.push(newRock);
        }
    }
}

function addDebris(x, y) {
    for (var i=0; i<25; i++) {
        var debris = new DebrisSprite(x, y);
        actors.push(debris);
    }
}

function doShipHit() {
    removeSprite(actors, ship);
    addDebris(ship.sprite.x, ship.sprite.y);
    lives--;
    explodingCount = 0;
    gameState = "exploding"
}

function removeSprite(collection, actor) {
	var i = collection.indexOf(actor);
	if (i != -1) {
		collection.splice(i, 1);
	}

}
