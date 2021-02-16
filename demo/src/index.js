import ML2D from 'ml2d';
import { Vector, Vector2D } from '../../dist/core/vector';
import { VectorMath } from '../../dist/math/vectorMath';
import { Circle } from '../../dist/renderables/circle';
import HCore from 'hcore';
import { GameObject } from '../../dist/core/gameObject';
import { Component } from '../../dist/core/component';

const size = new Vector([1400, 900]);
const anchor = new Vector([size.x / 2, size.y / 4]);
const gravity = 1;
const forceMultiplier = 4;
let shot = 0;
let score = 0;

console.log(ML2D);

class Transform extends ML2D.Component {}

class CollisionComponent extends ML2D.Component {}

class Projectile {
    constructor(initPos, direction, speed) {
        this.initPos = initPos;
        this.direction = direction;
        this.speed = speed;
        this.ball = new ML2D.Renderables.Circle(initPos, 5, 'blue', 'red');
    }

    update(game, dt) {
        this.direction.set(1, this.direction.get(1) + dt * gravity);
        this.ball.center.add(ML2D.VectorMath.multScalar(this.direction, this.speed * dt));
        game.canvas.draw(this.ball);
        return !(this.ball.center.get(0) < 0 || this.ball.center.get(0) > size.get(0) || this.ball.center.get(1) > size.get(1));
    }
}

window.ml = ML2D;

class Demo extends ML2D.Game {

    constructor(el, conf) {
        super(el, conf);
        this.line = null;
        this.circle = null;
        this.projectiles = [];
        this.targets = [];
        this.bot = null;
        this.data = [];
    }

    addRandomTarget() {
        const target = new ML2D.Vector([HCore.Random.float(10, size.get(0) - 10), HCore.Random.float(10, size.get(1) - 10)]);
        this.targets.push(new Circle(target, 20, 'blue', 'red'));
    }

    randomBotTarget() {
        this.bot.setTarget(new ML2D.Vector([HCore.Random.float(10, size.get(0) - 10), HCore.Random.float(10, size.get(1) - 10)]), () => {
            this.shoot();
            this.randomBotTarget();
        });
    }

    shoot() {
        const diff = VectorMath.subtract(this.bot.pos, this.line.pointA);
        const mag = diff.magnitude();
        this.projectiles.push(new Projectile(this.bot.pos.copy(), diff.multScalar(-1).normalized(), mag * forceMultiplier));
        shot += 1;
    }

    OnCreate() {
        this.line = new ML2D.Renderables.Line(anchor.copy(), anchor);
        this.circle = new ML2D.Renderables.Circle(anchor, 20);
        this.bot = new ML2D.Bot(3000, this);
        this.input.onClick((e) => {
            this.shoot();
        })

        this.randomBotTarget();
        
        for (let i = 0; i < 1; i++) {
            this.addRandomTarget();
        }
    }

    OnUpdate(dt) {
        this.bot.update(dt);
        anchor.setAll(this.bot.pos);
        this.canvas.draw(this.circle);
        this.canvas.draw(this.line);
        const tmp = [];
        for (const projectile of this.projectiles) {
            if (projectile.update(this, dt)) {
                tmp.push(projectile);
            } else {
                const targOffset = VectorMath.subtract(projectile.initPos, this.targets[0].center);
                const entry = new Vector([ML2D.Math.angle(projectile.direction), projectile.speed, ML2D.Math.angle(targOffset), targOffset.magnitude(), 0]);
                this.data.push(entry);
                console.log(entry.toString());
            }
        }

        const tmpTargets = [];
        for (const target of this.targets) {
            this.canvas.draw(target);
            let collided = false;
            let collidedWith = null;
            for (const projectile of this.projectiles) {
                if (ML2D.Physics.Collisions.checkCircles(target, projectile.ball)) {
                    collided = true;
                    collidedWith = projectile;
                    break;
                }
            }

            if (!collided) {
                tmpTargets.push(target);
            } else {
                score += 1;
                const targOffset = VectorMath.subtract(collidedWith.initPos, this.targets[0].center);
                const entry = new Vector([ML2D.Math.angle(collidedWith.direction), collidedWith.speed, ML2D.Math.angle(targOffset), targOffset.magnitude(), 1]);
                this.data.push(entry);
                console.log(entry.toString());
                this.addRandomTarget();
            }
        }

        this.targets = tmpTargets;

        this.projectiles = tmp;
    }
}

class GameObjectDemo extends ML2D.Game {
    constructor(el, conf) {
        super(el, conf);
        this.graph = null;
        this.ticks = 0;
    }

    OnCreate() {
        this.root = this.gameObjects.instantiate();
        this.root.addComponent(ML2D.Components.Position2D);
        this.graph = new ML2D.Addons.Graph.Axis(new Vector([100, 100]), new Vector([500, 500]));
        this.graph.origin.x = 0;
        this.graph.origin.y = 0;

        this.graph.setRange(new Vector([0, 120]));
        this.graph.setDomain(new Vector([0, 5]));
        this.graph.tickWidth.x = 1;
        this.graph.tickWidth.y = 1;

        window.graph = this.graph;
        const dt = 0.25;
        const data = [];

        for (let i = -10 / dt; i <= 10 / dt; i++) {
            data.push(new Vector([i * dt, i * i]));
        }

        this.fps = new ML2D.Addons.Graph.Lines.Straight(data);

        this.graph.lines.push(this.fps)
    }

    OnUpdate(dt) {
        const pos = this.root.getComponent(ML2D.Components.Position2D);
        pos.move(VectorMath.multScalar(this.input.state.leftAxis, dt * 200));

        this.canvas.draw(new Circle(pos.position.copy(), 20));

        this.canvas.draw(this.graph);

        /*ML2D.GameObject.traverse(this.root, (go) => {
            this.canvas.draw(new Circle(go.globalPos, 20));
        });

        if (this.input.state.firePressed) {
            this.root.add().setGlobalPos(this.input.globalMousePos);
        }
        */

        if (this.input.state.fireAltPressed) {
            console.log("Right click");
        }
    }
}

/*const demo = new Demo(document.getElementById('game'), {
    width: size.x,
    height: size.y,
});
*/

const goDemo = new GameObjectDemo(document.getElementById('game'), {
    width: size.x,
    height: size.y,
})

goDemo.run();

//demo.input.hideCursor();

//demo.run();