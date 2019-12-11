class Animate {
    constructor(ctx, path, noOfFrames, anispeed, object, scale = 1) {
        this.ctx = ctx;
        this.img = this.loadImage(path);
        this.noOfFrames = noOfFrames;
        this.currentFrame = 0;
        this.aniSpeed = anispeed;
        this.counter = 0;
        this.object = object;
        this.scale = scale;
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
            this.ctx.drawImage(this.img, 0, this.currentFrame * this.frameHeight, this.img.width, this.frameHeight, this.object.pos.x, this.object.pos.y, this.img.width * this.scale, this.frameHeight * this.scale);
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
            this.currentScreen.collide();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw(this.ctx);
            requestAnimationFrame(this.loop);
            this.currentScreen.adjust(this);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.documentElement.style.overflow = 'hidden';
        this.ctx = this.canvas.getContext("2d");
        this.currentScreen = new BossScreen(this);
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
    isMouseDown() {
        return this.buttonDown;
    }
    mousePos() {
        return this.position;
    }
    isInWindow() {
        return this.inWindow;
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
    constructor(pos, vel, ctx, path, frames = 1, speed = 1, scale = 1) {
        this.position = pos;
        this.velocity = vel;
        this.exist = true;
        this.scale = scale;
        if (path) {
            this.animation = new Animate(ctx, path, frames, speed, this, scale);
        }
        else {
            this.animation = new Animate(ctx, "", 1, 1, this);
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
        if (this.exist) {
            if (this.animation) {
                this.animation.draw();
            }
            this.move();
        }
    }
    move() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
    box() {
        return [this.pos.x, this.pos.x + this.animation.imageWidth * this.scale, this.pos.y, this.pos.y + this.animation.imageHeight * this.scale];
    }
    drawBox() {
        let box = this.box();
        this.ctx.beginPath();
        this.ctx.moveTo(box[0], box[2]);
        this.ctx.lineTo(box[0], box[3]);
        this.ctx.lineTo(box[1], box[3]);
        this.ctx.lineTo(box[1], box[2]);
        this.ctx.lineTo(box[0], box[2]);
        this.ctx.closePath();
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
    }
    clickedOn(userinput) {
        let box = this.box();
        if (userinput.isMouseDown()) {
            if (userinput.mousePos().x > box[0] && userinput.mousePos().x < box[1]) {
                if (userinput.mousePos().y > box[2] && userinput.mousePos().y < box[3]) {
                    return true;
                }
            }
        }
        return false;
    }
}
class Boss extends GameObject {
    constructor(pos, vel, ctx, path, screen, frames = 0, speed = 0, scale = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.attackTimer = 0;
        this.ctx = ctx;
        this.screen = screen;
        this.Attack();
    }
    update() {
        this.vel.x = Math.random() - .5;
        this.vel.y = Math.random() - .5;
        if (this.currentAttack) {
            let inList = false;
            this.currentAttack.forEach(element => {
                element.update();
            });
        }
        super.update();
        this.drawBox();
    }
    Attack() {
        let chance = 0;
        switch (chance) {
            case 0:
                this.currentAttack = new Array;
                for (let i = 1; i < 8; i++) {
                    this.currentAttack[i] = new Codebeam(new Vector(i * 100, 0), new Vector(0, .1 * i * Math.random()), this.ctx);
                }
                break;
            case 1:
                break;
            default:
                console.log("jammerjoh");
                break;
        }
    }
}
class Player extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.UserInput = new UserInput;
        this.hasSword = false;
        this.scale = scale;
    }
    playerMove(canvas) {
        if (this.UserInput.isKeyDown(UserInput.KEY_RIGHT) && (this.pos.x + this.animation.imageWidth) < canvas.width) {
            this.pos.x += 5;
        }
        else if (this.UserInput.isKeyDown(UserInput.KEY_LEFT) && this.pos.x >= 0) {
            this.pos.x -= 5;
        }
        if (this.pos.y + (this.animation.imageHeight * this.scale) >= canvas.height) {
            this.vel.y = 0;
            this.pos.y = canvas.height - this.animation.imageHeight * this.scale;
        }
        else {
            this.vel.y += 0.15;
        }
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && this.vel.y === 0) {
            this.vel.y -= 5;
        }
        if (this.hasSword == true && this.UserInput.isKeyDown(UserInput.KEY_SPACE)) {
            console.log('Hiyaa!');
        }
        if (this.UserInput.isKeyDown(UserInput.KEY_ENTER) && this.hasSword == false) {
            console.log('tadadADADAAAAAA');
            this.hasSword = true;
        }
    }
}
class Program extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed) {
        super(pos, vel, ctx, path, frames, speed);
    }
}
class Codebeam extends GameObject {
    constructor(pos, vel, ctx, path = "", frames = 0, speed = 0) {
        super(pos, vel, ctx, path, frames, speed);
        this.ctx = ctx;
        this.attackTimer = 0;
        this.waveTimer = 0;
        this.rays = new Array;
        this.init();
    }
    init() {
        for (let j = 0; j < Math.floor(Math.random() * 10 + 1); j++) {
            this.rays[j] = new Array;
            for (let i = 0; i < Math.floor(Math.random() * 25 + 5); i++) {
                this.rays[j][i] = Math.random().toString(36).replace(/[^a-z]+/g, '').charAt(0);
            }
        }
    }
    respawn() {
        if (this.waveTimer >= 60) {
            this.init();
            this.waveTimer = 0;
        }
        this.waveTimer++;
    }
    draw() {
        for (let j = 0; j < this.rays.length - 1; j++) {
            for (let i = 0; i < this.rays[j].length - 1; i++) {
                this.rays[j][i] = Math.random().toString(36).replace(/[^a-z]+/g, '').charAt(0);
                this.writeTextToCanvas(this.rays[j][i], 20, j * 20 + this.pos.x, i * 20 + this.pos.y * 20, 'center', '#00FF00');
            }
        }
        this.drawBox();
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
    collides(a, b) {
        let xoverlap = false;
        let yoverlap = false;
        if (a[0] < b[0] && a[1] > b[0]) {
            xoverlap = true;
        }
        if (a[0] > b[0] && a[0] < b[1]) {
            xoverlap = true;
        }
        if (a[2] < b[2] && a[3] > b[2] && a[3] < b[3]) {
            yoverlap = true;
        }
        if (a[2] > b[2] && a[2] < b[3]) {
            yoverlap = true;
        }
        return xoverlap && yoverlap;
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
        this.boss = new Boss(new Vector(100, 400), new Vector(0, 0), this.game.ctx, "./urawizardgandalf2.png", this, 4, 20);
        this.player = new Player(new Vector(100, 900), new Vector(0, 0), this.game.ctx, "./Frog Down.png", 20, 1, 1);
    }
    adjust(game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
        this.player.playerMove(this.game.canvas);
    }
    draw(ctx) {
        this.boss.update();
        this.player.update();
    }
    listen(userinput) {
        if (this.player.clickedOn(userinput)) {
            console.log("omg");
        }
        ;
        if (this.boss.clickedOn(userinput)) {
            console.log("aiergjoiajgn");
        }
    }
    collide() {
        let player = this.player.box();
        let boss = this.boss.box();
        if (this.collides(player, boss)) {
        }
    }
}
class LevelScreen extends GameScreen {
    constructor(game, ctx) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, './assets/Squary.png', 1, 1, 15);
        this.program1 = new Program(new Vector(100, 100), new Vector(0, 0), ctx, './assets/programs/Glooole.png', 1, 1);
    }
    adjust(game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
        this.player.playerMove(this.game.canvas);
    }
    draw(ctx) {
        this.program1.update();
        this.player.update();
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