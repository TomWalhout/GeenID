// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>
class SelectionScreen extends GameScreen {

    private FaceOptions: Array<GameObject>;
    private counter: number;
    private toggle: boolean;
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
        this.FaceOptions = [];
        this.FaceOptions[0] = new GameObject(pos, vel, this.game.ctx, "./assets/Squary.png", 1, 1, 1, 0);
        this.FaceOptions[1] = new GameObject(pos, vel, this.game.ctx, "./assets/SquaryHurt.png", 1, 1, 1, 0);
        this.FaceOptions[2] = new GameObject(pos, vel, this.game.ctx, "./assets/SquaryHurtPixels.png", 1, 1, 1, 0);
        this.FaceOptions[3] = new GameObject(pos, vel, this.game.ctx, "./assets/SquaryHurtPixels2.png", 1, 1, 1, 0);
        this.toggle = false;
    }

    public draw() {
        let text = "Hoi ik ben Squary, ik ben vergeten hoe ik eruitzie!!!";
        this.writeTextToCanvas(this.game.ctx, text, 69, new Vector(this.game.canvas.width / 2, 100), "center", "#FF0000");
        text = "Kun jij mij helpen?";
        this.writeTextToCanvas(this.game.ctx, text, 60, new Vector(this.game.canvas.width / 2, 200), "center", "#FF0000");
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
        console.log(this.toggle);

        if (this.game.userInput.isKeyDown(UserInput.KEY_ESC)) {
            this.game.squary = this.FaceOptions[this.counter].path;
            this.game.switchScreen(new Level1(this.game));
        }
    }

}