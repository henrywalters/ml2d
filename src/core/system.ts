import { ObjectManager } from "../utils/objectManager";

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
}