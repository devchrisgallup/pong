var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var paddleOne; 
var paddleTwo; 
var aiFlag = true; 
var ball; 
var scoreOne; 
var scoreTwo; 
var one = 0; 
var two = 0; 
var ballLaunched; 
var ballVelocity; 

function preload() {
    game.load.image('paddle', 'assets/paddle.png'); 
    game.load.image('ball', 'assets/ball.png'); 
}

function create() {
    ballLaunched = false; 
    ballVelocity = 600; 

    paddleOne = createPaddle(0, game.world.centerY);
    paddleTwo = createPaddle(game.world.width - 8, game.world.centerY);
    ball = createBall(game.world.centerX, game.world.centerY); 

    game.input.onDown.add(launchBall, this);  

    scoreOne = game.add.text((this.game.width / 2) - 150,this.game.height - 35,"", {font: '32px Arial', fill:  '#fff'});
    scoreTwo = game.add.text(this.game.width / 2,this.game.height - 35,"", {font: '32px Arial', fill:  '#fff'}); 
}

function update() {
    scoreOne.text = "One " + one; 
    scoreTwo.text = "Two " + two; 
    
    controlPaddle(paddleOne, game.input.y); 
    game.physics.arcade.collide(paddleOne, ball); 
    game.physics.arcade.collide(paddleTwo, ball); 


    if (ball.body.blocked.left) {
        two++; 
    } else if (ball.body.blocked.right) {
        one++; 
    }


    if (ball.x < this.game.width / 2) {
        paddleTwo.body.velocity.setTo(ball.body.velocity.y);
        paddleTwo.body.velocity.x = 0; 
        paddleTwo.body.maxVelocity.y = 105; 
    } else {
        paddleTwo.body.velocity.setTo(ball.body.velocity.y);
        paddleTwo.body.velocity.x = 0; 
        paddleTwo.body.maxVelocity.y = 350;
    }

}

function createPaddle(x,y) {
    var paddle = game.add.sprite(x, y, 'paddle'); 
    paddle.anchor.setTo(0.5,0.5); 
    game.physics.arcade.enable(paddle); 
    paddle.body.collideWorldBounds = true; 
    paddle.body.immovable = true; 
    paddle.scale.setTo(0.5,0.5); 

    return paddle; 
}

function controlPaddle(paddle, y) {
    paddle.y = y; 

    if (paddle.y < paddle.height / 2) {
        paddle.y = paddle.height / 2; 
    } else if (paddle.y > game.world.height - paddle.height / 2) {
        paddle.y = game.world.height - paddle.height / 2; 
    }
}

function createBall(x,y) {
    var ball = game.add.sprite(x, y, 'ball');
    ball.anchor.setTo(0.5,0.5); 
    game.physics.arcade.enable(ball); 
    ball.body.collideWorldBounds = true; 
    ball.body.bounce.setTo(1,1); 

    return ball; 
}

function launchBall() {
    if (ballLaunched) {
        ball.x = game.world.centerX; 
        ball.y = game.world.centerY; 
        ball.body.velocity.setTo(0,0);
        ballLaunched = false;

    } else {
        ball.body.velocity.x = ballVelocity; 
        ball.body.velocity.y = ballVelocity; 
        ballLaunched = true;
    }
}