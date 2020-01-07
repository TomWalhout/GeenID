/**
 * Class that holds the state of all the user inputs like keyboard and mouse.
 */
class UserInput {

    // Fields that hold the state of the mouse
    private inWindow: boolean = true;
    private position: Vector = new Vector();
    private buttonDown: boolean = false;

    // Array that holds the state of all keys
    private keyCodeStates: boolean[] = new Array<boolean>();

    /**
     * Constructs a new KeyListener.
     */
    constructor() {
        // Register the arrow methods as listeners to keyevents
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseenter", this.mouseEnter);
        document.addEventListener("mouseleave", this.mouseLeave);
        // There is a third event ('keypress'), but we do not need to use it
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }

    /**
     * Returns `true` if and only if the last known state of the keyboard
     * reflects that the specified key is currently pressed.
     *
     * @param {number} keyCode the keyCode to check
     * @returns {boolean} `true` when the specified key is currently down
     */
    public isKeyDown(keyCode: number): boolean {
        return this.keyCodeStates[keyCode] == true;
    }

    // TODO add methods that expose the mouse state to the game

    public isMouseDown() {
        return this.buttonDown;
    }

    public mousePos() {
        return this.position;
    }

    public isInWindow() {
        return this.inWindow;
    }
    //----------------- Event Handler (Arrow) methods -------------------------

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseDown = (ev: MouseEvent) => {
        this.buttonDown = true;
    }

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseUp = (ev: MouseEvent) => {
        this.buttonDown = false;
    }

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseMove = (ev: MouseEvent) => {
        this.position = new Vector(ev.clientX, ev.clientY);
    }

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseEnter = (ev: MouseEvent) => {
        this.inWindow = true;
    }

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseLeave = (ev: MouseEvent) => {
        this.inWindow = true;
    }

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private keyDown = (ev: KeyboardEvent) => {
        this.keyCodeStates[ev.keyCode] = true;
    }

    /*
     * Arrow method that catches keyup events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private keyUp = (ev: KeyboardEvent) => {
        this.keyCodeStates[ev.keyCode] = false;
    }

    // Some convenient key codes already defined here. If you need a specific
    // keycode, see:https://keycode.info/
    public static readonly KEY_ESC = 27;
    public static readonly KEY_SPACE = 32;
    public static readonly KEY_LEFT = 37;
    public static readonly KEY_UP = 38;
    public static readonly KEY_RIGHT = 39;
    public static readonly KEY_DOWN = 40;
    public static readonly KEY_D = 68;
    public static readonly KEY_S = 83;
    public static readonly KEY_W = 87;
    public static readonly KEY_A = 65;
    public static readonly KEY_BACK = 8;
    public static readonly KEY_ENTER = 13;
    public static readonly KEY_1 = 49;
    public static readonly KEY_2 = 50;
    public static readonly KEY_3 = 51;
    public static readonly KEY_4 = 52;
    public static readonly KEY_5 = 53;
}