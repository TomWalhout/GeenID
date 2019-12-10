class GameObject {
    protected position: Vector;
    protected velocity: Vector;
    protected animation: Animate;
    protected ctx: CanvasRenderingContext2D;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path?: string, frames: number = 1, speed: number = 1) {
        this.position = pos;
        this.velocity = vel;
        if (path) {
            this.animation = new Animate(ctx, path, frames, speed, this);
        }
    }

    public get pos(): Vector {
        return this.position
    }
    public set pos(value: Vector) {
        this.position = value;
    }

    public get vel(): Vector {
        return this.velocity
    }
    public set vel(value: Vector) {
        this.velocity = value;
    }

    public update() {
        if (this.animation) {
            this.animation.draw();
        }
        this.move();
    }

    private move() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
}