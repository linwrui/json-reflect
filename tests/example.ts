import {
  jsonFormat,
  jsonIgnore,
  jsonPick,
  jsonReflect,
} from "../src/reflect2json";

@jsonReflect()
export class Example {
  private _name: string = "example";
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  @jsonIgnore()
  public noSerialize = "no!!!";

  @jsonIgnore((value: string) => value.toUpperCase() === "A")
  public ignoreA = "A";

  @jsonFormat((value: string) => value.toUpperCase())
  public formatString = "my name is linwrui";

  @jsonPick("a", "b", "c")
  public pickABC = {
    a: "1",
    b: "2",
    c: "3",
    d: "noPick",
    e: "noPick",
  };
  public json = {
    toJSON() {
      return {
        hello: 'Hello'
      }
    }
  }
}
