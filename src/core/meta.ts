export class Meta {
    public static baseClassName(targetClass): string {
        if(targetClass instanceof Function){
          let baseClass = targetClass;
      
          while (baseClass){
            const newBaseClass = Object.getPrototypeOf(baseClass);
      
            if(newBaseClass && newBaseClass !== Object && newBaseClass.name){
              baseClass = newBaseClass;
            }else{
              break;
            }
          }
      
          return baseClass.name;
        }
    }

    public static getInheritanceTree<T>(ctr: new () => T): Array<new () => T> {
        const ctrs = [];

        if (ctr instanceof Function) {
            let base = ctr;

            while (base) {
                const newBase = Object.getPrototypeOf(base);

                if (newBase && newBase !== Object && newBase.name) {
                    ctrs.push(newBase.name);
                    base = newBase;
                } else {
                    break;
                }
            }
        }

        return ctrs;
    }

    public static inheritsFrom<T>(a: new () => T, b: new () => T): boolean {
        if (a instanceof Function) {
            let base = a;

            while (base) {

                if (base.name === b.name) {
                    return true;
                }

                const newBase = Object.getPrototypeOf(base);

                if (newBase && newBase !== Object && newBase.name) {
                    base = newBase;
                    
                } else {
                    break;
                }
            }

            if (base.name === b.name) {
                return true;
            }
        }
        return false;
    }
}