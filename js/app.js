        var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
        var paddleOne; 
        var paddleTwo; 
        var ball; 
        var ballLaunched; 
        var ballVelocity; 

        function preload() {
            game.load.image('paddle', 'assets/paddle.png'); 
            game.load.image('ball', 'assets/ball.png'); 
        }

        function create() {
            ballLaunched = false; 
            ballVelocity = 400; 

            paddleOne = createPaddle(0, game.world.centerY);
            paddleTwo = createPaddle(game.world.width - 16, game.world.centerY);
            ball = createBall(game.world.centerX, game.world.centerY); 

            game.input.onDown.add(launchBall, this);  
        }

        function update() {
            controlPaddle(paddleOne, game.input.y); 
            game.physics.arcade.collide(paddleOne, ball); 
            game.physics.arcade.collide(paddleTwo, ball); 

            if (ball.body.blocked.left) {
                console.log('Player 2 Scores!');
            } else if (ball.body.blocked.right) {
                console.log('Player 1 Scores'); 
            }

        }

        function createPaddle(x,y) {
            var paddle = game.add.sprite(x, y, 'paddle'); 
            paddle.anchor.setTo(0.5,0.5); 
            game.physics.arcade.enable(paddle); 
            paddle.body.collideWorldBounds = true; 
            paddle.body.immovable = true; 

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
