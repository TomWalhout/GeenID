// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class LevelScreen extends GameScreen {

    private program1: Program;
    private player: Player;

    private shouldSwitchToTitleScreen = false;

    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game, ctx: CanvasRenderingContext2D) {
        super(game);

        this.player = new Player(new Vector(100, 900), new Vector(0, 0), this.game.ctx, "./Frog Side.png", 20, 1);
        this.program1 = new Program(new Vector(100, 100), new Vector(0, 0), ctx, './assets/programs/Glooole.png', 1, 1)
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
        this.program1.update();
        this.player.update();
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
