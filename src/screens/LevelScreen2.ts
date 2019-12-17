// tslint:disable member-ordering
/// <reference path="LevelScreen.ts"/>

class LevelScreen2 extends LevelScreen {

    public constructor(game: Game) {
        super(game);
        this.programs[3] = new Program(new Vector(600, 300), new Vector(0, 0), this.game.ctx, './assets/programs/Glooole.png', 1, 1, 0.7, 1);

    }

}