/**
 * Игроки
 */
const player1 = {
name: 'Kitana',
  hp: 50,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['sable', 'arrows', 'knives'],
  attack: function() {
  console.log(this.name + ' - Fight...')
  }
};

const player2 = {
  name: 'Sonya',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['gun', 'bat'],
  attack: function() {
    console.log(this.name + ' - Fight...')
  }
}

/**
 * Фабрика
 * @param type {string} - тип игрока
 * @param player {object} - объект игрока
 */
const createPlayer = (type, player) => {
  const playerNode = document.createElement('div');
  playerNode.className = type;

  const progressbarNode = document.createElement('div');
  progressbarNode.className = 'progressbar';

  const lifeNode = document.createElement('div');
  lifeNode.className = 'life';
  lifeNode.style.width = player.hp + '%';

  const nameNode = document.createElement('div');
  nameNode.className = 'name';
  nameNode.innerHTML = player.name;

  progressbarNode.append(lifeNode, nameNode);

  const characterNode = document.createElement('div');
  characterNode.className = 'character';

  const imgNode = document.createElement('img');
  imgNode.src = player.img;

  characterNode.append(imgNode);

  playerNode.append(progressbarNode, characterNode);
  document.getElementsByClassName('arenas')[0].append(playerNode);
};

createPlayer('player1', player1);
createPlayer('player2', player2);

