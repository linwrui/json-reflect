import "reflect-metadata";
export declare function jsonReflect(): any;
/**
 * ignore property to json
 *
 * @export
 * @param {(value: any, context?: any) => boolean} [predicate] only ignore when predicate = true
 * @return {*}
 */
export declare function jsonIgnore(predicate?: (value: any, context?: any) => boolean): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
} | ((target: any, propertyKey: string) => void);
/**
 * pick keys to json
 *
 * @export
 * @param {*} this
 * @param {...string[]} pickKeys
 * @return {*}
 */
export declare function jsonPick(this: any, ...pickKeys: string[]): any;
/**
 * format value to json
 *
 * @export
 * @param {(value: any, context: any) => any} formatter
 * @return {*}
 */
export declare function jsonFormat(formatter: (value: any, context: any) => any): (target: any, propertyKey: string) => void;
