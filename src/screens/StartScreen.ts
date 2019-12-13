// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Start screen. Shows the name of the game.
 */
class StartScreen extends GameScreen {

    private shouldStartLevel: boolean = false;

    /**
     * Construct a new StartScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
    }

    /**
     * Let this screen listen to the user input.
     *
     * @param input user input to listen to
     */
    public listen(input: UserInput) {
        if (input.isKeyDown(UserInput.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new
     * screen to show.
     *
     * @param game the game object, conveniently added as a parameter so you
     *      can easily call the switchScreen() method if needed.
     */
    // public adjust(game: Game) {
    //     if (this.shouldStartLevel) {
    //         game.switchScreen(new LevelScreen(game));
    //     }
    // }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // 2. add 'Press to play' text
        this.writeTextToCanvas(
            ctx,
            "PRESS ENTER TO PLAY",
            40,
            new Vector(this.center.x, this.center.y - 20)
        );
    }
}