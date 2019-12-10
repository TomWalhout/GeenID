/// <reference path="GameObject.ts"/>

class Player extends GameObject {

    private UserInput: UserInput;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number) {
        super(pos, vel, ctx, path, frames, speed)

        this.UserInput = new UserInput;
    }

    public walk(canvas: HTMLCanvasElement) {
        if (this.UserInput.isKeyDown(UserInput.KEY_RIGHT) && this.pos.x + this.animation.imageWidth > canvas.width) {
            this.pos.x + 5
        } else if (this.UserInput.isKeyDown(UserInput.KEY_LEFT) && this.pos.x >= 0) {
            this.pos.x - 5
        }
        if (this.pos.y + this.animation.imageHeight >= canvas.height) {
            this.vel.y = 0
        } else {
            this.vel.y += 0.1
        }
    }

    public jump(canvas: HTMLCanvasElement) {
        if (this.UserInput.isKeyDown(UserInput.KEY_UP)) {
            this.pos.y -= 5
        }
    }
}