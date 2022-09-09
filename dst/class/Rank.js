"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
class Rank {
    constructor(_value) {
        if (constant_1.RANK_VALUE_CANDIDATE.includes(_value)) {
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
exports.default = Rank;
//# sourceMappingURL=Rank.js.map