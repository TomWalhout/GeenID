/// <reference path="LevelScreen.ts"/>

class Level2 extends LevelScreen {

    /**
     * Contructes the third level
     * 
     * @param game the game
     */
    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.programs[0] = new Program(new Vector(293, 479), new Vector(0, 0), this.game.ctx, './transparentBreed.png', 1, 1, 1, 0);
        this.programs[0].isOpen = true;
        this.ads[0] = new Ad (new Vector(this.randomNumber(0, 768), this.randomNumber(0, 1366)), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/ad1.png', 1, 1, 1)
        this.ads[0].isOpen = true;

        document.body.style.backgroundImage = "url('./assets/programs/GloooleLevel.png')";
        }

    public draw() {
        super.draw(this.game.ctx);
        this.ads[0].update();
        this.closeAds();
        }
}