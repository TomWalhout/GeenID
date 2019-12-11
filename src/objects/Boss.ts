/// <reference path="./GameObject.ts"/>

class Boss extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    private health: number;
    private currentAttack: Codebeam[];
    private attackTimer: number;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number = 0, speed: number = 0) {
        super(pos, vel, ctx, path, frames, speed);
        this.attackTimer = 0;
        this.ctx = ctx;
    }


    public update() {
        this.vel.x = Math.random() - .5;
        this.vel.y = Math.random() - .5;
        this.Attack();
        this.currentAttack.forEach(element => {
            element.update();
        });

        super.update();
    }

    private Attack() {
        this.currentAttack = new Array;
        for (let i = 1; i < 8; i++) {
            this.currentAttack[i] = new Codebeam(new Vector(i * 100, 0), new Vector(0, .1 * i * Math.random()), this.ctx);
        }
    }
}