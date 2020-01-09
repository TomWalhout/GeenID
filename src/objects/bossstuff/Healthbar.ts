/// <reference path="../GameObject.ts"/>

class Healthbar extends GameObject {
    
    private maxHealth: number;
    private live: number;
    private greenBar: HTMLImageElement;
    private boss: Boss;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number, boss: Boss) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.live = boss.health;
        this.maxHealth = 30;
        this.scale = scale;
        this.boss = boss;
        this.greenBar = new Image();
        this.greenBar.src = "./assets/enemiesAndAllies/healthbar-green.png";
    }

    public update() {
        super.update();
        if (this.greenBar.naturalHeight > 0) {
            this.live = this.boss.health;
            let drawfromx = this.greenBar.width - (this.live / this.maxHealth) * this.greenBar.width;
            this.ctx.drawImage(this.greenBar, drawfromx, 0, this.greenBar.width, this.greenBar.height, this.pos.x, this.pos.y, this.greenBar.width * this.scale, this.greenBar.height * this.scale);
        }
        this.pos.x = this.boss.pos.x + 50;
        this.pos.y = this.boss.pos.y - 50;
    }

    public set MaxHealth(v: number) {
        this.maxHealth = v;
    }
}