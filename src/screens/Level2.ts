/// <reference path="LevelScreen.ts"/>

class Level2 extends LevelScreen {
    /**
     * Contructes the second level
     * 
     * @param game the game
     */
    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.icons[0] = new Icon(new Vector(0, 200), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4)
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4)
        this.programs[0] = new Program(new Vector(100, 20), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.7, 0);
        this.programs[1] = new Program(new Vector(400, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 0);
        this.programs[1].hasAds = true;
    }

    public draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
    }

}