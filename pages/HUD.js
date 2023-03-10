class HUD {
    constructor(game) {
        this.game = game;

        this.hudBB = new BoundingBox(0, 0, 700, 40);
        this.mouseBB = new BoundingBox(0,0,1,1);
        this.resetBB = new BoundingBox(10,10,100,22);
        this.howToPlayBB = new BoundingBox(PARAMS.CANVAS_WIDTH - 210,10,200,22);
    };

    update() {
        // update if user clicks
        if (this.game.click && this.mouseBB.collide(this.hudBB)) {
            console.log("HUD " + this.game.click);
            // update mouse location
            this.mouseBB = new BoundingBox(this.game.click.x, this.game.click.y,1,1);

            // restart game
            if (this.mouseBB.collide(this.resetBB)) {
                this.game.camera.loadLevel(titleScreen);
            }

            else if (this.mouseBB.collide(this.howToPlayBB)) {
                let howToPlay = new HowToPlay(this.game);
                this.game.addEntityToTop(howToPlay);
            }
            // reset user click
            this.game.click = null;
        }
        // update mouse movement
        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y,1,1);
        }
    };

    draw(ctx) {
        setCustomStroke(ctx, "black");
        ctx.lineWidth = 4;
        ctx.textAlign = "center";
        ctx.font = '15px "Press Start 2P"';

        // HUD box
        ctx.strokeRect(0, 0, 700, 40);

        // reset game
        if (this.mouseBB.collide(this.resetBB)) {
            setRainbowStroke(ctx, this.resetBB, true);
        }
        ctx.fillText("Reset", 60, 28);
        ctx.strokeRect(this.resetBB.left, this.resetBB.top, this.resetBB.width, this.resetBB.height);

        setCustomStroke(ctx, "black");

        // how to play game
        if (this.mouseBB.collide(this.howToPlayBB)) {
            setRainbowStroke(ctx, this.howToPlayBB, true);
        }
        ctx.fillText("How To Play", PARAMS.CANVAS_WIDTH - 110, 28);
        ctx.strokeRect(this.howToPlayBB.left, this.howToPlayBB.top, this.howToPlayBB.width, this.howToPlayBB.height);
    };
}