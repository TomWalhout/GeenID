class Animate {
    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement;
    private frameHeight: number;
    private animationSpeed: number;
    private noOfFrames: number;
    private currentFrame: number;
    private object: any;
    private counter: number;
    private scale: number;
    constructor(ctx: CanvasRenderingContext2D, path: string, noOfFrames: number, anispeed: number, object: GameObject, scale: number = 1) {
        this.ctx = ctx;
        // Load the image into the img var
        this.img = this.loadImage(path);
        this.noOfFrames = noOfFrames;
        this.currentFrame = 0;
        // Set the speed at which the animation plays
        this.aniSpeed = anispeed;
        this.counter = 0;
        //daddy object
        this.object = object;
        this.scale = scale;
    }

    private loadImage(path: string): HTMLImageElement {
        const image: HTMLImageElement = new Image();
        image.src = path;
        return image;
    }

    public draw() {
        if (this.img.naturalHeight > 0) {
            this.counter++;
            //counter omhoog
            this.frameHeight = this.img.height / this.noOfFrames;
            if (this.counter >= this.animationSpeed) {
                this.counter = 0;
                if (this.currentFrame < this.noOfFrames - 1) {
                    this.currentFrame += 1;
                } else {
                    this.currentFrame = 0;
                }
            }

            this.ctx.drawImage(
                this.img,
                0,
                this.currentFrame * this.frameHeight,
                this.img.width,
                this.frameHeight,
                this.object.pos.x,
                this.object.pos.y,
                this.img.width * this.scale,
                this.frameHeight * this.scale
            )
        }
    }

    private set aniSpeed(speed: number) {
        this.animationSpeed = speed;
    }

    public get imageHeight() {
        return this.img.height / this.noOfFrames;
    }
    
    public get imageWidth() {
        return this.img.width;
    }
}