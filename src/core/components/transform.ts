import { Component } from "../component";
import { Vector } from "../vector";

export class Transform extends Component {
    public position: Vector = Vector.zero(2);
    public size: Vector = Vector.zero(2);
    public rotation: number = 0;

    public move(delta: Vector) {
        this.position.add(delta);
    }
}