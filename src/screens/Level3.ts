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
        this.programs[0] = new Program(new Vector(343, 518), new Vector(0, 0), this.game.ctx, './transparentBreed.png', 1, 1, 1, 0);
        document.body.style.backgroundImage = "url('./assets/programs/Glooole.png')";
        this.programs[0].isOpen = true;
        }

    public draw() {
        super.draw(this.game.ctx);
        this.collide();
    }
}