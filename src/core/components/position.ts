import { Component } from "../component";
import { Vector } from "../vector";

export class Position2DComponent extends Component {
    public readonly position: Vector;

    constructor(init: Vector = Vector.zero(2)) {
        super();
        this.position = init;
    }

    public move(delta: Vector) {
        this.position.add(delta);
    }
}