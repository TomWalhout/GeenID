// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class LevelScreen extends GameScreen {

    protected player: Player;
    protected programs: Array<Program>;
    protected ads: Array<Ad>
    protected icons: Array<Icon>;
    protected shouldSwitchToTitleScreen = false;
    protected id: IDcard;
    protected userinput: UserInput;
    private storyFlag: number;

    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);

        this.id = new IDcard(new Vector(this.game.canvas.width, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard.png', 1, 1, 1.5, game);
        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, './assets/Squary.png', 1, 1, 1);

        this.icons = [];
        //     this.icons[0] = new Icon(new Vector(0, 200), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4)
        //     this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4)
        //     this.icons[2] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/placeholder-thispc.png', 1, 1, 1.4)
        this.programs = [];
        this.ads = [];
        //     this.openPrograms[0] = new Program(new Vector(100, 20), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.7);
        //     this.openPrograms[1] = new Program(new Vector(400, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7);
        //     this.openPrograms[2] = new Program(new Vector(900, 50), new Vector(0, 0), this.game.ctx, './assets/programs/MINECRAFTEXE.png', 6, 50, 1);
        //     this.openPrograms[1].hasAds = true;
        this.userinput = new UserInput();
        this.storyFlag = 0;
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        this.id.update();
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].update();
        }

        for (let i = 0; i < this.programs.length; i++) {
            if (this.programs[i].isOpen && this.programs[i].storyFlag <= this.storyFlag) {
                this.programs[i].update();
            }
        }

        // if (this.ads.length < 5) { // max amount of ads
        //     if (this.randomRoundedNumber(1, 100) == 1) { // add chance
        //         this.ads.push(new Ad(new Vector(this.randomNumber(400, 1100), this.randomNumber(300, 750)), new Vector(0, 0), this.game.ctx, './assets/ad1.png', 1, 1, 2));
        //         this.sound();
        //     }
        // }
        // for (let i = 0; i < this.openAds.length; i++) {
        //     if (this.openAds[i].isOpen) {
        //         this.openAds[i].update();
        //     }
        // }

        this.player.update();
    }

    public collide() {
        let player = this.player.box();
        let playerbottom = [player[0], player[1], player[3], player[3] + 2];
        let onground = false;

        this.programs.forEach(program => {
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
            this.game.switchScreen(new Level1test(this.game));
        }

    }
    protected closeProgram() {
        for (let i = 0; i < this.programs.length; i++) {
            if (this.programs[i].button) {
                if (this.programs[i].button.clickedOn(this.userinput)) {
                    this.programs[i].isOpen = false;
                    if (this.programs[i].hasAds) {
                        this.ads.forEach(element => {
                            element.isOpen = false;
                            element.respawning = false;
                        });
                    }
                }
            }
        }
    }

    protected closeAds() {
        for (let i = 0; i < this.ads.length; i++) {
            if (this.ads[i].button) {
                if (this.ads[i].button.clickedOn(this.userinput)) {
                    this.ads.splice(i, 1);
                }
            }
        }
    }

    protected clickedIcon() {
        for (let i = 0; i < this.icons.length; i++) {
            if (this.icons[i].clickedOn(this.userinput)) {
                this.programs[i].isOpen = true;
            }
        }
    }

    public listen(userinput: UserInput) {

        this.player.playerMove(this.game.canvas);

        //Checks for every program if there's been clicked on the button



    }
    public sound() {
        let audio = new Audio('./assets/sounds/errorxp.mp3');
        //audio.play();
    }
}