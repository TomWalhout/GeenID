/// <reference path="./GameObject.ts"/>

class Sword extends GameObject {

    protected scale: number;
    protected ctx: CanvasRenderingContext2D;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale)
        this.scale = scale;
        this.ctx = ctx;
    }

    public update() {
        super.update();
        // this.drawBox();
    }

    public movePos(player: Player) {
        this.pos.x += player.vel.x;
        this.pos.y += player.vel.y;
    }
}