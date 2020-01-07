/// <reference path="LevelScreen.ts"/>

class Level4 extends LevelScreen {

    private enemies: Array<Enemy>
    private numberOfEnemies: number;
    private timeInFrames: number;

    public constructor(game: Game) {
        super(game)

        this.enemies = new Array;
        this.numberOfEnemies = 5 //number of enemies

        for (let i = 0; i < this.numberOfEnemies; i++) {
            this.enemies[i] = new Enemy(new Vector(this.randomRoundedNumber(0, this.game.canvas.width - 145), this.randomRoundedNumber(0, this.game.canvas.height - 95)), new Vector(this.randomNumber(0.5, 3), this.randomNumber(0.5, 3)), this.game.ctx, './assets/enemiesAndAllies/Enemy.png', this); // 145 = enemyWidth, 190 = enemyHeight + windowsbarHeight
        }

        this.story = 0;
        this.timeInFrames = 20; // timer
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
        this.timer();
    }

    public timer() {
        if (this.timeInFrames > 0) {
            this.timeInFrames--
            console.log(this.timeInFrames);
        }
        else if (this.timeInFrames <= 0 && this.story === 0) {
            console.log('GODVERDOMME KYLER HOUD JE BEK NOU EENS OF IK GOOI JOU UIT HET RAAM');
            this.story = 1;
        }

        //next step
        if (this.story === 1) {
            this.icons[0] = new Icon(new Vector(this.game.canvas.width - 100, 500), new Vector(0, 0), this.game.ctx, './assets/icons/DEZEPC.png', 1, 1, 1.4)    
            let scanner = this.icons[0].box();
            if (this.collides(this.player.box(), scanner)) {
                this.game.switchScreen(new BossScreen(this.game))
            }
        }
    }
}