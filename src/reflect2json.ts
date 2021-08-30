import "reflect-metadata";

const jsonIgnoreConst = "jsonIgnore";
const jsonFormatConst = "jsonFormat";

function toJSON(this: any) {
  const proto = Object.getPrototypeOf(this);
  const serializedJson: any = {};
  const jsonReplacer = (obj: any, key: string) => {
    if (typeof obj === "function") return;
    const isObjUndefined = obj === undefined;
    const replacer = reflect2json(key, isObjUndefined ? null : obj, this);
    if (replacer != null || !isObjUndefined) {
      serializedJson[key] = replacer;
    }
  };
  for (const key in this) {
    jsonReplacer(this[key], key);
  }
  Object.entries(Object.getOwnPropertyDescriptors(proto))
    .filter(([key, descriptor]) => typeof descriptor.get === "function")
    .map(([key, descriptor]) => {
      if (descriptor && key[0] !== "_") {
        try {
          jsonReplacer(this[key], key);
        } catch (error) {
          console.error(`Error calling getter ${key}`, error);
        }
      }
    });
  return serializedJson;
}

function reflect2json(
  this: any,
  key: string,
  value: any,
  context?: any
) {
  const contextObject = context == null ? this : context;
  const meta = getJsonIgnore(contextObject, key);
  if (typeof meta === "function" && meta(value, contextObject) === true) {
    return undefined;
  }
  if (meta === true || key.startsWith("_")) {
    return undefined;
  }
  const formatCallback = getJsonFormatCallback(contextObject, key);
  if (formatCallback != null && typeof formatCallback === "function") {
    return formatCallback(value, contextObject);
  }
  return value;
}

export function jsonReflect(): any {
  const decorator = (target: any, propertyKey: string) => {
    if (!target.prototype.toJSON) {
      target.prototype.toJSON = toJSON;
    }
  };
  return decorator;
}

/**
 * ignore property to json
 *
 * @export
 * @param {(value: any, context?: any) => boolean} [predicate] only ignore when predicate = true
 * @return {*} 
 */
export function jsonIgnore(predicate?: (value: any, context?: any) => boolean) {
  if (predicate == null) {
    return Reflect.metadata(jsonIgnoreConst, true);
  }
  const decorator = (target: any, propertyKey: string) => {
    if (!target.hasOwnProperty(propertyKey)) {
      target[propertyKey] = undefined;
    }
    const metadata = Reflect.metadata(jsonIgnoreConst, predicate);
    metadata(target, propertyKey);
  };
  return decorator;
}

/**
 * pick keys to json
 *
 * @export
 * @param {*} this
 * @param {...string[]} pickKeys
 * @return {*} 
 */
export function jsonPick(this: any, ...pickKeys: string[]) {
  return this.jsonFormat((x: any, context: any) => {
    const formatObj: any = {};
    for (const key of pickKeys) {
      if (x.hasOwnProperty(key)) {
        formatObj[key] = x[key];
      }
    }
    return formatObj
  });
}

/**
 * format value to json
 *
 * @export
 * @param {(value: any, context: any) => any} formatter
 * @return {*} 
 */
export function jsonFormat(formatter: (value: any, context: any) => any) {
  const decorator = (target: any, propertyKey: string) => {
    if (!target.hasOwnProperty(propertyKey)) {
      target[propertyKey] = undefined;
    }
    const metadata = Reflect.metadata(jsonFormatConst, formatter);
    metadata(target, propertyKey);
  };
  return decorator;
}
function getJsonFormatCallback(object: any, propertyKey: string): any {
  return Reflect.getMetadata(jsonFormatConst, object, propertyKey);
}

function getJsonIgnore(object: any, propertyKey: string): any {
  return Reflect.getMetadata(jsonIgnoreConst, object, propertyKey);
}
