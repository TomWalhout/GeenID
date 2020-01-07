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
        if (this.lives <= 0) {
            this.game.switchScreen(new SelectionScreen(this.game));
        }
        //only update to new image when necessary, not every frame
        if (this.lives < this.prevlives && this.lives > 1) {
            this.prevlives--;
            this.animation = new Animate(this.ctx, `./assets/idcard/idCard${this.lives}.png`, 1, 1, this, 1.5);
        }
    }

    public set youGotRekt(v: number) {
        if (this.invframes == 0) {
            this.lives = v;
            this.game.Lives = v;
            this.invframes = 100;
        }
    }

    public get youGotRekt(): number {
        return this.lives;
    }


}