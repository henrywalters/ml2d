import { VectorMath } from "../math/vectorMath";
import { ObjectManager } from "../utils/objectManager";
import { Component } from "./component";
import { Game } from "./game";
import { Vector } from "./vector";

export class GameObjectManager {
    public instances: ObjectManager<GameObject>;

    constructor() {
        this.instances = new ObjectManager<GameObject>();
    }

    public instantiate(): GameObject {
        const go = new GameObject();
        go.id = this.instances.size;
        go.components = new ObjectManager<Component>();
        go.name = `GameObject_${go.id}`;
        go.children = [];
        this.instances.add(go.id, go);
        return go;
    }
}

export class GameObject {

    public id: number;
    public name: string;
    public parent: GameObject | null = null;
    public children: GameObject[];
    public components: ObjectManager<Component>;

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

    public addComponent<T extends Component>(ctr: new () => T): GameObject {
        const component = Game.Active.components.instantiate(ctr);
        this.components.add(ctr.name, component);
        return this;
    }

    public getComponent<T>(type: new () => T): Component {
        return this.components.findOne(type.name);
    }
}