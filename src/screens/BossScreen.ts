// tslint:disable member-ordering
/// <reference path="LevelScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class BossScreen extends LevelScreen {
    private boss: Boss;
    private wizard: Wizard;
    private textbox: GameObject;
    private waveSpawned: boolean;
    private tutorialEnemies: Array<GameObject>;
    private hasStoppedPlatform: boolean;
    private platformTimer: number;
    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        document.body.style.backgroundImage = "url('./assets/backgroundblack.png')";
        this.boss = new Boss(new Vector(600, 100), new Vector(0, 0), this.game.ctx, "./assets/enemiesAndAllies/hackerman.png", this, 1, 1, .5, game);
        this.player.pos = new Vector(this.game.canvas.width / 2 - this.player.ani.imageWidth / 2, this.game.canvas.height);
        this.wizard = new Wizard(new Vector(50, 120), new Vector(0, 0), this.game.ctx, "./assets/enemiesAndAllies/urawizardgandalf.png", 6, 10, 1);
        this.textbox = new GameObject(new Vector(150, 10), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1);
        this.textbox.mirror = true;
        this.waveSpawned = false;
        this.tutorialEnemies = new Array;
        this.hasStoppedPlatform = false;
        this.story = 0;
        this.platformTimer = 0;
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        if (this.story > 3) {
            this.boss.update();
        } else if (this.story === 0) {
            this.phaseOne();
        } else if (this.story === 1) {
            this.phaseTwo();
        }


    }

    private phaseOne() {
        this.wizard.update();
        this.textbox.update();
        this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}!\nOntwijk de virussen \ndoor een muursprong \nte maken!`, 250, 35);
        if (!this.waveSpawned) {
            this.waveSpawned = true;
            //create enemies
            for (let i = 0; i < 5; i++) {
                this.tutorialEnemies[i] = new Enemy(new Vector(this.game.ctx.canvas.width + 300, this.game.ctx.canvas.height - i * 80 - 50), new Vector(-5, 0), this.game.ctx, "./assets/enemiesAndAllies/Enemy.png", this);
            }
        }
        for (let i = this.tutorialEnemies.length - 1; i >= 0; i--) {
            //update enemies
            this.tutorialEnemies[i].update();
            //remove if out of screen
            if (this.tutorialEnemies[i].pos.x < -175) {
                this.tutorialEnemies.splice(i, 1);
            }
        }

        if (this.tutorialEnemies.length == 0) {
            if (this.id.youGotRekt == 5) {
                this.story++;
            }
            else {
                //restart tutorial
                this.id.youGotRekt = 5;
                this.id.Prev = this.id.youGotRekt;
            }
            this.waveSpawned = false;
        }
    }

    private phaseTwo() {
        this.wizard.update();
        this.textbox.update();
        this.multilineText(this.game.ctx, `Goed bezig!\nProbeer nu eens op\neen van deze \nplatforms te springen!`, 250, 35);
        if (!this.waveSpawned) {
            this.waveSpawned = true;
            for (let i = 0; i < 3; i++) {
                this.tutorialEnemies[i] = new BossAD(new Vector(i * 150 + 450, - 10), new Vector(0, 6), this.game.ctx, "./assets/textboxAndAds/ad1.png", 1, 1, 1, this, false);
            }
        }

        this.platformTimer++;
        for (let i = this.tutorialEnemies.length - 1; i >= 0; i--) {
            this.tutorialEnemies[i].update();
            if (this.tutorialEnemies[i].pos.y > this.game.canvas.height || this.platformTimer >= 250) {
                this.tutorialEnemies.splice(i, 1);
            }
        }

        if (this.tutorialEnemies.length === 0) {
            if (this.hasStoppedPlatform) {
                this.story = 10;
            } else {
                this.waveSpawned = false;
            }
        }
    }

    public collide() {
        let player = this.player.box();
        if (this.story > 1) {
            let boss = this.boss.box();
            if (this.collides(boss, player)) {
                this.boss.health = this.boss.health - 1;
            }

            this.boink(player, this.boss.Attack);
            this.platformCollision(player, this.boss.Attack);

        } else if (this.story === 0) {

            this.tutorialEnemies.forEach(e => {
                if (this.collides(player, e.box())) {
                    this.id.youGotRekt = this.id.youGotRekt - 1;
                }
            })
        } else if (this.story === 1) {
            this.boink(player, this.tutorialEnemies);
            this.platformCollision(player, this.tutorialEnemies);
        }
    }

    private boink(player: Array<number>, array: Array<GameObject>) {
        if (array) {
            array.forEach(e => {
                let hitbox = e.box();
                if (this.collides(player, hitbox)) {
                    if (e instanceof BossAD) {
                        e.vel = new Vector(0, 0);
                        this.hasStoppedPlatform = true;
                    } else {
                        this.id.youGotRekt = this.id.youGotRekt - 1;
                    }
                }
            })
        }
    }

    private platformCollision(player: Array<number>, array: Array<GameObject>) {
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
            } else {
                this.player.standing = false;
            }
        });
    }

    public get Player(): Player {
        return this.player;
    }

}