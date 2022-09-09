"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
    getCardInfo() {
        const rank = this.rank.getValue;
        const suit = this.suit.getValue;
        return `Card : suit=> ${suit} rank=> ${rank}`;
    }
    get getPlayer() {
        return this._player;
    }
    setOwner(player) {
        this._player = player;
    }
    getWeightPoint() {
        const rankKey = this.rank.getValue;
        const suitKey = this.suit.getValue;
        const point = constant_1.RANK_WEIGHT_POINT[rankKey] + constant_1.SUIT_WEIGHT_POINT[suitKey];
        return point;
    }
    get getRank() {
        return this.rank;
    }
    get getSuit() {
        return this.suit;
    }
}
exports.default = Card;
//# sourceMappingURL=Card.js.map