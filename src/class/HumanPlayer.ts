const inquirer = require("inquirer");

import Player from "./Player";
import ExchangeHands from "./ExchangeHands";
import Card from "./Card";

class HumanPlayer extends Player {
  constructor(order: number) {
    super(order);
  }

  public async nameHimSelf(): Promise<void> {
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

  public async showCard() {
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

  public async useExchangeHands(
    players: Player[],
  ): Promise<void>  {
    if (!(await this.decideUseExchangeHands())) {
      return ;
    }
    const targetPlayer = await this.decidePlayerWantToExchangeHands(players);

    console.log(
      `\n**** I Use skill exchangeHands at ${targetPlayer.getName} ****\n`
    );
    this.setExchangeHand(new ExchangeHands(this, targetPlayer));

    return ;
  }

  private async decideUseExchangeHands() {
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
    return commitUseExchangeHands;
  }

  private async decidePlayerWantToExchangeHands(players: Player[]) {
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

    return targetPlayer;
  }
}

export default HumanPlayer;
