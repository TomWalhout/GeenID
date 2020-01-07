/// <reference path="./GameObject.ts"/>

class Boss extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    private screen: BossScreen;
    private nextAttack: boolean;
    private bossHealth: number;
    private currentAttack: Attack[];
    private attackTimer: number;
    private attackLimit: number;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, screen: BossScreen, frames: number = 0, speed: number = 0, scale: number = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.screen = screen;
        this.currentAttack = new Array;
        this.attackTimer = 0;
        this.attackLimit = 120;
        this.bossHealth = 30;
        this.newAttack();
    }

    public update() {
        super.update();
        if (this.nextAttack || this.currentAttack.length === 0) {
            this.newAttack();
            this.nextAttack = false;
        } else {
            this.attackTimer++;
            if (this.attackTimer >= this.attackLimit) {
                this.nextAttack = true;
            }
        }

        for (let i = this.currentAttack.length - 1; i >= 0; i--) {
            this.currentAttack[i].update();
            if (this.currentAttack[i].pos.y > this.ctx.canvas.height || this.currentAttack[i].pos.x < 0) {
                this.currentAttack.splice(i, 1);
            }
        }
        console.log(this.bossHealth);
    }

    private newAttack() {
        this.attackTimer = 0;
        //This will become a list of attacks of which it will choose one
        // switch ( Math.floor(Math.random() * 2)) {
        //     case 0:
        //         this.codeBeamAttack();
        //         break;
        //     case 1:
        //         this.enemyFlyBy();
        //         break;
        // }
        this.enemyFlyBy();
    }

    private codeBeamAttack() {
        //Codebeam Attack
        this.attackLimit = 3000;
        for (let i = 0; i < 13; i++) {
            this.currentAttack[i] = new Codebeam(new Vector(i * 120 + Math.random() * 40, - (Math.random() * 100)), new Vector(0, 5 + Math.random() * 3), this.ctx, "./assets/enemiesAndAllies/testing.png", 4, 3, 1);
            if (this.currentAttack[i].pos.y >= 300) {
                this.currentAttack[i].pos.y = 300;
            }
        }
    }

    private enemyFlyBy() {
        this.attackLimit = 3000;
        for (let i = 0; i < 5; i++) {
            this.currentAttack[i] = new Enemy(new Vector(this.ctx.canvas.width, this.ctx.canvas.height - i * 50 - 50), new Vector(-5, 0), this.ctx, "./assets/enemiesAndAllies/Enemy.png", this.screen, 1, 1, 1);
        }
    }

    public get Attack(): Attack[] {
        return this.currentAttack;
    }


    public get health(): number {
        return this.bossHealth;
    }


    public set health(v: number) {
        this.bossHealth = v;
    }



}