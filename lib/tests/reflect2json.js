"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_1 = require("./example");
describe("test json reflect", () => {
    test("test basic", () => {
        expect(JSON.stringify(new example_1.Example())).toEqual(`{"formatString":"MY NAME IS LINWRUI","pickABC":{"a":"1","b":"2","c":"3"},"name":"example"}`);
    });
    test("test ignorePredicate", () => {
        const example = new example_1.Example();
        example.ignoreA = "noA";
        expect(JSON.stringify(example)).toEqual(`{"ignoreA":"noA","formatString":"MY NAME IS LINWRUI","pickABC":{"a":"1","b":"2","c":"3"},"name":"example"}`);
    });
});
