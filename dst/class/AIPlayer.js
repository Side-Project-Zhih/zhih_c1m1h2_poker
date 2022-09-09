"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./Player"));
const ExchangeHands_1 = __importDefault(require("./ExchangeHands"));
class AIPlayer extends Player_1.default {
    constructor(order) {
        super(order);
    }
    async nameHimSelf() {
        this._name = `Player_${this._order}`;
    }
    async showCard() {
        const totalCardsCount = this._cards.length;
        const randomIndex = Math.floor(Math.random() * totalCardsCount);
        const targetCard = this.getCard(randomIndex);
        this.removeCard(targetCard);
        return targetCard;
    }
    async useExchangeHands(players) {
        if (!this.decideUseExchangeHands()) {
            return;
        }
        const randomPlayerIndex = Math.floor(Math.random() * players.length);
        const targetPlayer = players[randomPlayerIndex];
        console.log(`**** ${this.getName} use skill exchangeHands at ${targetPlayer.getName} ****`);
        const randomCardIndexForTargetCard = Math.floor(Math.random() * targetPlayer.getCards.length);
        this.setExchangeHand(new ExchangeHands_1.default(this, targetPlayer));
        const targetCard = targetPlayer.getCard(randomCardIndexForTargetCard);
        const randomIndexForMyCard = Math.floor(Math.random() * this.getCards.length);
        const myCard = this.getCard(randomIndexForMyCard);
        this._exchangeHand?.exchangeCard(myCard, targetCard);
    }
    decideUseExchangeHands() {
        const randomNumber1 = Math.floor(Math.random() * 1000);
        const randomNumber2 = Math.floor(Math.random() * 1000);
        return randomNumber1 > randomNumber2;
    }
}
exports.default = AIPlayer;
//# sourceMappingURL=AIPlayer.js.map