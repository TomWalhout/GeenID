/// <reference path="LevelScreen.ts"/>

class Level4 extends LevelScreen {

    private enemies: Array<Enemy>
    private enemy: Enemy;

    public constructor(game: Game) {
        super(game)

        this.enemies = new Array;
        this.enemies[0] = new Enemy(new Vector(100, 100), new Vector(1, 1), this.game.ctx, './assets/enemiesAndAllies/Enemy.png', this);

    }

    public draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.enemies.forEach(element => {
            element.update()
        })
    }
}