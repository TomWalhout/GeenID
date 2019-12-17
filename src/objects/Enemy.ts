/// <reference path="./GameObject.ts"/>

class Enemy extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    private health: number;
    private screen: GameScreen;


    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, screen: GameScreen, frames: number = 0, speed: number = 0, scale: number = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.screen = screen;
    }

    public update() {
        super.update();
    }

    public enemyMove(canvas: HTMLCanvasElement) {
        if (
            this.pos.x + this.animation.imageWidth >= canvas.width ||
            this.pos.x < 0
        ) {
            this.vel.x = -this.vel.x;
        }
        if (
            this.pos.y + this.animation.imageHeight >= canvas.height ||
            this.pos.y < 0
        ) {
            this.vel.y = -this.vel.y;
        }
        // Use the velocity to change the position
        this.pos.x += this.vel.x;
        // this.pos.y += this.vel.y;
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}