/// <reference path="./GameObject.ts"/>

class Player extends GameObject {

    private UserInput: UserInput;
    private hasSword: boolean;
    private scale: number;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number, scale: number) {
        super(pos, vel, ctx, path, frames, speed, scale)

        this.UserInput = new UserInput;
        this.hasSword = false;
        this.scale = scale
    }

    public playerMove(canvas: HTMLCanvasElement) {
        // Walk
        if (this.UserInput.isKeyDown(UserInput.KEY_RIGHT) && (this.pos.x + this.animation.imageWidth) < canvas.width) {
            this.pos.x += 5
        } else if (this.UserInput.isKeyDown(UserInput.KEY_LEFT) && this.pos.x >= 0) {
            this.pos.x -= 5
        }
        // Gravity
        if (this.pos.y + (this.animation.imageHeight * this.scale)>= canvas.height) {
            this.vel.y = 0
            this.pos.y = canvas.height - this.animation.imageHeight * this.scale
        } else {
            this.vel.y += 0.15
        }
        // Jump
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && this.vel.y === 0) {
            this.vel.y -= 5
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
}