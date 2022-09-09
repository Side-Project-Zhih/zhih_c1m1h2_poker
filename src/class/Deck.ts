import Card from "./Card";
import { RANK_VALUE_CANDIDATE, SUIT_VALUE_CANDIDATE } from "../constant";
import Rank from "./Rank";
import Suit from "./Suit";

class Deck {
  private _cards: Card[] = [];
  constructor() {
    for (const suit of SUIT_VALUE_CANDIDATE) {
      for (const rank of RANK_VALUE_CANDIDATE) {
        this._cards.push(new Card(new Rank(rank), new Suit(suit)));
      }
    }
  }

  public shuffle() {
    const totalCardsCount = this._cards.length;
    for (let i = 0; i < totalCardsCount; i++) {
      const randomIndex = Math.floor(Math.random() * totalCardsCount);
      swap(this._cards, i, randomIndex);
    }
  }
  public drawCard() {
    const index = Math.floor(Math.random() * this._cards.length);
    const targetCard= this._cards[index];
    this._cards.splice(index, 1);
    return targetCard
  }
  
  get getCards() {
    return this._cards;
  }

}

function swap(array: Array<any>, first: number, second: number) {
  const originalValue = array[first];
  array[first] = array[second];
  array[second] = originalValue;
}

export default Deck;
