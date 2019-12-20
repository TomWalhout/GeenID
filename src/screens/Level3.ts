/// <reference path="LevelScreen.ts"/>

class Level3 extends LevelScreen {

    /**
     * Contructes the third level
     * 
     * @param game the game
     */
    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.searchBar = new SearchBar(new Vector(343, 518), new Vector(0, 0), this.game.ctx, './transparentBreed.png', 1, 1, 1);
        document.body.style.backgroundImage = "url('./assets/programs/Glooole.png')";
        }

    public draw() {
        super.draw(this.game.ctx);
        this.searchBarCollision();
        this.collide();
    }

    public searchBarCollision() {
        if (this.searchBar) {        
            this.searchBar.update();
        }

        let player = this.player.box();
        let playerbottom = [player[0], player[1], player[3], player[3] + 2];

        if (this.searchBar) {
            let searchBar = this.searchBar.box();
            let searchBarTop = [searchBar[0], searchBar[1], searchBar[2], searchBar[2] + 10];
            if (this.collides(playerbottom, searchBarTop) && this.player.vel.y > 0 && !this.player.standing) {
                this.Stand = true;
            }
            else {
                this.Stand = false;
            }
        }
    }
}