"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const Deck_1 = __importDefault(require("./Deck"));
const HumanPlayer_1 = __importDefault(require("./HumanPlayer"));
const AIPlayer_1 = __importDefault(require("./AIPlayer"));
const constant_1 = require("../constant");
class Game {
    constructor() {
        this._deck = new Deck_1.default();
        this._players = [];
        this._round = 1;
    }
    addRoundCount() {
        ++this._round;
    }
    async setPlayers() {
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
        for (let i = 1; i <= constant_1.PLAYER_COUNT; i++) {
            let player;
            if (i === answer.order) {
                player = new HumanPlayer_1.default(i);
            }
            else {
                player = new AIPlayer_1.default(i);
            }
            await player.nameHimSelf();
            this._players.push(player);
        }
    }
    drawCard() {
        if (this._players.length < constant_1.PLAYER_COUNT) {
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
    shuffleDeck() {
        this._deck.shuffle();
    }
    showDown(cards) {
        let maxCard = cards[0];
        for (const card of cards) {
            const cardInfo = card.getCardInfo();
            const gamePlayerName = card.getPlayer?.getName;
            maxCard = maxCard.compareCard(card);
            const message = `${gamePlayerName} show : ${cardInfo}`;
            console.log(message);
        }
        const winner = maxCard.getPlayer;
        return winner;
    }
    getFinalWinner() {
        if (this._round < constant_1.ROUND_LIMIT) {
            console.log("WINNER have not been decided because game is not over ");
            return;
        }
        const players = this._players;
        const winnerMap = {};
        let maxPoint = 0;
        for (const player of players) {
            const point = player.getPoint;
            if (point >= maxPoint) {
                maxPoint = point;
                if (!winnerMap[point]) {
                    winnerMap[point] = [player];
                }
                else {
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
    async init() {
        console.log("GAME START");
        await this.setPlayers();
        console.log("SUFFLE DECK");
        this.shuffleDeck();
        console.log("EACH PLAYER DRAW 13 CARDS");
        this.drawCard();
    }
    async takeATurn() {
        const players = this._players;
        const showCards = [];
        for (const gamePlayer of players) {
            if (!gamePlayer.isExchangeCardBeUsed()) {
                const targetPlayers = players.filter((player) => player.getName !== gamePlayer.getName);
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
exports.default = Game;
//# sourceMappingURL=Game.js.map