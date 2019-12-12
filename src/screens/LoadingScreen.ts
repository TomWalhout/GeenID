// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Loading screen. Makes sure that all relevant resources are loaded until
 * we proceed to the start screen.
 */
class LoadingScreen extends GameScreen {

    /**
     * Construct a new LoadingScreen object.
     * 
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new 
     * screen to show.
     * 
     * @param game the game object, conveniently added as a parameter so you 
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {
        // TODO develop functionality to wait untill all resources are loaded
        if (this.frameCount > 10) {
            game.switchScreen(new StartScreen(this.game));
        }
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     * 
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // TODO add nice animation that shows loading progress
        this.writeTextToCanvas(ctx, "LOADING...", 140, this.center);
    }
}