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
        this.enemy[0] = new Enemy(new Vector(this.randomNumber(100, 100), this.randomNumber(100, 100)), new Vector(0,0), this.ctx, "./assets/Enemy.png", screen, 1, 1);
        // console.log('bla 2');
        // console.log(this.enemy[0]);
    }

    public update() {
        super.update();
        if (this.enemy.length > 0) {
            this.enemy[0].update();
        }
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