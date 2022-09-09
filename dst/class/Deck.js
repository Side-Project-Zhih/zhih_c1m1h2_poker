"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("./Card"));
const constant_1 = require("../constant");
const Rank_1 = __importDefault(require("./Rank"));
const Suit_1 = __importDefault(require("./Suit"));
class Deck {
    constructor() {
        this._cards = [];
        for (const suit of constant_1.SUIT_VALUE_CANDIDATE) {
            for (const rank of constant_1.RANK_VALUE_CANDIDATE) {
                this._cards.push(new Card_1.default(new Rank_1.default(rank), new Suit_1.default(suit)));
            }
        }
    }
    shuffle() {
        const totalCardsCount = this._cards.length;
        for (let i = 0; i < totalCardsCount; i++) {
            const randomIndex = Math.floor(Math.random() * totalCardsCount);
            swap(this._cards, i, randomIndex);
        }
    }
    drawCard() {
        const index = Math.floor(Math.random() * this._cards.length);
        const targetCard = this._cards[index];
        this._cards.splice(index, 1);
        return targetCard;
    }
    get getCards() {
        return this._cards;
    }
}
function swap(array, first, second) {
    const originalValue = array[first];
    array[first] = array[second];
    array[second] = originalValue;
}
exports.default = Deck;
//# sourceMappingURL=Deck.js.map