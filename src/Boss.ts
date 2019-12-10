/// <reference path="GameObject.ts"/>

class Boss extends GameObject {
    private health: number;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number) {
        super(pos, vel, ctx, path, frames, speed);
    }


    public update() {
        this.vel.x = Math.random() - .5;
        this.vel.y = Math.random() - .5;
        super.update();
    }
}