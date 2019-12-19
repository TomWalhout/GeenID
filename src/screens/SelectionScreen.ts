// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>
class SelectionScreen extends GameScreen {

    private FaceOptions: Array<GameObject>;
    private BodyOptions: Array<GameObject>;
    private counter: number;
    private bodyCounter: number;
    private toggle1: boolean;
    private toggle2: boolean;
    private bodytoggle1: boolean;
    private bodytoggle2: boolean;
    private knop: Array<GameObject>;
    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        let pos = new Vector(this.game.canvas.width / 2 - 20, this.game.canvas.height / 2);
        let vel = new Vector(0, 0);
        this.counter = 0;
        this.bodyCounter = 0;
        this.BodyOptions = []
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
        this.toggle1 = false;
        this.toggle2 = false;
        this.bodytoggle1 = false;
        this.bodytoggle2 = false;
        this.knop = [];
        this.knop[0] = new GameObject(new Vector(this.game.canvas.width / 2 - 100, this.game.canvas.height / 2 - 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[2] = new GameObject(new Vector(this.game.canvas.width / 2 - 100, this.game.canvas.height / 2 + 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[1] = new GameObject(new Vector(this.game.canvas.width / 2 + 100, this.game.canvas.height / 2 - 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[3] = new GameObject(new Vector(this.game.canvas.width / 2 + 100, this.game.canvas.height / 2 + 20), new Vector(0, 0), this.game.ctx, "./button.png", 1, 1, .5, 0);
        this.knop[1].mirror = true;
        this.knop[3].mirror = true;
    }

    public draw() {
        let text = "Kies je speler";
        this.writeTextToCanvas(this.game.ctx, text, 69, new Vector(this.game.canvas.width / 2, 200), "center", "#FF0000");
        text = "Druk op enter om te beginnen";
        this.writeTextToCanvas(this.game.ctx, text, 60, new Vector(this.game.canvas.width / 2, 600), "center", "#FF0000");
        this.BodyOptions[this.bodyCounter].update();
        this.FaceOptions[this.counter].update();
        this.drawButtons();

        if (this.game.userInput.isKeyDown(UserInput.KEY_ENTER)) {
            this.game.squary = this.FaceOptions[this.counter].path;
            this.game.bodySquary = this.BodyOptions[this.bodyCounter].path;
            this.game.switchScreen(new Level1(this.game));
        }
    }

    public drawButtons() {
        this.knop.forEach(e => {
            e.update();
            if (e.clickedOn(this.game.userInput)) {
                console.log("orgjkoiernjag");
            }
        })
        if (this.knop[0].clickedOn(this.game.userInput) && !this.toggle1) {
            this.toggle1 = true;
            this.counter++
            if (this.counter >= this.FaceOptions.length) {
                this.counter = 0;
            }
        } else if (this.knop[1].clickedOn(this.game.userInput) && !this.toggle2) {
            this.toggle2 = true;
            this.counter--;
            if (this.counter < 0) {
                this.counter = this.FaceOptions.length - 1;
            }
        }
        if (!this.knop[0].clickedOn(this.game.userInput)) {
            this.toggle1 = false;
        }
        if (!this.knop[1].clickedOn(this.game.userInput)) {
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
            this.bodyCounter++
            if (this.bodyCounter >= this.BodyOptions.length) {
                this.bodyCounter = 0;
            }
        }
        if (this.knop[3].clickedOn(this.game.userInput) && !this.bodytoggle2) {
            this.bodytoggle2 = true;
            this.bodyCounter++
            if (this.bodyCounter >= this.BodyOptions.length) {
                this.bodyCounter = 0;
            }
        }
    }
}