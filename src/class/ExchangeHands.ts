import Player from "./Player";
import Card from "./Card";

class ExchangeHands {
  private _roundCount = 0;
  private _exchangeCards: Card[] = [];
  constructor(private _player1: Player, private _player2: Player) {}

  public addRound() {
    ++this._roundCount;
  }

  get getRound() {
    return this._roundCount;
  }

  public exchangeCard(player1Card: Card, player2Card: Card) {
    // store card

    this._exchangeCards.push(
      new Card(player1Card.getRank, player1Card.getSuit),
      new Card(player2Card.getRank, player2Card.getSuit)
    );
    //change owner


    player1Card.setOwner(this._player2);
    player2Card.setOwner(this._player1);

    this._player1.removeCard(player1Card);
    this._player2.removeCard(player2Card);


    //add to player cards
    this._player1.addCard(player2Card);
    this._player2.addCard(player1Card);
  }

  public returnCard() {
    if (this._roundCount !== 3) {
      return;
    }
    //check card exist or be used
    const [cardFromPlayer1, cardFromPlayer2] = this._exchangeCards;
    const isCardFromPlayer2ExistInPlayer1 =
      this._player1.checkCardBeUsed(cardFromPlayer2);
    const isCardFromPlayer1ExistInPlayer2 =
      this._player2.checkCardBeUsed(cardFromPlayer1);

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


export default ExchangeHands