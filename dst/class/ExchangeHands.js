"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExchangeHands {
    constructor(_player1, _player2) {
        this._player1 = _player1;
        this._player2 = _player2;
        this._roundCount = 1;
        this.exchangeCard();
    }
    addRound() {
        ++this._roundCount;
    }
    get getRound() {
        return this._roundCount;
    }
    exchangeCard() {
        const player1Cards = this._player1.getCards;
        const player2Cards = this._player2.getCards;
        this._player1.setCards(player2Cards.map((card) => {
            card.setOwner(this._player1);
            return card;
        }));
        this._player2.setCards(player1Cards.map((card) => {
            card.setOwner(this._player2);
            return card;
        }));
    }
    returnCard() {
        if (this._roundCount !== 3) {
            return;
        }
        const player1Cards = this._player1.getCards;
        const player2Cards = this._player2.getCards;
        this._player1.setCards(player2Cards.map((card) => {
            card.setOwner(this._player1);
            return card;
        }));
        this._player2.setCards(player1Cards.map((card) => {
            card.setOwner(this._player2);
            return card;
        }));
    }
}
exports.default = ExchangeHands;
//# sourceMappingURL=ExchangeHands.js.map