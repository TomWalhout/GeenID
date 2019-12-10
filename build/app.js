class Animate {
    constructor(ctx, path, noOfFrames, anispeed, object) {
        this.ctx = ctx;
        this.img = this.loadImage(path);
        this.noOfFrames = noOfFrames;
        this.currentFrame = 1;
        this.aniSpeed = anispeed;
        this.counter = 0;
        this.object = object;
        this.x = Math.random() * 500;
    }
    loadImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }
    draw() {
        if (this.img.naturalHeight > 0) {
            this.counter++;
            this.frameHeight = this.img.height / this.noOfFrames;
            if (this.counter >= this.animationSpeed) {
                this.counter = 0;
                if (this.currentFrame < this.noOfFrames) {
                    this.currentFrame += 1;
                }
                else {
                    this.currentFrame = 0;
                }
            }
            this.ctx.drawImage(this.img, 0, this.currentFrame * this.frameHeight, this.img.width, this.frameHeight, this.object.pos.x, this.object.pos.y, this.img.width, this.frameHeight);
        }
    }
    set aniSpeed(speed) {
        this.animationSpeed = speed;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.aniTest.update();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.documentElement.style.overflow = 'hidden';
        this.ctx = this.canvas.getContext("2d");
        this.aniTest = new GameObject(new Vector(200, 300), new Vector(0, 0), this.ctx, "./urawizardgandalf2.png", 4, 20);
        this.loop();
    }
    drawit(img) {
        this.ctx.drawImage(img, 200, 200);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    loadImage(source, callback) {
        const imageElement = new Image();
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });
        imageElement.src = source;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = function () {
    const game = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameObject {
    constructor(pos, vel, ctx, path, frames, speed) {
        this.position = pos;
        this.velocity = vel;
        this.animation = new Animate(ctx, path, frames, speed, this);
    }
    get pos() {
        return this.position;
    }
    set pos(value) {
        this.position = value;
    }
    update() {
        this.animation.draw();
        this.move();
    }
    move() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
}
class Vector {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }
    get x() {
        return this.xpos;
    }
    set x(value) {
        this.xpos = value;
    }
    get y() {
        return this.ypos;
    }
    set y(value) {
        this.ypos = value;
    }
}
//# sourceMappingURL=app.js.map