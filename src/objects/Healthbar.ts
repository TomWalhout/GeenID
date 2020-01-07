/// <reference path="./GameObject.ts"/>

class Healthbar extends GameObject {
    private maxHealth: number;
    private live: number;
    private boss: Boss;
    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number, boss: Boss) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.live = boss.health;
        this.boss = boss;
    }

    public update() {
        super.update();
        this.pos.x = this.boss.pos.x + 50;
        this.pos.y = this.boss.pos.y - 50;
    }

    public set MaxHealth(v: number) {
        this.maxHealth = v;
    }

}