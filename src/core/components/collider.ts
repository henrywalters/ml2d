import { VectorMath } from "../../math";
import { Component } from "../component"
import { Game } from "../game";
import { Transform } from "./transform";

export enum ColliderType {
    Line,
    Circle,
    Box,
}

export class Collider extends Component {

    public dependsOn = [Transform];
    
    public active = true;
    public static = false;
    public render = false;
    public type: ColliderType = ColliderType.Box;

    public draw() {
        if (this.type === ColliderType.Box) {
            Game.Active.canvas.drawBox(this.gameObject);
        } else if (this.type === ColliderType.Circle) {
            Game.Active.canvas.drawCircle({
                radius: this.gameObject.size.x,
                center: VectorMath.add(VectorMath.multScalar(this.gameObject.size, 0.5), this.gameObject.position),
            });
        } else {
            Game.Active.canvas.drawLine({
                p1: this.gameObject.position,
                p2: VectorMath.add(this.gameObject.position, this.gameObject.size),
            });
        }
    }
}