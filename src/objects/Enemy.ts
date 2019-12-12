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
        if (
            this.pos.x + this.animation.imageWidth / 2 > canvas.width ||
            this.pos.x - this.animation.imageWidth / 2 < 0
        ) {
            this.vel.x = -this.vel.x;
        }
        if (
            this.pos.y + this.animation.imageWidth / 2 > canvas.height ||
            this.pos.y - this.animation.imageWidth / 2 < 0
        ) {
            this.vel.y = -this.vel.y;
        }
        
        // Use the velocity to change the position
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        }
}