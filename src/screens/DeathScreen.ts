// tslint:disable member-ordering
/// <reference path="LevelScreen.ts"/>

class DeathScreen extends LevelScreen {
    private wizard: Wizard;
    public constructor(game: Game) {
        super(game);
        this.wizard = new Wizard(new Vector(300, 0), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 8);
        document.body.style.backgroundImage = "url('./assets/verloren.png')";
    }
    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.wizard.update();
    }
}
