export function assert(a: any, b: any) {
    if (a !== b) {
        throw new Error(`Assertion failed! Expected ${a} instead got ${b}`);
    }
}