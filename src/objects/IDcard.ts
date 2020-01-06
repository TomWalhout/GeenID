/// <reference path="./GameObject.ts"/>

class IDcard extends GameObject {

    private lives: number;
    private prevlives: number;
    private images: Array<string>;
    protected ctx: CanvasRenderingContext2D;
    private game: Game;
    private invframes: number;
    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number, game: Game) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.pos.x -= 226;
        this.prevlives = 5;
        this.game = game;
        this.lives = this.game.lives;
        this.invframes = 0;
    }

    public update() {
        super.update();
        if (this.invframes > 0) {
            this.invframes--;
        }
        //only update to new image when necessary, not every frame
        if (this.lives < this.prevlives) {
            console.log(this.lives);
            this.prevlives--;
            this.animation = new Animate(this.ctx, `./assets/idcard/idCard${this.lives}.png`, 1, 1, this, 1.5);
        }
        if (this.lives <= 0) {
            console.log("you dead mah boi");
            this.game.switchScreen(new SelectionScreen(this.game));
        }
    }

    public set youGotRekt(v: number) {
        console.log(this.invframes);
        if (this.invframes == 0) {
            this.lives = v;
            this.invframes = 100;
            console.log("ok");
        }
    }

    public get youGotRekt(): number {
        return this.lives;
    }
}