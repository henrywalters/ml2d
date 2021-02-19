import { Box, Circle, Line } from "../math";
import { RenderComponent } from "./components/render";
import { Vector } from "./vector";

export class Canvas {
    public readonly container: HTMLDivElement;
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;

    constructor(container: HTMLDivElement, public readonly width: number, public readonly height: number) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.container.append(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
    }

    public draw(renderable: RenderComponent) {
        this.ctx.beginPath();
        renderable.draw();
        this.ctx.closePath();
    }

    private drawCurrentContext(filled: boolean, color: string) {
        if (filled) {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }

    public drawBox(box: Box, filled: boolean = false, color: string = "#FFFFF") {
        this.ctx.beginPath();
        this.ctx.rect(box.position.x, box.position.y, box.size.x, box.size.y);
        this.drawCurrentContext(filled, color);
        this.ctx.closePath();
    }

    public drawCircle(circle: Circle, filled: boolean = false, color: string = "#FFFFF") {
        this.ctx.beginPath();
        this.ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI, false);
        this.drawCurrentContext(filled, color);
        this.ctx.closePath();
    }

    public drawLine(line: Line, color: string = "#FFFFF") {
        this.ctx.beginPath();
        this.ctx.moveTo(line.p1.x, line.p2.y);
        this.ctx.lineTo(line.p2.x, line.p2.y);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}