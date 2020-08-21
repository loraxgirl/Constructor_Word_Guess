const Word = require("./word.js");
const inquirer = require("inquirer");

const wordBank = [
  "brazil", "persona", "vertigo", "babe", "nashville", "network", "giant", "eraserhead", "psycho", 
  "manhattan", "fargo", "amadeus", "goodfellas", "fearless", "videodrome", "unforgiven", "casino", 
  "suspiria", "crash", "sleeper", "scarface", "rocky", "mash", "platoon", "batman", "papillon", 
  "frenzy", "memento", "chinatown", "lolita", "mephisto", "sideways", "hamlet", "magnolia", "monster", 
  "spartacus", "traffic", "jaws", "alien", "metropolis", "trainspotting", "misery", "harvey", "halloween", 
  "casablanca"
];

let guesses;
let pickedWords;
let word;
let pickedWord;

function init() {
  pickedWords = [];
  console.log("  Hello, and welcome to the One-Word Movie Title Challenge!");
  console.log("------------------------------------------");
  playGame();
}

function playGame() {
  pickedWord = "";
  guesses = 15;
  if(pickedWords.length < wordBank.length) {
    pickedWord = getWord();
  } else {
    // WIN CONDITION
    console.log("You know a lot about movies!");
    continuePrompt();
  }
  if(pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    makeGuess();
  }
}

function getWord() {
  let rand = Math.floor(Math.random() * wordBank.length);
  let randomWord = wordBank[rand];
  if(pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
  } else {
    return getWord();
  }
}

function makeGuess() {
  let checker = [];
  inquirer.prompt([
    {
      name: "guessedLetter",
      message: " " + word.update() + "\n " +
              "\n Guess a letter!" +
              "\n Guesses Left: " + guesses
    }
  ])
  .then(data => {
    word.letters.forEach(letter => {
      letter.checkLetter(data.guessedLetter);
      checker.push(letter.getCharacter());
    });
    if(guesses > 0 && checker.indexOf("_") !== -1) {
      guesses--;
      if(guesses === 0) {
        console.log("  YOU RAN OUT OF GUESSES! GAME OVER.");
        continuePrompt();
      } else {
        makeGuess();
      }
    } else {
      console.log("  CONGRATULATIONS! YOU GOT IT!");
      console.log(" " + word.update());
      console.log(" ");
      playGame();
    }
  });
}

function continuePrompt() {
  inquirer.prompt([
      {
        name: "continue",
        type: "list",
        message: "Would you like to play again?",
        choices: ["Yes", "No"]
      }
    ])
  .then(data => {
      if(data.continue === "Yes") {
        init();
      } else {
        console.log("Thanks for playing!");
      }
  });
}

init();
