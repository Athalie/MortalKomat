const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];


/**
 * Узлы DOM-дерева
 */
const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

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
  },
  changeHP,
  elHP,
  renderHP
};

const player2 = {
  player: 2,
  name: 'Sonya',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['gun', 'bat'],
  attack: function () {
    console.log(this.name + ' - Fight...');
  },
  changeHP,
  elHP,
  renderHP
};

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
 * Фабрика игроков
 * @param playerObj {object} - объект игрока
 */
function createPlayer (playerObj) {
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
}

/**
 * Вычисление дельты, на которую сократить жизнь игрока
 */
const getRandom = range => ~~(Math.random() * 100 % range);

/**
 * Сокращение жизни игрока + определение победителя
 * @param player - объект игрока
 */
// function changeHP (player) {
//   const $playerLife = document.querySelector('.player' + player.player + ' .life');
//   player.hp -= getRandom(20);
//   $playerLife.style.width = (player.hp < 0 ? player.hp = 0 : player.hp) + '%';
// }
/**
 * Решает, нужно ли отнимать или ставить HP = 0
 * @param hpDelta - кол-во, на которое надо изменять HP
 */
function changeHP (hpDelta) {
  this.hp -= hpDelta;
  if (this.hp < 0) {
    this.hp = 0;
  }
}

/**
 * Обращается к жизням игрока
 * @returns {Element}
 */
function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

/**
 * Отрисовывает hp
 */
function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

/**
 * Формирование надписи выигрыша
 * @param name - имя игрока
 * @returns {HTMLElement} - div с надписью
 */
function showResultText (name) {
  const $winTitle = createElement('div', 'loseTitle');
  if (name) {
    $winTitle.innerText = name + ' wins';
  } else {
    $winTitle.innerText = 'draw';
  }

  return $winTitle;
}

/**
 * Показывает кнопку перезагрузки игры
 */
function createReloadButton() {
  const $reloadWrap = document.createElement('div');
  $reloadWrap.className = 'reloadWrap';

  const $reloadButton = document.createElement('button');
  $reloadButton.className = 'button';
  $reloadButton.innerText = 'Restart';
  $reloadButton.addEventListener('click', () => window.location.reload());

  $reloadWrap.append($reloadButton);
  $arenas.append($reloadWrap);
}

/**
 * Действия по окончании игры
 * @param text
 */
function gameOverActions(text) {
  $arenas.append(showResultText(text));
  createReloadButton();
}

$arenas.append(createPlayer(player1), createPlayer(player2));

// $randomButton.addEventListener('click', () => {
//   player1.changeHP(getRandom(20));
//   player1.renderHP();
//   player2.changeHP(getRandom(20));
//   player2.renderHP();
//
//   if (player1.hp === 0 || player2.hp === 0) {
//     $randomButton.disabled = true;
//   }
//
//   if (player1.hp === 0 && player1.hp < player2.hp) {
//     gameOverActions(player2.name);
//   } else if (player2.hp === 0 && player2.hp < player1.hp) {
//     gameOverActions(player1.name);
//   } else if (player1.hp === 0 && player2.hp === 0) {
//     gameOverActions();
//   }
// });

function checkRoundResults() {
  if (player1.hp === 0 && player1.hp < player2.hp) {
    gameOverActions(player2.name);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    gameOverActions(player1.name);
  } else if (player1.hp === 0 && player2.hp === 0) {
    gameOverActions();
  }
}

function proccedFight(player, damage) {
  player.changeHP(damage);
  player.renderHP();
}

function enemyAttack() {
  const hit = ATTACK[getRandom(3)];
  const defence = ATTACK[getRandom(3)];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  }
}

$formFight.addEventListener('submit', (event) => {
  event.preventDefault();
  const enemy = enemyAttack();

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

   item.checked = false
  }

  if (enemy.hit !== attack.defence && enemy.defence !== attack.hit) {
    proccedFight(player1, enemy.value);
    proccedFight(player2, attack.value);
  }

  checkRoundResults();
})
