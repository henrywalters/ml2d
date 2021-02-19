import { VectorMath } from "../math/vectorMath";
import { Circle } from "../math/primitives";
import { Vector } from "./vector";

export class Collisions {
    public static checkCircles(circleA: Circle, circleB: Circle): boolean {
        return VectorMath.subtract(circleA.center, circleB.center).magnitude() < circleA.radius + circleB.radius;
    }

    public static pointInBox(pt: Vector, boxPos: Vector, boxSize: Vector): boolean {
        for (let i = 0; i < pt.dim; i++) {
            if (pt.get(i) < boxPos.get(i) || pt.get(i) > boxPos.get(i) + boxSize.get(i)) {
                return false;
            }
        }
        return true;
    }
}