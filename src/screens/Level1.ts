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
        this.icons[0] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4, 1)
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4, 1);
        this.icons[2] = new Icon(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/icons/pijl.png', 5, 10, 1.4, 1);
        this.programs[0] = new Program(new Vector(400, 500), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.7, 0);
        this.programs[1] = new Program(new Vector(100, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.4, 1);
        // this.programs[0].isOpen = false;
        // this.programs[1].isOpen = false;
        this.programs[2] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0); // workaround, anders crashed de game als je op de bug file klikt
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 275, this.game.canvas.height - 150), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 1);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 500, this.game.canvas.height - 310), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.story = 0;
    }

    public draw() {
        this.updateOtherThings();
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.storyCheck();
        this.storyText();
        // console.log(this.story);

        super.draw(this.game.ctx);
    }

    private storyCheck() {
        //Checks for story beat
        let player = this.player.box();
        let wiz = this.wizard.box();
        if (this.collides(player, wiz) && this.story < 1) {
            this.story = this.story + 1;
        }if (this.programs[1].isOpen) {
            this.story = 2;
        }if (this.programs[0].isOpen && this.programs[1].isOpen) {
            this.story = 3;
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

    public storyText() {
        if (this.story == 1) {
            this.multilineText(this.game.ctx, `Welkom ${this.game.playerinfo[0]}!\nLaten we de wonderen\nvan het internet bekijken.\nKlik op de het gloole icoon.\n`, 1000, 500); //1200 en 500
            // console.log(this.story);
        } else if (this.story == 2) {
            this.multilineText(this.game.ctx, 'Perfect!\nKlik nu op Fort.', 1000, 500); 
            this.icons[2].pos.y = 0;
            // console.log(this.story);
        } else if (this.story == 3) {
            this.multilineText(this.game.ctx, 'Spring nu naar\nhet Glooole programma', 1000, 400); 
            this.textbox = new GameObject(new Vector(this.game.canvas.width - 500, this.game.canvas.height - 420), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
            this.icons[2].pos.y = 100;
            // console.log(this.story);
        }
    }
}