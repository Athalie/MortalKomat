import { player1, player2 } from './player.js';
import { createPlayer, proccedFight, enemyAttack, playerAttack, showResult, generateLogs } from './utils.js';
import { $arenas, $formFight } from './nodes.js';

generateLogs('start', player1, player2);

$arenas.append(createPlayer(player1), createPlayer(player2));

$formFight.addEventListener('submit', (event) => {
  event.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    proccedFight(player1, enemy.value);
    generateLogs('hit', player2, player1);
  } else if (player.hit === enemy.defence) {
    generateLogs('defence', player1, player2);
  }

  if (enemy.hit === player.defence) {
    generateLogs('defence', player2, player1);
  } else if (player.hit !== enemy.defence) {
    proccedFight(player2, player.value);
    generateLogs('hit', player1, player2);
  }

  showResult();
});
