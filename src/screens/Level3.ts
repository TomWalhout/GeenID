/// <reference path="LevelScreen.ts"/>

class Level3 extends LevelScreen {
    /**
     * Contructes the third level
     * 
     * @param game the game
     */

    private toggle: boolean; // first time opening the game
    private scare: GameObject
    private scareBool: boolean;

    public constructor(game: Game) {
        super(game);
        // fill this boi up
        this.icons[0] = new Icon(new Vector(0, 200), new Vector(0, 0), this.game.ctx, './assets/icons/Minecraft.png', 1, 1, 0.4, 0);
        this.programs[0] = new Program(new Vector(300, 100), new Vector(0, 0), this.game.ctx, './assets/windows/MINECRAFT.png', 1, 1, 1, 0);

        this.toggle = false;
        this.scareBool = false;
    }

    public draw() {
        super.draw(this.game.ctx);
        this.closeAds();
        this.closeProgram();
        this.clickedIcon();
        this.corrupt();
        if (this.scareBool) {
            this.scare.update();
            this.writeTextToCanvas(this.game.ctx, 'GAME OVER?', 200, new Vector(700,300), 'center', 'red')            
        }
    }

    // turns minecraft into a corrupted game
    private corrupt() {
        if (this.programs[0].isOpen == true && !this.toggle) {
            this.toggle = true;
        }
        if (this.toggle && !this.programs[0].isOpen) {
            this.programs[0] = new Program(new Vector(300, 100), new Vector(0, 0), this.game.ctx, './assets/programs/MINECRAFTEXE.png', 6, 50, 1, 0);
            this.programs[0].isOpen = true;
            setTimeout(() => {
                this.scareBool = true;
                this.scare = new GameObject(new Vector(-1, 0), new Vector(0, 0), this.game.ctx, './assets/SquaryC.png', 1, 1, 1.2, 0);
                this.programs[0].isOpen = true;
            }, 10000);
        }
    }
}