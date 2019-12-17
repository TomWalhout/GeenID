/// <reference path="LevelScreen.ts"/>

class Level3 extends LevelScreen {
    /**
     * Contructes the second level
     * 
     * @param game the game
     */
    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.icons[0] = new Icon(new Vector(0, 200), new Vector(0, 0), this.game.ctx, './assets/icons/Minecraft.png', 1, 1, 0.4, 0)
        this.programs[0] = new Program(new Vector(100, 400), new Vector(0, 0), this.game.ctx, './assets/windows/MINECRAFT.png', 1, 1, 0.5, 0);
    }

    public draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.nextLevel();
    }

    public nextLevel() {
        let player = this.player.box();

        // bugFile collision
        let file = this.icons[0].box(); // Glooole
        if (this.collides(file, player)) {
            this.game.switchScreen(new Level3(this.game)); // WIP => next level
        }
    }
}