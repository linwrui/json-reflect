# reflect2json

A lib for reflect class to json with decorator in `.ts file`.

## Install

```
npm i reflect2json

yarn add reflect2json
```

## Usage

### First enable `emitDecoratorMetadata` and `experimentalDecorators` in `tsconfig.json`

```json
{
  "compilerOptions": {
    "...otherCompilerOptions": "...",

    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,

    "...otherCompilerOptions": "..."
  }
}
```

### Now you can use jsonReflect in any class

```typescript
import { jsonFormat, jsonIgnore, jsonPick, jsonReflect } from "reflect2json";

@jsonReflect() // <-- Decorator jsonReflect, it will rewrite this.toJSON for reflcting
export class Example {
  private _name: string = "example"; // <-- it will be ignored automanic when property key starts with '_'
  public get name(): string { // <-- notice: getter property will position to the end of json
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  @jsonIgnore() // <-- ignore property to json
  public noSerialize = "no!!!";

  @jsonIgnore((value: string) => value.toUpperCase() === "A") // <-- only ignore when value is A or a (only ignore when predicate = true)
  public ignoreA = "A";

  @jsonFormat((value: string) => value.toUpperCase()) // <-- format value to json
  public formatString = "my name is linwrui";

  @jsonPick("a", "b", "c") // <-- pick keys to json
  public pickABC = {
    a: "1",
    b: "2",
    c: "3",
    d: "noPick",
    e: "noPick",
  };
}
```

### Then you just need to get jsonStringfy as usual

```typescript
const example = new Example();
console.log(JSON.stringify(example)); // <-- '{"formatString":"MY NAME IS LINWRUI","pickABC":{"a":"1","b":"2","c":"3"},"name":"example"}'
```

---

> Thanks for use!
