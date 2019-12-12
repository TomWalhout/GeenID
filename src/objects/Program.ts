/// <reference path="./GameObject.ts"/>

class Program extends GameObject {
    private closeButton: CloseButton;
    private open: boolean;
    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale)
        // console.log(this.animation.imageWidth);
        this.open = true;
        this.setCloseButton(ctx);
    }

    private setCloseButton(ctx: CanvasRenderingContext2D) {
        this.closeButton = new CloseButton(
            new Vector(this.pos.x + 880, this.pos.y),
            new Vector(0, 0),
            ctx,
            "./transparent.png",
            1,
            1,
            0.5
        )
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
}

//This is a small empty subclass, placing it here is fine
class CloseButton extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale)
        this.ctx = ctx;
    }

}
