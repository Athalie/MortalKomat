class Player {
  constructor (props) {
    Object.assign(this, {
      ...props,
      changeHP,
      elHP,
      renderHP
    });
  }
}

/**
 * Игроки
 */
const player1 = new Player({
  player: 1,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['sable', 'arrows', 'knives'],
  attack: function () {
    console.log(this.name + ' - Fight...');
  }
});

const player2 = new Player({
  player: 2,
  name: 'Sonya',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['gun', 'bat'],
  attack: function () {
    console.log(this.name + ' - Fight...');
  }
});

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

export { player1, player2 };
