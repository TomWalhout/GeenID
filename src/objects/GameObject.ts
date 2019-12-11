class GameObject {
    protected position: Vector;
    protected velocity: Vector;
    protected animation: Animate;
    protected ctx: CanvasRenderingContext2D;
    private classname: string;
    private exist: boolean;
    protected scale: number;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path?: string, frames: number = 1, speed: number = 1, scale: number = 1) {
        this.position = pos;
        this.velocity = vel;
        this.exist = true;
        this.scale = scale;
        if (path) {
            this.animation = new Animate(ctx, path, frames, speed, this, scale);
        } else {
            this.animation = new Animate(ctx, "", 1, 1, this)
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
        if (this.exist) {
            if (this.animation) {
                this.animation.draw();
            }
            this.move();
        }
    }

    private move() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }


    public box(): Array<number> {
        return [this.pos.x, this.pos.x + this.animation.imageWidth * this.scale, this.pos.y, this.pos.y + this.animation.imageHeight * this.scale];
    }


    //FOR TESTING ONLY
    public drawBox() {
        let box = this.box();
        this.ctx.beginPath();
        this.ctx.moveTo(box[0], box[2]); //topleft
        this.ctx.lineTo(box[0], box[3]); //bottomleft
        this.ctx.lineTo(box[1], box[3]); //bottomright
        this.ctx.lineTo(box[1], box[2]); //topright
        this.ctx.lineTo(box[0], box[2]); //topleft
        this.ctx.closePath();
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
    }
}
