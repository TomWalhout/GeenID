/// <reference path="LevelScreen.ts"/>

class Level2 extends LevelScreen {

    private wizard: Wizard;
    private textbox: GameObject;
    private textXPos: number;
    private textYPos: number;
    private vortex: Boolean;

    /**
     * Contructes the third level
     * 
     * @param game the game
     */
    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.programs[1] = new Program(new Vector(293, 479), new Vector(0, 0), this.game.ctx, './transparentBreed.png', 1, 1, 1, 0);
        this.programs[1].isOpen = true;
        this.programs[0] = new Program(new Vector(293, 479), new Vector(0, 0), this.game.ctx, '', 1, 1, 1, 0);
        this.icons[0] = new Icon(new Vector(1250, 150), new Vector(0, 0), this.game.ctx, './assets/icons/vortex.png', 5, 5, 1.4, 1);
        this.wizard = new Wizard(new Vector(290, 300), new Vector(0, 0), this.game.ctx, './assets/enemiesAndAllies/urawizardgandalf.png', 6, 20, 1);
        this.textbox = new GameObject(new Vector(50, 150), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/textbox2.png', 1, 1, 1.3);
        this.textXPos = 175;
        this.textYPos = 220;

        const adsFileNames: string[] = [
            './assets/textboxAndAds/ad1.png',
            './assets/textboxAndAds/ad2.png'
        ]

        for (let i = 0; i < this.randomRoundedNumber(5, 7); i++) {
            const randonmIndex = this.randomRoundedNumber(0, adsFileNames.length)
            this.ads[i] = new Ad (new Vector(this.randomNumber(100, this.game.canvas.width - 150), this.randomNumber(0, this.game.canvas.height - 195)), new Vector(0, 0), this.game.ctx, adsFileNames[randonmIndex], 1, 1, 1.5) //150 is adWidth, 95 is adHeight + windowsBarHeight
            this.ads[i].isOpen = true;           
        }

        this.icons[1] = new Icon(new Vector(1342, 150), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/Kruisje.png', 1, 1, 1, 0);
        document.body.style.backgroundImage = "url('./assets/programs/GloooleLevel.png')";
        }

    public nextLevel() {
        let player = this.player.box();
    
        // exit level 3
        let file = this.icons[1].box(); // kruisje
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
        // let shake = Math.random() * 2-1;
        let x1 = Math.random() * 2-1;
        let y1 = Math.random() * 2-1;
        let x2 = Math.random() * 4-2;
        let y2 = Math.random() * 4-2;
        let x3 = Math.random() * 6-3;
        let y3 = Math.random() * 6-3;
        if (this.story == 1) {
            this.multilineText(this.game.ctx, `Oh nee...\n Het lijkt erop dat Glooogle\nvol zit met nep advertenties.\nKlik op de kruisjes\nom ze weg te halen`, 175, 180);
            // console.log(this.story);
        } else if (this.story == 2) {
            this.multilineText(this.game.ctx, `Niet aanraken!\nje verliest je levens`, this.textXPos, this.textYPos);
        } else if (this.story == 3) {
            this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}?\n`, this.textXPos += x1, this.textYPos += y1);
            this.wizard.pos.x += x1; 
            this.wizard.pos.y += y1; 
            this.textbox.pos.x += x1;
            this.textbox.pos.y += y1;
        } else if (this.story == 4) {
            this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}! luister je wel?\n`, this.textXPos += x2, this.textYPos += y2);
            this.wizard.pos.x += x2; 
            this.wizard.pos.y += y2; 
            this.textbox.pos.x += x2;
            this.textbox.pos.y += y2;
        } else if (this.story == 5) {
            this.multilineText(this.game.ctx, `${this.game.playerinfo[0]}... g-gaat het wel?\n`, this.textXPos += x3, this.textYPos += y3);
            this.wizard.pos.x += x3; 
            this.wizard.pos.y += y3; 
            this.textbox.pos.x += x3;
            this.textbox.pos.y += y3;
        }          
    }
}