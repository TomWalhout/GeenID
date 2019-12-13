/// <reference path="./Program.ts"/>

class Ad extends Program {




    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale)
        // console.log(this.animation.imageWidth);
        this.open = true;
        this.ctx = ctx;
    }
}