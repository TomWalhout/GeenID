/// <reference path="LevelScreen.ts"/>

class Level4 extends LevelScreen {

    private enemies: Array<Enemy>
    private numberOfEnemies: number;

    public constructor(game: Game) {
        super(game)

        this.enemies = new Array;
        this.numberOfEnemies = 5 //number of enemies

        for (let i = 0; i < this.numberOfEnemies; i++) {
            this.enemies[i] = new Enemy(new Vector(this.randomRoundedNumber(0, this.game.canvas.width - 145), this.randomRoundedNumber(0, this.game.canvas.height - 95)), new Vector(this.randomNumber(0.5, 3), this.randomNumber(0.5, 3)), this.game.ctx, './assets/enemiesAndAllies/Enemy.png', this); // 145 = enemyWidth, 190 = enemyHeight + windowsbarHeight
        }
    }

    public draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.enemies.forEach(element => {
            element.update()
            element.enemyMove(this.game.canvas)
            element.drawBox()
        })
    }
}