/// <reference path="../GameObject.ts"/>

class Codebeam extends GameObject {
    private char: string[];
    private rays: Array<Array<string>>;
    private attackTimer: number;
    private waveTimer: number;
    protected ctx: CanvasRenderingContext2D;
    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string = "", frames: number = 0, speed: number = 0) {
        super(pos, vel, ctx, path, frames, speed);
        this.ctx = ctx;
        this.attackTimer = 0;
        this.waveTimer = 0;
        //init the new rays 2d array
        this.rays = new Array;
        this.init();
    }

    private init() {
        for (let j = 0; j < Math.floor(Math.random() * 10 + 1); j++) {
            this.rays[j] = new Array;
            for (let i = 0; i < Math.floor(Math.random() * 25 + 5); i++) {
                this.rays[j][i] = Math.random().toString(36).replace(/[^a-z]+/g, '').charAt(0);
            }
        }
    }

    public draw() {
        for (let j = 0; j < this.rays.length - 1; j++) {
            for (let i = 0; i < this.rays[j].length - 1; i++) {
                this.rays[j][i] = Math.random().toString(36).replace(/[^a-z]+/g, '').charAt(0);
                this.writeTextToCanvas(this.rays[j][i], 20, j * 20 + this.pos.x, i * 20 + this.pos.y * 20, 'center', '#00FF00');
            }
        }
        this.drawBox();
    }

    public update() {
        this.draw();
        super.update();
    }

    private writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}