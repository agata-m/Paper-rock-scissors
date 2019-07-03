'use strict';

// DEKLARACJA ZMIENNYCH

var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var playerMove;
var playerInfo;
var compMove;
var compInfo;
var output = document.getElementById('output');
var computerPoints = 0;
var playerPoints = 0;
var points = document.getElementById('points');
var rounds = document.getElementById('rounds');
var roundNumber = 0;
var newGameButton = document.getElementById('newGameButton');
var numberChoice = function() {
  return Math.round(Math.random() * 3 + 1);
}

points.innerHTML = computerPoints + ' – ' + playerPoints;
rounds.innerHTML = roundNumber;

// NEW GAME SETTING

function reset() {
  computerPoints = 0;
  playerPoints = 0;
  points.innerHTML = '0 – 0';
  rounds.innerHTML = '0';
}

function toogleButtons(state) {
  paper.disabled = state;
  rock.disabled = state;
  scissors.disabled = state;
  newGameButton.disabled = !state;
}

newGameButton.addEventListener('click', function() {
  reset();
  roundNumber = window.prompt('How many rounds do you want to play?');
  if (!isNaN(roundNumber) && roundNumber !== '' && roundNumber !== ' ' && roundNumber !== null) {
    rounds.innerHTML = roundNumber;
    toogleButtons(false);
  } else {
    rounds.innerHTML = 0;
  }
});

//DETERMINING WINNER

function computerChoice() {
  compMove = numberChoice();
  if (compMove == 1) {
    compInfo = 'paper';
  } else if (compMove == 2) {
    compInfo = 'rock';
  } else {
    compInfo = 'scissors';
  }
}

function determiningWinner() {
  if (playerMove == compMove) {
    output.innerHTML = 'Chance for a rematch! You played ' + playerInfo + ' and computer played ' + compInfo + '.';
  } else if (playerMove == 1 && compMove == 2 || playerMove == 2 && compMove == 3 || playerMove == 3 && compMove == 1) {
    output.innerHTML = 'Congratulations, you won! You played ' + playerInfo + ' and computer played ' + compInfo + '.';
    playerPoints++;
  } else {
    output.innerHTML = 'Sorry, you lost. You played ' + playerInfo + ' and computer played ' + compInfo + '.';
    computerPoints++;
  }
  points.innerHTML = playerPoints + ' – ' + computerPoints;  
  gameOver();
}

paper.addEventListener('click', function() {
  computerChoice();
  playerMove = 1;
  playerInfo = 'paper';
  determiningWinner();
});

rock.addEventListener('click', function() {
  computerChoice();
  playerMove = 2;
  playerInfo = 'rock';
  determiningWinner();
});

scissors.addEventListener('click', function() {
  computerChoice();
  playerMove = 3;
  playerInfo = 'scissors';
  determiningWinner();
});

// GAMEOVER

function gameOver() {
  if (computerPoints == roundNumber || playerPoints == roundNumber) {
    toogleButtons(true);
    if (computerPoints > playerPoints) {
        output.innerHTML = 'Sorry, you lost the game. Press new game button to play again.';
    } else if (computerPoints < playerPoints) {
        output.innerHTML = 'Congratulations! You have won the entire game. Press new game button to play again.';
    } else {
        output.innerHTML = 'It is a draw! Press new game button to play again.';
    }
  }
}


