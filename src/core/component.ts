import { ObjectManager } from "../utils/objectManager";
import { GameObject } from "./gameObject";
import { Meta } from "./meta";

export class ComponentManager {
    public readonly componentGameObjects: ObjectManager<GameObject[]>;
    public readonly components: ObjectManager<new () => Component>;
    public readonly componentInstances: ObjectManager<Component[]>;
    public readonly instances: ObjectManager<Component>;

    constructor() {
        this.componentGameObjects = new ObjectManager<GameObject[]>();
        this.components = new ObjectManager<new () => Component>();
        this.instances = new ObjectManager<Component>();
        this.componentInstances = new ObjectManager<Component[]>();
    }

    public instantiate<T extends Component>(ctr: new () => T, gameObject: GameObject): T {
        const component = new ctr();
        component.id = this.components.size;
        component.instanceId = this.instances.size;
        component.gameObject = gameObject;
        this.components.add(ctr.name, ctr);
        this.instances.add(component.instanceId, component);

        if (!this.componentInstances.exists(ctr.name)) {
            this.componentInstances.add(ctr.name, []);
        }

        this.componentInstances.findOneOrFail(ctr.name).push(component);

        return component;
    }

    public registerGameObject<T extends Component>(type: new () => T, gameObject: GameObject) {
        if (!this.componentGameObjects.exists(type.name)) {
            this.componentGameObjects.add(type.name, []);
        }

        this.componentGameObjects.findOneOrFail(type.name).push(gameObject);
    }
}

export class Component {
    public id: number;
    public instanceId: number;
    public gameObject: GameObject;
    public dependsOn: Array<new () => Component> = [];

    public checkDependencies() {
        for (const dependency of this.dependsOn) {
            const component = this.gameObject.getComponent(dependency);

            if (!component) {
                throw new Error(`Dependency check failed: Component ${this.constructor.name} depends on ${dependency.name} but it is not found in Game Object: ${this.gameObject.name}.`);
            }
        }
    }
}