class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public readonly input: UserInput;

    private currentScreen: GameScreen;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.documentElement.style.overflow = 'hidden';
        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");
        this.currentScreen = new LevelScreen(this);
        this.input = new UserInput();
        this.loop();
    }

    private loop = () => {

        // Increase the frame counter
        this.currentScreen.increaseFrameCounter();

        // Let the current screen listen to the user input

        // Let the current screen move its objects around the canvas
        this.currentScreen.move(this.canvas);

        this.currentScreen.collide();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Let the current screen draw itself on the rendering context
        this.currentScreen.draw(this.ctx);
        this.currentScreen.listen(this.input);

        requestAnimationFrame(this.loop);

        // Let the current screen adjust itself
        this.currentScreen.adjust(this);

        // switch screen
        if (this.input.isKeyDown(UserInput.KEY_1)) {
            this.switchScreen(new LevelScreen(this))
        }
        if (this.input.isKeyDown(UserInput.KEY_2)) {
            this.switchScreen(new BossScreen(this))
        }

    }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    public writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    public switchScreen(newScreen: GameScreen) {
        if (newScreen == null) {
            throw new Error("newScreen cannot be null");
        }
        if (newScreen != this.currentScreen) {
            this.currentScreen = newScreen;
        }
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const game = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
