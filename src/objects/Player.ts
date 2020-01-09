/// <reference path="./GameObject.ts"/>

class Player extends GameObject {

    private UserInput: UserInput;
    protected scale: number;
    protected standsOnGround: boolean;
    private faceAnimation: Animate;
    private walljumpTrigger: boolean;
    private walljumpCooldown: number;
    private walljumpUsed: boolean;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number, body: string) {
        //Disable this next line for selection
        // path = "./assets/squary.png";
        super(pos, vel, ctx, path, frames, speed, scale)
        this.faceAnimation = new Animate(ctx, body, 1, 1, this, 1);
        this.UserInput = new UserInput;
        this.scale = scale
        this.standsOnGround = false;
        this.walljumpTrigger = false;
    }

    public update() {
        if (this.faceAnimation) {
            this.faceAnimation.draw();
        }
        super.update();
        this.walljumpCd();
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
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && !this.walljumpUsed && !this.walljumpTrigger && (this.pos.x < 2 || this.pos.x + this.animation.imageWidth > 1364)) {
            this.vel.y = -8;
            this.standing = false;
            this.walljumpTrigger = true;
            this.walljumpUsed = true;
        }

        //wall jump cooldown
        if (this.standing) {
            this.walljumpTrigger = true;
            this.walljumpCooldown = 20;
            this.walljumpUsed = false;
        }
    }

    // functie cooldown wall jump
    public walljumpCd() {
        if (!this.standing) {
            this.walljumpCooldown--
        }
        if (this.walljumpCooldown <= 0) {
            this.walljumpTrigger = false
        }
    }

    public get standing(): boolean {
        return this.standsOnGround;
    }

    public set standing(value: boolean) {
        this.standsOnGround = value;
    }
}