"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
const reflect2json_1 = require("../src/reflect2json");
let Example = class Example {
    constructor() {
        this._name = "example";
        this.noSerialize = "no!!!";
        this.ignoreA = "A";
        this.formatString = "my name is linwrui";
        this.pickABC = {
            a: "1",
            b: "2",
            c: "3",
            d: "noPick",
            e: "noPick",
        };
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
};
__decorate([
    reflect2json_1.jsonIgnore(),
    __metadata("design:type", Object)
], Example.prototype, "noSerialize", void 0);
__decorate([
    reflect2json_1.jsonIgnore((value) => value.toUpperCase() === "A"),
    __metadata("design:type", Object)
], Example.prototype, "ignoreA", void 0);
__decorate([
    reflect2json_1.jsonFormat((value) => value.toUpperCase()),
    __metadata("design:type", Object)
], Example.prototype, "formatString", void 0);
__decorate([
    reflect2json_1.jsonPick("a", "b", "c"),
    __metadata("design:type", Object)
], Example.prototype, "pickABC", void 0);
Example = __decorate([
    reflect2json_1.jsonReflect()
], Example);
exports.Example = Example;
