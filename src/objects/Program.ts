/// <reference path="./GameObject.ts"/>

class Program extends GameObject {
    private closeButton: CloseButton;
    protected open: boolean;
    protected ctx: CanvasRenderingContext2D;
    private ads: boolean;
    
    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number, story: number) {
        super(pos, vel, ctx, path, frames, speed, scale, story);
        this.open = false;
        this.ctx = ctx;
        this.ads = false;
    }

    private wait() {
        if (this.animation.imageWidth > 0 && !this.closeButton) {
            this.setCloseButton();
        }
    }

    private setCloseButton() {
        // console.log(this.animation.imageWidth);
        this.closeButton = new CloseButton(
            new Vector(this.pos.x + this.animation.imageWidth * this.scale - 30, this.pos.y),
            new Vector(0, 0),
            this.ctx,
            "./transparent.png",
            1,
            1,
            0.5
        )
    }

    public update() {
        this.wait();
        super.update();
    }

    public get isOpen(): boolean {
        return this.open;
    }

    public set isOpen(value: boolean) {
        this.open = value;
    }

    public get button(): CloseButton {
        return this.closeButton;
    }

    public get hasAds(): boolean {
        return this.ads;
    }


    public set hasAds(v: boolean) {
        this.ads = v;
    }

    public get storyFlag(): number {
        return this.story;
    }
}

//This is a small empty subclass, placing it here is fine
class CloseButton extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale)
        this.ctx = ctx;
    }
}