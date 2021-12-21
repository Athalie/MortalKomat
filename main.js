const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];
const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

/**
 * Узлы DOM-дерева
 */
const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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

generateLogs('start', player1, player2);

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
function getRandom (range) {
  return ~~(Math.random() * 100 % range);
}

/**
 * Генерация лога
 */
function generateLogs (type, player1, player2) {
  const range = logs[type].length;
  const timestamp = new Date().toLocaleTimeString().replace(/:..$/, '');
  let tetxt = '';
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
function elHP () {
  return document.querySelector('.player' + this.player + ' .life');
}

/**
 * Отрисовывает hp
 */
function renderHP () {
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
function createReloadButton () {
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
function gameOverActions (winner, loser) {
  if (winner) {
    generateLogs('end', winner, loser);
  } else {
    generateLogs('draw');
  }

  $arenas.append(showResultText(winner?.name));
  createReloadButton();
}

$arenas.append(createPlayer(player1), createPlayer(player2));

function showResult () {
  if (player1.hp === 0 && player1.hp < player2.hp) {
    gameOverActions(player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    gameOverActions(player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    gameOverActions();
  }
}

function proccedFight (player, damage) {
  player.changeHP(damage);
  player.renderHP();
}

function enemyAttack () {
  const hit = ATTACK[getRandom(3)];
  const defence = ATTACK[getRandom(3)];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  };
}

function playerAttack () {
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
}

$formFight.addEventListener('submit', (event) => {
  event.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    proccedFight(player1, enemy.value);
    generateLogs('hit', player2, player1);
  }

  if (enemy.hit === player.defence) {
    generateLogs('defence', player2, player1);
  }

  if (player.hit === enemy.defence) {
    generateLogs('defence', player1, player2);
  }

  if (player.hit !== enemy.defence) {
    proccedFight(player2, player.value);
    generateLogs('hit', player1, player2);
  }

  showResult();
});
