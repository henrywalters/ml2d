import { Game } from "../core";
import { RenderComponent } from "../core/components/render";
import { Vector } from "../core/vector";
import { VectorMath } from "../math";

export class CircleRenderer extends RenderComponent {
    public filled: boolean = false;
    public color: string = "#FFFFF";
    public strokeWidth: number = 1;

    public draw() {
        Game.Active.canvas.drawCircle({
            center: VectorMath.add(this.gameObject.position, VectorMath.multScalar(this.gameObject.size, 0.5)),
            radius: this.gameObject.size.x / 2,
        }, this.filled, this.color);
    }
}