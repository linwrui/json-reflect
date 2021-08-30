"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonFormat = exports.jsonPick = exports.jsonIgnore = exports.jsonReflect = void 0;
require("reflect-metadata");
const jsonIgnoreConst = "jsonIgnore";
const jsonFormatConst = "jsonFormat";
function toJSON() {
    const proto = Object.getPrototypeOf(this);
    const serializedJson = {};
    const jsonReplacer = (obj, key) => {
        if (typeof obj === "function")
            return;
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
            }
            catch (error) {
                console.error(`Error calling getter ${key}`, error);
            }
        }
    });
    return serializedJson;
}
function reflect2json(key, value, context) {
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
function jsonReflect() {
    const decorator = (target, propertyKey) => {
        if (!target.prototype.toJSON) {
            target.prototype.toJSON = toJSON;
        }
    };
    return decorator;
}
exports.jsonReflect = jsonReflect;
/**
 * ignore property to json
 *
 * @export
 * @param {(value: any, context?: any) => boolean} [predicate] only ignore when predicate = true
 * @return {*}
 */
function jsonIgnore(predicate) {
    if (predicate == null) {
        return Reflect.metadata(jsonIgnoreConst, true);
    }
    const decorator = (target, propertyKey) => {
        if (!target.hasOwnProperty(propertyKey)) {
            target[propertyKey] = undefined;
        }
        const metadata = Reflect.metadata(jsonIgnoreConst, predicate);
        metadata(target, propertyKey);
    };
    return decorator;
}
exports.jsonIgnore = jsonIgnore;
/**
 * pick keys to json
 *
 * @export
 * @param {*} this
 * @param {...string[]} pickKeys
 * @return {*}
 */
function jsonPick(...pickKeys) {
    return this.jsonFormat((x, context) => {
        const formatObj = {};
        for (const key of pickKeys) {
            if (x.hasOwnProperty(key)) {
                formatObj[key] = x[key];
            }
        }
        return formatObj;
    });
}
exports.jsonPick = jsonPick;
/**
 * format value to json
 *
 * @export
 * @param {(value: any, context: any) => any} formatter
 * @return {*}
 */
function jsonFormat(formatter) {
    const decorator = (target, propertyKey) => {
        if (!target.hasOwnProperty(propertyKey)) {
            target[propertyKey] = undefined;
        }
        const metadata = Reflect.metadata(jsonFormatConst, formatter);
        metadata(target, propertyKey);
    };
    return decorator;
}
exports.jsonFormat = jsonFormat;
function getJsonFormatCallback(object, propertyKey) {
    return Reflect.getMetadata(jsonFormatConst, object, propertyKey);
}
function getJsonIgnore(object, propertyKey) {
    return Reflect.getMetadata(jsonIgnoreConst, object, propertyKey);
}
