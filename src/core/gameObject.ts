import { VectorMath } from "../math/vectorMath";
import { ObjectManager } from "../utils/objectManager";
import { Component } from "./component";
import { Transform } from "./components/transform";
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

    public addComponent<T extends Component>(ctr: new () => T, onCreateFn?: (comp: T) => any): GameObject {
        const component = Game.Active.components.instantiate(ctr, this);
        this.components.add(ctr.name, component);
        Game.Active.components.registerGameObject(ctr, this);
        if (onCreateFn) {
            onCreateFn(component);
        }
        return this;
    }

    public addComponents(ctrs: Array<new () => Component>): GameObject { 
        for (const ctr of ctrs) {
            this.addComponent(ctr);
        }
        return this;
    }

    public getComponent<T>(type: new () => T): T {
        return this.components.findOne(type.name) as unknown as T;
    }

    public getComponentOrFail<T>(type: new () => T): T {
        return this.components.findOneOrFail(type.name) as unknown as T;
    }

    public setPosition(pos: Vector): GameObject {
        this.position = pos;
        return this;
    }

    public setSize(size: Vector): GameObject {
        this.size = size;
        return this;
    }

    public get transform(): Transform {
        return this.getComponentOrFail(Transform);
    }

    public get position(): Vector {
        return this.transform.position;
    }

    public set position(pos: Vector) {
        this.transform.position = pos;
    }

    public move(delta: Vector) {
        this.transform.move(delta);
    }

    public get size(): Vector {
        return this.transform.size;
    }

    public set size(size: Vector) {
        this.transform.size = size;
    }

    public get rotation() {
        return this.transform.rotation;
    }

    public set rotation(rot: number) {
        this.transform.rotation = rot;
    }
}