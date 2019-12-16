// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class BossScreen extends GameScreen {
    private boss: Boss;
    private player: Player;
    private enemy: Enemy;
    private sword: Sword;
    private shouldSwitchToTitleScreen = false;
    private id: IDcard;

    private playerLives: number;
    private enemyLives: number;

    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        this.boss = new Boss(new Vector(100, 400), new Vector(0, 0), this.game.ctx, "./assets/urawizardgandalf.png", this, 6, 20);
        this.player = new Player(new Vector(100, 900), new Vector(0, 0), this.game.ctx, "./assets/Squary.png", 1, 1, 1);
        this.sword = new Sword(new Vector(140, 675), new Vector(0, 0), this.game.ctx, "./assets/mastersword.png", 1, 1, 0.1);
        this.enemy = new Enemy(new Vector(this.randomNumber(100, this.game.canvas.width - 100), this.randomNumber(100, this.game.canvas.height - 100)), new Vector(4, 2), this.game.ctx, "./assets/Enemy.png", this, 1, 1);
        this.id = new IDcard(new Vector(this.game.canvas.width, 0), new Vector(0, 0), this.game.ctx, './assets/idcard/idCard5.png', 1, 1, 0.5, game);
        // add an mouse event listener

        this.playerLives = 100;
        this.enemyLives = 10;
    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new
     * screen to show.
     *
     * @param game the game object, conveniently added as a parameter so you
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
        this.player.playerMove(this.game.canvas);
        this.enemy.enemyMove(this.game.canvas);
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        this.boss.update();
        this.player.update();
        this.sword.movePos(this.player);
        this.enemy.update();
        this.boss.update();
        this.id.update();
    }

    /**
     * Let this screen listen to the user input
     */
    public listen(userinput: UserInput) {
        if (this.player.clickedOn(userinput)) {
            console.log("omg");
        };
        if (this.boss.clickedOn(userinput)) {
            console.log("aiergjoiajgn");
        }
    }

    /**
    * Check collisions
    */
    public collide() {
        let player = this.player.box();
        let boss = this.boss.box();
        let sword = this.sword.box();
        let enemy = this.enemy.box();
        if (this.collides(player, boss)) {
            //boem
        }
        if (this.collides(sword, enemy)) {
            // boem
        }
        this.hit();
    }

    public hit() {
        let player = this.player.box();
        let boss = this.boss.box();
        let enemy = this.enemy.box();
        let sword = this.sword.box();

        if (this.collides(player, boss)) {
            // console.log("ouchie ive been ripped");
            console.log("oei");
            if (this.boss.exist) {
                this.boss.exist = false;
                this.id.youGotRekt = this.id.youGotRekt - 1;
            }
        }
        
        if (this.collides(player, enemy)) {
            if (this.enemy.exist) {
                this.enemy.exist = false;
                this.id.youGotRekt = this.id.youGotRekt - 1;
            }
            this.playerLives--;
            // console.log(this.playerLives);
        }

        if (this.collides(sword, enemy) && this.player.hasSword) {
            this.enemyLives--;
            console.log(this.enemyLives);
        }

        if (this.enemyLives < 1) {
            // console.log('Victory');
        }

        if (this.playerLives < 1) {
            this.gameOver();
        }

    }

    public gameOver() {
        this.game.switchScreen(new LevelScreen(this.game))
    }
}