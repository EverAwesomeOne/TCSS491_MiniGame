class EndGameScreen {
    constructor(game, win) {
        this.game = game;

        // boolean to determine win or lose screen
        this.win = win;
    
        // bounding boxes
        this.mouseBB = new BoundingBox(0, 0, 1, 1);
        this.restartBB = new BoundingBox((720 / 2) - 115, (720 / 2) - 65, 190, 70);
    };

    update() {
        // update if user clicked
        if (this.game.click) {
            // update mouse location
            this.mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            // restart game
            if (this.mouseBB.collide(this.restartBB)) {
                this.game.camera.loadLevel(titleScreen);
            }
            // reset user click
            this.game.click = null;
        }

        // update mouse movement
        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
        }
    };

    draw(ctx) {

        setBlackStroke(ctx);
        ctx.lineWidth = 6;
        ctx.textAlign = "center";

        //title
        ctx.font = "Bold 60px Courier";
        if (this.win) {
            ctx.fillText("You Win!", PARAMS.CANVAS_WIDTH / 2, 160);
        } else {
            ctx.fillText("Oops! Dino Down.", PARAMS.CANVAS_WIDTH / 2, 160);
        }

        ctx.font = "Bold 35px Courier";
        setBlackStroke(ctx);

        //restart
        if (this.mouseBB.collide(this.restartBB)) {
            setRainbowStroke(ctx, this.restartBB);
        }
        ctx.fillText("RESTART", PARAMS.CANVAS_WIDTH / 2, PARAMS.CANVAS_HEIGHT / 2);
        ctx.strokeRect(this.restartBB.left, this.restartBB.top, this.restartBB.width, this.restartBB.height);
    };
};