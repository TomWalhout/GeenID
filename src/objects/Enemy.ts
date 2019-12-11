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

    public update() {
        super.update();
        this.drawBox();
    }

    public enemyMove(canvas: HTMLCanvasElement) {
        this.vel.x = 0
        if ((this.pos.x + this.animation.imageWidth) > canvas.width) {
            this.vel.x -= 5
        } else if ((this.pos.x + this.animation.imageWidth) < canvas.width) {
            this.vel.x += 5
        }
    }
}