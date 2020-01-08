// tslint:disable member-ordering
/// <reference path="LevelScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class BossScreen extends LevelScreen {
    private boss: Boss;
    private wizard: Wizard;
    private textbox: GameObject;
    private waveSpawn: boolean;
    private tutorialEnemies: Array<GameObject>;
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
        this.waveSpawn = false;
        this.tutorialEnemies = new Array;
        this.story = 1;
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
        if (!this.waveSpawn) {
            this.waveSpawn = true;
            //create enemies
            for (let i = 0; i < 5; i++) {
                this.tutorialEnemies[i] = new Enemy(new Vector(this.game.ctx.canvas.width + 300, this.game.ctx.canvas.height - i * 80 - 50), new Vector(-5, 0), this.game.ctx, "./assets/enemiesAndAllies/Enemy.png", this);
            }
        }
        for (let i = this.tutorialEnemies.length - 1; i >= 0; i--) {
            //update enemies
            this.tutorialEnemies[i].update();
            //remove if out of screen
            if (this.tutorialEnemies[i].pos.x < 0) {
                this.tutorialEnemies.splice(i, 1);
            }
        }

        if (this.tutorialEnemies.length == 0) {
            if (this.id.youGotRekt == 5) {
                this.story++;
            }
            else {
                //restart tutorial
                this.waveSpawn = false;
                this.id.youGotRekt += 1;
                this.id.Prev = this.id.youGotRekt;
            }
        }
    }

    private phaseTwo() {
        this.wizard.update();
        this.textbox.update();
        this.multilineText(this.game.ctx, `Goed bezig!\nProbeer nu eens op\neen van deze \nplatforms te springen!`, 250, 35);
        if (!this.waveSpawn) {
            this.waveSpawn = true;
            for (let i = 0; i < 3; i++) {
                this.tutorialEnemies[i] = new BossAD(new Vector(this.game.canvas.width / 2), new Vector(0, 6), this.game.ctx, "./assets/textboxAndAds/ad1.png", 1, 1, 1, this, false);
            }
        }
        let succes = false;
        for (let i = this.tutorialEnemies.length - 1; i > 0; i--) {
            this.tutorialEnemies[i].update();
            if (this.tutorialEnemies[i].pos.y > this.game.canvas.height) {
                this.tutorialEnemies.splice(i, 1);
            }
        }

        if (this.tutorialEnemies.length === 0) {
            this.story = 2;
        }
    }

    public collide() {
        let player = this.player.box();
        if (this.story > 1) {
            let boss = this.boss.box();
            if (this.collides(boss, player)) {
                this.boss.health = this.boss.health - 1;
            }

            if (this.boss.Attack) {
                this.boss.Attack.forEach(e => {
                    let attack = e.box();
                    if (this.collides(player, attack)) {
                        if (e instanceof BossAD) {
                            e.vel = new Vector(0, 0);
                        } else {
                            this.id.youGotRekt = this.id.youGotRekt - 1;
                        }
                    }
                })
            }

            let playerbottom = [player[0], player[1], player[3], player[3] + 2];
            let onground = false;
            this.boss.Attack.forEach(program => {
                let programbox = program.box();
                let upperbox = [programbox[0], programbox[1], programbox[2], programbox[2] + 10];
                if (this.collides(playerbottom, upperbox) && this.player.vel.y > 0 && !this.player.standing && program instanceof BossAD) {
                    onground = true;
                }

                if (onground) {
                    this.player.vel.y = 0;
                    this.player.standing = true;
                } else {
                    this.player.standing = false;
                }
            });

        } else if (this.story === 0) {

            this.tutorialEnemies.forEach(e => {
                if (this.collides(player, e.box())) {
                    this.id.youGotRekt = this.id.youGotRekt - 1;
                }

            })
        } else if (this.story === 1) {

        }
    }

    public get Player(): Player {
        return this.player;
    }

}