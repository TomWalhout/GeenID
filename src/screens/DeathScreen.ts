// tslint:disable member-ordering
/// <reference path="LevelScreen.ts"/>

class DeathScreen extends LevelScreen {
    
    private wizard: Wizard;
    private textbox: GameObject;
    
    public constructor(game: Game) {
        super(game);
        this.wizard = new Wizard(new Vector(260, 200), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/hackerman.png', 1, 1, 1);
        this.textbox = new GameObject(new Vector(500, 110), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.textbox.mirror = true;
        this.story = 0;
        document.body.style.backgroundImage = "url('./assets/HackerCodeBG.png')";
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
        this.textbox.update();
        this.storyText();

        if (this.game.userInput.isKeyDown(UserInput.KEY_ENTER)) {
            this.game.switchScreen(new SelectionScreen(this.game));
        }
    }

    public storyText() {
        if (this.story == 0) {
            this.multilineText(this.game.ctx, `Helaas ${this.game.playerinfo[0]}!\nIk heb jouw ID gestolen.\n Als je het nog een\n keer wilt proberen\ndruk dan op ENTER.\n`, 630, 145); //1200 en 500
        }
    }
}