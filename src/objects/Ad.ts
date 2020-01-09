/// <reference path="./Program.ts"/>

class Ad extends Program {

    private respawn: boolean;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale, 0)
        // console.log(this.animation.imageWidth);
        this.open = true;
        this.ctx = ctx;
        this.respawn = false;     
    }

    public get respawning(): boolean {
        return this.respawn;
    }

    public set respawning(v: boolean) {
        this.respawn = v;
    }
}