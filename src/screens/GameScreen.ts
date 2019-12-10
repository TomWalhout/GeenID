/**
 * Base class for all Game Screens.
 */
class GameScreen {

    /**
     * Rerefence to the Game object to where this screen belongs to
     */
    protected readonly game: Game;

    /**
     * Conveniently holds the center of the canvas
     */
    protected center: Vector;
    
    /**
     * Counts the number of frames that are already drawn while this screen is
     * the Game's current screen
     */
    protected frameCount: number = 0;

    // Attributes for calculating the frame rate (FPS)
    private previous_fps_tick: number;
    private fps_count: number;
    private current_fps: number;

    /**
     * Construct a new GameScreen object.
     * 
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        this.game = game;
        this.center = new Vector(
            game.canvas.width / 2,
            game.canvas.height / 2
        );
        this.previous_fps_tick = performance.now();
    }

    /**
     * Let this screen listen to the user input. 
     * 
     * @param input user input to listen to
     */
    public listen(input: UserInput) {

    }

    /**
     * Let this screen move its objects around the canvas.
     * 
     * Override this method only to compute new positions, angles and other
     * things. This can also include the handling of objects that move outside 
     * of the canvas or hit the canvas boudaries. NOT FOR DRAWING. 
     * 
     * @param canvas the canvas to move around
     */
    public move(canvas: HTMLCanvasElement) {
    }

    /**
     * Let this screen detect and handle collisions of its objects
     */
    public collide() {

    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new 
     * screen to show.
     * 
     * @param game the game object, conveniently added as a parameter so you 
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {

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
        const time_diff = performance.now() - this.previous_fps_tick;
        if (time_diff >= 1000) {
            this.current_fps = this.fps_count;
            this.fps_count = 0;
            this.previous_fps_tick = performance.now();
        }
        else {
            this.fps_count++;
        }
        // Draw FPS
        const text = `${this.current_fps} FPS`;
        ctx.font = `12px Courier`;
        ctx.fillStyle = '#ffffb3';
        ctx.fillText(text, this.game.canvas.width - 100, this.game.canvas.height - 14);
    }

    /**
     * This method is called by the game engine at the start of each frame
     * before any other method is called.
     * 
     * WARNING: do not call this method anywhere else!
     */
    public increaseFrameCounter() {
        this.frameCount++;
    }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {Vector} position - Horizontal coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    protected writeTextToCanvas(
        ctx: CanvasRenderingContext2D,
        text: string,
        fontSize: number = 20,
        position: Vector,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, position.x, position.y);
    }

    /**
     * Renders a random integer number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    protected randomRoundedNumber(min: number, max: number): number {
        return Math.round(this.randomNumber(min, max));
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    protected randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }


}