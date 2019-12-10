/// <reference path="./GameObject.ts"/>

class Boss extends GameObject {
    private health: number;
    private attack: Codebeam[];
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number = 0, speed: number = 0) {
        super(pos, vel, ctx, path, frames, speed);
        this.attack = new Array;
        for (let i = 0; i < 5; i++) {
            this.attack[0] = new Codebeam(new Vector(100, 0), new Vector(0, .05), ctx);
            this.attack[1] = new Codebeam(new Vector(300, 0), new Vector(0, .02), ctx);
            this.attack[2] = new Codebeam(new Vector(200, 0), new Vector(0, .06), ctx);
            this.attack[3] = new Codebeam(new Vector(400, 0), new Vector(0, .07), ctx);
            this.attack[4] = new Codebeam(new Vector(500, 0), new Vector(0, .01), ctx);
            this.attack[5] = new Codebeam(new Vector(600, 0), new Vector(0, .08), ctx);
            this.attack[6] = new Codebeam(new Vector(700, 0), new Vector(0, .01), ctx);
            this.attack[7] = new Codebeam(new Vector(800, 0), new Vector(0, .02), ctx);
            this.attack[8] = new Codebeam(new Vector(900, 0), new Vector(0, .01), ctx);
            this.attack[9] = new Codebeam(new Vector(1000, 0), new Vector(0, .02), ctx);
            this.attack[10] = new Codebeam(new Vector(1100, 0), new Vector(0, .04), ctx);
            this.attack[11] = new Codebeam(new Vector(1200, 0), new Vector(0, .01), ctx);
            this.attack[12] = new Codebeam(new Vector(1300, 0), new Vector(0, .1), ctx);
            this.attack[13] = new Codebeam(new Vector(1400, 0), new Vector(0, .01), ctx);
        }
    }


    public update() {
        this.vel.x = Math.random() - .5;
        this.vel.y = Math.random() - .5;
        this.attack.forEach(element => {
            element.update();
        });
        super.update();
    }
}