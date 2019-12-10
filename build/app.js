class Animate {
    constructor(ctx, path, noOfFrames, anispeed, object) {
        this.ctx = ctx;
        this.img = this.loadImage(path);
        this.noOfFrames = noOfFrames;
        this.currentFrame = 0;
        this.aniSpeed = anispeed;
        this.counter = 0;
        this.object = object;
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
                if (this.currentFrame < this.noOfFrames - 1) {
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
    get imageHeight() {
        return this.img.height / this.noOfFrames;
    }
    get imageWidth() {
        return this.img.width;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.currentScreen.increaseFrameCounter();
            this.currentScreen.listen(this.input);
            this.currentScreen.move(this.canvas);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw(this.ctx);
<<<<<<< HEAD
=======
            this.aniTest.update();
            this.Player.update();
            this.Player.playerMove(this.canvas);
>>>>>>> edfd0089dd7c237d8b40025fba588160251c2689
            requestAnimationFrame(this.loop);
            this.currentScreen.adjust(this);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.documentElement.style.overflow = 'hidden';
        this.ctx = this.canvas.getContext("2d");
<<<<<<< HEAD
        this.currentScreen = new BossScreen(this);
=======
        this.aniTest = new GameObject(new Vector(100, 100), new Vector(0, 0), this.ctx, "./urawizardgandalf2.png", 4, 20);
        this.Player = new Player(new Vector(200, 200), new Vector(0, 0), this.ctx, './frog side.png', 20, 1);
        this.currentScreen = new LoadingScreen(this);
>>>>>>> edfd0089dd7c237d8b40025fba588160251c2689
        this.input = new UserInput();
        this.loop();
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    switchScreen(newScreen) {
        if (newScreen == null) {
            throw new Error("newScreen cannot be null");
        }
        if (newScreen != this.currentScreen) {
            this.currentScreen = newScreen;
        }
    }
}
let init = function () {
    const game = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_W = 87;
KeyboardListener.KEY_A = 65;
KeyboardListener.KEY_S = 83;
KeyboardListener.KEY_D = 68;
KeyboardListener.KEY_ENTER = 13;
KeyboardListener.KEY_BACK = 8;
class UserInput {
    constructor() {
        this.inWindow = true;
        this.position = new Vector();
        this.buttonDown = false;
        this.keyCodeStates = new Array();
        this.mouseDown = (ev) => {
            this.buttonDown = true;
        };
        this.mouseUp = (ev) => {
            this.buttonDown = false;
        };
        this.mouseMove = (ev) => {
            this.position = new Vector(ev.clientX, ev.clientY);
        };
        this.mouseEnter = (ev) => {
            this.inWindow = true;
        };
        this.mouseLeave = (ev) => {
            this.inWindow = true;
        };
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseenter", this.mouseEnter);
        document.addEventListener("mouseleave", this.mouseLeave);
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
}
UserInput.KEY_ESC = 27;
UserInput.KEY_SPACE = 32;
UserInput.KEY_LEFT = 37;
UserInput.KEY_UP = 38;
UserInput.KEY_RIGHT = 39;
UserInput.KEY_DOWN = 40;
UserInput.KEY_D = 68;
UserInput.KEY_S = 83;
UserInput.KEY_W = 87;
UserInput.KEY_A = 65;
UserInput.KEY_BACK = 8;
UserInput.KEY_ENTER = 13;
class Vector {
    constructor(xpos = 0, ypos = 0) {
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
class GameObject {
    constructor(pos, vel, ctx, path, frames = 1, speed = 1) {
        this.position = pos;
        this.velocity = vel;
        if (path) {
            this.animation = new Animate(ctx, path, frames, speed, this);
        }
    }
    get pos() {
        return this.position;
    }
    set pos(value) {
        this.position = value;
    }
    get vel() {
        return this.velocity;
    }
    set vel(value) {
        this.velocity = value;
    }
    update() {
        if (this.animation) {
            this.animation.draw();
        }
        this.move();
    }
    move() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
}
class Boss extends GameObject {
    constructor(pos, vel, ctx, path, frames = 0, speed = 0) {
        super(pos, vel, ctx, path, frames, speed);
        this.attack = new Array;
        for (let i = 0; i < 5; i++) {
            this.attack[0] = new Codebeam(new Vector(100, 0), new Vector(0, .05), ctx);
            this.attack[1] = new Codebeam(new Vector(300, 0), new Vector(0, .02), ctx);
            this.attack[2] = new Codebeam(new Vector(200, 0), new Vector(0, .06), ctx);
            this.attack[3] = new Codebeam(new Vector(400, 0), new Vector(0, .07), ctx);
            this.attack[4] = new Codebeam(new Vector(500, 0), new Vector(0, .01), ctx);
            this.attack[5] = new Codebeam(new Vector(600, 0), new Vector(0, .08), ctx);
            this.attack[6] = new Codebeam(new Vector(700, 0), new Vector(0, .01), ctx);
            this.attack[7] = new Codebeam(new Vector(800, 0), new Vector(0, .02), ctx);
            this.attack[8] = new Codebeam(new Vector(900, 0), new Vector(0, .01), ctx);
            this.attack[9] = new Codebeam(new Vector(1000, 0), new Vector(0, .02), ctx);
            this.attack[10] = new Codebeam(new Vector(1100, 0), new Vector(0, .04), ctx);
            this.attack[11] = new Codebeam(new Vector(1200, 0), new Vector(0, .01), ctx);
            this.attack[12] = new Codebeam(new Vector(1300, 0), new Vector(0, .1), ctx);
            this.attack[13] = new Codebeam(new Vector(1400, 0), new Vector(0, .01), ctx);
        }
    }
    update() {
        this.vel.x = Math.random() - .5;
        this.vel.y = Math.random() - .5;
        this.attack.forEach(element => {
            element.update();
        });
        super.update();
    }
}
class Player extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed) {
        super(pos, vel, ctx, path, frames, speed);
        this.UserInput = new UserInput;
    }
    walk(canvas) {
        if (this.UserInput.isKeyDown(UserInput.KEY_RIGHT)) {
            this.pos.x++;
        }
        else if (this.UserInput.isKeyDown(UserInput.KEY_LEFT)) {
            this.pos.x--;
        }
        if (this.pos.y <= 300) {
            this.vel.y += 0.1;
        }
        else {
            this.vel.y = 0;
        }
    }
    jump(canvas) {
        if (this.UserInput.isKeyDown(UserInput.KEY_UP)) {
            this.pos.y -= 5;
        }
    }
}
class Codebeam extends GameObject {
    constructor(pos, vel, ctx, path = "", frames = 0, speed = 0) {
        super(pos, vel, ctx, path, frames, speed);
        this.ctx = ctx;
        this.rays = new Array;
        for (let j = 0; j < Math.floor(Math.random() * 5 + 1); j++) {
            this.rays[j] = new Array;
            for (let i = 0; i < Math.floor(Math.random() * 20 + 1); i++) {
                this.rays[j][i] = Math.random().toString(36).replace(/[^a-z]+/g, '').charAt(0);
                console.log(this.rays[j][i] + " " + j + " " + i);
            }
        }
    }
    draw() {
        for (let j = 0; j < this.rays.length - 1; j++) {
            for (let i = 0; i < this.rays[j].length - 1; i++) {
                this.rays[j][i] = Math.random().toString(36).replace(/[^a-z]+/g, '').charAt(0);
                this.writeTextToCanvas(this.rays[j][i], 20, j * 20 + this.pos.x, i * 20 + this.pos.y * 20, 'center', '#00FF00');
            }
        }
    }
    update() {
        this.draw();
        super.update();
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class GameScreen {
    constructor(game) {
        this.frameCount = 0;
        this.game = game;
        this.center = new Vector(game.canvas.width / 2, game.canvas.height / 2);
        this.previous_fps_tick = performance.now();
    }
    listen(input) {
    }
    move(canvas) {
    }
    collide() {
    }
    adjust(game) {
    }
    draw(ctx) {
    }
    drawDebugInfo(ctx) {
        const time_diff = performance.now() - this.previous_fps_tick;
        if (time_diff >= 1000) {
            this.current_fps = this.fps_count;
            this.fps_count = 0;
            this.previous_fps_tick = performance.now();
        }
        else {
            this.fps_count++;
        }
        const text = `${this.current_fps} FPS`;
        ctx.font = `12px Courier`;
        ctx.fillStyle = '#ffffb3';
        ctx.fillText(text, this.game.canvas.width - 100, this.game.canvas.height - 14);
    }
    increaseFrameCounter() {
        this.frameCount++;
    }
    writeTextToCanvas(ctx, text, fontSize = 20, position, alignment = "center", color = "white") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, position.x, position.y);
    }
    randomRoundedNumber(min, max) {
        return Math.round(this.randomNumber(min, max));
    }
    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
}
class BossScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
        this.boss = new Boss(new Vector(100, 100), new Vector(0, 0), this.game.ctx, "./urawizardgandalf2.png", 4, 20);
        this.player = new Player(new Vector(100, 100), new Vector(0, 0), this.game.ctx, "./Frog Down.png", 20, 1);
    }
    adjust(game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
    }
    draw(ctx) {
    }
}
class LevelScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
    }
    adjust(game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
    }
    draw(ctx) {
    }
    drawDebugInfo(ctx) {
    }
    writeLifeImagesToLevelScreen(ctx) {
    }
}
class LoadingScreen extends GameScreen {
    constructor(game) {
        super(game);
    }
    adjust(game) {
        if (this.frameCount > 10) {
            game.switchScreen(new StartScreen(this.game));
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, "LOADING...", 140, this.center);
    }
}
<<<<<<< HEAD
=======
class Player extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed) {
        super(pos, vel, ctx, path, frames, speed);
        this.UserInput = new UserInput;
    }
    playerMove(canvas) {
        if (this.UserInput.isKeyDown(UserInput.KEY_RIGHT) && (this.pos.x + this.animation.imageWidth) < canvas.width) {
            this.pos.x += 5;
        }
        else if (this.UserInput.isKeyDown(UserInput.KEY_LEFT) && this.pos.x >= 0) {
            this.pos.x -= 5;
        }
        if (this.pos.y + this.animation.imageHeight >= canvas.height) {
            this.vel.y = 0;
            this.pos.y = canvas.height - this.animation.imageHeight;
        }
        else {
            this.vel.y += 0.15;
        }
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && this.vel.y === 0) {
            this.vel.y -= 5;
        }
    }
}
>>>>>>> edfd0089dd7c237d8b40025fba588160251c2689
class StartScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldStartLevel = false;
    }
    listen(input) {
        if (input.isKeyDown(UserInput.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    adjust(game) {
        if (this.shouldStartLevel) {
            game.switchScreen(new LevelScreen(game));
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, "PRESS ENTER TO PLAY", 40, new Vector(this.center.x, this.center.y - 20));
    }
}
class TitleScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToStartScreen = false;
    }
    listen(input) {
        if (input.isKeyDown(UserInput.KEY_BACK)) {
            this.shouldSwitchToStartScreen = true;
        }
    }
    adjust(game) {
        if (this.shouldSwitchToStartScreen ||
            this.frameCount > 10 * 60) {
            game.switchScreen(new StartScreen(game));
        }
    }
    draw(ctx) {
        const x = this.game.canvas.width / 2;
        let y = this.game.canvas.height / 2;
    }
}
//# sourceMappingURL=app.js.map