import { GraphAxis } from './addons/graphAxis';
import { StraightGraphLine } from './addons/graphLine';
import { DotGraphPoint } from './addons/graphPoint';
import { Bot } from './core/bot';
import { Canvas } from './core/canvas';
import { Collisions } from './core/collisions';
import { Component } from './core/component';
import { Position2DComponent } from './core/components/position';
import { Game } from './core/game';
import { GameObject } from './core/gameObject';
import { Matrix } from './core/matrix';
import { System } from './core/system';
import { Vector } from './core/vector';
import { DEG2RAD, RAD2DEG } from './math/constants';
import { angle, sigmoid } from './math/functions';
import { VectorMath } from './math/vectorMath';
import { Circle } from './renderables/circle';
import { Line } from './renderables/line';

export { Config } from "./core/config";

const ML2D = {
    DEG2RAD: DEG2RAD,
    RAD2DEG: RAD2DEG,
    Renderables: {
        Line: Line,
        Circle: Circle,
    },
    Physics: {
        Collisions: Collisions,
    },
    Math: {
        angle: angle,
        sigmoid: sigmoid,
    },
    Components: {
        Position2D: Position2DComponent,
    },
    Addons: {
        Graph: {
            Axis: GraphAxis,
            Lines: {
                Straight: StraightGraphLine,
            },
            Points: {
                Dot: DotGraphPoint,
            }
        }
    },
    Game: Game,
    Canvas: Canvas,
    Vector: Vector,
    VectorMath: VectorMath,
    Matrix: Matrix,
    Bot: Bot,
    GameObject: GameObject,
    Component: Component,
    System: System,
}

export default ML2D;