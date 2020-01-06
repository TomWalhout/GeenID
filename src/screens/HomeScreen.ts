/// <reference path="LevelScreen.ts"/>
class HomeScreen extends LevelScreen{
    

    public constructor(game: Game) {

        super(game);
        this.icons[0] = new Icon(new Vector(0, 0), new Vector(0, 0), this.game.ctx, './assets/finalHomeScreen.png', 1, 2, 1)
    }

    public draw() {

        super.draw(this.game.ctx);
        this.collide();

        if (this.game.userInput.isKeyDown(UserInput.KEY_ENTER)) {
            this.game.switchScreen(new SelectionScreen(this.game));
        }
    }
}