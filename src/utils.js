import { player1, player2 } from './player.js';
import { ATTACK, HIT } from './consts.js';
import { $formFight, $arenas } from './nodes.js';
import { generateLogs } from './logs.js';

/**
 * Вычисление дельты, на которую сократить жизнь игрока
 */
const getRandom = range => ~~(Math.random() * 100 % range);

/**
 * Формирование частей арены
 * @param tag {string} - тип узла DOM-дерева
 * @param className {string} - стиль узла DOM-дерева
 */
function createElement (tag, className) {
  const $node = document.createElement(tag);
  className && ($node.className = className);

  return $node;
}

/**
 * Показывает кнопку перезагрузки игры
 */
const createReloadButton = () => {
  const $reloadWrap = document.createElement('div');
  $reloadWrap.className = 'reloadWrap';

  const $reloadButton = document.createElement('button');
  $reloadButton.className = 'button';
  $reloadButton.innerText = 'Restart';
  $reloadButton.addEventListener('click', () => window.location.reload());

  $reloadWrap.append($reloadButton);
  $arenas.append($reloadWrap);
};

/**
 * Фабрика игроков
 * @param playerObj {object} - объект игрока
 */
const createPlayer = ({ player, name, hp, img }) => {
  const $player = createElement('div', 'player' + player);

  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');

  $player.append($progressbar, $character);

  const $life = createElement('div', 'life');
  $life.style.width = hp + '%';

  const $name = createElement('div', 'name');
  $name.innerText = name;

  $progressbar.append($life, $name);

  const $img = createElement('img');
  $img.src = img;
  $character.append($img);

  return $player;
};

/**
 * Формирование надписи выигрыша
 * @param name - имя игрока
 * @returns {HTMLElement} - div с надписью
 */
const showResultText = name => {
  const $winTitle = createElement('div', 'loseTitle');
  if (name) {
    $winTitle.innerText = name + ' wins';
  } else {
    $winTitle.innerText = 'draw';
  }

  return $winTitle;
};

/**
 * Действия по окончании игры
 * @param winner
 * @param loser
 */
const gameOverActions = (winner, loser) => {
  if (winner) {
    generateLogs('end', winner, loser);
  } else {
    generateLogs('draw');
  }

  $arenas.append(showResultText(winner?.name));
  createReloadButton();
};

const showResult = () => {
  if (player1.hp === 0 && player1.hp < player2.hp) {
    gameOverActions(player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    gameOverActions(player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    gameOverActions();
  }
};

const proccedFight = (player, damage) => {
  player.changeHP(damage);
  player.renderHP();
};

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3)];
  const defence = ATTACK[getRandom(3)];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  };
};

const playerAttack = () => {
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.value = getRandom(HIT[item.value]);
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
};

export {
  getRandom,
  createElement,
  createPlayer,
  gameOverActions,
  proccedFight,
  enemyAttack,
  playerAttack,
  showResult,
};
