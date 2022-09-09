const inquirer = require("inquirer");

import Player from "./Player";
import ExchangeHands from "./ExchangeHands";
import Card from "./Card";

class HumanPlayer extends Player {
  constructor(order: number) {
    super(order);
  }

  async nameHimSelf(): Promise<void> {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Input your name",
      },
    ]);

    const { name } = answer;
    this._name = name;
  }

  async showCard() {
    const cardsOptions = this._cards
      .sort((a, b) => a.getWeightPoint() - b.getWeightPoint())
      .map((card, index) => ({
        name: card.getCardInfo(),
        value: card,
      }));
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "targetCard",
        message: "Select card to show",
        choices: cardsOptions,
      },
    ]);
    const targetCard = answer.targetCard as Card;

    this.removeCard(targetCard);
    return targetCard;
  }

  async useExchangeHands(players: Player[]): Promise<void> {
    const answerOfUseExchangeHands = await inquirer.prompt({
      type: "list",
      name: "commitUseExchangeHands",
      message: 'Use skill "useExchangeHands" or not?',
      choices: [
        {
          name: "yes",
          value: true,
        },
        {
          name: "no",
          value: false,
        },
      ],
    });
    const { commitUseExchangeHands } = answerOfUseExchangeHands;
    if (!commitUseExchangeHands) {
      return;
    }

    //select candidates
    const playerOptions = players.map((player, i) => ({
      name: `order: ${player.getOrder} name:${player.getName}`,
      value: player,
    }));
    const answerOfSelectPlayer = await inquirer.prompt({
      type: "list",
      name: "targetPlayer",
      message: "Select player to use exchangeCard",
      choices: playerOptions,
    });

    const targetPlayer = answerOfSelectPlayer.targetPlayer as Player;
    console.log(`**** I Use skill exchangeHands at ${targetPlayer.getName} ****`);
    //set class ExchangeHands
    this.setExchangeHand(new ExchangeHands(this, targetPlayer));

    //show targetPlayer  cards
    const targetPlayerCardOptions = targetPlayer.getCards
      .sort((a, b) => a.getWeightPoint() - b.getWeightPoint())
      .map((card) => ({
        name: card.getCardInfo(),
        value: card,
      }));

    // select card
    const answerOfSelectTargetPlayerCard = await inquirer.prompt({
      type: "list",
      name: "targetPlayerCard",
      message: `Select ${targetPlayer.getName}'s card which you want to exchange`,
      choices: targetPlayerCardOptions,
    });
    const targetPlayerCard =
      answerOfSelectTargetPlayerCard.targetPlayerCard as Card;

    //show my cards
    const myCardOptions = this.getCards
      .sort((a, b) => a.getWeightPoint() - b.getWeightPoint())
      .map((card) => ({
        name: card.getCardInfo(),
        value: card,
      }));

    const answerOfSelectMyCard = await inquirer.prompt({
      type: "list",
      name: "myCard",
      message: "Select my card which you want to exchange",
      choices: myCardOptions,
    });
    // select card
    const myCard = answerOfSelectMyCard.myCard as Card;

 
    this._exchangeHand?.exchangeCard(myCard, targetPlayerCard);
  }
}

export default HumanPlayer;
