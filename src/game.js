import { player1, player2 } from './player.js';
import { createPlayer, proccedFight, enemyAttack, playerAttack, showResult } from './utils.js';
import { $arenas, $formFight } from './nodes.js';

import { generateLogs } from './logs.js';

class Game {
  start = () => {
    generateLogs('start', player1, player2);
    $arenas.append(createPlayer(player1), createPlayer(player2));
    $formFight.addEventListener('submit', (event) => {
      event.preventDefault();
      const { value: enemyValue, defence: enemyDefence, hit: enemyHit } = enemyAttack();
      const { value: playerValue, defence: playerDefence, hit: playerHit } = playerAttack();

      if (enemyHit !== playerDefence) {
        proccedFight(player1, enemyValue);
        generateLogs('hit', player2, player1, enemyValue);
      } else if (playerHit === enemyDefence) {
        generateLogs('defence', player1, player2);
      }

      if (enemyHit === playerDefence) {
        generateLogs('defence', player2, player1);
      } else if (playerHit !== enemyDefence) {
        proccedFight(player2, playerValue);
        generateLogs('hit', player1, player2, playerValue);
      }

      showResult();
    });
  };
}

export default Game;









