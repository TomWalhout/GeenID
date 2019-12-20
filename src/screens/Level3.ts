/// <reference path="LevelScreen.ts"/>

class Level3 extends LevelScreen {

    private wizard: Wizard; 
    private textbox: GameObject;
    /**
     * Contructes the second level
     * 
     * @param game the game
     */
    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.icons[0] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/DEZEPC.png', 1, 1, 1.4)
        this.icons[1] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4)
        this.icons[2] = new Icon(new Vector(1450, 200), new Vector(0, 0), this.game.ctx, './assets/icons/bugFile.png', 1, 1, 0.3)
        this.programs[0] = new Program(new Vector(100, 500), new Vector(0, 0), this.game.ctx, './assets/windows/DEZEPC.png', 1, 1, 0.5, 0);
        this.programs[1] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, './assets/windows/Spotify.png', 1, 1, 0.6, 0);
        this.programs[1].hasAds = true;
        this.programs[2] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0); // workaround, anders crashed de game als je op de bug file klikt

        this.wizard = new Wizard(new Vector(this.game.canvas.width - 1000, this.game.canvas.height - 550), new Vector(0, 0), this.game.ctx, './assets/urawizardgandalf.png', 6, 10, 1);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 1300, this.game.canvas.height - 700), new Vector(0, 0), this.game.ctx, './assets/textbox2.png', 1, 1, 1.5);
    }

    public draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.nextLevel();
        this.wizard.update();
        this.textbox.update();
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