// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Shows the last score and the highscores
 */
class TitleScreen extends GameScreen {

    private shouldSwitchToStartScreen = false;

    /**
     * Construct a new TitleScreen object.
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
        if (input.isKeyDown(UserInput.KEY_BACK)) {
            this.shouldSwitchToStartScreen = true;
        }
    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new
     * screen to show.
     *
     * @param game the game object, conveniently added as a parameter so you
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {
        // Go to next screen after 10 seconds or user hits space
        if (this.shouldSwitchToStartScreen ||
            this.frameCount > 10*60) {
            game.switchScreen(new StartScreen(game));
        }
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        const x = this.game.canvas.width / 2;
        let y = this.game.canvas.height / 2;
    }
}