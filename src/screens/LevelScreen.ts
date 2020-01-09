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
    protected searchBar: SearchBar;
    private storyFlag: number;

    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);

        this.id = new IDcard(new Vector(this.game.canvas.width + 1, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard.png', 1, 1, 1.5, game);
        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, this.game.squary, 1, 1, 1, this.game.bodySquary);
        if (!(this instanceof BossScreen)) {
            document.body.style.backgroundImage = "url('./assets/xp-bg.png')";
        }
        this.icons = [];
        this.programs = [];
        this.ads = [];
        this.storyFlag = 0;
        this.userinput = new UserInput();
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        if (this.game.playerinfo[0] != undefined) {
            this.id.update();
            this.writeTextToCanvas(this.game.ctx, this.game.playerinfo[0], 20, new Vector(this.game.canvas.width - 50, 30), "right", "#000000");
            this.writeTextToCanvas(this.game.ctx, this.game.playerinfo[1], 20, new Vector(this.game.canvas.width - 50, 60), "right", "#000000");
            if (this.id.youGotRekt === 1) {
                this.writeTextToCanvas(this.game.ctx, `${this.id.youGotRekt} leven over`, 20, new Vector(this.game.canvas.width - 25, 90), "right", "#000000");
            } else {
                this.writeTextToCanvas(this.game.ctx, `${this.id.youGotRekt} levens over`, 20, new Vector(this.game.canvas.width - 25, 90), "right", "#000000");
            }
            // console.log(this.game.playerinfo)
        }

        for (let i = 0; i < this.programs.length; i++) {
            if (this.programs[i].isOpen && this.programs[i].storyFlag <= this.storyFlag) {
                this.programs[i].update();
            }
        }

        for (let i = 0; i < this.icons.length; i++) {
            if (this.icons[i].story <= this.storyFlag) {
                this.icons[i].update();
            }
        }

        if (!(this instanceof HomeScreen)) {
            this.player.update();
        }
    }

    public collide() {
        let player = this.player.box();
        let playerbottom = [player[0], player[1], player[3], player[3] + 2];
        let onground = false;
        this.programs.forEach(program => {
            if (program.isOpen) {

                let programbox = program.box();
                // program.drawBox();
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
    }

    public sound() {
        let audio = new Audio('./assets/sounds/errorxp.mp3');
        audio.play();
    }

    public get story(): number {
        return this.storyFlag;
    }

    public set story(v: number) {
        this.storyFlag = v;
    }

    public multilineText(ctx: CanvasRenderingContext2D, str: string, xPos: number, yPos: number) {
        ctx.font = '20px fantasy';
        ctx.textAlign = "center";
        // str = 'first line \nsecond line...';
        // xPos = 30; //starting x coordinate
        // yPos = 30; //starting y coordinate
        let lineheight = 20; //the height of a line for the sentence

        // use \n as a delimiter (you can choose any delimter), the split function uses this delimiter to cut the string into two strings
        // lines is an array with all the strings
        let lines = str.split('\n');

        // loop over all the strings and write each string a number of lineheights under eacht oter 
        for (let j = 0; j < lines.length; j++) {
            ctx.fillText(lines[j], xPos, yPos + (j * lineheight));
        }
    }
}