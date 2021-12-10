/**
 * Игроки
 */
const player1 = {
  player: 1,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['sable', 'arrows', 'knives'],
  attack: function () {
    console.log(this.name + ' - Fight...');
  }
};

const player2 = {
  player: 2,
  name: 'Sonya',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['gun', 'bat'],
  attack: function () {
    console.log(this.name + ' - Fight...');
  }
};

/**
 * Узлы DOM-дерева
 */
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

/**
 * Флаг наличия проигравших
 */
let noLosers = true;

/**
 * Формирование частей арены
 * @param tag {string} - тип узла DOM-дерева
 * @param className {string} - стиль узла DOM-дерева
 */
const createElement = (tag, className) => {
  const $node = document.createElement(tag);
  className && ($node.className = className);

  return $node;
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
 * Вычисление дельты, на которую сократить жизнь игрока
 */
const getHPDelta = () => ~~(Math.random() * 100 % 20);

/**
 * Сокращение жизни игрока + определение победителя
 * @param player - объект игрока
 */
const changeHP = player => {
  const $playerLife = document.querySelector('.player' + player.player + ' .life');
  player.hp -= getHPDelta();
  $playerLife.style.width = (player.hp < 0 ? 0 : player.hp) + '%';
  if (!noLosers && player.hp > 0) {
    $arenas.append(playerWin(player.name));
    $randomButton.disabled = true;
  } else if (player.hp < 0) {
    noLosers = false;
  }
};

/**
 * Формирование надписи проигрыша
 * @param name - имя игрока
 * @returns {HTMLElement} - div с надписью
 */
const playerLose = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');
  $loseTitle.innerText = name + ' lose';

  return $loseTitle;
};

/**
 * Формирование надписи выигрыша
 * @param name - имя игрока
 * @returns {HTMLElement} - div с надписью
 */
const playerWin = (name) => {
  const $winTitle = createElement('div', 'loseTitle');
  $winTitle.innerText = name + ' wins';

  return $winTitle;
};

$arenas.append(createPlayer(player1), createPlayer(player2));

$randomButton.addEventListener('click', () => {
  changeHP(player2);
  changeHP(player1);
});
