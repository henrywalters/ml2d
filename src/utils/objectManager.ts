export interface IIdentifiable {
    id: number;
}

export type Id = number | string;

export class ObjectManager<T> {
    private objects: Map<Id, T>;
    private _size: number;

    constructor() {
        this.objects = new Map<Id, T>();
        this._size = 0;
    }

    public forEvery(fn: (obj: T) => void) {
        for (const object of this.iterator) {
            fn(object);
        }
    }

    public get iterator(): IterableIterator<T> {
        return this.objects.values();
    }

    public get all(): T[] {
        const objs = [];
        for (const obj of this.objects.values()) {
            objs.push(obj);
        }
        return objs;
    }

    public get size(): number {
        return this._size;
    }

    public get ids(): Id[] {
        return Object.keys(this.objects);
    }

    public exists(id: Id) {
        return this.objects.has(id);
    }

    public findOne(id: Id): T {
        return this.objects.get(id);
    }

    public findOneOrFail(id: Id): T {
        if (!this.exists(id)) {
            throw new Error(`Object ${id} does not exist`);
        }

        return this.objects.get(id);
    }

    public findWhere(where: (obj: T) => boolean): T[] {
        const objs = [];
        for (const obj of this.objects.values()) {
            if (where(obj)) {
                objs.push(obj);
            }
        }
        return objs;
    }

    public add(id: Id, obj: T) {
        if (!this.exists(id)) {
            this.objects.set(id, obj);
            this._size += 1;
        }
    }

    public remove(id: Id) {
        if (this.exists(id)) {
            this.objects.delete(id);
            this._size -= 1;
        }
    }
}