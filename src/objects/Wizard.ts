/// <reference path="./GameObject.ts"/>

class Wizard extends GameObject {

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number = 0, speed: number = 0, scale: number = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
    }
}