/// <reference path="./GameObject.ts"/>

class Enemy extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    private health: number;
    private screen: BossScreen;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, screen: BossScreen, frames: number = 0, speed: number = 0, scale: number = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.screen = screen;
    }

    
}