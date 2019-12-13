/// <reference path="./Program.ts"/>

class Ad extends Program {




    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale)
        // console.log(this.animation.imageWidth);
        this.open = true;
        this.ctx = ctx;
    }


    public spawnEnemy() {

    }


    public randomAd() {

        if (this.open == false) {
           let rNumber = this.randomRoundedNumber(1, 100);
           console.log("pascal is lief");
           console.log(rNumber);
           if (rNumber == 1) {
               this.open = true;
               console.log("pascal is boos :(");
           }
        }
    }


    protected randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    protected randomRoundedNumber(min: number, max: number): number {
        return Math.round(this.randomNumber(min, max));
    }

}