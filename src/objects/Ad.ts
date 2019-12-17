/// <reference path="./Program.ts"/>

class Ad extends Program {
    private enemy: Array<Enemy>;
    private respawn: boolean;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale)
        // console.log(this.animation.imageWidth);
        this.open = true;
        this.ctx = ctx;
        this.respawn = false;
        this.enemy = [];    
    }

    public spawnEnemy(screen : GameScreen) {
        this.enemy[0] = new Enemy(new Vector(this.randomNumber(100, this.ctx.canvas.width - 100), this.randomNumber(100, this.ctx.canvas.height - 100)), new Vector(this.randomNumber(-4, 4), this.randomNumber(-2, 2)), this.ctx, "./assets/Enemy.png", screen, 1, 1);
        // console.log('bla 2');
        // console.log(this.enemy[0]);
    }

    public update() {
        super.update();
        if (this.enemy.length > 0) {
            this.enemy[0].update();
        }
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i].enemyMove(this.ctx.canvas);
        }
    }

    public enemyMove(canvas: HTMLCanvasElement) {
        if (
            this.pos.x + this.animation.imageWidth >= canvas.width ||
            this.pos.x < 0
        ) {
            this.vel.x = -this.vel.x;
        }
        if (
            this.pos.y + this.animation.imageHeight >= canvas.height ||
            this.pos.y < 0
        ) {
            this.vel.y = -this.vel.y;
        }
        // Use the velocity to change the position
        this.pos.x += this.vel.x;
        // this.pos.y += this.vel.y;
    }

    public get respawning(): boolean {
        return this.respawn;
    }


    public set respawning(v: boolean) {
        this.respawn = v;
    }
    
        /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}