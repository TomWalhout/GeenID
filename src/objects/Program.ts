/// <reference path="./GameObject.ts"/>

class Program extends GameObject {
   

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number) {
        super(pos, vel, ctx, path, frames, speed)

    }


}