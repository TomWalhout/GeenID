// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class BossScreen extends GameScreen {
    private boss: Boss;
    private player: Player;
    private shouldSwitchToTitleScreen = false;

    /**
     * Construct a new GameScreen object.
     *
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        this.boss = new Boss(new Vector(100, 400), new Vector(0, 0), this.game.ctx, "./urawizardgandalf2.png", this, 4, 20);
        this.player = new Player(new Vector(100, 900), new Vector(0, 0), this.game.ctx, "./Frog Down.png", 20, 1);
        // add an mouse event listener
        document.addEventListener("click", this.mouseHandler);
    }


    /**
     * Let this screen adjust its state and/or let the game switch to a new
     * screen to show.
     *
     * @param game the game object, conveniently added as a parameter so you
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
        this.player.playerMove(this.game.canvas);
    }

    private mouseHandler = (event: MouseEvent) => {
        // console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
        //0 = x, 
        //1 = x + width, 
        //2 = y, 
        //3 = y + height

        let box = this.boss.box();
        if (
            event.clientX >= box[0] &&
            event.clientX < box[1] &&
            event.clientY >= box[2] &&
            event.clientY <= box[3]
        ) {
            console.log('YOU SHALL NOT PAAAAAS');
        }

    };

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     *
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        this.boss.update();
        this.player.update();
    }

    /**
     * Check collisions
     */
    public collide() {
        let player = this.player.box();
        let boss = this.boss.box();
        if (this.collides(player, boss)) {
        }
    }


}
