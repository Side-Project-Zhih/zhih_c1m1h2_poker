"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./class/Game"));
const constant_1 = require("./constant");
async function main() {
    const game = new Game_1.default();
    await game.init();
    for (let round = 0; round < constant_1.ROUND_LIMIT; round++) {
        await game.takeATurn();
    }
    game.getFinalWinner();
}
main().catch((error) => console.log(error));
//# sourceMappingURL=app.js.map