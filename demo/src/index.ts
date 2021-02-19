import {
    Game, 
    System, 
    RenderComponent, 
    Meta, 
    GameObject, 
    Config, 
    CircleRenderer,
    BoxRenderer,
    VectorMath,
    Transform,
    Collider,
    Vector,
    LineRenderer,
    TestRunner,
    ColliderType
} from "ml2d";

const map = `
################
#..............#
#.#..#.........#
#.#..#.........#
#.#..#.........#
################
`

const cubeSize = new Vector([100, 100]);

class RenderSystem extends System {
    OnUpdate(dt: number) {
        for (const instance of this.getComponents(RenderComponent)) {
            instance.draw();
        }
    }
}

class CollisionSystem extends System {
    OnUpdate(dt: number) {
        for (const instance of this.getComponents(Collider)) {
            if (instance.active) {
                if (instance.render) {
                    instance.draw();
                }
            }
        }
    }
}

class TopDownTest extends Game {

    private player!: GameObject;
    private player2!: GameObject;

    constructor(el: HTMLDivElement, config: Config) {
        super(el, config);
        this.systems.instantiate(RenderSystem);
        this.systems.instantiate(CollisionSystem);
    }

    OnCreate() {
        this.player = this.gameObjects.instantiate()
        .addComponent(CircleRenderer, (c: CircleRenderer) => {
            c.color = "blue";
            c.filled = true;
        })
        .addComponent(Transform, (transform: Transform) => {
            transform.size = cubeSize;
        })
        .addComponent(Collider, (coll: Collider) => {
            coll.render = true;
            coll.type = ColliderType.Box;
        });

        const lines = map.split('\n');

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j] === '#') {
                    const pos = VectorMath.mult(new Vector([i, j]), cubeSize);

                    this.gameObjects.instantiate()
                    .addComponents([
                        Transform,
                        BoxRenderer,
                    ])
                    .addComponent(LineRenderer, (line: LineRenderer) => {
                        line.pointA = pos;
                        line.pointB = VectorMath.add(pos, cubeSize);
                    })
                    .addComponent(Collider, (coll: Collider) => {
                        coll.static = true;
                    })
                    .setPosition(pos)
                    .setSize(cubeSize);
                }
            }
        }

        console.log(this);
    }

    OnUpdate(dt: number) {
        this.player.move(VectorMath.multScalar(Game.Active.input.state.leftAxis, dt * 500));
    }
}

const game = new TopDownTest(document.getElementById('game') as HTMLDivElement, {
    width: 1000,
    height: 1000,
})

if (TestRunner.Test([
    {check: () => VectorMath.mult(new Vector([2, 5]), new Vector([3, 6])), against: new Vector([6, 30]), equalsFn: (v1: Vector, v2: Vector) => v1.equals(v2) },
    {check: () => Meta.inheritsFrom(LineRenderer, RenderComponent), against: true},
    {check: () => Meta.inheritsFrom(Collider, Collider), against: true}
])) {
    game.run();
} else {
    console.log("Fix the errors first");
}

