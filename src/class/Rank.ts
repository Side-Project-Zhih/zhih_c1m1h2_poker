import {RANK_VALUE_CANDIDATE} from "../constant";


class Rank {
  private _value: string;
  constructor(_value: string) {
    if (RANK_VALUE_CANDIDATE.includes(_value)) {
      this._value = _value;
    } else {
      throw new Error("Wrong input value: " + _value);
    }
  }

  get getValue() {
    return this._value;
  }
}

export default Rank;
