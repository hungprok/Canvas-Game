/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


// let canvas;
// let ctx;
var image = new Image();
var imageObstatcle = new Image();
var imageObstatcle2 = new Image();



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// canvas = document.createElement("canvas");
// ctx = canvas.getContext("2d");
// canvas.width = 1600;
// canvas.height = 650; 
//document.body.appendChild(canvas);

// function setup() {
//     var canvas = createCanvas(100, 100);
// }


//canvas.parent('canvas-holder');

let bgReady, bgReady2, heroReady, monsterReady, imageObstatcleReady;
let bulletReady;
let bulletReady2;
let bulletReady3;
let bullet1Position;
let hero1Position;
let Obstacle3Ready;
let Obstacle3Image;
let imageObstatcle2Ready;
let iObstacle3;
let obtical3 = false;

let bgImage, bgImage2, heroImage, monsterImage;
let bulletImage;

let bulletImage2;
let bulletImage3;

let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;
let YouDieStatus;
let GameOverImage;
let bulletOrder = 1;
console.log(bulletOrder);

var AmountBullet = [{ BulletX: 10, BulletY: 10 }, { BulletX: 10, BulletY: 85 }, { BulletX: 10, BulletY: 160 }]
console.log(AmountBullet[0].BulletY);
console.log(AmountBullet[1]);
//console.log(AmountBullet[2].BulletX);

function loadImages() {

    image.onload = function() {
        let x = 0;
        let width = image.width;
        let min = 0 - width;
        let step = 1;
        var loop = function() {
            ctx.drawImage(image, x, 0);
            ctx.drawImage(image, x + width, 0);
            x -= step;
            if (x < min) {
                x = 0;
            }
        };
        setInterval(loop, 5);
    };
    image.src = "images/Background.jpg";

    heroImage = new Image();
    heroImage.onload = function() {
        // show the hero image
        heroReady = true;
    };
    heroImage.src = "images/Tank.gif";

    monsterImage = new Image();
    monsterImage.onload = function() {
        // show the monster image
        monsterReady = true;
    };
    monsterImage.src = "images/monster.png";

    imageObstatcle = new Image();
    imageObstatcle.onload = function() {
        // show the monster image
        imageObstatcleReady = true;
    };
    imageObstatcle.src = "images/Monster1.png";

    imageObstatcle2 = new Image();
    imageObstatcle2.onload = function() {
        // show the monster image
        imageObstatcle2Ready = true;
    };
    imageObstatcle2.src = "images/Monster2.png";

    Obstacle3Image = new Image();
    Obstacle3Image.onload = function() {
        // show the monster image
        Obstacle3Ready = true;
    };
    Obstacle3Image.src = "images/Monster3.png";

    bulletImage = new Image();
    bulletImage.onload = function() {
        // show the monster image
        bulletReady = true;
    };
    bulletImage.src = "images/bullet.gif";

    bulletImage2 = new Image();
    bulletImage2.onload = function() {
        // show the monster image
        bulletReady2 = true;
    };
    bulletImage2.src = "images/bullet.gif";

    GameOverImage = new Image();
    GameOverImage.onload = function() {
        // show the monster image
        GameOverReady = true;
    };
    GameOverImage.src = "images/GameOver.png";
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 *  
 * The same applies to the monster.
 */


//let monsterX = 100;
// let monsterY = 100;

let heroX = 50;
let heroY = 460;
let ObstacleX = 1600;
let ObstacleY = 400;
let Obstacle2X = 1300;
let Obstacle2Y = 200;
let Obstacle3X = 1600;
let Obstacle3Y = 430;
let Obstacle3Status = true;
let score = 0;
let bulletFire = false;
let bulletFire2 = false;
let bulletFire3 = false;
let obtical = false;

let GameOverTextReady = false
    /** 
     * Keyboard Listeners
     * You can safely ignore this part, for now. 
     * 
     * This is just to let JavaScript know when the user has pressed a key.
     */
const keysDown = {};
const keyPress = {}

function setupKeyboardListeners() {
    // Check for keys pressed where key represents the keycode captured
    // For now, do not worry too much about what's happening here. 
    addEventListener("keydown", function(key) {
        keysDown[key.keyCode] = true;
    }, false);

    addEventListener("keyup", function(key) {
        delete keysDown[key.keyCode];
    }, false);
}

/*var down = false;
document.addEventListener('keydown', function() {
    if (down) return;
    down = true;

    // your magic code here
}, false);

document.addEventListener('keyup', function() {
    down = false;
}, false); * /

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let time = 0;

function timecounting() {
    myTime = setInterval(() => {
            time += 1
        }, 1000) // every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}
timecounting();
let GameOver = function() {
    ObstacleX = ObstacleX;
    ObstacleY = ObstacleY;
    Obstacle2X = Obstacle2X;
    Obstacle2Y = Obstacle2Y;
    heroX = heroX;
    heroY = 460;
}
let reset = function() {
    heroX = 50;
    heroY = 460;
    ObstacleX = 1600;
    ObstacleY = 400;
    Obstacle2X = 1300;
    Obstacle2Y = 200;
}

let JumpToward = function() {
    heroY += 20;
}
let JumpToward2 = function() {

    heroY += 20;
}

let JumpBackward = function() {
    heroY += 20;
}

let JumpUp = function() {
    heroY += 20;
}

function timeOut() {
    clearInterval(myTime);
}

let yourScore = [{
        time,
        score,
    }]
    //

localStorage.setItem("yourScore", JSON.stringify(yourScore));
console.log(JSON.parse(localStorage.getItem("yourScore")));

let update = function() {
    //check if the hero died
    GameOverTextReady = false
    GameOverReady = false;
    //check bullet position
    bullet1Position = AmountBullet[0].BulletX - hero1Position;
    /////
    if ((heroX + 180 >= ObstacleX &&
            heroX + 180 <= ObstacleX + 150 && heroY + 86 >= ObstacleY) || (heroX + 180 >= Obstacle2X &&
            heroX + 180 <= Obstacle2X + 150 && heroY <= Obstacle2Y + 142) || (heroX + 180 >= Obstacle3X &&
            heroX + 180 <= Obstacle3X + 137 && heroY <= Obstacle3Y + 115))
    // && heroX >= ObstacleX &&
    // heroX <= ObstacleX + 150 &&
    // heroY + 86 >= ObstacleY &&
    // heroY + 86 <= ObstacleY + 150 &&
    // heroY >= ObstacleY &&
    // heroY <= ObstacleY + 150))
    {

        GameOverReady = true;
        GameOverTextReady = true;
        GameOver();
        console.log("Perform GameOver - Stop game");
        timeOut();
        yourScore.push(time, score);
        if (13 in keysDown) {
            time = 0;
            timecounting();
            reset();
            console.log("Perform Reset");
        }
    } else {
        if (13 in keysDown) {
            reset();
            console.log("Perform Reset");
        }
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);


        if (38 in keysDown && 39 in keysDown) { // Player is holding Up and Right key
            heroX += 5;
            setTimeout(JumpToward, 200);
            console.log("JumpToward");

        }

        if (38 in keysDown && 37 in keysDown) { // Player is holding Up and Left key

            heroX -= 5;

            setTimeout(JumpBackward, 200);
            console.log("Jump Backward");

        }

        if (38 in keysDown) { // Player is holding up key
            heroY -= 20;
            setTimeout(JumpUp, 200);
            console.log("Jump Straight");
            //setTimeout(delete keysDown[38], 10000);
        }

        if (heroY < 440) {
            hero = 440;
        }
        // if (40 in keysDown) { // Player is holding down key
        //     heroY += 5;
        // }
        if (37 in keysDown) { // Player is holding left key
            heroX -= 5;
            console.log("Move left");
        }
        if (39 in keysDown) { // Player is holding right key
            heroX += 5;
            console.log("Move right");
        }
        if (heroY > 460) {
            heroY = 460;
        }

        if (heroX < 0) {
            heroX = 0;
        }

        //Obstacle Movement
        ObstacleX -= 4;
        Obstacle2X -= 3.5;

        if (ObstacleX < -150) {
            ObstacleX = canvas.width;
            console.log("Obstacle 1 Perform Loop");
        }

        if (Obstacle2X < -150) {
            Obstacle2X = canvas.width;
            console.log("Obstacle 2 Perform Loop");
        }
        if (Obstacle3X < -150) {
            Obstacle3X = canvas.width;
            console.log("Obstacle 3 Perform Loop");
        }

        //Obstacle2 Movement
        if (Obstacle2Y < 50) {
            console.log("Obstacle 2 reach highest");
            obtical = true;
        } else if (Obstacle2Y > 400) {
            console.log("Obstacle 2 reach lowest");
            obtical = false;
        }
        if (obtical) {
            Obstacle2Y += 3
            console.log("Obstacle 2 Start Move Down");
        } else
        /*if (obtical = false)*/
        {
            Obstacle2Y -= 3
            console.log("Obstacle 2 Start Move Up");
        }

        //Obstacle 3 movement
        if (Obstacle3X < 500) {
            console.log("Obstacle 2 reach highest");
            obtical3 = true;
        } else if (Obstacle3X > 1400) {
            console.log("Obstacle 2 reach lowest");
            obtical3 = false;
        }
        if (obtical3) {
            Obstacle3X += 5
            console.log("Obstacle 2 Start Move Down");
        } else
        /*if (obtical = false)*/
        {
            Obstacle3X -= 5;
            console.log("Obstacle 2 Start Move Up");
        }


        //Tank shot bullet function

        if (32 in keysDown && AmountBullet[0].BulletX === 10) {
            bulletReady = true;
            AmountBullet[0].BulletY = heroY;
            AmountBullet[0].BulletX = heroX + 180;
            bulletFire = true;
            console.log("Start Shooting - Bullet Show up");
            hero1Position = heroX;

        }

        ////////////////////////////////////////////////////////////////////
        if (32 in keysDown && AmountBullet[1].BulletX === 10 && bullet1Position > 500) {
            bulletReady2 = true;
            AmountBullet[1].BulletY = heroY;
            AmountBullet[1].BulletX = heroX + 180;
            bulletFire2 = true;
            console.log("Start Shooting - Bullet Show up");
            setTimeout(bulletOrder += 1, 200);
        }
        //////////////////////////////////
        // else if (32 in keysDown && bulletOrder === 3 && AmountBullet[2].BulletX === 10) {
        //     bulletReady3 = true;
        //     AmountBullet[2].BulletY = heroY;
        //     AmountBullet[2].BulletX = heroX + 180;
        //     bulletFire3 = true;
        //     console.log("Start Shooting - Bullet Show up");
        //     setTimeout(bulletOrder += 1, 200);
        // }



        if (bulletFire) {
            AmountBullet[0].BulletX += 10;
            AmountBullet[0].BulletY = AmountBullet[0].BulletY;
            console.log("Bullet move");
        }

        ///////////////////////////

        if (bulletFire2) {
            AmountBullet[1].BulletX += 10;
            AmountBullet[1].BulletY = AmountBullet[1].BulletY;
            console.log("Bullet move");
        }

        // Check if player and monster collided. Our images are about 142 148 pixels big.


        if (
            AmountBullet[0].BulletX > ObstacleX && AmountBullet[0].BulletX < ObstacleX + 147 &&
            AmountBullet[0].BulletY > ObstacleY && (AmountBullet[0].BulletY + 50) < (ObstacleY + 148)
        ) {
            // Pick a new location for the monster.
            // Note: Change this to place the monster at a new, random location.
            ObstacleX = 1800;
            ObstacleY = 400;
            bulletFire = false;
            AmountBullet[0].BulletX = 10;
            AmountBullet[0].BulletY = 10;
            console.log("Bullet hit Obstacle 1");
            score += 1;

        };

        if (
            AmountBullet[0].BulletX > Obstacle2X && AmountBullet[0].BulletY > Obstacle2Y && (AmountBullet[0].BulletY + 50) < (Obstacle2Y + 142)
        ) {
            // Pick a new location for the monster.
            // Note: Change this to place the monster at a new, random location.
            Obstacle2X = -151;
            Obstacle2Y = 200;
            AmountBullet[0].BulletX = 10;
            AmountBullet[0].BulletY = 10;
            bulletFire = false;
            score += 1;
        };

        if (
            AmountBullet[0].BulletX > Obstacle3X && AmountBullet[0].BulletX < Obstacle3X + 137 &&
            AmountBullet[0].BulletY > Obstacle3Y && (AmountBullet[0].BulletY + 50) < (Obstacle3Y + 115)
        ) {
            // Pick a new location for the monster.
            // Note: Change this to place the monster at a new, random location.
            Obstacle3X = 1600;
            Obstacle3Y = 430;
            bulletFire = false;
            AmountBullet[0].BulletX = 10;
            AmountBullet[0].BulletY = 10;
            console.log("Bullet hit Obstacle 3");
            score += 1;

        };

        if (
            AmountBullet[1].BulletX > ObstacleX && AmountBullet[1].BulletX < ObstacleX + 147 &&
            AmountBullet[1].BulletY > ObstacleY && (AmountBullet[1].BulletY + 50) < (ObstacleY + 148)
        ) {
            // Pick a new location for the monster.
            // Note: Change this to place the monster at a new, random location.
            ObstacleX = 1800;
            ObstacleY = 400;
            bulletFire2 = false;
            AmountBullet[1].BulletX = 10;
            AmountBullet[1].BulletY = 85;
            console.log("Bullet hit Obstacle 1");
            score += 1;

        };

        if (
            AmountBullet[1].BulletX > Obstacle2X && AmountBullet[1].BulletY > Obstacle2Y && (AmountBullet[1].BulletY + 50) < (Obstacle2Y + 142)
        ) {
            // Pick a new location for the monster.
            // Note: Change this to place the monster at a new, random location.
            Obstacle2X = -151;
            Obstacle2Y = 200;
            AmountBullet[1].BulletX = 10;
            AmountBullet[1].BulletY = 10;
            bulletFire2 = false;
            score += 1;
        };

        if (
            AmountBullet[1].BulletX > Obstacle3X && AmountBullet[1].BulletX < Obstacle3X + 137 &&
            AmountBullet[1].BulletY > Obstacle3Y && (AmountBullet[1].BulletY + 50) < (Obstacle3Y + 115)
        ) {
            // Pick a new location for the monster.
            // Note: Change this to place the monster at a new, random location.
            Obstacle3X = 1600;
            Obstacle3Y = 430;
            bulletFire2 = false;
            AmountBullet[1].BulletX = 10;
            AmountBullet[1].BulletY = 85;
            console.log("Bullet hit Obstacle 3");
            score += 1;

        };


        if (AmountBullet[0].BulletX > canvas.width) {
            AmountBullet[0].BulletX = 10;
            AmountBullet[0].BulletY = 10;
            bulletFire = false;

        }
        if (AmountBullet[1].BulletX > canvas.width) {
            AmountBullet[1].BulletX = 10;
            AmountBullet[1].BulletY = 85;
            bulletFire2 = false;

        }
    }
}

/**
 * This function, render, runs as often as possible.
 */

let GameOverText = "PRESS ENTER TO PLAY AGAIN!"
ctx.font = "28px Ariel bolder";

var render = function() {
    /*  if (bgReady) {
        ctx.drawImage(bgImage, backgroundX, 0);
    }

    if (bgReady2) {
    ctx.drawImage(bgImage2, background2X, 0);
// }*/

    if (imageObstatcleReady) {
        ctx.drawImage(imageObstatcle, ObstacleX, ObstacleY);
    }
    if (imageObstatcle2Ready) {
        ctx.drawImage(imageObstatcle2, Obstacle2X, Obstacle2Y);
    }
    if (Obstacle3Ready) {
        ctx.drawImage(Obstacle3Image, Obstacle3X, Obstacle3Y);
    }
    if (bulletReady) {
        ctx.drawImage(bulletImage, AmountBullet[0].BulletX,
            AmountBullet[0].BulletY);
    }
    if (bulletReady2) {
        ctx.drawImage(bulletImage2, AmountBullet[1].BulletX,
            AmountBullet[1].BulletY);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, heroX, heroY);
    }
    if (GameOverReady) {
        ctx.drawImage(GameOverImage, 544, 140); //544,140
    }
    if (GameOverTextReady) {
        ctx.fillText(GameOverText, 600, 120);
    }
    //ctx.fillText(`Time Passed: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
    ctx.fillText(`TIME PASSED: ${time}`, 100, 50);
    ctx.fillText(`SCORED: ${score}`, 100, 125);
    // ctx.strokeStyle = "#0000ff";
    // ctx.strokeRect(0, 0, 1600, 650);
};




/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function() {
    update();
    render();
    // Request to do this again ASAP. This is a special method
    // for web browsers. 
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();