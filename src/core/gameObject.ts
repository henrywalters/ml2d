import { VectorMath } from "../math/vectorMath";
import { ObjectManager } from "../utils/objectManager";
import { Component } from "./component";
import { Vector } from "./vector";

export class GameObject {

    private static _initialized = false;
    public static _instances: ObjectManager<GameObject>;
    
    public readonly components: ObjectManager<Component>;

    public readonly id: number;
    public name: string;
    public parent: GameObject | null = null;
    public readonly children: GameObject[];

    constructor() {
        if (!GameObject._initialized) {
            GameObject._instances = new ObjectManager<GameObject>();
            GameObject._initialized = true;
        }

        this.id = GameObject._instances.size;

        GameObject._instances.add(this.id, this);

        this.name = `GameObject_${this.id}`;
        this.children = [];
        this.components = new ObjectManager<Component>();
    }

    // Preorder traverse the game object
    public static traverse(root: GameObject, fn: (gameObject: GameObject) => void) {
        fn(root);
        for (const child of root.children) {
            GameObject.traverse(child, fn);
        }
    }

    public add(): GameObject {
        const go = new GameObject();
        go.parent = this;
        this.children.push(go);
        return go;
    }

    public addComponent<T extends Component>(component: T): GameObject {
        this.components.add(component.constructor.name, component);
        component.registerGameObject(this);
        return this;
    }

    public getComponent<T>(type: new () => T): Component {
        return this.components.findOne(type.name);
    }
}