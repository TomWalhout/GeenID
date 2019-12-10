class GameObject {
    private position: Vector;
    private velocity: Vector;
    private animation: Animate;

    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number) {
        this.position = pos;
        this.velocity = vel;
        this.animation = new Animate(ctx, path, frames, speed, this);
    }

    public get pos(): Vector {
        return this.position
    }
    public set pos(value: Vector) {
        this.position = value;
    }

    public update() {
        this.animation.draw();
        this.move();
    }

    private move() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
}