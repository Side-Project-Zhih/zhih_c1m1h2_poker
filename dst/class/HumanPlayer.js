"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const Player_1 = __importDefault(require("./Player"));
const ExchangeHands_1 = __importDefault(require("./ExchangeHands"));
class HumanPlayer extends Player_1.default {
    constructor(order) {
        super(order);
    }
    async nameHimSelf() {
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
        const targetCard = answer.targetCard;
        this.removeCard(targetCard);
        return targetCard;
    }
    async useExchangeHands(players) {
        if (!(await this.decideUseExchangeHands())) {
            return;
        }
        const targetPlayer = await this.decidePlayerWantToExchangeHands(players);
        console.log(`\n**** I Use skill exchangeHands at ${targetPlayer.getName} ****\n`);
        this.setExchangeHand(new ExchangeHands_1.default(this, targetPlayer));
        return;
    }
    async decideUseExchangeHands() {
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
    async decidePlayerWantToExchangeHands(players) {
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
        const targetPlayer = answerOfSelectPlayer.targetPlayer;
        return targetPlayer;
    }
}
exports.default = HumanPlayer;
//# sourceMappingURL=HumanPlayer.js.map