// useful to have them as global variables
var canvas, ctx, w, h;
var mousePos;

// an empty array!
var balls = [];
var initialNumberOfBalls;
var globalSpeedMultiplier = 0.2;
var colorToEat = 'red';
var goodBallsEaten = 0;
var wrongBallsEaten = 0; 
var numberOfGoodBalls;
let level = 1;
let nbVies = 3;
let score = 0;
let gameState = 'Start Game';

var player = {
    x: 10,
    y: 10,
    width: 20,
    height: 20,
    color: 'red'
}

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    w = canvas.width;
    h = canvas.height;

    // important, we will draw with this object
    ctx = canvas.getContext('2d');
    var my_gradient = ctx.createLinearGradient(0, 0, 0, 100);
    my_gradient.addColorStop(0, "magenta");
    my_gradient.addColorStop(1, "purple");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, w, h);
    // start game with 10 balls, balls to eat = red balls
    startGame(level);
    

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);

    // add event listener to the window for starting the game with and for fire balls
    window.addEventListener('keydown', traiteToucheEnfoncee);


    // ready to go !
    mainLoop();
};

function traiteToucheEnfoncee(evt) {
    console.log(evt.key);
    if (evt.key === ' ') {
        if (gameState == 'Start Game' || gameState == 'Game Over' || gameState == 'PLAYING') {
            gameState = 'PLAYING';
            
            level = 1;
            score = 0;
            nbVies = 3;
            globalSpeedMultiplier = 0.2;
            startGame(level);
        }
    }
    if (evt.key === 13) {
        drawFireBall(evt);
    }
}


function startGame(level) {
    let nb = level + 1;

    do {
        balls = createBalls(nb);
        initialNumberOfBalls = nb;
        numberOfGoodBalls = countNumberOfGoodBalls(balls, colorToEat);
    } while (numberOfGoodBalls === 0);

    wrongBallsEaten = goodBallsEaten = 0;
    nbVies = 3;
}

function countNumberOfGoodBalls(balls, colorToEat) {
    var nb = 0;

    balls.forEach(function (b) {
        if (b.color === colorToEat)
            nb++;
    });

    return nb;
}

function changeNbBalls(nb) {
    startGame(nb);
}

function changeColorToEat(color) {
    colorToEat = color;
}

function changePlayerColor(color) {
    player.color = color;
}

function changeBallSpeed(coef) {
    globalSpeedMultiplier = coef;
}

function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function movePlayerWithMouse() {
    if (mousePos !== undefined) {
        player.x = mousePos.x;
        player.y = mousePos.y;
    }
}

function mainLoop() {
    // 1 - clear the canvas
    ctx.clearRect(0, 0, w, h);

    switch(gameState){
        case 'PLAYING':
            
            //Proposition to restart game 
            ctx.font = "20px Arial";
            ctx.fillText("Press <SPACE> to restart game" , 30, 90);

            //warning nb of eaten balls to loose  
            ctx.font = "30px Arial";
            ctx.fillText("Warning" , 30, 110+Math.random()*10);
            ctx.font = "25px Arial";
            ctx.fillText(nbVies+" bad balls eaten and you're done!" , 150, 115);

            // draw the ball and the player
            drawPlayer(player);
            drawAllBalls(balls);
            drawInfosTextuelles(balls);

            //draw the obstacles
            if(level>=3){
                drawObstacle(400,200,400,50);
            }
            if(level>=4){
                drawObstacle(90,500,50,500);
            }
            if(level>=5){
                drawObstacle(500,500,200,50);
            }
            if(level>=6){
                drawObstacle(100,180,50,80);
            }

            // animate the ball that is bouncing all over the walls
            moveAllBalls(balls);

            movePlayerWithMouse();
            break;
    
        case 'Start Game':
            ctx.font = "100px Arial";
            ctx.fillText("Start Game" , 140, 350+Math.random()*10);
            ctx.font = "50px Arial";
            ctx.fillText("Press <SPACE> to start game" , 100, 400);
            break;

    
        case 'Game Over':
            ctx.font = "100px Arial";
            ctx.fillText("Game Over!" , 140, 350+Math.random()*30);
            ctx.font = "50px Arial";
            ctx.fillText("Press <SPACE> to start again" , 100, 400);
            break;
    

        default:
            console.log('Sorry, wrong ${gameState}.');

    }
    // ask the browser to call mainloop in 1/60 of  for a new animation frame
    requestAnimationFrame(mainLoop);
}

// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

function createBalls(n) {
    // empty array
    var ballArray = [];

    // create n balls
    for (var i = 0; i < n; i++) {
        var b = {
            x: w / 2,
            y: h / 2,
            radius: 5 + 30 * Math.random(), // between 5 and 35
            speedX: -5 + 10 * Math.random(), // between -5 and + 5
            speedY: -5 + 10 * Math.random(), // between -5 and + 5
            color: getARandomColor(),
        }
        // add ball b to the array

        ballArray.push(b);
    }
    // returns the array full of randomly created balls
    return ballArray;
}

function getARandomColor() {
    var colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
    // a value between 0 and color.length-1
    // Math.round = rounded value
    // Math.random() a value between 0 and 1
    var colorIndex = Math.round((colors.length - 1) * Math.random());
    var c = colors[colorIndex];

    // return the random color
    return c;
}

function drawInfosTextuelles(balls) {
    ctx.save();
    ctx.font = "20px Arial";

    if (nbVies <= 0) {
        // on a perdu
        gameState = 'Game Over';
    } else if (goodBallsEaten === numberOfGoodBalls) {
        // On a gagné, on a mangé toutes les bonnes balles
        ctx.fillText("You Win! Final score : " + (initialNumberOfBalls - wrongBallsEaten),
            20, 30);
        // on change de niveau
        passerAuNiveauSuivant()
    } else {
        // On est en train de jouer....
        ctx.fillText("Balls still alive: " + balls.length, 30, 30);
        ctx.fillText("Good Balls eaten: " + goodBallsEaten, 30, 50);
        ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 30, 70);
        ctx.fillText("Level: " + level, w-90, 20);
        ctx.fillText("Vies: " + nbVies, w-90, 40);
        ctx.fillText("Score: " + score, w-90, 60);
    }
    ctx.restore();
}

function passerAuNiveauSuivant() {
    level++;
    globalSpeedMultiplier += 0.2;
    startGame(level);
}

function drawAllBalls(ballArray) {
    ballArray.forEach(function (b) {
        drawFilledCircle(b);
    });
}

function moveAllBalls(ballArray) {
    // iterate on all balls in array
    balls.forEach(function (b, index) {
        // b is the current ball in the array
        b.x += (b.speedX * globalSpeedMultiplier);
        b.y += (b.speedY * globalSpeedMultiplier);

        switch(b.color){

            case 'red':
                b.x += (b.speedX * globalSpeedMultiplier);
                b.y += (b.speedY * globalSpeedMultiplier);
                break;
            
            case 'yellow':
                b.speedX *= .99;
                b.speedY += .25;
                break;
            
            case 'purple':
                b.speedX *= .50;
                b.speedY += .25;
                break;

            case 'green':
                if(b.radius<100){
                    b.radius += 1;
                }
                else if(b.radius>=100){
                    b.radius -= 90;
                }
                break;

            case 'blue':
                if(b.radius>5){
                    b.radius -= 1;
                }
                else if(b.radius=5){
                    b.radius += 90;
                }
                break;

            
        }

        testCollisionBallWithWalls(b);

        testCollisionWithPlayer(b, index);
    });
}

function testCollisionWithPlayer(b, index) {
    if (circRectsOverlap(player.x, player.y,
        player.width, player.height,
        b.x, b.y, b.radius)) {
        // we remove the element located at index
        // from the balls array
        // splice: first parameter = starting index
        //         second parameter = number of elements to remove
        if (b.color === colorToEat) {
            // Yes, we remove it and increment the score
            goodBallsEaten += 1;
            score += 10;
        } else {
            wrongBallsEaten += 1;
            nbVies = nbVies - 1;
        }

        balls.splice(index, 1);

    }
}

function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS ?
    if ((b.x + b.radius) > w) {
        // the ball hit the right wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
        b.x = w - b.radius;
    } else if ((b.x - b.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
        b.x = b.radius;
    }

    // COLLISIONS WTH HORIZONTAL WALLS ?
    // Not in the else as the ball can touch both
    // vertical and horizontal walls in corners
    if ((b.y + b.radius) > h) {
        // the ball hit the right wall
        // change horizontal direction
        b.speedY = -b.speedY;

        // put the ball at the collision point
        b.y = h - b.radius;
    } else if ((b.y - b.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        b.speedY = -b.speedY;

        // put the ball at the collision point
        b.Y = b.radius;
    }
}

function drawObstacle(x,y,w,h) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    //ctx.translate(x, y);

    ctx.fillStyle = 'black';
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(x, y, w, h);

    // GOOD practice: restore the context
    ctx.restore();
}

//function to draw obstacles randomly 
function drawFilledCircle(c) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(c.x, c.y);

    ctx.fillStyle = c.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, c.radius, 0, 2 * Math.PI);
    ctx.fill();

    // GOOD practice: restore the context
    ctx.restore();
}

//for the player I've decided to draw it as a Star 
function drawPlayer(p){
    var spikes=12;
    var outerRadius=30;
    var innerRadius=15;

    var rot=Math.PI/2*3;
    var x=p.x;
    var y=p.y;
    var step=Math.PI/spikes;
    

    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(p.x,p.y-outerRadius)
    for(i=0;i<spikes;i++){
      x=p.x+Math.cos(rot)*outerRadius;
      y=p.y+Math.sin(rot)*outerRadius;
      ctx.lineTo(x,y)
      rot+=step

      x=p.x+Math.cos(rot)*innerRadius;
      y=p.y+Math.sin(rot)*innerRadius;
      ctx.lineTo(x,y)
      rot+=step
    }
    ctx.lineTo(p.x,p.y-outerRadius);
    ctx.closePath();

    ctx.lineWidth=5;
    ctx.strokeStyle='purple';
    ctx.stroke();
    ctx.fillStyle='fuchsia';
    ctx.fill();

    // GOOD practice: restore the context
    ctx.restore();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


function drawFireBall(evt){
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    x,y = getMousePos(ctx, evt);

    // translate the coordinate system, draw relative to it
    ctx.translate(x, y);

    ctx.fillStyle = 'orange';
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, 2 * Math.PI);
    ctx.fill();

    // GOOD practice: restore the context
    ctx.restore();
}





