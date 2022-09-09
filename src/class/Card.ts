import Rank from "./Rank";
import Suit from "./Suit";
import Player from "./Player";
import { RANK_WEIGHT_POINT, SUIT_WEIGHT_POINT } from "../constant";

class Card {
  private _player?: Player;
  constructor(private rank: Rank, private suit: Suit) {}

  getCardInfo() {
    const rank = this.rank.getValue;
    const suit = this.suit.getValue;
    return `Card : suit=> ${suit} rank=> ${rank}`;
  }

  get getPlayer() {
    return this._player;
  }

  public setOwner(player: Player) {
    this._player = player;
  }

  public getWeightPoint() {
    const rankKey = this.rank.getValue;
    const suitKey = this.suit.getValue;
    const point = RANK_WEIGHT_POINT[rankKey] + SUIT_WEIGHT_POINT[suitKey];

    return point;
  }

  public compareCard(rivalCard: Card): Card {
    const myCardPoint = this.getWeightPoint();
    const rivalCardPoint = rivalCard.getWeightPoint();
    return myCardPoint > rivalCardPoint ? this : rivalCard;
  }

  get getRank() {
    return this.rank;
  }
  get getSuit() {
    return this.suit;
  }
}

export default Card;
