import Player from "./Player";
import Card from "./Card";
import ExchangeHands from "./ExchangeHands";

class AIPlayer extends Player {
  constructor(order: number) {
    super(order);
  }

  public async nameHimSelf() {
    this._name = `Player_${this._order}`;
  }

  public async showCard() {
    const totalCardsCount = this._cards.length;
    const randomIndex = Math.floor(Math.random() * totalCardsCount);
    const targetCard = this.getCard(randomIndex);
    this.removeCard(targetCard);
    return targetCard;
  }

  public async useExchangeHands(
    players: Player[],

  ): Promise<void> {
    if (!this.decideUseExchangeHands()) {
      return ;
    }

    const targetPlayer = this.decidePlayerWantToExchangeHands(players);

    console.log(
      `\n**** ${this.getName} use skill exchangeHands at ${targetPlayer.getName} ****\n`
    );
    this.setExchangeHand(new ExchangeHands(this, targetPlayer));
    return;
  }

  private decidePlayerWantToExchangeHands(players: Player[]): Player {
    const randomPlayerIndex = Math.floor(Math.random() * players.length);
    const targetPlayer = players[randomPlayerIndex];

    return targetPlayer;
  }

  private decideUseExchangeHands() {
    const randomNumber1 = Math.floor(Math.random() * 1000);
    const randomNumber2 = Math.floor(Math.random() * 1000);
    return randomNumber1 > randomNumber2;
  }
}

export default AIPlayer;
