// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class LevelScreen extends GameScreen {

    private shouldSwitchToTitleScreen = false;

    /**
     * Construct a new GameScreen object.
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
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {

    }

    /**
     * Let this screen draw debug info about itself and its gameobjects on the
     * given rendering context.
     *
     * @param ctx the rendering context to draw on
     */
    public drawDebugInfo(ctx: CanvasRenderingContext2D) {

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
