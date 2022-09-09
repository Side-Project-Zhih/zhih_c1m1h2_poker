"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
class Suit {
    constructor(_value) {
        if (constant_1.SUIT_VALUE_CANDIDATE.includes(_value)) {
            this._value = _value;
        }
        else {
            throw new Error("Wrong input value: " + _value);
        }
    }
    get getValue() {
        return this._value;
    }
}
exports.default = Suit;
//# sourceMappingURL=Suit.js.map