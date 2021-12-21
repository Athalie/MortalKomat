import { player1, player2 } from './player.js';
import { ATTACK, HIT, logs } from './consts.js';
import { $chat, $formFight, $arenas } from './nodes.js';

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
const createPlayer = playerObj => {
  const $player = createElement('div', 'player' + playerObj.player);

  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');

  $player.append($progressbar, $character);

  const $life = createElement('div', 'life');
  $life.style.width = playerObj.hp + '%';

  const $name = createElement('div', 'name');
  $name.innerText = playerObj.name;

  $progressbar.append($life, $name);

  const $img = createElement('img');
  $img.src = playerObj.img;
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

/**
 * Генерация лога
 */
function generateLogs (type, player1, player2) {
  const range = logs[type].length;
  const timestamp = new Date().toLocaleTimeString().replace(/:..$/, '');
  let text = '';
  let logItem = null;
  switch (type) {
    case 'start':
      text = logs[type].replace(/\[time\]/, timestamp).replace(/\[player1\]/, player1.name)
        .replace(/\[player2\]/, player2.name);
      logItem = `<p>${ timestamp } ${ text }</p>`;
      break;
    case 'hit':
    case 'defence':
      text = logs[type][getRandom(range)].replace(/\[playerKick\]/, player1.name)
        .replace(/\[playerDefence\]/, player2.name).replace('[time]', timestamp);
      logItem = `<p>${ timestamp } ${ text } -${ 100 - player2.hp } [${ player2.hp } / 100]</p>`;
      break;
    case 'end':
      text = logs[type][getRandom(range)].replace(/\[playerWins\]/, player1.name)
        .replace(/\[playerLose\]/, player2.name).replace('[time]', timestamp);
      logItem = `<p>${ timestamp } ${ text } -${ 100 - player2.hp } [${ player2.hp } / 100]</p>`;
      break;
    case 'draw':
      text = logs[type];
      logItem = `<p>${ timestamp } ${ text }</p>`;
  }

  $chat.insertAdjacentHTML('afterbegin', logItem);
}

export {
  getRandom,
  createElement,
  createPlayer,
  gameOverActions,
  proccedFight,
  enemyAttack,
  playerAttack,
  showResult,
  generateLogs
};
