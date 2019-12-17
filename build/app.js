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
            if (this.input.isKeyDown(UserInput.KEY_1) && !(this.currentScreen instanceof LevelScreen)) {
                this.switchScreen(new LevelScreen(this));
            }
            if (this.input.isKeyDown(UserInput.KEY_2) && !(this.currentScreen instanceof BossScreen)) {
                this.switchScreen(new BossScreen(this));
            }
            if (this.input.isKeyDown(UserInput.KEY_3) && !(this.currentScreen instanceof Level2)) {
                this.switchScreen(new Level2(this));
            }
        };
        this.canvas = canvasId;
        this.canvas.width = 1536;
        this.canvas.height = 722;
        document.documentElement.style.overflow = 'hidden';
        this.ctx = this.canvas.getContext("2d");
        this.currentScreen = new Level1(this);
        this.input = new UserInput();
        this.Lives = 5;
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
    constructor(pos, vel, ctx, path, frames = 1, speed = 1, scale = 1) {
        this.position = pos;
        this.velocity = vel;
        this.exists = true;
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
    get exist() {
        return this.exists;
    }
    set exist(v) {
        this.exists = v;
    }
}
class Program extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale, story) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.story = story;
        this.open = true;
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
    spawnEnemy() {
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
    constructor(pos, vel, ctx, path, frames, speed, scale) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.UserInput = new UserInput;
        this.hasSword = false;
        this.scale = scale;
        this.standsOnGround = false;
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
            this.vel.y -= 12;
            this.standing = false;
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
        this.player = new Player(new Vector(100, 900), new Vector(0, 0), this.game.ctx, "./assets/Squary.png", 1, 1, 1);
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
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
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
class Level1 extends GameScreen {
    constructor(game) {
        super(game);
        this.id = new IDcard(new Vector(this.game.canvas.width, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard.png', 1, 1, 1.5, game);
        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, './assets/Squary.png', 1, 1, 1);
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 120, this.game.canvas.height - 100), new Vector(0, 0), this.game.ctx, './assets/urawizardgandalf.png', 6, 20, 1);
        this.storyFlag = 0;
        this.openPrograms = [];
        this.openPrograms[0] = new Program(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.5, 0);
        this.openPrograms[1] = new Program(new Vector(300, 400), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 1);
        this.openPrograms[1].isOpen = false;
        this.icons = [];
        this.icons[0] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4);
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/Gloole.png', 1, 1, 1.4);
        this.icons[2] = new Icon(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/icons/pijl.png', 1, 1, 0.8);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 380, this.game.canvas.height - 350), new Vector(0, 0), this.game.ctx, './assets/textbox.png', 1, 1, 0.5);
    }
    draw() {
        console.log(this.storyFlag);
        this.id.update();
        this.wizard.update();
        for (let i = 0; i < this.openPrograms.length; i++) {
            if (i <= this.storyFlag) {
                if (this.openPrograms[i].isOpen) {
                    this.openPrograms[i].update();
                }
                this.icons[i].update();
            }
        }
        if (this.storyFlag > 0) {
            this.textbox.update();
            this.icons[2].update();
        }
        this.player.update();
    }
    collide() {
        let player = this.player.box();
        let wiz = this.wizard.box();
        if (this.collides(player, wiz) && this.storyFlag < 1) {
            this.storyFlag++;
        }
        let playerbottom = [player[0], player[1], player[3], player[3] + 2];
        let onground = false;
        this.openPrograms.forEach(program => {
            if (program.isOpen) {
                let programbox = program.box();
                let upperbox = [programbox[0], programbox[1], programbox[2], programbox[2] + 10];
                if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0 && !this.player.standing) {
                    onground = true;
                }
            }
        });
        if (onground) {
            this.player.vel.y = 0;
            this.player.standing = true;
        }
        else {
            this.player.standing = false;
        }
        let Glooole = this.icons[1].box();
        if (this.collides(Glooole, player)) {
            this.game.switchScreen(new Level2(this.game));
        }
    }
    listen(userinput) {
        this.player.playerMove(this.game.canvas);
        for (let i = 0; i < this.openPrograms.length; i++) {
            if (this.openPrograms[i].button) {
                if (this.openPrograms[i].button.clickedOn(userinput)) {
                    this.openPrograms[i].isOpen = false;
                }
            }
        }
        if (this.icons[0].clickedOn(userinput)) {
            this.openPrograms[0] = new Program(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.5, 0);
        }
        if (this.icons[1].clickedOn(userinput)) {
            this.openPrograms[1] = new Program(new Vector(400, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 1);
        }
    }
}
class LevelScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
        this.id = new IDcard(new Vector(this.game.canvas.width, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard.png', 1, 1, 1.5, game);
        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, './assets/Squary.png', 1, 1, 1);
        this.icons = [];
        this.programs = [];
        this.ads = [];
        this.userinput = new UserInput();
        this.storyFlag = 0;
    }
    draw(ctx) {
        this.id.update();
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].update();
        }
        for (let i = 0; i < this.programs.length; i++) {
            if (this.programs[i].isOpen && this.programs[i].storyFlag <= this.storyFlag) {
                this.programs[i].update();
            }
        }
        this.player.update();
    }
    collide() {
        let player = this.player.box();
        let playerbottom = [player[0], player[1], player[3], player[3] + 2];
        let onground = false;
        this.programs.forEach(program => {
            if (program.isOpen) {
                let programbox = program.box();
                let upperbox = [programbox[0], programbox[1], programbox[2], programbox[2] + 10];
                if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0 && !this.player.standing) {
                    onground = true;
                }
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
    listen() {
        this.player.playerMove(this.game.canvas);
    }
    sound() {
        let audio = new Audio('./assets/sounds/errorxp.mp3');
        audio.play();
    }
}
class Level2 extends LevelScreen {
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
class LevelScreen2 extends LevelScreen {
    constructor(game) {
        super(game);
        this.programs[3] = new Program(new Vector(600, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 1);
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