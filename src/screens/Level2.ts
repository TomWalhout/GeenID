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

        let adsAmount = 5; // amount of ads
        for (let i = 0; i < adsAmount; i++) {
            
            this.ads[i] = new Ad (new Vector(this.randomNumber(0, this.game.canvas.width - 150), this.randomNumber(0, this.game.canvas.height - 95)), new Vector(0, 0), this.game.ctx, './assets/textboxAndAds/ad1.png', 1, 1, 3) //150 is adWidth, 95 is adHeight + windowsBarHeight
            this.ads[i].isOpen = true;
        }

        document.body.style.backgroundImage = "url('./assets/programs/GloooleLevel.png')";
        }
  
    public draw() {
        super.draw(this.game.ctx);
        this.ads.forEach(element => {
            element.update()
        })
        this.closeAds();
        }
}