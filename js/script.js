'use strict';

// DECLARING VARIABLES - REFERENCES TO HTML

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
var row;

var numberChoice = function () {
	return Math.round(Math.random() * 3 + 1);
}

// PARAMS

var params = {
	computerPoints: 0,
	playerPoints: 0,
	roundNumber: 0,
	round: 0,
	roundPoints: '',
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
	params.round = 0;
	params.progress = [];
}

function toogleButtons(state) {
	paper.disabled = state;
	rock.disabled = state;
	scissors.disabled = state;
	newGameButton.disabled = !state;
}

window.onload = toogleButtons(true);

newGameButton.addEventListener('click', function () {
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
		params.roundPoints = '0 – 0';
	} else if (playerMove == 1 && compMove == 2 || playerMove == 2 && compMove == 3 || playerMove == 3 && compMove == 1) {
		output.innerHTML = 'Congratulations, you won! You played ' + playerInfo + ' and computer played ' + compInfo + '.';
		params.playerPoints++;
		params.roundPoints = '1 – 0';
	} else {
		output.innerHTML = 'Sorry, you lost. You played ' + playerInfo + ' and computer played ' + compInfo + '.';
		params.computerPoints++;
		params.roundPoints = '0 – 1';
	}
	points.innerHTML = params.playerPoints + ' – ' + params.computerPoints;

	params.progress.push({
		round: params.round,
		player: playerInfo,
		computer: compInfo,
		roundScore: params.roundPoints,
		gameScore: params.playerPoints + ' – ' + params.computerPoints
	});

	gameOver();
}


// PLAYER MOVE

for (var i = 0; i < buttons.length; i++) {

	buttons[i].addEventListener('click', function () {

		params.round++;
		playerInfo = event.target.getAttribute('data-move');

		if (playerInfo === 'paper') {
			playerMove = 1;
		} else if (playerInfo === 'rock') {
			playerMove = 2;
		} else {
			playerMove = 3;
		}

		computerChoice();
		

		

		determiningWinner();

		console.log(params.progress);
		
	});
}


// MODALE

function showModal() {
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.add('show');
	document.querySelector('.modal').classList.add('show');

	if (params.computerPoints > params.playerPoints) {
		endOfGameOutput.innerHTML = 'Sorry, you lost the game. Press new game button to play again.';
	} else if (params.computerPoints < params.playerPoints) {
		endOfGameOutput.innerHTML = 'Congratulations! You have won the entire game. Press new game button to play again.';
	} else {
		endOfGameOutput.innerHTML = 'It is a draw! Press new game button to play again.';
	}
}

function hideModal(event) {
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
}

function endofGameModal() {

	var closeButtons = document.querySelectorAll('.modal .close');

	for (var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', hideModal);
	}

	document.querySelector('#modal-overlay').addEventListener('click', hideModal);

	var modals = document.querySelectorAll('.modal');

	for (var i = 0; i < modals.length; i++) {
		modals[i].addEventListener('click', function (event) {
			event.stopPropagation();
		});
	}

	createTable();

}

// GAMEOVER

function gameOver() {

	if (params.computerPoints == params.roundNumber || params.playerPoints == params.roundNumber) {
		toogleButtons(true);
		endofGameModal();
	}
}
// CREATE TABLE

function createTable() {
	console.log(params.progress);

	tableContent.innerHTML = '';

	for (var i = 0; i < params.progress.length; i++) {

		row = document.createElement('tr');
		tableContent.appendChild(row);

		var td = document.createElement('td');
		td.innerText = params.progress[i].round;
		row.appendChild(td);

		td = document.createElement('td');
		td.innerText = params.progress[i].player;
		row.appendChild(td);

		td = document.createElement('td');
		td.innerText = params.progress[i].computer;
		row.appendChild(td);

		td = document.createElement('td');
		td.innerText = params.progress[i].roundScore;
		row.appendChild(td);

		td = document.createElement('td');
		td.innerText = params.progress[i].gameScore;
		row.appendChild(td);
	}

	showModal();
}