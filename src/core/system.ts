import { ObjectManager } from "../utils/objectManager";
import { Component } from "./component";
import { RenderComponent } from "./components/render";
import { Game } from "./game";
import { GameObject } from "./gameObject";
import { Meta } from "./meta";

export class SystemManager {
    public readonly systems: ObjectManager<System>;

    constructor() {
        this.systems = new ObjectManager<System>();
    }

    public instantiate<T extends System>(ctr: new () => T): T {
        const system = new ctr();
        system.id = this.systems.size;
        this.systems.add(ctr.name, system);
        return system;
    }
}

export class System {

    public id: number;

    public OnCreate() {}
    public OnBeforeUpdate() {}
    public OnUpdate(dt: number) {}
    public OnAfterUpdate() {}
    public OnDestroy() {}

    public getComponents<T extends Component>(ctr: new () => T): T[] {

        let components: T[] = [];

        const types = Game.Active.components.components.findWhere(c => {
            return Meta.inheritsFrom(c, ctr);
        });

        for (const t of types) {
            for (const instance of Game.Active.components.componentInstances.findOneOrFail(t.name)) {
                components.push(instance as T);
            }
        }

        return components;
    }
}