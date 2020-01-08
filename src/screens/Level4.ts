/// <reference path="LevelScreen.ts"/>

class Level4 extends LevelScreen {

    private enemies: Array<Enemy>
    private numberOfEnemies: number;
    private timeInFrames: number;
    private wizard: Wizard;
    private textbox: GameObject;
    private text: any;

    public constructor(game: Game) {
        super(game)

        this.enemies = new Array;
        this.numberOfEnemies = 5 //number of enemies

        for (let i = 0; i < this.numberOfEnemies; i++) {
            this.enemies[i] = new Enemy(new Vector(this.randomRoundedNumber(0, this.game.canvas.width - 145), this.randomRoundedNumber(0, this.game.canvas.height - 95)), new Vector(this.randomNumber(0.5, 3), this.randomNumber(0.5, 3)), this.game.ctx, './assets/enemiesAndAllies/Enemy.png', this); // 145 = enemyWidth, 190 = enemyHeight + windowsbarHeight
        }

        this.story = 0;
        this.timeInFrames = 200; // timer
        this.wizard = new Wizard(new Vector(300, this.game.canvas.height - 145), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 10, 1);
        this.textbox = new GameObject(new Vector(50, 400), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.5);
    }

    public draw() {
        // story
        this.wizard.update();
        this.textbox.update();
        this.storyText();

        // programs
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.enemies.forEach(element => {
            element.update()
            element.enemyMove(this.game.canvas)
            element.drawBox()
        })
        this.timer();
        this.enemyCollision();
        super.draw(this.game.ctx);
    }

    public timer() {
        if (this.timeInFrames > 0) {
            this.timeInFrames--
            console.log(this.timeInFrames);
        }
        else if (this.timeInFrames <= 0 && this.story === 0) {
            this.story = 1;
        }

        //next step
        if (this.story === 1) {
            this.icons[0] = new Icon(new Vector(this.game.canvas.width - 100, 500), new Vector(0, 0), this.game.ctx, './assets/icons/virusscanner.png', 1, 1, 0.3)
            let scanner = this.icons[0].box();
            if (this.collides(this.player.box(), scanner)) {
                this.game.switchScreen(new BossScreen(this.game))
            }
        }
    }

    public enemyCollision() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.collides(this.player.box(), this.enemies[i].box())) {
                this.id.youGotRekt = this.id.youGotRekt - 1;
            }
        }
    }

    public storyText(){
        if (this.story == 0) {
            this.text = this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}!\nOntwijk de vijanden terwijl ik\neen virusscanner maak!`, 200, 450);
        }
        if (this.story == 1) {
            this.text = this.multilineText(this.game.ctx, `Goedzo! Ga nu snel\nnaar de scanner toe!`, 200, 450);
        }
    }
}