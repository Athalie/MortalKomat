import { createElement, getRandom } from './utils.js';
import { doFight } from './api.js';
import { $formFight } from './nodes.js';
import { HIT } from './consts.js';

class Player {
  constructor (props) {
    Object.assign(this, {
      ...props,
    });
  }

  /**
   * Фабрика игроков
   */
  createPlayer = () => {
    const $player = createElement('div', 'player' + this.player);

    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');

    $player.append($progressbar, $character);

    const $life = createElement('div', 'life');
    $life.style.width = this.hp + '%';

    const $name = createElement('div', 'name');
    $name.innerText = this.name;

    $progressbar.append($life, $name);

    const $img = createElement('img');
    $img.src = this.img;
    $character.append($img);

    document.querySelector(`.${ this.rootSelector }`).append($player);
  };

  /**
   * Решает, нужно ли отнимать или ставить HP = 0
   * @param hpDelta - кол-во, на которое надо изменять HP
   */
  changeHP = hpDelta => {
    this.hp -= hpDelta;
    if (this.hp < 0) {
      this.hp = 0;
    }
  };

  /**
   * Обращается к жизням игрока
   * @returns {Element}
   */
  elHP = () => document.querySelector('.player' + this.player + ' .life');

  /**
   * Отрисовывает hp
   */
  renderHP = () => {
    this.elHP().style.width = this.hp + '%';
  };

  attack = () => {
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

    return doFight(attack);

  };
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

export { Player };
