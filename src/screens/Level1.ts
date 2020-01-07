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
        this.icons[2] = new Icon(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/icons/pijl.png', 5, 10, 1.4, 1);
        this.programs[0] = new Program(new Vector(400, 500), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.7, 0);
        this.programs[1] = new Program(new Vector(100, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.4, 1);
        this.programs[1].isOpen = false;
        this.programs[2] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0); // workaround, anders crashed de game als je op de bug file klikt
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 275, this.game.canvas.height - 150), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 1);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 500, this.game.canvas.height - 310), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
    }

    public draw() {
        this.updateOtherThings();
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.storyCheck();

        if (this.story >= 1) {
            this.multilineText(this.game.ctx, 'Squary!\nKlik op de icoontjes\nJe kan springen\nop de programmas', 1000, 500); //1200 en 500
        } 
        super.draw(this.game.ctx);
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
        // this.writeTextToCanvas(this.game.ctx, this.game.playername, 10, new Vector(900, 100), "center", "black")
        // if we've reached the wizard
        if (this.story > 0) {
            this.textbox.update();
        }
    }
}