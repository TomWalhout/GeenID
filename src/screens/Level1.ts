/// <reference path="LevelScreen.ts"/>

class Level1 extends LevelScreen {
    // ONLY OBJECTS NOT PRESENT IN EVERY LEVEL
    // PLAYER, PLATFORMS, ICONS SHOULD NOT BE DECLARED HERE
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
        this.icons[0] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4, 0)
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4, 1);
        this.programs[0] = new Program(new Vector(100, 20), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.7, 0);
        this.programs[1] = new Program(new Vector(400, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 1);
        this.programs[1].isOpen = false;
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 120, this.game.canvas.height - 100), new Vector(0, 0), this.game.ctx, './assets/urawizardgandalf.png', 6, 20, 1);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 380, this.game.canvas.height - 350), new Vector(0, 0), this.game.ctx, './assets/textbox.png', 1, 1, 0.5);
    }

    public draw() {
        this.updateOtherThings();
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.storyCheck();
    }

    private storyCheck() {
        //Checks for story beat
        let player = this.player.box();
        let wiz = this.wizard.box();
        if (this.collides(player, wiz) && this.story < 1) {
            this.story = this.story + 1;
        }

        // Checks if the level is done (IE collide with glooole)
        let Glooole = this.icons[1].box(); // Glooole
        if (this.collides(Glooole, player)) {
            this.game.switchScreen(new Level2(this.game));
        }
    }

    private updateOtherThings() {
        this.wizard.update();

        // if we've reached the wizard
        if (this.story > 0) {
            this.textbox.update();
        }
    }

}