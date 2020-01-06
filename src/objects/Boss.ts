/// <reference path="./GameObject.ts"/>

class Boss extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    private health: number;
    private currentAttack: Codebeam[];
    private attackTimer: number;
    private screen: BossScreen;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, screen: BossScreen, frames: number = 0, speed: number = 0, scale: number = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.screen = screen;
        this.Attack();
    }

    public update() {
        // vibrate threateningly
        this.vel.x = Math.random() - .5;
        this.vel.y = Math.random() - .5;
        super.update();
    }

    private Attack() {
    }

    public get attack(): GameObject {
        return this.currentAttack[0];
    }
}