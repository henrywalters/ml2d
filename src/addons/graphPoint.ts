import { Vector } from "../core/vector";

export abstract class GraphPoint {

    public data: Vector[];
    constructor(data: Vector[] = []) {this.data = data;}

    public abstract draw(ctx: CanvasRenderingContext2D, pt: Vector);
}

export class DotGraphPoint extends GraphPoint{

    constructor(public color: string, public radius: number) {
        super();
    }

    public draw(ctx: CanvasRenderingContext2D, pt: Vector) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(pt.get(0), pt.get(1), this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}