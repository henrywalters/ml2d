import { Clock } from "../utils/clock";
import { Timer } from "../utils/timer";
import { Canvas } from "./canvas";
import { ComponentManager } from "./component";
import { Config } from "./config";
import { GameObjectManager } from "./gameObject";
import { Input } from "./input";
import { SystemManager } from "./system";

export class Game {

    // The currently processing game. This allows anything to globally call the current game.
    public static Active: Game;
    
    private timer: Timer;
    private lastStart: number;

    // Core systems
    public readonly input: Input;
    public readonly canvas: Canvas;
    public readonly config: Config;

    // GameObject, Component & Systems
    public readonly gameObjects: GameObjectManager;
    public readonly components: ComponentManager;
    public readonly systems: SystemManager;

    public debug = false;

    public running: boolean;

    constructor(el: HTMLDivElement, config: Config) {
        this.config = config;
        this.input = new Input(el);
        this.lastStart = Clock.now();
        this.timer = new Timer();
        this.canvas = new Canvas(el, this.config.width, this.config.height);

        this.gameObjects = new GameObjectManager();
        this.components = new ComponentManager();
        this.systems = new SystemManager();
    }

    private gameLoop = (t: number) => {
        const dt = (t - this.lastStart) / 1000;
        Game.Active = this;

        this.systems.systems.forEvery((system) => {
            system.OnBeforeUpdate();
        })

        this.canvas.clear();
        this.input.poll();
        this.OnUpdate(dt);
        this.systems.systems.forEvery((system) => {
            if (this.debug) {
                this.timer.reset();
            }
            system.OnUpdate(dt);
            if (this.debug) {
                console.log(`System ${system.constructor.name} took ${this.timer.duration}ms to execute`);
            }
        })
        this.lastStart = t;

        this.systems.systems.forEvery((system) => {
            system.OnAfterUpdate();
        })

        window.requestAnimationFrame(this.gameLoop);
    }

    public run() {
        this.running = true;
        Game.Active = this;
        this.OnCreate();
        this.systems.systems.forEvery((system) => {
            system.OnCreate();
        });

        this.components.instances.forEvery((component) => {
            component.checkDependencies();
        });

        window.requestAnimationFrame(this.gameLoop);
        Game.Active = this;
        this.systems.systems.forEvery((system) => {
            system.OnDestroy();
        });
        this.OnDestroy();
    }

    protected OnCreate() {}
    protected OnUpdate(dt: number) {}
    protected OnDestroy() {}
}