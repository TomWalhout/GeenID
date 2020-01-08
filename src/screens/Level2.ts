/// <reference path="LevelScreen.ts"/>

class Level2 extends LevelScreen {

    private wizard: Wizard;
    private textbox: GameObject;

    /**
     * Contructes the third level
     * 
     * @param game the game
     */
    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.programs[0] = new Program(new Vector(293, 479), new Vector(0, 0), this.game.ctx, './transparentBreed.png', 1, 1, 1, 0);
        this.programs[0].isOpen = true;
        this.wizard = new Wizard(new Vector(290, 300), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 1);
        this.textbox = new GameObject(new Vector(50, 150), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);

        let adsAmount = 5; // amount of ads
        for (let i = 0; i < adsAmount; i++) {
            
            this.ads[i] = new Ad (new Vector(this.randomNumber(0, this.game.canvas.width - 150), this.randomNumber(0, this.game.canvas.height - 95)), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/ad1.png', 1, 1, 1.5) //150 is adWidth, 95 is adHeight + windowsBarHeight
            this.ads[i].isOpen = true;
        }

        this.icons[0] = new Icon(new Vector(1342, 150), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/Kruisje.png', 1, 1, 1, 0);
        document.body.style.backgroundImage = "url('./assets/programs/GloooleLevel.png')";
        }

    public nextLevel() {
        let player = this.player.box();
    
        // exit level 3
        let file = this.icons[0].box(); // kruisje
        if (this.collides(file, player)) {
            this.game.switchScreen(new Level3(this.game));
        }
    }

    public collide() {
        super.collide();
        // let ads = this.ads.box();
        let player = this.player.box();
        
        if (this.ads) {
            this.ads.forEach(e => {
                let ads = e.box();
                if (this.collides(player, ads)) {
                    this.id.youGotRekt = this.id.youGotRekt - 1;
                }
            })
        }
    }
  
    public draw() {
        super.draw(this.game.ctx);
        this.ads.forEach(element => {
            element.update()
        })        
        this.updateOtherThings();
        this.storyCheck();
        this.storyText();
        this.closeAds();
        this.nextLevel();
        }

        private storyCheck() {
            if (this.story < 1) {
                this.story = this.story + 1;
            }

            if (this.game.Lives == 4) {
                this.story = 2;
            } else if (this.game.lives == 3) {
                this.story = 3;
            } else if (this.game.lives == 2) {
                this.story = 4;
            } else if (this.game.lives == 1) {
                this.story = 5;
            }

        }
    
        private updateOtherThings() {
            this.wizard.update();
            // this.wizard.pos.x += Math.random() * 2 - 1; 
            // this.wizard.pos.y += Math.random() * 2 - 1; 
            if (this.story > 0) {
                this.textbox.update();
            }
        }
    
        public storyText() {

            // const random1 = Math.random() * 2 - 1;
            // const random2 = Math.random() * 4 - 2; 
            // const random3 = Math.random() * 6 - 3;
    
            if (this.story == 1) {
                this.multilineText(this.game.ctx, `Oh nee...\n Het lijkt erop dat Glooogle\nvol zit met nep advertenties.\nKlik op de kruisjes\nom ze weg te halen`, 175, 180);
                console.log(this.story);
            } else if (this.story == 2) {
                this.multilineText(this.game.ctx, `Niet aanraken!\nje verliest je levens`, 175, 220);
            } else if (this.story == 3) {
                this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}?\n`, 175, 220);
                this.wizard.pos.x += Math.random() * 2 - 1; 
                this.wizard.pos.y += Math.random() * 2 - 1; 
            } else if (this.story == 4) {
                this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}! luister je wel?\n`, 175, 220);
                this.wizard.pos.x += Math.random() * 4 - 2; 
                this.wizard.pos.y += Math.random() * 4 - 2; 
            } else if (this.story == 5) {
                this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}... g-gaat het wel?\n`, 175, 220);
                this.wizard.pos.x += Math.random() * 6 - 3; 
                this.wizard.pos.y += Math.random() * 6 - 3; 
            }
            
        }
}
