"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("./Card"));
class ExchangeHands {
    constructor(_player1, _player2) {
        this._player1 = _player1;
        this._player2 = _player2;
        this._roundCount = 0;
        this._exchangeCards = [];
    }
    addRound() {
        ++this._roundCount;
    }
    get getRound() {
        return this._roundCount;
    }
    exchangeCard(player1Card, player2Card) {
        // store card
        this._exchangeCards.push(new Card_1.default(player1Card.getRank, player1Card.getSuit), new Card_1.default(player2Card.getRank, player2Card.getSuit));
        //change owner
        player1Card.setOwner(this._player2);
        player2Card.setOwner(this._player1);
        this._player1.removeCard(player1Card);
        this._player2.removeCard(player2Card);
        //add to player cards
        this._player1.addCard(player2Card);
        this._player2.addCard(player1Card);
    }
    returnCard() {
        if (this._roundCount !== 3) {
            return;
        }
        //check card exist or be used
        const [cardFromPlayer1, cardFromPlayer2] = this._exchangeCards;
        const isCardFromPlayer2ExistInPlayer1 = this._player1.checkCardBeUsed(cardFromPlayer2);
        const isCardFromPlayer1ExistInPlayer2 = this._player2.checkCardBeUsed(cardFromPlayer1);
        if (isCardFromPlayer2ExistInPlayer1) {
            cardFromPlayer1.setOwner(this._player1);
            this._player1.removeCard(cardFromPlayer2);
            this._player1.addCard(cardFromPlayer1);
        }
        if (isCardFromPlayer1ExistInPlayer2) {
            cardFromPlayer2.setOwner(this._player2);
            this._player2.removeCard(cardFromPlayer1);
            this._player2.addCard(cardFromPlayer2);
        }
    }
}
exports.default = ExchangeHands;
//# sourceMappingURL=ExchangeHands.js.map