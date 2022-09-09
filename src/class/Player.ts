import Card from "./Card";
import ExchangeHands from "./ExchangeHands";

abstract class Player {
  private _point: number = 0;
  protected _name: string = "";
  protected _cards: Card[] = [];
  protected _exchangeHand?: ExchangeHands;

  constructor(protected _order: number) {}

  get getPoint(): number {
    return this._point;
  }

  set setPoint(value: number) {
    this._point = value;
  }

  get getOrder(): number {
    return this._order;
  }

  get getName(): string {
    return this._name;
  }

  get getCards(): Card[] {
    return this._cards;
  }

  protected setExchangeHand(ExchangeHands: ExchangeHands) {
    this._exchangeHand = ExchangeHands;
  }

  public abstract nameHimSelf(): Promise<void>;

  public abstract showCard(): Promise<Card>;

  public abstract useExchangeHands(players: Player[]): Promise<any>;

  public setCards(cards: Card[]) {
    this._cards = cards;
  }

  public addCard(card: Card) {
    this._cards.push(card);
  }

  public getCard(index: number): Card {
    return this._cards[index];
  }

  public addPoint() {
    ++this._point;
  }

  public removeCard(targetCard: Card) {
    const targetCardWeightPoint = targetCard.getWeightPoint();
    const index = this._cards.findIndex(
      (card) => card.getWeightPoint() === targetCardWeightPoint
    );
    this._cards.splice(index, 1);
  }

  public checkCardBeUsed(targetCard: Card): boolean {
    let isBeUsed = true;
    for (const card of this._cards) {
      if (targetCard.getWeightPoint() === card.getWeightPoint()) {
        isBeUsed = false;
        break;
      }
    }
    return isBeUsed;
  }

  public isExchangeCardBeUsed() {
    if (this._exchangeHand) {
      if (this._exchangeHand.getRound === 3) {
        this._exchangeHand.returnCard();
        console.log(
          `${this.getName} return back card because use Skill exchangeHands 3 round before`
        );
      }
      this._exchangeHand.addRound();

      return true;
    }
    return false;
  }
}

export default Player;
