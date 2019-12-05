class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private aniTest: Animate;
    private aniTest2: Animate;
    private aniTest3: Animate;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.documentElement.style.overflow = 'hidden';
        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");
        // Init the animator
        this.aniTest = new Animate(this.canvas, this.ctx, "./Frog Down.png", 20, 5);
        this.aniTest2 = new Animate(this.canvas, this.ctx, "./Frog Side.png", 20, 10);
        this.aniTest3 = new Animate(this.canvas, this.ctx, "./Frog Death.png", 5, 1);
        // this.loadImage("./Frog Down.png", this.drawit);
        this.loop();
    }

    private drawit(img: HTMLImageElement) {
        this.ctx.drawImage(img, 200, 200);
    }
    private loop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.aniTest.draw();
        this.aniTest2.draw();
        this.aniTest3.draw();
        requestAnimationFrame(this.loop);
    }

    // -------- Title screen methods -------------------------------------


    // -------Generic canvas methods ----------------------------------

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
     * Loads an image file into the DOM and writes it to the canvas. After the
     * image is loaded and ready to be drawn to the canvas, the specified
     * callback method will be invoked. the method will be called with the
     * loaded imageElement as a parameter.
     *
     * The callback method MUST be a method of this class with a header like:
     *
     *   private yourMethodNameHere(img: HTMLImageElement)
     *
     * In the body of that callback you can draw the image to the canvas
     * context like:
     *
     *   this.ctx.drawImage(img, someX, someY);
     *
     * This is the simplest way to draw images, because the browser must and
     * shall wait until the image is completely loaded into memory.
     *
     * @param {string} source - the name of the image file
     * @param {Function} callback - method that is invoked after the image is loaded
     */
    private loadImage(source: string, callback: Function) {
        const imageElement = new Image();

        // We must wait until the image file is loaded into the element
        // We add an event listener
        // We'll be using an arrow function for this, just because we must.
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });

        // Now, set the src to start loading the image
        imageElement.src = source;
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const game = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
