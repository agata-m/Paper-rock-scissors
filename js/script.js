'use strict';

// DECLARING VARIABLES - REFERENCES TO HTML

var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var buttons = document.querySelectorAll('.player-move');
var output = document.getElementById('output');
var points = document.getElementById('points');
var rounds = document.getElementById('rounds');
var newGameButton = document.getElementById('newGameButton');
var endOfGameOutput = document.getElementById('endOfGameOutput');
var table = document.getElementById('scoreBoard');
var tableContent = document.getElementById('tableContent');


// DECLARING VARIABLES - REST

var playerMove;
var playerInfo;
var compMove;
var compInfo;

var numberChoice = function() {
  	return Math.round(Math.random() * 3 + 1);
}

// PARAMS

var params = {
	computerPoints: 0,
	playerPoints: 0,
	roundNumber: 0,
	progress: []
};


// OUTPUT TO HTML

points.innerHTML = params.computerPoints + ' – ' + params.playerPoints;
rounds.innerHTML = params.roundNumber;

// NEW GAME SETTING

function reset() {
	params.computerPoints = 0;
	params.playerPoints = 0;
	points.innerHTML = '0 – 0';
	rounds.innerHTML = '0';
	output.innerHTML = '';
}

function toogleButtons(state) {
	paper.disabled = state;
	rock.disabled = state;
	scissors.disabled = state;
	newGameButton.disabled = !state;
}

window.onload = toogleButtons(true);

newGameButton.addEventListener('click', function() {
	reset();
	params.roundNumber = window.prompt('How many rounds do you want to play?');
	if (!isNaN(params.roundNumber) && params.roundNumber !== '' && params.roundNumber !== ' ' && params.roundNumber !== null) {
		rounds.innerHTML = params.roundNumber;
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
		params.playerPoints++;
	} else {
		output.innerHTML = 'Sorry, you lost. You played ' + playerInfo + ' and computer played ' + compInfo + '.';
		params.computerPoints++;
	}
	points.innerHTML = params.playerPoints + ' – ' + params.computerPoints;  
	gameOver();
}


// PLAYER MOVE

for ( var i = 0; i < buttons.length; i++ ) {
    
    playerMove = buttons[i].getAttribute('data-move');
    playerInfo = playerMove;

    buttons[i].addEventListener('click', function() {

        if(playerMove === 'paper') {
            playerMove = 1;
        } else if(playerMove === 'rock') {
            playerMove = 2;
        } else {
            playerMove = 3;
        }
    
        computerChoice();
        determiningWinner();
	});
	
	// info for the table
	var roundInfo = {
		roundNumber: buttons[i],
		player: playerInfo,
		computer: compInfo,
		roundScore: i,
		gameScore: params.playerPoints + ' – ' + params.computerPoints
	}

	params.progress.push( roundInfo );
}


// MODALE



function endofGameModal() { 
	
	var hideModal = function(event) {
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', hideModal);
	}

	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	
	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++) {
		modals[i].addEventListener('click', function(event) {
			event.stopPropagation();
		});
	}

	createTable();
	
}

// GAMEOVER

function gameOver() {

	if (params.computerPoints == params.roundNumber || params.playerPoints == params.roundNumber) {

		toogleButtons(true);
		
		function showModal() {
			event.preventDefault();
			document.querySelector('#modal-overlay').classList.add('show');

			if (params.computerPoints > params.playerPoints) {
				endOfGameOutput.innerHTML = 'Sorry, you lost the game. Press new game button to play again.';
				} else if (params.computerPoints < params.playerPoints) {
					endOfGameOutput.innerHTML = 'Congratulations! You have won the entire game. Press new game button to play again.';
				} else {
					endOfGameOutput.innerHTML = 'It is a draw! Press new game button to play again.';
				}
			}
		}

	endofGameModal();
}

// CREATE TABLE

function createTable() {

	params.progress = progress;

	for( var i = 0; i < progress.length; i++ ) {

		var row = tableContent.insertRow(i);

		for( roundInfo in progress ) {
			var td = document.createElement('td');
			td.innerHTML = progress[roundInfo];
			row.appendChild(td);
		}
	}

	tableContent.appendChild(row);
}