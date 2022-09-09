const RANK_VALUE_CANDIDATE = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const SUIT_VALUE_CANDIDATE = ["Club", "Diamond", "Heart", "Spade"];

type KeyValueStringToNumber = {
  [prop: string]: number;
};

const RANK_WEIGHT_POINT: KeyValueStringToNumber = {
  "2": 200,
  "3": 300,
  "4": 400,
  "5": 500,
  "6": 600,
  "7": 700,
  "8": 800,
  "9": 900,
  "10": 1000,
  J: 1200,
  Q: 1300,
  K: 1400,
  A: 1500,
};

const SUIT_WEIGHT_POINT: KeyValueStringToNumber = {
  Club: 1,
  Diamond: 2,
  Heart: 3,
  Spade: 4,
};

const PLAYER_COUNT = 4;
const ROUND_LIMIT = 13;
export {
  RANK_VALUE_CANDIDATE,
  SUIT_VALUE_CANDIDATE,
  PLAYER_COUNT,
  RANK_WEIGHT_POINT,
  SUIT_WEIGHT_POINT,
 ROUND_LIMIT 

};
