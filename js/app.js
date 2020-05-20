let scores, roundScore, activePlayer, gamePlaying, finalScore,
dicePrevious, dice;
init();

/*************** button roll */
document.querySelector('.btn-roll').addEventListener('click', function () {
  fScore();
  if (gamePlaying) {
    previousDice = dice;
    diceGenerate();
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.getElementById('current-' + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

/********************button hold */
document.querySelector('.btn-hold').addEventListener('click', function () {
  fScore();
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // check winner
    if (scores[activePlayer] >= finalScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      diceNone();
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

/***************** button new */
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  diceNone();
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  finalScore = 0;
  // dice = 0;
  dice1 = 0;

  document.getElementById('score-0').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  diceNone();
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}
function fScore() {
  let fScore = document.getElementById('final-score').value;
  if (fScore >= 1) {
    finalScore = fScore;
  } else {
    finalScore = 100;
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function diceGenerate() {
  // 1. random number
  dice1 = randomIntFromInterval(1, 6);
  dice2 = randomIntFromInterval(1, 6);
  let diceDom1 = document.getElementById('dice-1');
  let diceDom2 = document.getElementById('dice-2');
  diceDom1.style.display = 'block';
  diceDom2.style.display = 'block';
  diceDom1.src = 'img/dice-' + dice1 + '.png';
  diceDom2.src = 'img/dice-' + dice2 + '.png';
}
function diceNone() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}
