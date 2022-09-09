"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUND_LIMIT = exports.SUIT_WEIGHT_POINT = exports.RANK_WEIGHT_POINT = exports.PLAYER_COUNT = exports.SUIT_VALUE_CANDIDATE = exports.RANK_VALUE_CANDIDATE = void 0;
const RANK_VALUE_CANDIDATE = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];
exports.RANK_VALUE_CANDIDATE = RANK_VALUE_CANDIDATE;
const SUIT_VALUE_CANDIDATE = ["Club", "Diamond", "Heart", "Spade"];
exports.SUIT_VALUE_CANDIDATE = SUIT_VALUE_CANDIDATE;
const RANK_WEIGHT_POINT = {
    "2": 200,
    "3": 300,
    "4": 400,
    "5": 500,
    "6": 600,
    "7": 700,
    "8": 800,
    "9": 900,
    "10": 1000,
    J: 1200,
    Q: 1300,
    K: 1400,
    A: 1500,
};
exports.RANK_WEIGHT_POINT = RANK_WEIGHT_POINT;
const SUIT_WEIGHT_POINT = {
    Club: 1,
    Diamond: 2,
    Heart: 3,
    Spade: 4,
};
exports.SUIT_WEIGHT_POINT = SUIT_WEIGHT_POINT;
const PLAYER_COUNT = 4;
exports.PLAYER_COUNT = PLAYER_COUNT;
const ROUND_LIMIT = 13;
exports.ROUND_LIMIT = ROUND_LIMIT;
//# sourceMappingURL=constant.js.map