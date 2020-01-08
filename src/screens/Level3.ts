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
        this.icons[2] = new Icon(new Vector(1250, 200), new Vector(0, 0), this.game.ctx, './assets/icons/bugFile.png', 1, 1, 1.4)
        this.programs[0] = new Program(new Vector(0, 500), new Vector(0, 0), this.game.ctx, './assets/windows/DEZEPC.png', 1, 1, 0.5, 0);
        this.programs[1] = new Program(new Vector(700, 300), new Vector(0, 0), this.game.ctx, './assets/windows/Spotify.png', 1, 1, 0.6, 0);
        this.programs[1].hasAds = true;
        this.programs[2] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0); // workaround, anders crashed de game als je op de bug file klikt

        this.wizard = new Wizard(new Vector(this.game.canvas.width - 850, this.game.canvas.height - 550), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 10, 1);
        this.textbox = new GameObject(new Vector(275, 55), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.story = 0;
    }

    public draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.textbox.update();
        this.nextLevel();
        this.storyCheck();
        this.storyText();
        this.wizard.update();
        // console.log(this.story);
    }

    private updateOtherThings() {
        this.wizard.update();
        // this.writeTextToCanvas(this.game.ctx, this.game.playername, 10, new Vector(900, 100), "center", "black")
        // if we've reached the wizard
        if (this.story > 0) {
            this.textbox.update();
        }
    }

    public nextLevel() {
        let player = this.player.box();

        // bugFile collision
        let file = this.icons[2].box(); // Glooole
        if (this.collides(file, player)) {
            this.game.switchScreen(new Level4(this.game));
        }
    }

    private storyCheck() {
        //Checks for story beat

        if (this.story < 1) {
            this.story = this.story + 1;
        }
    }

    public storyText() {

        if (this.story == 1) {
            this.multilineText(this.game.ctx, `W-Wacht! ${this.game.playerinfo[0]}!\nDat i-is een bug file\nIk denk dat we gehackt zijn\nWat je ook doet...\nGA NIET NAAR DE BUGFILE\n`, 400, 90); //1200 en 500
            // console.log(this.story);
        }
    }
}