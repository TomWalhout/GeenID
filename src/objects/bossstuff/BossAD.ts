/// <reference path="./Attack.ts"/>

class BossAD extends Attack {
    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number, screen: BossScreen) {
        super(pos, vel, ctx, path, frames, speed, scale)
        this.setSpeed();
    }

    private setSpeed() {
        this.vel.x = (Math.random() * 2 - 1) * 5;
        this.vel.y = Math.random() * 5;
    }

    public update() {
        super.update();
    }
}