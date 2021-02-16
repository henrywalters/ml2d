import { ObjectManager } from "../utils/objectManager";

export class System {
    private static _initialized = false;
    public static _systems: ObjectManager<System>;

    constructor() {
        if (!System._initialized) {
            System._systems = new ObjectManager<System>();
        }

        System._systems.add(this.constructor.name, this);
    }

    public static forAll(fn: (system: System) => any) {
        for (const sys of System._systems.all) {
            fn(sys);
        }    
    }

    protected OnCreate() {}
    protected OnBeforeUpdate() {}
    protected OnUpdate(dt: number) {}
    protected OnAfterUpdate() {}
    protected OnDestroy() {}
}