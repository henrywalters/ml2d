import { Game, RenderComponent } from "../core";

export class BoxRenderer extends RenderComponent {

    public filled: boolean = false;
    public color: string = "#FFFFF";

    public draw() {
        Game.Active.canvas.drawBox(this.gameObject, this.filled, this.color);
    }
}