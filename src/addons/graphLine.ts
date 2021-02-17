import { Vector } from "../core/vector";

export abstract class GraphLine {
    public data: Array<Vector>;

    constructor(data: Array<Vector> = []) {
        this.data = data;
    }

    // 
    public abstract drawLine(ctx: CanvasRenderingContext2D, index: number, p1: Vector, p2: Vector);
}

export class StraightGraphLine extends GraphLine {
    drawLine(ctx: CanvasRenderingContext2D, index: number, p1: Vector, p2: Vector) {
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}