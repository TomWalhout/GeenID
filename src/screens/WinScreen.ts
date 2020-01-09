// tslint:disable member-ordering
/// <reference path="LevelScreen.ts"/>

class WinScreen extends LevelScreen {
    private wizard: Wizard;
    private textbox: GameObject;
    private victory: GameObject;
    public constructor(game: Game) {
        super(game);
        this.wizard = new Wizard(new Vector(50, 450), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 2);
        this.textbox = new GameObject(new Vector(199, 350), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.textbox.mirror = true;
        this.victory = new GameObject(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/gewonnen2-bg.png', 1, 1, 0.5, 0);
        this.story = 0;
        document.body.style.backgroundImage = "url('./assets/xp-bg.png')";
        
    }
    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        this.victory.update();
        this.wizard.update();
        this.textbox.update();
        this.storyText();
        super.draw(ctx);
    }

    public storyText() {
        if (this.story == 0) {
            this.multilineText(this.game.ctx, `Geweldig ${this.game.playerinfo[0]}!\nJe hebt gewonnen, gewelidig\ngedaan. Ik wist wel dat je\nhet kon!\nJe identiteit is nu veilig.`, 326, 389); //1200 en 500
        }
    }
}
