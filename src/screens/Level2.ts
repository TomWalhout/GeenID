/// <reference path="LevelScreen.ts"/>

class Level2 extends LevelScreen {

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
        this.programs[0].hasAds = true;
        this.ads[0] = new Ad (new Vector(this.randomNumber(100, 1266), this.randomNumber(100, 668)), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/ad1.png', 1, 1, 1.3)
        this.ads[1] = new Ad (new Vector(this.randomNumber(100, 1266), this.randomNumber(100, 668)), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/ad1.png', 1, 1, 1.3)
        this.ads[2] = new Ad (new Vector(this.randomNumber(100, 1266), this.randomNumber(100, 668)), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/ad1.png', 1, 1, 1.3)
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
        if (this.ads.length > 0) {
            this.ads.forEach(e => {
                e.update();
            })
        }

        this.nextLevel();
        this.closeAds()
        }
}