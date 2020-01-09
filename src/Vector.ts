class Vector {
    
    private xpos: number;
    private ypos: number;
    constructor(xpos = 0, ypos = 0) {
        this.xpos = xpos;
        this.ypos = ypos;
    }

    public get x(): number {
        return this.xpos;
    }

    public set x(value: number) {
        this.xpos = value;
    }

    public get y(): number {
        return this.ypos;
    }
    public set y(value: number) {
        this.ypos = value;
    }

    public mirror_X(): Vector
    {
        return new Vector(this.x, this.y * -1);
    }

    public mirror_Y(): Vector
    {
        return new Vector(this.x * -1, this.y);
    }
}