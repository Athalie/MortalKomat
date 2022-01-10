import { Player } from './player.js';
import { proccedFight, showResult, getRandom } from './utils.js';
import { $formFight } from './nodes.js';
import { getPlayers, getEnemy } from './api.js';

import { generateLogs } from './logs.js';

let player1;
let player2;

class Game {
  start = async () => {
    const players = await getPlayers();
    const selectedPlayer = localStorage.getItem('player1');
    const p1 =  JSON.parse(selectedPlayer) || players[getRandom(players.length)];
    const p2 = await getEnemy();

    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas'
    });

    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas'
    });

    player1.createPlayer();
    player2.createPlayer();

    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', async (event) => {
      event.preventDefault();

      const {
        player1: { value: playerValue, hit: playerHit, defence: playerDefence },
        player2: { value: enemyValue, hit: enemyHit, defence: enemyDefence }
      } = await player1.attack();

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

      showResult(player1, player2);
    });
  };
}

export default Game;









