import { Vector } from "../core/vector";

export interface Circle {
    center: Vector;
    radius: number;
}

export interface Line {
    p1: Vector;
    p2: Vector;
}

export interface Box {
    position: Vector;
    size: Vector;
}

export interface Polygon {
    points: Vector[];
}