/// <reference path="GameScreen.ts"/>

class Level1 extends GameScreen {
    /**
     *  Squary,
     * wizard,
     * pop-up die al bestaat,
     * 2 icons
     * textbox?
     * ID
     * */
    private player: Player;
    private wizard: any;
    private openPrograms: Array<Program>;
    private openAds: Array<Ad>
    private icons: Array<Icon>;
    private storyFlag: number;
    private id: IDcard;
    private textbox: GameObject;

    public constructor(game: Game) {
        super(game);
        this.id = new IDcard(new Vector(this.game.canvas.width, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard.png', 1, 1, 1.5, game);
        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, './assets/Squary.png', 1, 1, 1);
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 120, this.game.canvas.height - 100), new Vector(0, 0), this.game.ctx, './assets/urawizardgandalf.png', 6, 20, 1);
        this.storyFlag = 0;
        this.openPrograms = [];
        this.openPrograms[0] = new Program(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.5, 0);
        this.openPrograms[1] = new Program(new Vector(300, 400), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 1);
        this.openPrograms[1].isOpen = false;
        this.icons = [];
        this.icons[0] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4);
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/Gloole.png', 1, 1, 1.4);
        this.icons[2] = new Icon(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/icons/pijl.png', 1, 1, 0.8);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 380, this.game.canvas.height - 350), new Vector(0, 0), this.game.ctx, './assets/textbox.png', 1, 1, 0.5);
    }

    public draw() {
        console.log(this.storyFlag);
        this.id.update();
        this.wizard.update();
        for (let i = 0; i < this.openPrograms.length; i++) {
            if (i <= this.storyFlag) {
                if (this.openPrograms[i].isOpen) {
                    this.openPrograms[i].update();
                }
                this.icons[i].update();
            }
        }
        if (this.storyFlag > 0) {
            this.textbox.update();
            this.icons[2].update();
        }
        this.player.update();
    }


    public collide() {
        //Checks for story beat
        let player = this.player.box();
        let wiz = this.wizard.box();
        if (this.collides(player, wiz) && this.storyFlag < 1) {
            this.storyFlag++;
        }

        let playerbottom = [player[0], player[1], player[3], player[3] + 2];
        let onground = false;

        this.openPrograms.forEach(program => {
            if (program.isOpen) {
                let programbox = program.box();
                let upperbox = [programbox[0], programbox[1], programbox[2], programbox[2] + 10];
                if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0 && !this.player.standing) {
                    onground = true;
                }
            }
        });
        if (onground) {
            this.player.vel.y = 0;
            this.player.standing = true;
        } else {
            this.player.standing = false;
        }

        // Glooole collision
        let Glooole = this.icons[1].box(); // Glooole
        if (this.collides(Glooole, player)) {
            this.game.switchScreen(new Level2(this.game))
        }
    }


    public listen(userinput: UserInput) {
        this.player.playerMove(this.game.canvas);
        //Checks for every program if there's been clicked on the button
        for (let i = 0; i < this.openPrograms.length; i++) {
            if (this.openPrograms[i].button) {
                if (this.openPrograms[i].button.clickedOn(userinput)) {
                    this.openPrograms[i].isOpen = false;
                }
            }
        }

        if (this.icons[0].clickedOn(userinput)) {
            this.openPrograms[0] = new Program(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.5, 0);
        }

        if (this.icons[1].clickedOn(userinput)) {
            this.openPrograms[1] = new Program(new Vector(400, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 1);
        }
    }
}