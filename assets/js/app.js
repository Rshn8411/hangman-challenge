// Hangman Game

//Global Variables
var wordList = ["RABBIT",
                "BUNNY",
                "CARROT",
                "LETTUCE",
                "BURROW",
                "FLOPPY",
                "LITTER",
                "PELLETS"];

var usedWords = [];
let answer = "";
let maxIncorrect = 8;
let mistakes = 0;
let guessed = [];
let playStatus = null;

// Randomly picks the word from the wordList; adds to usedWords array
function pickWordRandom(){
  answer = wordList[Math.floor(Math.random() * wordList.length)];
  //alert(usedWords);
  if (usedWords.indexOf(answer) === -1) {
    usedWords.push(answer);
  } else if (usedWords.length !== wordList.length){
    pickWordRandom();
  } else {
    document.getElementById('letters').innerHTML = "You have played through all of the words!";
    document.getElementById(newGame).Attribute('disabled');

  }

}

// Creates keys for single-letter guesses
function generateKeys(){
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('').map(letter =>
  `
  <button
    class="btn btn-lg btn-primary m-2"
    id='` + letter + `'
    onClick="playerGuess('` + letter + `')"
  >
    ` + letter + `
  </button>
  `).join('');

  document.getElementById('letters').innerHTML = buttonsHTML;
}

// This handles the player's guess and check if there is a current win or loss
function playerGuess(chooseLetter) {
  guessed.indexOf(chooseLetter) === -1 ? guessed.push(chooseLetter) : null;
  document.getElementById(chooseLetter).setAttribute('disabled', true);
  //alert(answer);

  if (answer.indexOf(chooseLetter) >= 0){
    wordToGuess(); //update the playStatus
    winCheck(); //check if player has won
  } else if (answer.indexOf(chooseLetter) === -1) {
    mistakes++; //increment number of misses
    mistakesUpdate(); //update count indicator for misses
    lossCheck(); //check if player has lost
    missPic(); //update picture indicator for misses
  }
}

//undo the previous move
function undoMove(){
  let remove = guessed.pop();
  document.getElementById(remove).removeAttribute('disabled');
  mistakes--;
  missPic();
  mistakesUpdate();
}

//update picture for misses/mistakes
function missPic(){
  document.getElementById('playNowPic').src = 'images/x' + mistakes + '.png';
}

// Check if player has won
function winCheck(){
  if (playStatus === answer) {
    document.getElementById('letters').innerHTML = 'Winner!';
  }
}

// Check if player has lost
function lossCheck(){
  if (mistakes === maxIncorrect){
    document.getElementById('wordDash').innerHTML = "The answer was " + answer;
    document.getElementById('letters').innerHTML = 'Sorry, you lose.';
  }
}

// Function to set the status of gameplay, updates tick-marks with correct guesses
function wordToGuess() {
  playStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " __ ")).join('');
  document.getElementById('wordDash').innerHTML = playStatus;
}

// Updates the value/count of misses on page (e.g., 2 of 8)
function mistakesUpdate(){
  document.getElementById('misses').innerHTML = mistakes;
}

// active button to allow user to guess the word once per game
function fullGuess(){
  yourFullGuess = prompt("Please enter your guess here: "); //prompt for full word

  if (answer === yourFullGuess){ //check answer
    document.getElementById('letters').innerHTML = "That's correct. You Win!";
  } else {
    alert("Sorry, incorrect. Please continue with the game.");
    mistakes++;
  }
  document.getElementById("oneGuess").setAttribute('disabled', true); //disable button; one use per game
}


// Reset the game. Reset global variables that don't access original word list
function newGame(){
  mistakes = 0;
  guessed = [];
  document.getElementById('playNowPic').src = 'assets/images/play.jpg';
  document.getElementById("oneGuess").removeAttribute('disabled');

  //call these functions to start fresh
  pickWordRandom();
  wordToGuess();
  mistakesUpdate();
  generateKeys();
}

// Set max number of misses on page
document.getElementById("maxIncorrect").innerHTML = maxIncorrect;

// Generate initial gameplay
pickWordRandom();
generateKeys();
wordToGuess();
