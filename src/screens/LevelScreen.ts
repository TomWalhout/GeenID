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
        this.program1 = new Program(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7)
        this.openPrograms = [];
        this.openPrograms[0] = this.program1;
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
            this.openPrograms[0].update();
        }
        this.player.update();
    }



    public collide() {
        if (this.program1.isOpen) {
            let player = this.player.box();
            let program1 = this.program1.box();
            if (this.collides(player, program1)) {
            }
            let upperbox = [program1[0], program1[1], program1[2], program1[2] + 3];
            let playerbottom = [player[0], player[1], player[3], player[3]]
            // console.log(upperbox);
            if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0) {
                this.player.vel.y = 0;
                this.player.standing = true;
            } else if (this.player.standing) {
                this.player.standing = false;
            }
        }
    }
    public listen(userinput: UserInput) {

        for (let i = 0; i < this.openPrograms.length; i++) {
            this.openPrograms[i].button.drawBox();
            if (this.openPrograms[i].button.clickedOn(userinput)) {
                this.openPrograms[i].isOpen = false;
                this.openPrograms.splice(i, 1);
                i++;
            }
        }
    }

    /**
     * Uses the loaded life image to remaining lives of the player on the rop
     * left of the screen.
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writeLifeImagesToLevelScreen(ctx: CanvasRenderingContext2D) {

    }
}
