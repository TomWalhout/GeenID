/// <reference path="GameObject.ts"/>

class Player extends GameObject {

    private keyboardListener: KeyboardListener;

    public constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, frames: number, speed: number) {
        super(pos, vel, ctx, path, frames, speed)

        this.keyboardListener = new KeyboardListener;
    }

    public walk(canvas: HTMLCanvasElement) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
            this.pos.x++
        } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.pos.x--
        }
        if (this.pos.y <= 300) {
            this.vel.y += 0.1
        } else {
            this.vel.y = 0
        }
    }



    public jump(canvas: HTMLCanvasElement) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.pos.y -= 5
        }
    }
}