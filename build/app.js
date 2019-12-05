class Animate {
    constructor(canvas, ctx, path, noOfFrames, anispeed, object = 0) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.img = this.loadImage(path);
        this.noOfFrames = noOfFrames;
        this.currentFrame = 1;
        this.aniSpeed = anispeed;
        this.counter = 0;
        this.x = Math.random() * 500;
    }
    loadImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }
    draw() {
        this.counter++;
        this.frameHeight = this.img.height / this.noOfFrames;
        if (this.counter > this.animationSpeed) {
            this.counter = 0;
            if (this.currentFrame < this.noOfFrames) {
                this.currentFrame += 1;
            }
            else {
                this.currentFrame = 0;
            }
        }
        console.log(this.counter);
        this.ctx.drawImage(this.img, 0, this.currentFrame * this.frameHeight, this.img.width, this.frameHeight, this.x, this.x, this.img.width, this.frameHeight);
    }
    set aniSpeed(speed) {
        this.animationSpeed = speed;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.aniTest.draw();
            this.aniTest2.draw();
            this.aniTest3.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.documentElement.style.overflow = 'hidden';
        this.ctx = this.canvas.getContext("2d");
        this.aniTest = new Animate(this.canvas, this.ctx, "./Frog Down.png", 20, 5);
        this.aniTest2 = new Animate(this.canvas, this.ctx, "./Frog Side.png", 20, 10);
        this.aniTest3 = new Animate(this.canvas, this.ctx, "./Frog Death.png", 5, 1);
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
//# sourceMappingURL=app.js.map