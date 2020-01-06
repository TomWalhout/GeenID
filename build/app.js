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
        this.mirror = false;
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
            this.ctx.save();
            if (this.mirror) {
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(this.img, 0, this.currentFrame * this.frameHeight, this.img.width, this.frameHeight, this.object.pos.x * -1 - this.imageWidth * this.scale, this.object.pos.y, this.img.width * this.scale, this.frameHeight * this.scale);
            }
            else {
                this.ctx.drawImage(this.img, 0, this.currentFrame * this.frameHeight, this.img.width, this.frameHeight, this.object.pos.x, this.object.pos.y, this.img.width * this.scale, this.frameHeight * this.scale);
            }
            this.ctx.restore();
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
    set height(v) {
        this.img.height = v;
    }
    set mirrored(v) {
        this.mirror = v;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.currentScreen.increaseFrameCounter();
            this.currentScreen.move(this.canvas);
            this.currentScreen.collide();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw(this.ctx);
            this.currentScreen.listen(this.input);
            requestAnimationFrame(this.loop);
            this.currentScreen.adjust(this);
            if (this.input.isKeyDown(UserInput.KEY_1) && !(this.currentScreen instanceof Level1)) {
                this.switchScreen(new Level1(this));
            }
            if (this.input.isKeyDown(UserInput.KEY_2) && !(this.currentScreen instanceof Level2)) {
                this.switchScreen(new Level2(this));
            }
            if (this.input.isKeyDown(UserInput.KEY_3) && !(this.currentScreen instanceof Level3)) {
                this.switchScreen(new Level3(this));
            }
        };
        this.canvas = canvasId;
        this.canvas.width = 1366;
        this.canvas.height = 768;
        document.documentElement.style.overflow = 'hidden';
        this.ctx = this.canvas.getContext("2d");
        this.currentScreen = new SelectionScreen(this);
        this.input = new UserInput();
        this.Lives = 5;
        this.playerInfo = [];
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
    get lives() {
        return this.Lives;
    }
    set lives(v) {
        this.Lives = v;
    }
    get squary() {
        return this.squaryString;
    }
    set squary(v) {
        this.squaryString = v;
    }
    get userInput() {
        return this.input;
    }
    get playerinfo() {
        return this.playerInfo;
    }
    get bodySquary() {
        return this.squaryBody;
    }
    set bodySquary(v) {
        this.squaryBody = v;
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
UserInput.KEY_1 = 49;
UserInput.KEY_2 = 50;
UserInput.KEY_3 = 51;
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
    mirror_X() {
        return new Vector(this.x, this.y * -1);
    }
    mirror_Y() {
        return new Vector(this.x * -1, this.y);
    }
}
class GameObject {
    constructor(pos, vel, ctx, path, frames = 1, speed = 1, scale = 1, story = 0) {
        this.position = pos;
        this.velocity = vel;
        this.exists = true;
        this.scale = scale;
        this.Story = story;
        this.imgpath = path;
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
    get story() {
        return this.Story;
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
    get exist() {
        return this.exists;
    }
    set exist(v) {
        this.exists = v;
    }
    get path() {
        return this.imgpath;
    }
    set mirror(v) {
        this.animation.mirrored = v;
    }
}
class Program extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale, story) {
        super(pos, vel, ctx, path, frames, speed, scale, story);
        this.open = false;
        this.ctx = ctx;
        this.ads = false;
    }
    wait() {
        if (this.animation.imageWidth > 0 && !this.closeButton) {
            this.setCloseButton();
        }
    }
    setCloseButton() {
        this.closeButton = new CloseButton(new Vector(this.pos.x + this.animation.imageWidth * this.scale - 30, this.pos.y), new Vector(0, 0), this.ctx, "./transparent.png", 1, 1, 0.5);
    }
    update() {
        this.wait();
        super.update();
    }
    get isOpen() {
        return this.open;
    }
    set isOpen(value) {
        this.open = value;
    }
    get button() {
        return this.closeButton;
    }
    get hasAds() {
        return this.ads;
    }
    set hasAds(v) {
        this.ads = v;
    }
    get storyFlag() {
        return this.story;
    }
}
class CloseButton extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
    }
}
class Ad extends Program {
    constructor(pos, vel, ctx, path, frames, speed, scale) {
        super(pos, vel, ctx, path, frames, speed, scale, 0);
        this.open = true;
        this.ctx = ctx;
        this.respawn = false;
    }
    get respawning() {
        return this.respawn;
    }
    set respawning(v) {
        this.respawn = v;
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
            this.currentAttack.forEach(element => {
                element.update();
            });
        }
        super.update();
    }
    Attack() {
        let chance = 0;
        switch (chance) {
            case 0:
                this.currentAttack = new Array;
                for (let i = 1; i < 8; i++) {
                    console.log("apoejrgiajerg");
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
    get attack() {
        return this.currentAttack[0];
    }
}
class Enemy extends GameObject {
    constructor(pos, vel, ctx, path, screen, frames = 0, speed = 0, scale = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.screen = screen;
    }
    update() {
        super.update();
    }
    enemyMove(canvas) {
        if (this.pos.x + this.animation.imageWidth >= canvas.width ||
            this.pos.x < 0) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y + this.animation.imageHeight >= canvas.height ||
            this.pos.y < 0) {
            this.vel.y = -this.vel.y;
        }
        this.pos.x += this.vel.x;
    }
}
class IDcard extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale, game) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.pos.x -= 226;
        this.prevlives = 5;
        this.game = game;
        this.lives = this.game.lives;
    }
    update() {
        super.update();
        if (this.lives < this.prevlives) {
            console.log(this.lives);
            this.prevlives--;
            this.animation = new Animate(this.ctx, `./assets/idcard/idCard${this.lives}.png`, 1, 1, this, 1.5);
        }
        if (this.lives <= 0) {
            console.log("you dead mah boi");
            this.game.switchScreen(new LevelScreen(this.game));
        }
    }
    set youGotRekt(v) {
        this.lives = v;
    }
    get youGotRekt() {
        return this.lives;
    }
}
class Icon extends GameObject {
}
class Player extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale, body) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.faceAnimation = new Animate(ctx, body, 1, 1, this, 1);
        this.UserInput = new UserInput;
        this.hasSword = false;
        this.scale = scale;
        this.standsOnGround = false;
        this.walljump = false;
    }
    update() {
        if (this.faceAnimation) {
            this.faceAnimation.draw();
        }
        super.update();
    }
    playerMove(canvas) {
        if (this.UserInput.isKeyDown(UserInput.KEY_RIGHT) && (this.pos.x + (this.animation.imageWidth * this.scale)) < canvas.width) {
            this.pos.x += 5;
            this.animation.mirrored = false;
        }
        else if (this.UserInput.isKeyDown(UserInput.KEY_LEFT) && this.pos.x >= 0) {
            this.pos.x -= 5;
            this.animation.mirrored = true;
        }
        if (this.pos.y + (this.animation.imageHeight * this.scale) >= canvas.height) {
            this.vel.y = 0;
            this.pos.y = canvas.height - this.animation.imageHeight * this.scale;
            this.standsOnGround = true;
        }
        else if (!this.standsOnGround) {
            this.vel.y += 0.15;
        }
        else if (this.standsOnGround) {
            this.vel.y = 0;
        }
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && this.standing) {
            this.vel.y -= 8;
            this.standing = false;
        }
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && !this.walljump && (this.pos.x < 2 || this.pos.x + this.animation.imageWidth > 1364)) {
            this.vel.y -= 5;
            this.standing = false;
            this.walljump = true;
        }
        if (this.standing) {
            this.walljump = false;
        }
        if (this.hasSword == true && this.UserInput.isKeyDown(UserInput.KEY_SPACE)) {
            console.log('Hiyaa!');
        }
        if (this.UserInput.isKeyDown(UserInput.KEY_ENTER) && this.hasSword == false) {
            console.log('tadadADADAAAAAA');
            this.hasSword = true;
        }
    }
    get standing() {
        return this.standsOnGround;
    }
    set standing(value) {
        this.standsOnGround = value;
    }
}
class SearchBar extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale) {
        super(pos, vel, ctx, path, frames, speed, scale, 0);
        this.ctx = ctx;
    }
    update() {
        super.update();
    }
}
class Sword extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.scale = scale;
        this.ctx = ctx;
    }
    update() {
        super.update();
    }
    movePos(player) {
        this.pos.x = player.pos.x + 50;
        this.pos.y = player.pos.y - 30;
    }
}
class Wizard extends GameObject {
    constructor(pos, vel, ctx, path, frames = 0, speed = 0, scale = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
    }
}
class Codebeam extends GameObject {
    constructor(pos, vel, ctx, path = "./transparent.png", frames = 1, speed = 1) {
        super(pos, vel, ctx, path, frames, speed);
        this.ctx = ctx;
        this.attackTimer = 0;
        this.waveTimer = 0;
        this.rays = new Array;
        this.animation.height = 500;
    }
    init() {
        for (let j = 0; j < Math.floor(Math.random() * 10 + 1); j++) {
            this.rays[j] = new Array;
            for (let i = 0; i < Math.floor(Math.random() * 25 + 5); i++) {
                this.rays[j][i] = Math.random().toString(36).replace(/[^a-z]+/g, '').charAt(0);
                this.writeTextToCanvas(this.rays[j][i], 20, j * 20 + this.pos.x, i * 20 + this.pos.y * 20, 'center', '#00FF00');
            }
        }
    }
    draw() {
        this.drawBox();
        this.init();
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
        if (a[0] <= b[0] && a[1] > b[0]) {
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
    createHitbox(left, right, up, down) {
        return [left, right, up, down];
    }
}
class BossScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
        this.boss = new Boss(new Vector(100, 400), new Vector(0, 0), this.game.ctx, "./assets/urawizardgandalf.png", this, 6, 20);
        this.player = new Player(new Vector(100, 900), new Vector(0, 0), this.game.ctx, "./assets/Squary.png", 1, 1, 1, this.game.bodySquary);
        this.sword = new Sword(new Vector(140, 675), new Vector(0, 0), this.game.ctx, "./assets/mastersword.png", 1, 1, 0.1);
        this.enemy = [];
        for (let i = 0; i < 8; i++) {
            this.enemy[i] = new Enemy(new Vector(this.randomNumber(100, this.game.canvas.width - 100), this.randomNumber(100, this.game.canvas.height - 100)), new Vector(this.randomNumber(-4, 4), this.randomNumber(-2, 2)), this.game.ctx, "./assets/Enemy.png", this, 1, 1);
        }
        this.id = new IDcard(new Vector(this.game.canvas.width, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard5.png', 1, 1, 1.5, game);
        this.enemyLives = 100;
    }
    adjust(game) {
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i].enemyMove(this.game.canvas);
        }
        this.player.playerMove(this.game.canvas);
    }
    draw(ctx) {
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i].update();
        }
        this.boss.update();
        this.player.update();
        if (this.player.hasSword) {
            this.sword.movePos(this.player);
            this.sword.update();
        }
        this.id.update();
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
        let sword = this.sword.box();
        for (let i = 0; i < this.enemy.length; i++) {
            let enemy = this.enemy[i].box();
            if (this.collides(player, enemy)) {
                if (this.enemy[i].exist) {
                    this.enemy[i].exist = false;
                    this.id.youGotRekt = this.id.youGotRekt - 1;
                }
                this.playerLives--;
                this.sound();
            }
            if (this.collides(sword, enemy) && this.player.hasSword) {
                this.enemyLives--;
            }
            if (this.enemyLives < 1) {
                this.enemy[i].exist = false;
            }
            if (this.collides(player, enemy)) {
                if (this.enemy[i].exist) {
                    this.enemy[i].exist = false;
                    this.id.youGotRekt = this.id.youGotRekt - 1;
                }
            }
        }
        if (this.collides(player, boss)) {
            if (this.boss.exist) {
                this.boss.exist = false;
                this.id.youGotRekt = this.id.youGotRekt - 1;
            }
        }
        if (this.boss.attack) {
            if (this.collides(player, this.boss.attack.box())) {
                console.log("ohmygodtheykilledSquary!!");
            }
        }
    }
    sound() {
        let audio = new Audio('./assets/sounds/oof.mp3');
        audio.play();
    }
}
class LevelScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
        this.id = new IDcard(new Vector(this.game.canvas.width, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard.png', 1, 1, 1.5, game);
        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, this.game.squary, 1, 1, 1, this.game.bodySquary);
        document.body.style.backgroundImage = "url('./assets/xp-bg.png')";
        this.icons = [];
        this.programs = [];
        this.ads = [];
        this.storyFlag = 0;
        this.userinput = new UserInput();
    }
    draw(ctx) {
        this.id.update();
        for (let i = 0; i < this.programs.length; i++) {
            if (this.programs[i].isOpen && this.programs[i].storyFlag <= this.storyFlag) {
                this.programs[i].update();
            }
        }
        for (let i = 0; i < this.icons.length; i++) {
            if (this.icons[i].story <= this.storyFlag) {
                this.icons[i].update();
            }
        }
        this.ads.forEach(e => { e.update(); });
        this.writeTextToCanvas(this.game.ctx, this.game.playerinfo[0], 20, new Vector(this.game.canvas.width - 30, 30), "right", "#000000");
        this.writeTextToCanvas(this.game.ctx, this.game.playerinfo[1], 20, new Vector(this.game.canvas.width - 30, 60), "right", "#000000");
        this.player.update();
    }
    collide() {
        let player = this.player.box();
        let playerbottom = [player[0], player[1], player[3], player[3] + 2];
        let onground = false;
        this.programs.forEach(program => {
            if (program.isOpen) {
                let programbox = program.box();
                program.drawBox();
                let upperbox = [programbox[0], programbox[1], programbox[2], programbox[2] + 10];
                if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0 && !this.player.standing) {
                    onground = true;
                }
            }
        });
        this.ads.forEach(ad => {
            let adbox = ad.box();
            ad.drawBox();
            let upperbox = [adbox[0], adbox[1], adbox[2], adbox[2] + 10];
            if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0 && !this.player.standing) {
                onground = true;
            }
        });
        if (onground) {
            this.player.vel.y = 0;
            this.player.standing = true;
        }
        else {
            this.player.standing = false;
        }
    }
    closeProgram() {
        for (let i = 0; i < this.programs.length; i++) {
            if (this.programs[i].button) {
                if (this.programs[i].button.clickedOn(this.userinput)) {
                    this.programs[i].isOpen = false;
                    if (this.programs[i].hasAds) {
                        this.ads.forEach(element => {
                            element.isOpen = false;
                            element.respawning = false;
                        });
                    }
                }
            }
        }
    }
    closeAds() {
        for (let i = 0; i < this.ads.length; i++) {
            if (this.ads[i].button) {
                if (this.ads[i].button.clickedOn(this.userinput)) {
                    this.ads.splice(i, 1);
                }
            }
        }
    }
    clickedIcon() {
        for (let i = 0; i < this.icons.length; i++) {
            if (this.icons[i].clickedOn(this.userinput)) {
                this.programs[i].isOpen = true;
            }
        }
    }
    listen(userinput) {
        this.player.playerMove(this.game.canvas);
    }
    sound() {
        let audio = new Audio('./assets/sounds/errorxp.mp3');
        audio.play();
    }
    get story() {
        return this.storyFlag;
    }
    set story(v) {
        this.storyFlag = v;
    }
}
class Level1 extends LevelScreen {
    constructor(game) {
        super(game);
        this.icons[0] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4, 0);
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4, 1);
        this.icons[2] = new Icon(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/icons/pijl.png', 5, 10, 1.4, 1);
        this.programs[0] = new Program(new Vector(400, 550), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.7, 0);
        this.programs[1] = new Program(new Vector(100, 400), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.4, 1);
        this.programs[1].isOpen = false;
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 120, this.game.canvas.height - 100), new Vector(0, 0), this.game.ctx, './assets/urawizardgandalf.png', 6, 20, 1);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 380, this.game.canvas.height - 260), new Vector(0, 0), this.game.ctx, './assets/textbox.png', 1, 1, 2.5);
    }
    draw() {
        this.updateOtherThings();
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.storyCheck();
        super.draw(this.game.ctx);
    }
    storyCheck() {
        let player = this.player.box();
        let wiz = this.wizard.box();
        if (this.collides(player, wiz) && this.story < 1) {
            this.story = this.story + 1;
        }
        let Glooole = this.icons[1].box();
        if (this.collides(Glooole, player)) {
            this.game.switchScreen(new Level2(this.game));
        }
    }
    updateOtherThings() {
        this.wizard.update();
        if (this.story > 0) {
            this.textbox.update();
        }
    }
}
class Level1Update extends LevelScreen {
    constructor(game) {
        super(game);
        this.icons[0] = new Icon(new Vector(0, 200), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4);
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4);
        this.programs[0] = new Program(new Vector(100, 20), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.7, 0);
        this.programs[1] = new Program(new Vector(400, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 0);
        this.programs[1].hasAds = true;
    }
    draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.nextLevel();
    }
    nextLevel() {
        let player = this.player.box();
        let Glooole = this.icons[1].box();
        if (this.collides(Glooole, player)) {
            this.game.switchScreen(new Level1(this.game));
        }
    }
}
class Level2 extends LevelScreen {
    constructor(game) {
        super(game);
        this.icons[0] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/DEZEPC.png', 1, 1, 1.4);
        this.icons[1] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4);
        this.icons[2] = new Icon(new Vector(1450, 200), new Vector(0, 0), this.game.ctx, './assets/icons/bugFile.png', 1, 1, 0.3);
        this.programs[0] = new Program(new Vector(100, 500), new Vector(0, 0), this.game.ctx, './assets/windows/DEZEPC.png', 1, 1, 0.5, 0);
        this.programs[1] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, './assets/windows/Spotify.png', 1, 1, 0.6, 0);
        this.programs[1].hasAds = true;
        this.programs[2] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0);
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 1000, this.game.canvas.height - 550), new Vector(0, 0), this.game.ctx, './assets/urawizardgandalf.png', 6, 10, 1);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 1300, this.game.canvas.height - 700), new Vector(0, 0), this.game.ctx, './assets/textbox2.png', 1, 1, 1.5);
    }
    draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.nextLevel();
        this.wizard.update();
        this.textbox.update();
    }
    nextLevel() {
        let player = this.player.box();
        let file = this.icons[2].box();
        if (this.collides(file, player)) {
            this.game.switchScreen(new Level3(this.game));
        }
    }
}
class Level3 extends LevelScreen {
    constructor(game) {
        super(game);
        this.programs[0] = new Program(new Vector(300, 480), new Vector(0, 0), this.game.ctx, './transparentBreed.png', 1, 1, 1, 0);
        document.body.style.backgroundImage = "url('./assets/Glooole-bg.png')";
        this.programs[0].isOpen = true;
        this.programs[0].hasAds = true;
        this.ads[0] = new Ad(new Vector(300, 300), new Vector(0, 0), this.game.ctx, './assets/ad1.png', 1, 1, 1);
    }
    draw() {
        this.programs[0].drawBox();
        super.draw(this.game.ctx);
    }
}
class SelectionScreen extends GameScreen {
    constructor(game) {
        super(game);
        let pos = new Vector(this.game.canvas.width / 2 - 20, this.game.canvas.height / 2);
        let vel = new Vector(0, 0);
        this.counter = 0;
        this.bodyCounter = 0;
        this.BodyOptions = [];
        this.BodyOptions[0] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/body/squaryBlue.png", 1, 1, 1, 0);
        this.BodyOptions[1] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/body/squaryGreen.png", 1, 1, 1, 0);
        this.BodyOptions[2] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/body/squaryPink.png", 1, 1, 1, 0);
        this.BodyOptions[3] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/body/squaryRainbow.png", 1, 1, 1, 0);
        this.BodyOptions[4] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/body/squaryRed.png", 1, 1, 1, 0);
        this.BodyOptions[5] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/body/squaryYellow.png", 1, 1, 1, 0);
        this.FaceOptions = [];
        this.FaceOptions[0] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/happyBlue.png", 1, 1, 1, 0);
        this.FaceOptions[1] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/happyGreen.png", 1, 1, 1, 0);
        this.FaceOptions[2] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/happyGrey.png", 1, 1, 1, 0);
        this.FaceOptions[3] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/happyPink.png", 1, 1, 1, 0);
        this.FaceOptions[4] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/happyRed.png", 1, 1, 1, 0);
        this.FaceOptions[5] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/happyYellow.png", 1, 1, 1, 0);
        this.FaceOptions[6] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/interestedSquary.png", 1, 1, 1, 0);
        this.FaceOptions[7] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/madBlue.png", 1, 1, 1, 0);
        this.FaceOptions[8] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/madGreen.png", 1, 1, 1, 0);
        this.FaceOptions[9] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/madGrey.png", 1, 1, 1, 0);
        this.FaceOptions[10] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/madPink.png", 1, 1, 1, 0);
        this.FaceOptions[11] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/madRed.png", 1, 1, 1, 0);
        this.FaceOptions[12] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/madYellow.png", 1, 1, 1, 0);
        this.FaceOptions[13] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/unicornBlue.png", 1, 1, 1, 0);
        this.FaceOptions[14] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/unicornGreen.png", 1, 1, 1, 0);
        this.FaceOptions[15] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/unicornGrey.png", 1, 1, 1, 0);
        this.FaceOptions[16] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/unicornRed.png", 1, 1, 1, 0);
        this.FaceOptions[17] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/unicornPink.png", 1, 1, 1, 0);
        this.FaceOptions[18] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/unicornYellow.png", 1, 1, 1, 0);
        this.FaceOptions[19] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/ninjaYellow.png", 1, 1, 1, 0);
        this.FaceOptions[20] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/ninjaRed.png", 1, 1, 1, 0);
        this.FaceOptions[21] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/ninjaPink.png", 1, 1, 1, 0);
        this.FaceOptions[22] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/ninjaBlue.png", 1, 1, 1, 0);
        this.FaceOptions[23] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/ninjaGreen.png", 1, 1, 1, 0);
        this.FaceOptions[24] = new GameObject(pos, vel, this.game.ctx, "./assets/squaryArmy/face/ninjaGrey.png", 1, 1, 1, 0);
        this.toggle1 = false;
        this.toggle2 = false;
        this.bodytoggle1 = false;
        this.bodytoggle2 = false;
        this.knop = [];
        this.knop[0] = new GameObject(new Vector(this.game.canvas.width / 2 - 100, this.game.canvas.height / 2 - 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[2] = new GameObject(new Vector(this.game.canvas.width / 2 - 100, this.game.canvas.height / 2 + 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[1] = new GameObject(new Vector(this.game.canvas.width / 2 + 100, this.game.canvas.height / 2 - 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[3] = new GameObject(new Vector(this.game.canvas.width / 2 + 100, this.game.canvas.height / 2 + 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[1].mirror = true;
        this.knop[3].mirror = true;
    }
    draw() {
        let text = "Kies je speler";
        this.writeTextToCanvas(this.game.ctx, text, 69, new Vector(this.game.canvas.width / 2, 200), "center", "#FF0000");
        text = "Druk op enter om te beginnen";
        this.writeTextToCanvas(this.game.ctx, text, 60, new Vector(this.game.canvas.width / 2, 600), "center", "#FF0000");
        this.BodyOptions[this.bodyCounter].update();
        this.FaceOptions[this.counter].update();
        this.drawButtons();
        if (this.game.userInput.isKeyDown(UserInput.KEY_ENTER)) {
            this.game.playerinfo[0] = prompt("Wacht even! Wat is je naam?", "Squary");
            this.game.playerinfo[1] = prompt("En hoe oud ben je?", "10") + " jaar";
            this.game.squary = this.FaceOptions[this.counter].path;
            this.game.bodySquary = this.BodyOptions[this.bodyCounter].path;
            this.game.switchScreen(new Level1(this.game));
        }
    }
    drawButtons() {
        this.knop.forEach(e => {
            e.update();
        });
        if (this.knop[1].clickedOn(this.game.userInput) && !this.toggle1) {
            this.toggle1 = true;
            this.counter++;
            if (this.counter >= this.FaceOptions.length) {
                this.counter = 0;
            }
        }
        else if (this.knop[0].clickedOn(this.game.userInput) && !this.toggle2) {
            this.toggle2 = true;
            this.counter--;
            if (this.counter < 0) {
                this.counter = this.FaceOptions.length - 1;
            }
        }
        if (!this.knop[1].clickedOn(this.game.userInput)) {
            this.toggle1 = false;
        }
        if (!this.knop[0].clickedOn(this.game.userInput)) {
            this.toggle2 = false;
        }
        if (!this.knop[2].clickedOn(this.game.userInput)) {
            this.bodytoggle1 = false;
        }
        if (!this.knop[3].clickedOn(this.game.userInput)) {
            this.bodytoggle2 = false;
        }
        if (this.knop[2].clickedOn(this.game.userInput) && !this.bodytoggle1) {
            this.bodytoggle1 = true;
            this.bodyCounter++;
            if (this.bodyCounter >= this.BodyOptions.length) {
                this.bodyCounter = 0;
            }
        }
        if (this.knop[3].clickedOn(this.game.userInput) && !this.bodytoggle2) {
            this.bodytoggle2 = true;
            this.bodyCounter--;
            if (this.bodyCounter < 0) {
                this.bodyCounter = this.BodyOptions.length - 1;
            }
        }
    }
}
//# sourceMappingURL=app.js.map