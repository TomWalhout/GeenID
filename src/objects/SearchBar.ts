/// <reference path="./GameObject.ts"/>

class SearchBar extends GameObject {

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale, 0);
    
        this.ctx = ctx;
    }

    public update(){
        super.update();
    }
}