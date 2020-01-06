/// <reference path="./GameObject.ts"/>

class Boss extends GameObject {
    protected ctx: CanvasRenderingContext2D;
    private screen: BossScreen;
    private nextAttack: boolean;
    private currentAttack: Attack[];
    private attackTimer: number;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, screen: BossScreen, frames: number = 0, speed: number = 0, scale: number = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.screen = screen;
        this.currentAttack = new Array;
        this.attackTimer = 0;
        this.newAttack();
    }

    public update() {
        super.update();
        if (this.nextAttack){
            this.newAttack();
            this.nextAttack = false;
        } else {
            this.attackTimer++;
            if(this.attackTimer >=120) {
                this.nextAttack = true;
            }
        }
        this.currentAttack.forEach(e => { e.update()});
        console.log(this.attackTimer);
    }

    private newAttack() {
        this.attackTimer = 0;
        //This will become a list of attacks of which it will choose one

        //Codebeam Attack
        for(let i= 0;i < 8; i++) {
            this.currentAttack[i] = new Codebeam(new Vector(i * 80, 0), new Vector(0,5), this.ctx, "./assets/enemiesAndAllies/testing.png", 4, 3, 1);
        }
    }

    
    public get Attack() : Attack[] {
        return this.currentAttack;
    }
    
}