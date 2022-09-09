import Game from "./class/Game";
import { ROUND_LIMIT } from "./constant";

async function main() {
  const game = new Game();
  await game.init();
  for (let round = 0; round < ROUND_LIMIT; round++) {
    await game.takeATurn();
  }

  game.getFinalWinner();
}

main().catch((error) => console.log(error));
