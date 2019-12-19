// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>
class SelectionScreen extends GameScreen {

    private FaceOptions: Array<GameObject>;
    private BodyOptions: Array<GameObject>;
    private counter: number;
    private bodyCounter: number;
    private toggle: boolean;
    private bodytoggle: boolean;
    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        let pos = new Vector(this.game.canvas.width / 2 - 20, this.game.canvas.height / 2 + 50);
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
        this.toggle = false;
        this.bodytoggle = false;
    }

    public draw() {
        let text = "Hoi ik ben Squary, ik ben vergeten hoe ik eruitzie!!!";
        this.writeTextToCanvas(this.game.ctx, text, 69, new Vector(this.game.canvas.width / 2, 100), "center", "#FF0000");
        text = "Kun jij mij helpen?";
        this.writeTextToCanvas(this.game.ctx, text, 60, new Vector(this.game.canvas.width / 2, 200), "center", "#FF0000");
        this.BodyOptions[this.bodyCounter].update();
        this.FaceOptions[this.counter].update();
        if (this.game.userInput.isKeyDown(UserInput.KEY_ENTER) && !this.toggle) {
            this.toggle = true;
            this.counter++
            if (this.counter >= this.FaceOptions.length) {
                this.counter = 0;
            }
        }

        if (!this.game.userInput.isKeyDown(UserInput.KEY_ENTER)) {
            this.toggle = false;
        }
        if (this.game.userInput.isKeyDown(UserInput.KEY_S) && !this.bodytoggle) {
            this.bodytoggle = true;
            this.bodyCounter++
            if (this.bodyCounter >= this.BodyOptions.length) {
                this.bodyCounter = 0;
            }
        }
        if (!this.game.userInput.isKeyDown(UserInput.KEY_S)) {
            this.bodytoggle = false;
        }

        if (this.game.userInput.isKeyDown(UserInput.KEY_ESC)) {
            this.game.squary = this.FaceOptions[this.counter].path;
            this.game.bodySquary = this.BodyOptions[this.bodyCounter].path;
            this.game.switchScreen(new Level1(this.game));
        }
    }


    
}