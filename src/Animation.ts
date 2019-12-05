class Animate {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement;
    private frameHeight: number;
    private animationSpeed: number;
    private noOfFrames: number;
    private currentFrame: number;
    private object: any;
    private counter: number;
    private x: number;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, path: string, noOfFrames: number, anispeed: number, object: any = 0) {
        this.canvas = canvas;
        this.ctx = ctx;
        // Load the image into the img var
        this.img = this.loadImage(path);
        // Calc how tall a single frame is
        this.noOfFrames = noOfFrames;
        this.currentFrame = 1;
        // Set the speed at which the animation plays
        this.aniSpeed = anispeed;
        this.counter = 0;
        this.x = Math.random() * 500;
    }

    private loadImage(path: string): HTMLImageElement {
        const image: HTMLImageElement = new Image();
        image.src = path;
        return image;
    }

    public draw() {
        this.counter++;
        this.frameHeight = this.img.height / this.noOfFrames;
        if (this.counter > this.animationSpeed) {
            this.counter = 0;
            if (this.currentFrame < this.noOfFrames) {
                this.currentFrame += 1;
            } else {
                this.currentFrame = 0;
            }
        }
        console.log(this.counter);
        this.ctx.drawImage(
            this.img,
            0,
            this.currentFrame * this.frameHeight,
            this.img.width,
            this.frameHeight,
            this.x,
            this.x,
            this.img.width,
            this.frameHeight
        )
    }
    private set aniSpeed(speed: number) {
        this.animationSpeed = speed;
    }

}