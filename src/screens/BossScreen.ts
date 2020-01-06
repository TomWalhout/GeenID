// tslint:disable member-ordering
/// <reference path="LevelScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class BossScreen extends LevelScreen {
    private boss: Boss;
    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        this.boss = new Boss(new Vector(600, 100), new Vector(0, 0), this.game.ctx, "./assets/enemiesAndAllies/hackerman.png", this, 1, 1, .5);
    }
    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.boss.update();
    }

    public collide() {
        let boss = this.boss.box();
        let player = this.player.box();
        if (this.collides(boss, player)) {
            this.id.youGotRekt = this.id.youGotRekt - 1;
        }
    }

}
