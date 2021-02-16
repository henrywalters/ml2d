import { ObjectManager } from "../utils/objectManager";
import { GameObject } from "./gameObject";

export class ComponentManager {
    private _initialized = false;
    public static _componentGameObjects: ObjectManager<GameObject[]>;
    public static _components: ObjectManager<Component>;
    public static _instances: ObjectManager<Component>;
}

export class Component {
    private static _initialized = false;
    public static _componentGameObjects: ObjectManager<GameObject[]>;
    public static _components: ObjectManager<Component>;
    public static _instances: ObjectManager<Component>;

    public readonly id: number;
    public readonly instanceId: number;

    constructor() {

        Component.initialize();

        this.id = Component._components.size;
        this.instanceId = Component._instances.size;

        Component._components.add(this.constructor.name, this);
        Component._instances.add(this.id, this);
    }

    private static initialize() {
        if (!Component._initialized) {
            Component._componentGameObjects = new ObjectManager<GameObject[]>();
            Component._components = new ObjectManager<Component>();
            Component._instances = new ObjectManager<Component>();
            Component._initialized = true;
        }
    }

    public registerGameObject(gameObject: GameObject) {
        Component.initialize();

        if (!Component._componentGameObjects.exists(this.constructor.name)) {
            Component._componentGameObjects.add(this.constructor.name, []);
        }

        Component._componentGameObjects.findOne(this.constructor.name).push(gameObject);
    }
}