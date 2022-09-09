import Player from "./Player";
import Card from "./Card";

class ExchangeHands {
  private _roundCount = 1;
  constructor(private _player1: Player, private _player2: Player) {
    this.exchangeHands();
  }

  public addRound() {
    ++this._roundCount;
  }

  get getRound() {
    return this._roundCount;
  }

  private exchangeHands() {
    const player1Cards = this._player1.getCards;
    const player2Cards = this._player2.getCards;
    this._player1.setCards(
      player2Cards.map((card) => {
        card.setOwner(this._player1);
        return card;
      })
    );

    this._player2.setCards(
      player1Cards.map((card) => {
        card.setOwner(this._player2);
        return card;
      })
    );
  }

  public returnCard() {
    if (this._roundCount !== 3) {
      return;
    }
    const player1Cards = this._player1.getCards;
    const player2Cards = this._player2.getCards;
    this._player1.setCards(
      player2Cards.map((card) => {
        card.setOwner(this._player1);
        return card;
      })
    );

    this._player2.setCards(
      player1Cards.map((card) => {
        card.setOwner(this._player2);
        return card;
      })
    );
  }
}

export default ExchangeHands;
