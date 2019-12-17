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
        this.icons[0] = new Icon(new Vector(0, 200), new Vector(0, 0), this.game.ctx, './assets/icons/DEZEPC.png', 1, 1, 1.4)
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4)
        this.icons[2] = new Icon(new Vector(1450, 200), new Vector(0, 0), this.game.ctx, './assets/icons/bugFile.png', 1, 1, 0.3)
        this.programs[0] = new Program(new Vector(100, 400), new Vector(0, 0), this.game.ctx, './assets/windows/DEZEPC.png', 1, 1, 0.5, 0);
        this.programs[1] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, './assets/windows/Spotify.png', 1, 1, 0.6, 0);
        this.programs[1].hasAds = true;
        this.programs[2] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0); // workaround, anders crashed de game als je op de bug file klikt
    }

    public draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.nextLevel();
    }

    public nextLevel() {
        let player = this.player.box();

        // bugFile collision
        let file = this.icons[2].box(); // Glooole
        if (this.collides(file, player)) {
            this.game.switchScreen(new Level3(this.game)); // WIP => next level
        }
    }
}