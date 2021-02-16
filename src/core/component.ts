import { ObjectManager } from "../utils/objectManager";
import { GameObject } from "./gameObject";

export class ComponentManager {
    public readonly componentGameObjects: ObjectManager<GameObject[]>;
    public readonly components: ObjectManager<new () => Component>;
    public readonly instances: ObjectManager<Component>;

    constructor() {
        this.componentGameObjects = new ObjectManager<GameObject[]>();
        this.components = new ObjectManager<new () => Component>();
        this.instances = new ObjectManager<Component>();
    }

    public instantiate<T extends Component>(ctr: new () => T): T {
        const component = new ctr();
        component.id = this.components.size;
        component.instanceId = this.instances.size;
        this.components.add(component.id, ctr);
        this.instances.add(ctr.name, component);
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
}