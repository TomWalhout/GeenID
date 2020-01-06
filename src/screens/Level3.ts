/// <reference path="LevelScreen.ts"/>

class Level3 extends LevelScreen {

    /**
     * Contructes the third level
     * 
     * @param game the game
     */
    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.programs[0] = new Program(new Vector(300, 480), new Vector(0, 0), this.game.ctx, './transparentBreed.png', 1, 1, 1, 0);
        document.body.style.backgroundImage = "url('./assets/Glooole-bg.png')";
        this.programs[0].isOpen = true;
        this.programs[0].hasAds = true;
        this.ads[0] = new Ad(new Vector(300, 300), new Vector(0, 0), this.game.ctx, './assets/ad1.png', 1, 1, 1);
    }

    public draw() {
        this.programs[0].drawBox();
        super.draw(this.game.ctx);
    }
}