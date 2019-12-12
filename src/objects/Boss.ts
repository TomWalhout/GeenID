/// <reference path="./GameObject.ts"/>

class Boss extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    private health: number;
    private currentAttack: Codebeam[];
    private attackTimer: number;
    private screen: BossScreen;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, screen: BossScreen, frames: number = 0, speed: number = 0, scale: number = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.attackTimer = 0;
        this.ctx = ctx;
        this.screen = screen;
        this.Attack();
    }

    public update() {
        this.vel.x = Math.random() - .5;
        this.vel.y = Math.random() - .5;
        if (this.currentAttack) {
            let inList = false;
            this.currentAttack.forEach(element => {
                element.update();
            });
        }
        super.update();
        this.drawBox();
    }

    private Attack() {
        // let chance = Math.floor(Math.random() * 5);
        let chance = 0;
        switch (chance) {
            case 0:
                this.currentAttack = new Array;
                for (let i = 1; i < 8; i++) {
                    this.currentAttack[i] = new Codebeam(new Vector(i * 100, 0), new Vector(0, .1 * i * Math.random()), this.ctx);
                }
                break;
            case 1:
                break;
            default:
                console.log("jammerjoh");
                break;
        }
    }
}