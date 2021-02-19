import { Component } from "../component";
import { Transform } from "./transform";

export class RenderComponent extends Component {

    public dependsOn = [Transform];

    public draw(): void {
        throw new Error("Draw not implemented");
    }
}