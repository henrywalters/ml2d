import { Game } from "../core";
import { RenderComponent } from "../core/components/render";
import { Vector } from "../core/vector";

export class LineRenderer extends RenderComponent {

    public pointA: Vector;
    public pointB: Vector;
    public color: string = '#FFFFF';
    public width: number = 1;

    public draw(): void {
        Game.Active.canvas.drawLine({
            p1: this.pointA,
            p2: this.pointB,
        }, this.color);
    }
}