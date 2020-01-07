/// <reference path="./GameObject.ts"/>

class Player extends GameObject {

    private UserInput: UserInput;
    public hasSword: boolean;
    protected scale: number;
    protected standsOnGround: boolean;
    private faceAnimation: Animate;
    private walljump: boolean;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number, body: string) {
        //Disable this next line for selection
        // path = "./assets/squary.png";
        super(pos, vel, ctx, path, frames, speed, scale)
        this.faceAnimation = new Animate(ctx, body, 1, 1, this, 1);
        this.UserInput = new UserInput;
        this.hasSword = false;
        this.scale = scale
        this.standsOnGround = false;
        this.walljump = false;
    }

    public update() {
        if (this.faceAnimation) {
            this.faceAnimation.draw();
        }
        super.update();
    }

    public playerMove(canvas: HTMLCanvasElement) {

        // Walk
        if (this.UserInput.isKeyDown(UserInput.KEY_RIGHT) && (this.pos.x + (this.animation.imageWidth * this.scale)) < canvas.width) {
            this.pos.x += 5
            this.animation.mirrored = false;
        } else if (this.UserInput.isKeyDown(UserInput.KEY_LEFT) && this.pos.x >= 0) {
            this.pos.x -= 5
            this.animation.mirrored = true;
        }

        // Gravity + floor
        if (this.pos.y + (this.animation.imageHeight * this.scale) >= canvas.height - 45) { // 45 is de balk aan de onderkant van het scherm
            this.vel.y = 0
            this.pos.y = canvas.height - 45 - this.animation.imageHeight * this.scale
            this.standsOnGround = true;
        } else if (!this.standsOnGround) {
            this.vel.y += 0.15
        } else if (this.standsOnGround) {
            this.vel.y = 0;
        }

        // Jump
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && this.standing) {
            this.vel.y -= 8;
            this.standing = false;
        }

        //wall jump
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && !this.walljump && (this.pos.x < 2 || this.pos.x + this.animation.imageWidth > 1364)) {
            this.vel.y -= 5;
            this.standing = false;
            this.walljump = true;
        }

        //wall jump cooldown
        if (this.standing) {
            this.walljump = false;
        }
        // Attack
        if (this.hasSword == true && this.UserInput.isKeyDown(UserInput.KEY_SPACE)) {
            console.log('Hiyaa!');
        }

        // test
        if (this.UserInput.isKeyDown(UserInput.KEY_ENTER) && this.hasSword == false) {
            console.log('tadadADADAAAAAA')
            this.hasSword = true;
        }

    }

    public get standing(): boolean {
        return this.standsOnGround;
    }

    public set standing(value: boolean) {
        this.standsOnGround = value;
    }
}