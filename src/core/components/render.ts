import { Component } from "../component";

export abstract class RenderComponent extends Component {
    abstract draw(ctx: CanvasRenderingContext2D): void;
}