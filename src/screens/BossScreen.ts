// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class BossScreen extends GameScreen {
    private boss: Boss;
    private player: Player;
    private enemy: Enemy;
    private shouldSwitchToTitleScreen = false;

    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        this.boss = new Boss(new Vector(100, 400), new Vector(0, 0), this.game.ctx, "./urawizardgandalf2.png", this, 4, 20);
        this.player = new Player(new Vector(100, 900), new Vector(0, 0), this.game.ctx, "./assets/Squary.png", 1, 1, 1);
        this.enemy = new Enemy(new Vector(this.randomNumber(100, this.game.canvas.width - 100), this.randomNumber(100, this.game.canvas.height - 100)), new Vector(4, 2), this.game.ctx, "./assets/Enemy.png", this, 1, 1);
        // add an mouse event listener
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
        this.enemy.update();
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
        if (this.collides(player, boss)) {
            //boem
        }
        this.enemyHit();
    }



    public enemyHit() {

        let player = this.player.box();
        let enemy = this.enemy.box();

        if (this.collides(player, enemy)) {
            console.log("oopsie woopsie, i have been hit");
        } 
        
}


}
