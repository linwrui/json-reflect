import { Example } from "./example";

describe("test json reflect", () => {
  test("test basic", () => {
    expect((new Example() as any).toJSON()).toEqual({
      formatString: "MY NAME IS LINWRUI",
      pickABC: { a: "1", b: "2", c: "3" },
      name: "example",
      json: { hello: "Hello" },
    });
    expect(JSON.stringify(new Example())).toEqual(
      `{"formatString":"MY NAME IS LINWRUI","pickABC":{"a":"1","b":"2","c":"3"},"json":{"hello":"Hello"},"name":"example"}`
    );
  });
  test("test ignorePredicate", () => {
    const example = new Example();
    example.ignoreA = "noA";
    expect(JSON.stringify(example)).toEqual(
      `{"ignoreA":"noA","formatString":"MY NAME IS LINWRUI","pickABC":{"a":"1","b":"2","c":"3"},"json":{"hello":"Hello"},"name":"example"}`
    );
  });
});
