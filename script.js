'use strict';
const board = document.querySelector('#board');
const blocks = document.querySelectorAll('.entry');
const playerLabel = document.querySelector('.player--label');
const playerLetter = document.querySelector('.player--active');
const playerWin = document.querySelector('.player--win');
const reset = document.querySelector('.reset');

let gameState, currentPlayer;
const playerXMov = [];
const playerOMov = [];
const init = function () {
  gameState = true;
  currentPlayer = 'X';
  playerXMov.length = 0;
  playerOMov.length = 0;
  Array.from(blocks).forEach(el => (el.innerHTML = ''));
  playerLabel.classList.remove('hidden');
  playerWin.classList.add('hidden');
  playerLetter.innerHTML = 'X';
};

// (1,2,3) || (4,5,6) || (1,4,7) || (2,5,8) || (3,6,9) || (7,8,9) || (1,3,5) || (3,5,7)
init();
const isWinner = function (target) {
  if (target.includes('1') && target.includes('2') && target.includes('3'))
    return true;
  else if (target.includes('4') && target.includes('5') && target.includes('6'))
    return true;
  else if (target.includes('7') && target.includes('8') && target.includes('9'))
    return true;
  else if (target.includes('1') && target.includes('4') && target.includes('7'))
    return true;
  else if (target.includes('2') && target.includes('5') && target.includes('8'))
    return true;
  else if (target.includes('3') && target.includes('6') && target.includes('9'))
    return true;
  else if (target.includes('1') && target.includes('5') && target.includes('9'))
    return true;
  else if (target.includes('3') && target.includes('5') && target.includes('7'))
    return true;
  else return false;
};

board.addEventListener('click', function (e) {
  const click = e.target.closest('.entry');
  if (!click) return;
  if (gameState) {
    const entry = click.dataset.position;
    if (playerXMov.length + playerOMov.length === 8) {
      playerLabel.classList.add('hidden');
      playerWin.classList.remove('hidden');
      playerWin.innerHTML = "It's a draw. try again..";
      gameState = false;
    }
    if (currentPlayer === 'X') {
      playerXMov.push(entry);
      click.innerHTML = 'X';
      if (isWinner(playerXMov)) {
        playerLabel.classList.add('hidden');
        playerWin.classList.remove('hidden');
        playerWin.innerHTML =
          'Player <span class="player--active">X</span> Won!!';
        gameState = false;
      }
      currentPlayer = 'O';
      playerLetter.innerHTML = 'O';
    } else {
      playerOMov.push(entry);
      click.innerHTML = 'O';
      if (isWinner(playerOMov)) {
        playerLabel.classList.add('hidden');
        playerWin.classList.remove('hidden');
        playerWin.innerHTML =
          'Player <span class="player--active">O</span> Won!!';
        gameState = false;
      }
      currentPlayer = 'X';
      playerLetter.innerHTML = 'X';
    }
  }
});

reset.addEventListener('click', init);
