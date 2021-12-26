const getPlayers = () => fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());

const getEnemy = () => fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());

const doFight = ({hit, defence}) => fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
  method: 'POST',
  body: JSON.stringify({
    hit,
    defence,
  })
}).then(res => res.json());

export {getPlayers, getEnemy, doFight};
