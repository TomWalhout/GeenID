class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public readonly input: UserInput;

    private currentScreen: GameScreen;
    public Lives: number;
    private squaryString: string;
    private playerInfo: Array<string>;
    private squaryBody: string;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = 1366;
        this.canvas.height = 768;
        document.documentElement.style.overflow = 'hidden';
        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");
        this.squaryString = "./assets/squaryArmy/face/happyBlue.png";
        this.squaryBody = "./assets/squaryArmy/body/squaryBlue.png";
        this.currentScreen = new HomeScreen(this); // Level the game starts on
        this.input = new UserInput();
        this.Lives = 5;
        this.playerInfo = [];
        this.playerInfo[0] = "Squary";
        this.playerInfo[1] = "12";
        this.loop();
    }

    private loop = () => {

        // Increase the frame counter
        this.currentScreen.increaseFrameCounter();

        // Let the current screen move its objects around the canvas
        this.currentScreen.move(this.canvas);

        // Let the current screen handle collisions
        this.currentScreen.collide();

        //clear the current screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Let the current screen draw itself on the rendering context
        this.currentScreen.draw(this.ctx);

        // Let the current screen listen to the user input
        this.currentScreen.listen(this.input);

        requestAnimationFrame(this.loop);

        // Let the current screen adjust itself
        this.currentScreen.adjust(this);
        
        if (this.userInput.isKeyDown(UserInput.KEY_1)) {
            this.switchScreen(new Level1(this));
        }
        if (this.userInput.isKeyDown(UserInput.KEY_2)) {
            this.switchScreen(new Level2(this));
        }
        if (this.userInput.isKeyDown(UserInput.KEY_3)) {
            this.switchScreen(new Level3(this));
        }
        if (this.userInput.isKeyDown(UserInput.KEY_4)) {
            this.switchScreen(new Level4(this));
        }
        if (this.userInput.isKeyDown(UserInput.KEY_5)) {
            this.switchScreen(new BossScreen(this));
        }
        if (this.userInput.isKeyDown(UserInput.KEY_6)) {
            this.switchScreen(new DeathScreen(this));
        }
        if (this.userInput.isKeyDown(UserInput.KEY_7)) {
            this.switchScreen(new WinScreen(this));
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

    public get lives(): number {
        return this.Lives;
    }

    public set lives(v: number) {
        this.Lives = v;
    }
    public get squary(): string {
        return this.squaryString;
    }

    public set squary(v: string) {
        this.squaryString = v;
    }

    public get userInput(): UserInput {
        return this.input;
    }

    public get playerinfo(): Array<string> {
        return this.playerInfo;
    }

    // public set playername(v: string) {
    //     this.playerName = v;
    // }

    public get bodySquary(): string {
        return this.squaryBody;
    }

    public set bodySquary(v: string) {
        this.squaryBody = v;
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const game = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);