import { Collisions } from "../core/collisions";
import { Renderable } from "../core/renderable";
import { Vector } from "../core/vector";
import { VectorMath } from "../math/vectorMath";
import { GraphLine } from "./graphLine";

export class GraphAxis extends Renderable {

    public majorWidth = 2;
    public minorWidth = 1;
    public tickLength = 9;
    public origin: Vector;
    public scale: Vector;

    public lines: GraphLine[];

    constructor(
        public pos: Vector, 
        public size: Vector, 
        public range: Vector = new Vector([-10, 10]),
        public domain: Vector = new Vector([-10, 10]),
        public tickWidth = new Vector([1, 1]),
        public border = true,
    ) {
        super();
        this.origin = Vector.zero(2);
        this.scale = new Vector([(this.size.y / (this.range.y - this.range.x)), (this.size.x / (this.domain.y - this.domain.x))]);
        this.lines = [];
    }

    public setRange(range: Vector) {
        this.range = range;
        this.scale.y = (this.size.y / (this.range.y - this.range.x));
    }

    public setDomain(domain: Vector) {
        this.domain = domain;
        this.scale.x = (this.size.x / (this.domain.y - this.domain.x));
    }

    public setSize(size: Vector) {
        this.size = size;
        this.setDomain(this.domain);
        this.setRange(this.range);
    }

    public setScale(scale: Vector) {
        this.scale = scale;
        const cellSize = VectorMath.div(this.size, this.scale);
        this.domain = new Vector([-cellSize.x / 2, cellSize.x / 2]).add(Vector.uniform(2, this.origin.x));
        this.range = new Vector([-cellSize.y / 2, cellSize.y / 2]).add(Vector.uniform(2, this.origin.y));
        console.log(this.domain.toString(), this.range.toString());
    }

    public adjustPoint(pt: Vector): Vector {
        const mp = VectorMath.multScalar(this.size, 0.5);
        const res = pt.copy();
        res.add(this.origin).mult(this.scale).mult(new Vector([1, -1])).add(this.pos).add(mp);
        return res;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const mp = VectorMath.multScalar(this.size, 0.5);

        if (this.border) {
            ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        }

        ctx.lineWidth = this.majorWidth;
        ctx.moveTo(this.pos.x, this.origin.y + mp.y + this.pos.y);
        ctx.lineTo(this.pos.x + this.size.x, this.origin.y + mp.y + this.pos.y);
        ctx.stroke();
        ctx.moveTo(this.origin.x + mp.x + this.pos.x, this.pos.y);
        ctx.lineTo(this.origin.x + mp.x + this.pos.x, this.pos.y + this.size.y);
        ctx.stroke();

        ctx.lineWidth = this.minorWidth;

        const xTicks = Math.ceil(this.domain.y - this.domain.x);
        const xTickWidth = this.size.x / xTicks;

        const yTicks = Math.ceil(this.range.y - this.range.x);
        const yTickWidth = this.size.y / yTicks;

        for (let i = 1; i <= xTicks; i++) {
            ctx.moveTo(this.pos.x + (xTickWidth * i) - xTickWidth / 2, this.origin.y + mp.y + this.pos.y - this.tickLength / 2);
            ctx.lineTo(this.pos.x + (xTickWidth * i) - xTickWidth / 2, this.origin.y + mp.y + this.pos.y + this.tickLength / 2);
            ctx.stroke();
        }

        for (let i = 1; i <= yTicks; i++) {
            ctx.moveTo(this.origin.x + mp.x + this.pos.x - this.tickLength / 2, this.pos.y + (yTickWidth * i) - yTickWidth / 2);
            ctx.lineTo(this.origin.x + mp.x + this.pos.x + this.tickLength / 2, this.pos.y + (yTickWidth * i) - yTickWidth / 2);
            ctx.stroke();
        }

        // Draw the lines

        for (const line of this.lines) {
            if (line.data.length >= 2) {
                for (let i = 0; i < line.data.length - 1; i++) {
                    const d1: Vector = typeof line.data[i] === 'number' ? new Vector([i, line.data[i] as number]) : line.data[i] as Vector;
                    const d2: Vector = typeof line.data[i + 1] === 'number' ? new Vector([i + 1, line.data[i + 1] as number]) : line.data[i + 1] as Vector;
                    const [x, y] = [this.adjustPoint(d1), this.adjustPoint(d2)];
                    if (Collisions.pointInBox(x, this.pos, this.size) && Collisions.pointInBox(y, this.pos, this.size)) {
                        line.drawLine(ctx, i, x, y);
                    }
                }
            }
        }
    }
}