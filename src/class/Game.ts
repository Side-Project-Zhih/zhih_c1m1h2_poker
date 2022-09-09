const inquirer = require("inquirer");

import Deck from "./Deck";
import Card from "./Card";
import HumanPlayer from "./HumanPlayer";
import AIPlayer from "./AIPlayer";
import Player from "./Player";
import { PLAYER_COUNT, ROUND_LIMIT } from "../constant";

class Game {
  private _deck: Deck = new Deck();
  private _players: Array<Player> = [];
  private _round = 1;
  constructor() {}

  private addRoundCount() {
    ++this._round;
  }

  private async setPlayers() {
    const answer = await inquirer.prompt([
      {
        type: "list",
        message: "Select PLAYER order",
        name: "order",
        choices: [
          {
            name: 1,
            value: 1,
          },
          {
            name: 2,
            value: 2,
          },
          {
            name: 3,
            value: 3,
          },
          {
            name: 4,
            value: 4,
          },
        ],
      },
    ]);

    for (let i = 1; i <= PLAYER_COUNT; i++) {
      let player: Player;
      if (i === answer.order) {
        player = new HumanPlayer(i);
      } else {
        player = new AIPlayer(i);
      }
      await player.nameHimSelf();
      this._players.push(player);
    }
  }

  private drawCard() {
    if (this._players.length < PLAYER_COUNT) {
      throw new Error("Player is not enough");
    }

    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < this._players.length; j++) {
        const card = this._deck.drawCard();
        const player = this._players[j];

        card.setOwner(player);
        player.addCard(card);
      }
    }
  }

  private shuffleDeck() {
    this._deck.shuffle();
  }

  private showDown(cards: Card[]) {
    let maxCard = cards[0];
    for (const card of cards) {
      const cardInfo = card.getCardInfo();
      const gamePlayerName = card.getPlayer?.getName;
      maxCard = maxCard.compareCard(card);
      const message = `${gamePlayerName} show : ${cardInfo}`;
      console.log(message);
    }

    const winner = maxCard.getPlayer as Player;
    return winner;
  }

  public getFinalWinner() {
    if (this._round < ROUND_LIMIT) {
      console.log("WINNER have not been decided because game is not over ");
      return;
    }
    const players = this._players;
    const winnerMap: {
      [prop: number]: Player[];
    } = {};
    let maxPoint = 0;

    for (const player of players) {
      const point = player.getPoint;
      if (point >= maxPoint) {
        maxPoint = point;
        if (!winnerMap[point]) {
          winnerMap[point] = [player];
        } else {
          winnerMap[point].push(player);
        }
      }
    }

    const winners = winnerMap[maxPoint];
    const winnersName = winners.map((winner) => winner.getName).join(", ");
    const winnerMessage = `FINAL WINNER IS ${winnersName}, GET ${maxPoint} points`;

    console.log("++++++++++++++++++ WINNER ++++++++++++++++++");
    console.log(winnerMessage);
    console.log("++++++++++++++++++ WINNER ++++++++++++++++++");
  }

  public async init() {
    console.log("GAME START");
    await this.setPlayers();
    console.log("SUFFLE DECK");
    this.shuffleDeck();
    console.log("EACH PLAYER DRAW 13 CARDS");
    this.drawCard();
  }

  public async takeATurn() {
    const players = this._players;
    const showCards: Card[] = [];

    for (const gamePlayer of players) {
      if (!gamePlayer.isExchangeCardBeUsed()) {
        const targetPlayers = players.filter(
          (player) => player.getName !== gamePlayer.getName
        );

        await gamePlayer.useExchangeHands(targetPlayers);
      }
    }

    for (const gamePlayer of players) {
      const card = await gamePlayer.showCard();
      showCards.push(card);
    }

    console.log(`================ ROUND ${this._round} ================ \n`);

    const winner = this.showDown(showCards);
    const winnerMessage = `ROUND ${this._round}  WINNER is ${winner.getName}`;
    winner.addPoint();

    console.log("\n-------------------------------");
    console.log(winnerMessage);
    console.log("-------------------------------\n");
    console.log(`========================================== \n`);

    this.addRoundCount();
  }
}

export default Game;
