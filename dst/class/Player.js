"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(_order) {
        this._order = _order;
        this._point = 0;
        this._name = "";
        this._cards = [];
    }
    get getPoint() {
        return this._point;
    }
    set setPoint(value) {
        this._point = value;
    }
    get getOrder() {
        return this._order;
    }
    get getName() {
        return this._name;
    }
    get getCards() {
        return this._cards;
    }
    setExchangeHand(ExchangeHands) {
        this._exchangeHand = ExchangeHands;
    }
    setCards(cards) {
        this._cards = cards;
    }
    addCard(card) {
        this._cards.push(card);
    }
    getCard(index) {
        return this._cards[index];
    }
    addPoint() {
        ++this._point;
    }
    removeCard(targetCard) {
        const targetCardWeightPoint = targetCard.getWeightPoint();
        const index = this._cards.findIndex((card) => card.getWeightPoint() === targetCardWeightPoint);
        this._cards.splice(index, 1);
    }
    checkCardBeUsed(targetCard) {
        let isBeUsed = true;
        for (const card of this._cards) {
            if (targetCard.getWeightPoint() === card.getWeightPoint()) {
                isBeUsed = false;
                break;
            }
        }
        return isBeUsed;
    }
    isExchangeCardBeUsed() {
        if (this._exchangeHand) {
            if (this._exchangeHand.getRound === 3) {
                this._exchangeHand.returnCard();
                console.log(`${this.getName} return back card because use Skill exchangeHands 3 round before`);
            }
            this._exchangeHand.addRound();
            return true;
        }
        return false;
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map