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
            // if (this.userInput.isKeyDown(UserInput.KEY_1)) {
            //     this.switchScreen(new Level1(this));
            // }
            // if (this.userInput.isKeyDown(UserInput.KEY_2)) {
            //     this.switchScreen(new Level2(this));
            // }
            // if (this.userInput.isKeyDown(UserInput.KEY_3)) {
            //     this.switchScreen(new Level3(this));
            // }
            // if (this.userInput.isKeyDown(UserInput.KEY_4)) {
            //     this.switchScreen(new Level4(this));
            // }
            // if (this.userInput.isKeyDown(UserInput.KEY_5)) {
            //     this.switchScreen(new BossScreen(this));
            // }
            // if (this.userInput.isKeyDown(UserInput.KEY_6)) {
            //     this.switchScreen(new DeathScreen(this));
            // }
            // if (this.userInput.isKeyDown(UserInput.KEY_7)) {
            //     this.switchScreen(new WinScreen(this));
            // }
        };
        this.canvas = canvasId;
        this.canvas.width = 1366;
        this.canvas.height = 768;
        document.documentElement.style.overflow = 'hidden';
        this.ctx = this.canvas.getContext("2d");
        this.squaryString = "./assets/squaryArmy/face/happyBlue.png";
        this.squaryBody = "./assets/squaryArmy/body/squaryBlue.png";
        this.currentScreen = new HomeScreen(this);
        this.input = new UserInput();
        this.Lives = 5;
        this.playerInfo = [];
        this.playerInfo[0] = "Squary";
        this.playerInfo[1] = "12";
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
UserInput.KEY_4 = 52;
UserInput.KEY_5 = 53;
UserInput.KEY_6 = 54;
UserInput.KEY_7 = 55;
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
    get ani() {
        return this.animation;
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
    constructor(pos, vel, ctx, path, screen, frames = 0, speed = 0, scale = 1, game) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.screen = screen;
        this.currentAttack = new Array;
        this.attackTimer = 0;
        this.attackLimit = 120;
        this.game = game;
        this.healthbar = new Healthbar(new Vector(0, 0), new Vector(0, 0), ctx, "./assets/enemiesAndAllies/healthbar-red.png", 1, 1, 0.5, this);
        this.bossHealth = 100;
        this.healthbar.MaxHealth = this.bossHealth;
        this.newAttack();
    }
    update() {
        super.update();
        this.pos.x += Math.random() * 2 - 1;
        this.pos.y += Math.random() * 2 - 1;
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }
        if (this.pos.y > this.game.canvas.height + this.animation.imageHeight) {
            this.pos.y = this.game.canvas.height + this.animation.imageHeight;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.x >= this.game.canvas.width + this.animation.imageWidth) {
            this.pos.x = this.game.canvas.width + this.animation.imageWidth;
        }
        if (this.nextAttack || this.currentAttack.length === 0) {
            this.newAttack();
            this.nextAttack = false;
        }
        else {
            this.attackTimer++;
            if (this.attackTimer >= this.attackLimit) {
                this.nextAttack = true;
            }
        }
        for (let i = this.currentAttack.length - 1; i >= 0; i--) {
            this.currentAttack[i].update();
            if (this.currentAttack[i].pos.y > this.ctx.canvas.height || this.currentAttack[i].pos.x < -150 || this.currentAttack[i].pos.x > this.ctx.canvas.width) {
                this.currentAttack.splice(i, 1);
            }
        }
        this.checkBossHealth();
    }
    checkBossHealth() {
        this.healthbar.update();
        if (this.bossHealth <= 0) {
            this.game.switchScreen(new WinScreen(this.game));
        }
    }
    newAttack() {
        this.attackTimer = 0;
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                this.codeBeamAttack();
                break;
            case 1:
                this.enemyFlyBy();
                break;
            case 2:
                this.popUpOfDeath();
                break;
        }
    }
    codeBeamAttack() {
        this.attackLimit = 3000;
        for (let i = 0; i < 13; i++) {
            this.currentAttack[i] = new Codebeam(new Vector(i * 120 + Math.random() * 40, -(Math.random() * 100)), new Vector(0, 5 + Math.random() * 3), this.ctx, "./assets/enemiesAndAllies/testing.png", 4, 3, 1);
            if (this.currentAttack[i].pos.y >= 300) {
                this.currentAttack[i].pos.y = 300;
            }
        }
    }
    enemyFlyBy() {
        this.attackLimit = 3000;
        if ((Math.floor(Math.random() * 2) + 1) > 1) {
            for (let i = 0; i < 5; i++) {
                this.currentAttack[i] = new Enemy(new Vector(this.ctx.canvas.width, this.ctx.canvas.height - i * 80 - 50), new Vector(-5, 0), this.ctx, "./assets/enemiesAndAllies/Enemy.png", this.screen, 1, 1, 1);
            }
        }
        else {
            for (let i = 0; i < 5; i++) {
                this.currentAttack[i] = new Enemy(new Vector(-150, this.ctx.canvas.height - i * 80 - 50), new Vector(5, 0), this.ctx, "./assets/enemiesAndAllies/Enemy.png", this.screen, 1, 1, 1);
            }
        }
    }
    popUpOfDeath() {
        this.attackLimit = 500;
        for (let i = 0; i < 3; i++) {
            this.currentAttack[i] = new BossAD(new Vector(this.pos.x + 75, this.pos.y + 75), new Vector(0, 0), this.ctx, "./assets/textboxAndAds/ad1.png", 1, 1, 1, this.screen, true);
        }
    }
    get Attack() {
        return this.currentAttack;
    }
    get health() {
        return this.bossHealth;
    }
    set health(v) {
        this.bossHealth = v;
    }
}
class Attack extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale) {
        super(pos, vel, ctx, path, frames, speed, scale);
    }
}
class Enemy extends Attack {
    constructor(pos, vel, ctx, path, screen, frames = 1, speed = 1, scale = 1) {
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
        if (this.pos.y + this.animation.imageHeight >= canvas.height - 45 ||
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
        this.invframes = 0;
    }
    update() {
        this.hurtScreen();
        super.update();
        if (this.invframes > 0) {
            this.invframes--;
        }
        if (this.lives <= 0) {
            this.game.switchScreen(new DeathScreen(this.game));
        }
        if (this.lives < this.prevlives && this.lives >= 1) {
            this.prevlives--;
            this.animation = new Animate(this.ctx, `./assets/idcard/idCard${this.lives}.png`, 1, 1, this, 1.5);
            this.ouch = 8;
        }
    }
    set youGotRekt(v) {
        if (this.invframes == 0) {
            this.lives = v;
            this.game.Lives = v;
            this.invframes = 100;
        }
    }
    get youGotRekt() {
        return this.lives;
    }
    set Prev(v) {
        this.prevlives = v;
    }
    hurtScreen() {
        if (this.ouch == 8) {
            this.ouchImage = new GameObject(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/damage.png', 1, 1, 2);
        }
        if (this.ouch > 0) {
            this.ouchImage.update();
            this.ouch--;
        }
        else {
            this.ouchImage = new GameObject(new Vector(0, 0), new Vector(0, 0), this.game.ctx, '', 1, 1, 1);
        }
    }
}
class Icon extends GameObject {
}
class Player extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale, body) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.faceAnimation = new Animate(ctx, body, 1, 1, this, 1);
        this.UserInput = new UserInput;
        this.scale = scale;
        this.standsOnGround = false;
        this.walljumpTrigger = false;
    }
    update() {
        if (this.faceAnimation) {
            this.faceAnimation.draw();
        }
        super.update();
        this.walljumpCd();
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
        if (this.pos.y + (this.animation.imageHeight * this.scale) >= canvas.height - 45) {
            this.vel.y = 0;
            this.pos.y = canvas.height - 45 - this.animation.imageHeight * this.scale;
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
        if (this.UserInput.isKeyDown(UserInput.KEY_UP) && !this.walljumpUsed && !this.walljumpTrigger && (this.pos.x < 2 || this.pos.x + this.animation.imageWidth > 1364)) {
            this.vel.y = -8;
            this.standing = false;
            this.walljumpTrigger = true;
            this.walljumpUsed = true;
        }
        if (this.standing) {
            this.walljumpTrigger = true;
            this.walljumpCooldown = 20;
            this.walljumpUsed = false;
        }
    }
    walljumpCd() {
        if (!this.standing) {
            this.walljumpCooldown--;
        }
        if (this.walljumpCooldown <= 0) {
            this.walljumpTrigger = false;
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
class BossAD extends Attack {
    constructor(pos, vel, ctx, path, frames, speed, scale, screen, bossSpawned) {
        super(pos, vel, ctx, path, frames, speed, scale);
        if (bossSpawned) {
            this.setSpeed();
        }
    }
    setSpeed() {
        this.vel.x = (Math.random() * 2 - 1) * 5;
        this.vel.y = Math.random() * 5;
    }
    update() {
        super.update();
    }
}
class Codebeam extends Attack {
    constructor(pos, vel, ctx, path, frames, speed, scale) {
        super(pos, vel, ctx, path, frames, speed, scale);
    }
}
class Healthbar extends GameObject {
    constructor(pos, vel, ctx, path, frames, speed, scale, boss) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.live = boss.health;
        this.maxHealth = 30;
        this.scale = scale;
        this.boss = boss;
        this.greenBar = new Image();
        this.greenBar.src = "./assets/enemiesAndAllies/healthbar-green.png";
    }
    update() {
        super.update();
        if (this.greenBar.naturalHeight > 0) {
            this.live = this.boss.health;
            let drawfromx = this.greenBar.width - (this.live / this.maxHealth) * this.greenBar.width;
            this.ctx.drawImage(this.greenBar, drawfromx, 0, this.greenBar.width, this.greenBar.height, this.pos.x, this.pos.y, this.greenBar.width * this.scale, this.greenBar.height * this.scale);
        }
        this.pos.x = this.boss.pos.x + 50;
        this.pos.y = this.boss.pos.y - 50;
    }
    set MaxHealth(v) {
        this.maxHealth = v;
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
class LevelScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
        this.id = new IDcard(new Vector(this.game.canvas.width + 1, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard.png', 1, 1, 1.5, game);
        this.player = new Player(new Vector(100, 1000), new Vector(0, 0), this.game.ctx, this.game.squary, 1, 1, 1, this.game.bodySquary);
        if (!(this instanceof BossScreen)) {
            document.body.style.backgroundImage = "url('./assets/xp-bg.png')";
        }
        this.icons = [];
        this.programs = [];
        this.ads = [];
        this.storyFlag = 0;
        this.userinput = new UserInput();
    }
    draw(ctx) {
        if (this.game.playerinfo[0] != undefined) {
            this.id.update();
            this.writeTextToCanvas(this.game.ctx, this.game.playerinfo[0], 20, new Vector(this.game.canvas.width - 50, 30), "right", "#000000");
            this.writeTextToCanvas(this.game.ctx, this.game.playerinfo[1], 20, new Vector(this.game.canvas.width - 50, 60), "right", "#000000");
            if (this.id.youGotRekt === 1) {
                this.writeTextToCanvas(this.game.ctx, `${this.id.youGotRekt} leven over`, 20, new Vector(this.game.canvas.width - 25, 90), "right", "#000000");
            }
            else {
                this.writeTextToCanvas(this.game.ctx, `${this.id.youGotRekt} levens over`, 20, new Vector(this.game.canvas.width - 25, 90), "right", "#000000");
            }
        }
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
        if (!(this instanceof HomeScreen)) {
            this.player.update();
        }
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
    multilineText(ctx, str, xPos, yPos) {
        ctx.font = '20px fantasy';
        ctx.textAlign = "center";
        let lineheight = 20;
        let lines = str.split('\n');
        for (let j = 0; j < lines.length; j++) {
            ctx.fillText(lines[j], xPos, yPos + (j * lineheight));
        }
    }
}
class BossScreen extends LevelScreen {
    constructor(game) {
        super(game);
        document.body.style.backgroundImage = "url('./assets/xpZwartWit-bg.png')";
        this.boss = new Boss(new Vector(600, 50), new Vector(0, 0), this.game.ctx, "./assets/enemiesAndAllies/hackerman.png", this, 1, 1, .5, game);
        this.player.pos = new Vector(this.game.canvas.width / 2 - this.player.ani.imageWidth / 2, this.game.canvas.height);
        this.wizard = new Wizard(new Vector(this.game.canvas.width / 2 - 25, 300), new Vector(0, 0), this.game.ctx, "./assets/enemiesAndAllies/urawizardgandalf.png", 6, 10, 1);
        this.textbox = new GameObject(new Vector(this.game.canvas.width / 2 + 80, 170), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1);
        this.textbox.mirror = true;
        this.waveSpawned = false;
        this.tutorialEnemies = new Array;
        this.hasStoppedPlatform = false;
        this.story = 0;
        this.platformTimer = 0;
        this.countdownTimer = 0;
    }
    draw(ctx) {
        if (this.story > 3) {
            this.boss.update();
        }
        else if (this.story === 0) {
            this.start();
        }
        else if (this.story === 1) {
            this.phaseOne();
        }
        else if (this.story === 2) {
            this.phaseTwo();
        }
        else if (this.story === 3) {
            this.finalCountdown();
        }
        super.draw(ctx);
    }
    start() {
        this.wizard.update();
        this.textbox.update();
        this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}!\nPas op!\nDe Hacker gaat zo \naanvallen!`, this.textbox.pos.x + 100, this.textbox.pos.y + 25);
        this.countdownTimer++;
        if (this.countdownTimer >= 240) {
            this.story++;
            this.countdownTimer = 0;
        }
    }
    phaseOne() {
        this.wizard.update();
        this.wizard.pos = new Vector(50, 120);
        this.textbox.update();
        this.textbox.pos = new Vector(150, 10);
        this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}!\nOntwijk de virussen \ndoor een muursprong \nte maken!`, this.textbox.pos.x + 100, this.textbox.pos.y + 25);
        if (!this.waveSpawned) {
            this.waveSpawned = true;
            for (let i = 0; i < 5; i++) {
                this.tutorialEnemies[i] = new Enemy(new Vector(this.game.ctx.canvas.width + 300, this.game.ctx.canvas.height - i * 80 - 50), new Vector(-5, 0), this.game.ctx, "./assets/enemiesAndAllies/Enemy.png", this);
            }
        }
        for (let i = this.tutorialEnemies.length - 1; i >= 0; i--) {
            this.tutorialEnemies[i].update();
            if (this.tutorialEnemies[i].pos.x < -175) {
                this.tutorialEnemies.splice(i, 1);
            }
        }
        if (this.tutorialEnemies.length == 0) {
            if (this.id.youGotRekt == 5) {
                this.story++;
            }
            else {
                this.id.youGotRekt = 5;
                this.id.Prev = this.id.youGotRekt;
            }
            this.waveSpawned = false;
        }
    }
    phaseTwo() {
        this.wizard.update();
        this.textbox.update();
        this.multilineText(this.game.ctx, `Goed bezig!\nProbeer nu eens op\neen van deze \nplatforms te springen!`, 250, 35);
        if (!this.waveSpawned) {
            this.waveSpawned = true;
            for (let i = 0; i < 3; i++) {
                this.tutorialEnemies[i] = new BossAD(new Vector(i * 150 + 450, -10), new Vector(0, 6), this.game.ctx, "./assets/textboxAndAds/ad1.png", 1, 1, 1, this, false);
            }
        }
        this.platformTimer++;
        for (let i = this.tutorialEnemies.length - 1; i >= 0; i--) {
            this.tutorialEnemies[i].update();
            if (this.tutorialEnemies[i].pos.y > this.game.canvas.height || this.platformTimer >= 250) {
                this.tutorialEnemies.splice(i, 1);
                this.platformTimer = 0;
            }
        }
        if (this.tutorialEnemies.length === 0) {
            if (this.hasStoppedPlatform) {
                this.story++;
            }
            else {
                this.waveSpawned = false;
            }
        }
    }
    finalCountdown() {
        if (this.countdownTimer < 60) {
            this.writeTextToCanvas(this.game.ctx, "3", 70, new Vector(this.game.canvas.width / 2, this.game.canvas.height / 2), "center", "#FFFFFF");
        }
        else if (this.countdownTimer < 120) {
            this.writeTextToCanvas(this.game.ctx, "2", 70, new Vector(this.game.canvas.width / 2, this.game.canvas.height / 2), "center", "#FFFFFF");
        }
        else if (this.countdownTimer < 180) {
            this.writeTextToCanvas(this.game.ctx, "1", 70, new Vector(this.game.canvas.width / 2, this.game.canvas.height / 2), "center", "#FFFFFF");
        }
        else if (this.countdownTimer >= 180) {
            this.story = 10;
        }
        this.countdownTimer++;
    }
    collide() {
        let player = this.player.box();
        if (this.story > 3) {
            let boss = this.boss.box();
            if (this.collides(boss, player)) {
                this.boss.health = this.boss.health - 1;
            }
            this.boink(player, this.boss.Attack);
            this.platformCollision(player, this.boss.Attack);
        }
        else if (this.story === 1) {
            this.tutorialEnemies.forEach(e => {
                if (this.collides(player, e.box())) {
                    this.id.youGotRekt = this.id.youGotRekt - 1;
                }
            });
        }
        else if (this.story === 2) {
            this.boink(player, this.tutorialEnemies);
            this.platformCollision(player, this.tutorialEnemies);
        }
    }
    boink(player, array) {
        if (array) {
            array.forEach(e => {
                let hitbox = e.box();
                if (this.collides(player, hitbox)) {
                    if (e instanceof BossAD) {
                        e.vel = new Vector(0, 0);
                        this.hasStoppedPlatform = true;
                    }
                    else {
                        this.id.youGotRekt = this.id.youGotRekt - 1;
                    }
                }
            });
        }
    }
    platformCollision(player, array) {
        let playerbottom = [player[0], player[1], player[3], player[3] + 2];
        let onground = false;
        array.forEach(platform => {
            let platformbox = platform.box();
            let upperbox = [platformbox[0], platformbox[1], platformbox[2], platformbox[2] + 10];
            if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0 && !this.player.standing && platform instanceof BossAD) {
                onground = true;
            }
            if (onground) {
                this.player.vel.y = 0;
                this.player.standing = true;
            }
            else {
                this.player.standing = false;
            }
        });
    }
    get Player() {
        return this.player;
    }
}
class DeathScreen extends LevelScreen {
    constructor(game) {
        super(game);
        this.wizard = new Wizard(new Vector(260, 200), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/hackerman.png', 1, 1, 1);
        this.textbox = new GameObject(new Vector(500, 110), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox1.png', 1, 1, 1.3);
        this.textbox.mirror = true;
        this.story = 0;
        document.body.style.backgroundImage = "url('./assets/hacked-bg.png')";
    }
    draw(ctx) {
        this.wizard.update();
        this.textbox.update();
        this.storyText();
        if (this.game.userInput.isKeyDown(UserInput.KEY_ENTER)) {
            this.game.switchScreen(new SelectionScreen(this.game));
        }
        super.draw(ctx);
    }
    storyText() {
        if (this.story == 0) {
            this.multilineText(this.game.ctx, `Helaas ${this.game.playerinfo[0]}!\nIk heb jouw ID gestolen.\n Als je het nog een\n keer wilt proberen\ndruk dan op ENTER.\n`, 630, 145);
        }
    }
}
class HomeScreen extends LevelScreen {
    constructor(game) {
        super(game);
        this.icons[0] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/finalHomeScreen.png', 2, 50, 1.5);
    }
    draw() {
        this.collide();
        if (this.game.userInput.isKeyDown(UserInput.KEY_ENTER)) {
            this.game.switchScreen(new SelectionScreen(this.game));
        }
        super.draw(this.game.ctx);
    }
}
class Level1 extends LevelScreen {
    constructor(game) {
        super(game);
        this.icons[0] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, '', 5, 1, 1, 1);
        this.icons[1] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, '', 1, 1, 1.4, 1);
        this.icons[2] = new Icon(new Vector(100, 100), new Vector(0, 0), this.game.ctx, './assets/icons/pijl.png', 5, 10, 1.4, 1);
        this.icons[3] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, '', 1, 1, 1.4, 1);
        this.programs[0] = new Program(new Vector(100, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.4, 1);
        this.programs[1] = new Program(new Vector(400, 500), new Vector(0, 0), this.game.ctx, './assets/windows/Word.png', 1, 1, 0.7, 0);
        this.programs[2] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0);
        this.programs[3] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0);
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 275, this.game.canvas.height - 150), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 1);
        this.textbox = new GameObject(new Vector(this.game.canvas.width - 500, this.game.canvas.height - 310), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.vortex = false;
    }
    draw() {
        this.updateOtherThings();
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.storyCheck();
        this.storyText();
        super.draw(this.game.ctx);
    }
    storyCheck() {
        let player = this.player.box();
        let wiz = this.wizard.box();
        if (this.collides(player, wiz) && this.story < 1) {
            this.story = this.story + 1;
        }
        if (this.programs[0].isOpen) {
            this.story = 2;
        }
        if (this.programs[1].isOpen && this.programs[1].isOpen) {
            this.story = 3;
        }
        let Glooole = this.icons[3].box();
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
    storyText() {
        if (this.story == 1) {
            this.multilineText(this.game.ctx, `Welkom ${this.game.playerinfo[0]}!\nIk ben de Install Wizard\nLaten we de wonderen\nvan het internet bekijken.\nKlik op de het glooole icoon.\n`, 1000, 490);
            this.icons[0] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4, 1);
        }
        else if (this.story == 2) {
            this.multilineText(this.game.ctx, 'Perfect!\nKlik nu op Fort.', 1000, 520);
            this.icons[1] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/fort.png', 1, 1, 1.4, 1);
            this.icons[2].pos.y = 0;
        }
        else if (this.story == 3) {
            this.multilineText(this.game.ctx, 'Kijk een magisch portaal\nis geopend\nSpring nu naar\nhet Glooole programma', 1000, 395);
            this.textbox = new GameObject(new Vector(this.game.canvas.width - 500, this.game.canvas.height - 420), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
            this.icons[2].pos.y = 100;
            if (!this.vortex) {
                this.vortex = true;
                this.icons[0] = new Icon(new Vector(-10, 85), new Vector(0, 0), this.game.ctx, './assets/icons/vortex.png', 5, 10, 1, 1);
                this.icons[3] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/gloole.png', 1, 1, 1.4, 1);
            }
        }
    }
}
class Level2 extends LevelScreen {
    constructor(game) {
        super(game);
        this.programs[1] = new Program(new Vector(293, 479), new Vector(0, 0), this.game.ctx, './transparentBreed.png', 1, 1, 1, 0);
        this.programs[1].isOpen = true;
        this.programs[0] = new Program(new Vector(293, 479), new Vector(0, 0), this.game.ctx, '', 1, 1, 1, 0);
        this.icons[0] = new Icon(new Vector(1240, 165), new Vector(0, 0), this.game.ctx, './assets/icons/vortex.png', 5, 10, 1.2, 1);
        this.wizard = new Wizard(new Vector(290, 300), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 1);
        this.textbox = new GameObject(new Vector(50, 150), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.textXPos = 175;
        this.textYPos = 220;
        const adsFileNames = [
            './assets/textboxAndAds/ad1.png',
            './assets/textboxAndAds/ad2.png',
            './assets/textboxAndAds/ad3.png',
        ];
        for (let i = 0; i < this.randomRoundedNumber(5, 7); i++) {
            const randonmIndex = this.randomRoundedNumber(0, adsFileNames.length);
            this.ads[i] = new Ad(new Vector(this.randomNumber(100, this.game.canvas.width - 300), this.randomNumber(0, this.game.canvas.height - 195)), new Vector(0, 0), this.game.ctx, adsFileNames[randonmIndex], 1, 1, 1.5);
            this.ads[i].isOpen = true;
        }
        this.icons[1] = new Icon(new Vector(1250, 200), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/adblocker.png', 1, 1, 1, 0);
        document.body.style.backgroundImage = "url('./assets/programs/GloooleLevel.png')";
    }
    nextLevel() {
        let player = this.player.box();
        let file = this.icons[1].box();
        if (this.collides(file, player)) {
            this.game.switchScreen(new Level3(this.game));
        }
    }
    collide() {
        super.collide();
        let player = this.player.box();
        if (this.ads) {
            this.ads.forEach(e => {
                let ads = e.box();
                if (this.collides(player, ads)) {
                    this.id.youGotRekt = this.id.youGotRekt - 1;
                }
            });
        }
    }
    draw() {
        this.ads.forEach(element => {
            element.update();
        });
        this.updateOtherThings();
        this.storyCheck();
        this.storyText();
        this.closeAds();
        this.nextLevel();
        super.draw(this.game.ctx);
    }
    storyCheck() {
        if (this.story < 1) {
            this.story = this.story + 1;
        }
        if (this.game.Lives == 4) {
            this.story = 2;
        }
        else if (this.game.lives == 3) {
            this.story = 3;
        }
        else if (this.game.lives == 2) {
            this.story = 4;
        }
        else if (this.game.lives == 1) {
            this.story = 5;
        }
    }
    updateOtherThings() {
        this.wizard.update();
        if (this.story > 0) {
            this.textbox.update();
        }
    }
    storyText() {
        let x1 = Math.random() * 2 - 1;
        let y1 = Math.random() * 2 - 1;
        let x2 = Math.random() * 4 - 2;
        let y2 = Math.random() * 4 - 2;
        let x3 = Math.random() * 6 - 3;
        let y3 = Math.random() * 6 - 3;
        if (this.story == 1) {
            this.multilineText(this.game.ctx, `Oh nee...\n Het lijkt erop dat Glooogle\nvol zit met nep advertenties.\nKlik op de kruisjes\nom ze weg te halen`, 175, 180);
        }
        else if (this.story == 2) {
            this.multilineText(this.game.ctx, `Niet aanraken!\nje verliest je levens`, this.textXPos, this.textYPos);
        }
        else if (this.story == 3) {
            this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}?\n`, this.textXPos += x1, this.textYPos += y1);
            this.wizard.pos.x += x1;
            this.wizard.pos.y += y1;
            this.textbox.pos.x += x1;
            this.textbox.pos.y += y1;
        }
        else if (this.story == 4) {
            this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}! luister je wel?\n`, this.textXPos += x2, this.textYPos += y2);
            this.wizard.pos.x += x2;
            this.wizard.pos.y += y2;
            this.textbox.pos.x += x2;
            this.textbox.pos.y += y2;
        }
        else if (this.story == 5) {
            this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}... g-gaat het wel?\n`, this.textXPos += x3, this.textYPos += y3);
            this.wizard.pos.x += x3;
            this.wizard.pos.y += y3;
            this.textbox.pos.x += x3;
            this.textbox.pos.y += y3;
        }
    }
}
class Level3 extends LevelScreen {
    constructor(game) {
        super(game);
        this.icons[0] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, '', 1, 1, 1.4, 1);
        this.icons[1] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/icons/spoofy.png', 1, 1, 1.4);
        this.icons[2] = new Icon(new Vector(1250, 200), new Vector(0, 0), this.game.ctx, './assets/icons/bugFile.png', 1, 1, 1.4);
        this.icons[3] = new Icon(new Vector(0, 100), new Vector(0, 0), this.game.ctx, './assets/icons/DEZEPC.png', 1, 1, 1.4);
        this.programs[0] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0);
        this.programs[1] = new Program(new Vector(700, 300), new Vector(0, 0), this.game.ctx, './assets/windows/Spotify.png', 1, 1, 0.6, 0);
        this.programs[1].hasAds = true;
        this.programs[2] = new Program(new Vector(800, 300), new Vector(0, 0), this.game.ctx, '', 1, 1, 0.6, 0);
        this.programs[3] = new Program(new Vector(0, 500), new Vector(0, 0), this.game.ctx, './assets/windows/DEZEPC.png', 1, 1, 0.5, 0);
        this.wizard = new Wizard(new Vector(this.game.canvas.width - 850, this.game.canvas.height - 550), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 10, 1);
        this.textbox = new GameObject(new Vector(275, 55), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.vortex = false;
    }
    draw() {
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.textbox.update();
        this.nextLevel();
        this.storyText();
        this.wizard.update();
        super.draw(this.game.ctx);
    }
    updateOtherThings() {
        this.wizard.update();
        if (this.story > 0) {
            this.textbox.update();
        }
    }
    nextLevel() {
        let player = this.player.box();
        let file = this.icons[2].box();
        if (this.collides(file, player)) {
            this.game.switchScreen(new Level4(this.game));
        }
    }
    storyText() {
        if (this.story < 2000) {
            this.story = this.story + 1;
        }
        if (this.story <= 1999) {
            this.multilineText(this.game.ctx, `W-Wacht! ${this.game.playerinfo[0]}!\nDat i-is een bug file\nIk denk dat we gehackt zijn\nWat je ook doet...\nGA NIET NAAR DE BUGFILE\n`, 400, 90);
        }
        if (this.story == 2000) {
            this.multilineText(this.game.ctx, `oké... misschien\nmoet je toch naar\nde bugfile`, 400, 110);
        }
        if (!this.vortex) {
            this.vortex = true;
            this.icons[0] = new Icon(new Vector(1230, 175), new Vector(0, 0), this.game.ctx, './assets/icons/vortex2.png', 5, 10, 1.2, 1);
        }
    }
}
class Level4 extends LevelScreen {
    constructor(game) {
        super(game);
        this.enemies = new Array;
        this.numberOfEnemies = 5;
        for (let i = 0; i < this.numberOfEnemies; i++) {
            this.enemies[i] = new Enemy(new Vector(this.randomRoundedNumber(150, this.game.canvas.width - 145), this.randomRoundedNumber(0, this.game.canvas.height - 195)), new Vector(this.randomNumber(-0.5, -3), this.randomNumber(-0.5, -3)), this.game.ctx, './assets/enemiesAndAllies/Enemy.png', this);
        }
        this.programs[0] = new Program(new Vector(400, 500), new Vector(0, 0), this.game.ctx, './assets/programs/hackerman.png', 1, 1, 0.3, 0);
        this.programs[0].isOpen = true;
        this.programs[1] = new Program(new Vector(700, 400), new Vector(0, 0), this.game.ctx, './assets/programs/hackerman2.png', 1, 1, 0.5, 0);
        this.programs[1].isOpen = true;
        this.programs[2] = new Program(new Vector(150, 200), new Vector(0, 0), this.game.ctx, './assets/programs/hackerman3.png', 1, 1, 0.6, 0);
        this.programs[2].isOpen = true;
        this.story = 0;
        this.timeInFrames = 1000;
        this.wizard = new Wizard(new Vector(300, this.game.canvas.height - 145), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 10, 1);
        this.textbox = new GameObject(new Vector(50, 400), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.5);
    }
    draw() {
        this.wizard.update();
        this.textbox.update();
        this.storyText();
        this.storyAdvance();
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        super.draw(this.game.ctx);
        this.enemies.forEach(element => {
            element.update();
            element.enemyMove(this.game.canvas);
        });
        this.timer();
        if (this.story < 2) {
            this.enemyCollision();
        }
    }
    timer() {
        if (this.timeInFrames > 0) {
            this.timeInFrames--;
        }
    }
    enemyCollision() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.collides(this.player.box(), this.enemies[i].box())) {
                this.id.youGotRekt = this.id.youGotRekt - 1;
            }
        }
    }
    storyText() {
        if (this.story === 0) {
            this.text = this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}!\nOntwijk de vijanden terwijl ik\neen virusscanner maak!`, 200, 450);
        }
        if (this.story === 1) {
            this.text = this.multilineText(this.game.ctx, `Goedzo! Ga nu snel\nnaar de scanner toe!`, 200, 450);
        }
        if (this.story === 2 || this.story === 3) {
            this.text = this.multilineText(this.game.ctx, `Oh nee!\nWe worden gehacked!`, 200, 450);
        }
        if (this.story === 4) {
            this.text = this.multilineText(this.game.ctx, `De hacker is binnen!\nKijk uit ${this.game.playerinfo[0]}!`, 200, 450);
        }
    }
    storyAdvance() {
        if (this.timeInFrames <= 0 && this.story === 0) {
            this.story = 1;
        }
        if (this.story === 1) {
            this.icons[0] = new Icon(new Vector(this.game.canvas.width - 100, 500), new Vector(0, 0), this.game.ctx, './assets/icons/virusscanner.png', 1, 1, 1.4);
            let scanner = this.icons[0].box();
        }
        if (this.story === 1 && this.player.pos.x >= 1200) {
            this.icons.pop();
            for (let i = 0; i < 30; i++) {
                this.enemies[i] = new Enemy(new Vector(this.randomRoundedNumber(0, this.game.canvas.width - 145), this.randomRoundedNumber(0, this.game.canvas.height - 95)), new Vector(this.randomNumber(0.5, 3), this.randomNumber(0.5, 3)), this.game.ctx, './assets/enemiesAndAllies/Enemy.png', this);
            }
            this.timeInFrames = 400;
            this.story = 2;
        }
        if (this.story === 2 && this.timeInFrames <= 0) {
            this.bossBoi = new GameObject(new Vector(600, 100), new Vector(0, 0), this.game.ctx, "./assets/enemiesAndAllies/hackerman.png", 1, 1, .5);
            this.story = 3;
        }
        if (this.story === 3) {
            this.timeInFrames = 200;
            this.story = 4;
        }
        if (this.story === 4) {
            this.bossBoi.update();
        }
        if (this.story === 4 && this.timeInFrames <= 0) {
            this.game.switchScreen(new BossScreen(this.game));
        }
    }
}
class SelectionScreen extends GameScreen {
    constructor(game) {
        super(game);
        let pos = new Vector(this.game.canvas.width / 2 - 10, this.game.canvas.height / 2 - 10);
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
        this.knop[0] = new GameObject(new Vector(this.game.canvas.width / 2 - 200, this.game.canvas.height / 2 - 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[2] = new GameObject(new Vector(this.game.canvas.width / 2 - 200, this.game.canvas.height / 2 + 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[1] = new GameObject(new Vector(this.game.canvas.width / 2 + 200, this.game.canvas.height / 2 - 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[3] = new GameObject(new Vector(this.game.canvas.width / 2 + 200, this.game.canvas.height / 2 + 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[1].mirror = true;
        this.knop[3].mirror = true;
        this.next = 0;
        document.body.style.backgroundImage = "url('./assets/selectionScreen.png')";
    }
    draw() {
        this.BodyOptions[this.bodyCounter].update();
        this.FaceOptions[this.counter].update();
        this.drawButtons();
        if (this.game.userInput.isKeyDown(UserInput.KEY_ENTER) && this.next > 60) {
            this.game.playerinfo[0] = prompt("Wacht even! Wat is je naam?", "Squary").substr(0, 16);
            this.game.playerinfo[1] = prompt("En hoe oud ben je?", "10").substr(0, 3) + " jaar";
            this.game.squary = this.FaceOptions[this.counter].path;
            this.game.bodySquary = this.BodyOptions[this.bodyCounter].path;
            this.game.Lives = 5;
            this.game.switchScreen(new Level1(this.game));
        }
        this.next++;
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
class WinScreen extends LevelScreen {
    constructor(game) {
        super(game);
        this.wizard = new Wizard(new Vector(50, 450), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 2);
        this.textbox = new GameObject(new Vector(199, 350), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.textbox.mirror = true;
        this.story = 0;
        document.body.style.backgroundImage = "url('./assets/xp-bg-youWin.png')";
    }
    draw(ctx) {
        this.wizard.update();
        this.textbox.update();
        this.storyText();
        super.draw(ctx);
    }
    storyText() {
        if (this.story == 0) {
            this.multilineText(this.game.ctx, `Geweldig ${this.game.playerinfo[0]}!\nJe hebt gewonnen, goed\ngedaan. Ik wist wel dat je\nhet kon!\nJe identiteit is nu veilig.`, 326, 389);
        }
    }
}
//# sourceMappingURL=app.js.map