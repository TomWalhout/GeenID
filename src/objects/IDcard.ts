/// <reference path="./GameObject.ts"/>

class IDcard extends GameObject {

    private lives: number;
    private prevlives: number;
    private images: Array<string>;
    protected ctx: CanvasRenderingContext2D;
    private game: Game;
    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number, game: Game) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.pos.x -= 300;
        this.prevlives = 5;
        this.game = game;
        this.lives = this.game.lives;
    }

    public update() {
        super.update();
        //only update to new image when necessary, not every frame
        if (this.lives < this.prevlives) {
            console.log(this.lives);
            this.prevlives--;
            this.animation = new Animate(this.ctx, `./assets/idCard${this.lives}.png`, 1, 1, this, 0.5);
        }
        if (this.lives <= 0) {
            console.log("you dead mah boi");
            this.game.switchScreen(new LevelScreen(this.game));
        }
    }

    public set youGotRekt(v: number) {
        this.lives = v;
    }

    public get youGotRekt(): number {
        return this.lives;
    }
}