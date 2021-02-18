import { RenderComponent } from "../core/components/render";
import { Vector } from "../core/vector";

export class Circle extends RenderComponent {
    public center: Vector;
    public radius: number;
    public fillColor: string = '#FFFFF';
    public strokeColor: string = '#FFFFF';
    public strokeWidth: number = 1;

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.fillColor;
        ctx.arc(this.center.get(0), this.center.get(1), this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
    }
}