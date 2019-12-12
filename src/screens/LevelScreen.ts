// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class LevelScreen extends GameScreen {

    private program1: Program;
    private player: Player;
    private openPrograms: Array<Program>;
    private shouldSwitchToTitleScreen = false;

    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);

        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, './assets/Squary.png', 1, 1, 1);
        this.openPrograms = [];
        this.openPrograms[1] = new Program(new Vector(250, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7);
        this.openPrograms[0] = new Program(new Vector(100, 20), new Vector(0, 0), this.game.ctx, './assets/windows/MINECRAFT.png', 1, 1, 0.7);

    }


    /**
     * Let this screen adjust its state and/or let the game switch to a new
     * screen to show.
     *
     * @param game the game object, conveniently added as a parameter so you
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
        this.player.playerMove(this.game.canvas);
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // this.program1.update();
        for (let i = 0; i < this.openPrograms.length; i++) {
            this.openPrograms[i].update();
        }
        this.player.update();
    }



    public collide() {
        let player = this.player.box();
        let playerbottom = [player[0], player[1], player[3], player[3] + 2]
        this.openPrograms.forEach(program => {
            if (program.isOpen) {
                let programbox = program.box();
                let upperbox = [programbox[0], programbox[1], programbox[2], programbox[2] + 10];
                if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0 && !this.player.standing) {
                    this.player.vel.y = 0;
                    this.player.standing = true;
                } else {
                    this.player.standing = false;
                }
            }
        });

    }

    public listen(userinput: UserInput) {
        //Checks for every program if there's been clicked on the button
        for (let i = 0; i < this.openPrograms.length; i++) {
            if (this.openPrograms[i].button) {
                if (this.openPrograms[i].button.clickedOn(userinput)) {
                    this.openPrograms[i].isOpen = false;
                    this.openPrograms.splice(i, 1);
                    i++;
                }
            }
        }
    }
}
