import { assert } from "./assert";

export interface TestCase {
    check: () => any,
    against: any,
    equalsFn?: (a: any, b: any) => boolean;
}

export class TestRunner {
    public static Test(cases: TestCase[]) {
        let failed = 0;
        let passed = 0;

        console.log("#### Running Tests ####");

        for (let i = 0; i < cases.length; i++) {
            const check = cases[i].check();
            const equals = cases[i].equalsFn ? cases[i].equalsFn(check, cases[i].against) : check === cases[i].against;
            if (equals) {
                passed += 1;
                console.log(`Passed test ${i + 1}`);
            } else {
                failed += 1;
                console.log(`Failed test ${i + 1}: expected ${cases[i].against.toString()} but instead got ${check.toString()}`);
            }
        }

        console.log("#### Test Summary ####");

        console.log(`Passed: ${passed}`);
        console.log(`Failed: ${failed}`);

        return failed === 0;
    }
}