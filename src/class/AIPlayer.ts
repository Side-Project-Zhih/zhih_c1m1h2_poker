import Player from "./Player";
import ExchangeHands from "./ExchangeHands";

class AIPlayer extends Player {
  constructor(order: number) {
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

  async useExchangeHands(players: Player[]): Promise<void> {
    if (!this.decideUseExchangeHands()) {
      return;
    }
    const randomPlayerIndex = Math.floor(Math.random() * players.length);
    const targetPlayer = players[randomPlayerIndex];

    console.log(
      `**** ${this.getName} use skill exchangeHands at ${targetPlayer.getName} ****`
    );

    const randomCardIndexForTargetCard = Math.floor(
      Math.random() * targetPlayer.getCards.length
    );

    this.setExchangeHand(new ExchangeHands(this, targetPlayer));
    const targetCard = targetPlayer.getCard(randomCardIndexForTargetCard);
    const randomIndexForMyCard = Math.floor(
      Math.random() * this.getCards.length
    );
    const myCard = this.getCard(randomIndexForMyCard);

    this._exchangeHand?.exchangeCard(myCard, targetCard);
  }

  private decideUseExchangeHands() {
    const randomNumber1 = Math.floor(Math.random() * 1000);
    const randomNumber2 = Math.floor(Math.random() * 1000);
    return randomNumber1 > randomNumber2;
  }
}

export default AIPlayer;
