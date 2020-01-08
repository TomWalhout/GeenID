/// <reference path="LevelScreen.ts"/>

class Level4 extends LevelScreen {

    private enemies: Array<Enemy>
    private numberOfEnemies: number;
    private timeInFrames: number;
    private wizard: Wizard;
    private textbox: GameObject;
    private text: any;
    private bossBoi: GameObject;

    public constructor(game: Game) {
        super(game)

        this.enemies = new Array;
        this.numberOfEnemies = 5 //number of enemies

        for (let i = 0; i < this.numberOfEnemies; i++) {
            this.enemies[i] = new Enemy(new Vector(this.randomRoundedNumber(150, this.game.canvas.width - 145), this.randomRoundedNumber(0, this.game.canvas.height - 195)), new Vector(this.randomNumber(0.5, 3), this.randomNumber(0.5, 3)), this.game.ctx, './assets/enemiesAndAllies/Enemy.png', this); // 145 = enemyWidth, 190 = enemyHeight + windowsbarHeight
        }

        this.programs[0] = new Program(new Vector(500, 500), new Vector(0, 0), this.game.ctx, './assets/programs/hackerman.png', 1, 1, 0.3, 0);
        this.programs[0].isOpen = true;

        this.story = 0;
        this.timeInFrames = 400; // timer
        this.wizard = new Wizard(new Vector(300, this.game.canvas.height - 145), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 10, 1);
        this.textbox = new GameObject(new Vector(50, 400), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.5);
    }

    public draw() {
        // story
        super.draw(this.game.ctx);
        this.wizard.update();
        this.textbox.update();
        this.storyText();
        this.storyAdvance();
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
        if (this.story < 2) {
            this.enemyCollision();
        }
    }

    public timer() {
        if (this.timeInFrames > 0) {
            this.timeInFrames--
            // console.log(this.timeInFrames);
        }
    }

    public enemyCollision() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.collides(this.player.box(), this.enemies[i].box())) {
                this.id.youGotRekt = this.id.youGotRekt - 1;
            }
        }
    }

    public storyText() {
        if (this.story === 0) {
            this.text = this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}!\nOntwijk de vijanden terwijl ik\neen virusscanner maak!`, 200, 450);
        }
        if (this.story === 1) {
            this.text = this.multilineText(this.game.ctx, `Goedzo! Ga nu snel\nnaar de scanner toe!`, 200, 450);
        }
        if (this.story === 2 || this.story === 3) {
            this.text = this.multilineText(this.game.ctx, `Oh nee!\nWe worden gehacked!`, 200, 450);
        }
        if (this.story === 4) {
            this.text = this.multilineText(this.game.ctx, `De hacker is binnen!\nKijk uit ${this.game.playerinfo[0]}!`, 200, 450);
        }
        

    }

    public storyAdvance() {
        //step 0, the start
        if (this.timeInFrames <= 0 && this.story === 0) {
            this.story = 1;
            //step 1, virusscanner appears
        }
        if (this.story === 1) {
            this.icons[0] = new Icon(new Vector(this.game.canvas.width - 100, 500), new Vector(0, 0), this.game.ctx, './assets/icons/virusscanner.png', 1, 1, 0.3)
            let scanner = this.icons[0].box();
            // if (this.collides(this.player.box(), scanner)) {
            //     this.game.switchScreen(new BossScreen(this.game))
            // }
        }
        //step 2, it dissapears when you get close
        if (this.story === 1 && this.player.pos.x >= 1200) {
            this.icons.pop();

            for (let i = 0; i < 30; i++) {
                this.enemies[i] = new Enemy(new Vector(this.randomRoundedNumber(0, this.game.canvas.width - 145), this.randomRoundedNumber(0, this.game.canvas.height - 95)), new Vector(this.randomNumber(0.5, 3), this.randomNumber(0.5, 3)), this.game.ctx, './assets/enemiesAndAllies/Enemy.png', this); // 145 = enemyWidth, 190 = enemyHeight + windowsbarHeight
            }

            this.timeInFrames = 400;
            this.story = 2;
        }
        //step 3, boss spawns
        if (this.story === 2 && this.timeInFrames <= 0) {
            this.bossBoi = new GameObject(new Vector(600, 100), new Vector(0, 0), this.game.ctx, "./assets/enemiesAndAllies/hackerman.png", 1, 1, .5);
            this.story = 3;
        }
        if (this.story === 3) {
            this.timeInFrames = 200;
            this.story = 4;
        }
        if (this.story === 4) {
            this.bossBoi.update();
        }
        if (this.story === 4 && this.timeInFrames <= 0) {
            this.game.switchScreen(new BossScreen(this.game))
        } 
    }
}