let timer = 20;
let timerIntervalId = "";
let started = false;
let position = 0;
let words = []; // Words from words.txt
let score = 0;
let bgm = new Audio("music.mp3");
let correctSound = new Audio("correct.wav");

//Intialize the game
function initialize() {
  let rand = Math.floor(Math.random() * words.length);
  word = words[rand];
  document.querySelector(".word").innerHTML = word;
  document.querySelector(".word").classList.add("notVisible");
}

//Start the game after buttom press
function startGame() {
  // Start timer
  started = true;
  document.querySelector(".word").classList.remove("notVisible");
  document.querySelector(".start-btn").disabled = true;
  bgm.play();

  timerIntervalId = setInterval(() => {
    if (timer > 0) timer--;
    document.querySelector(".timer").innerHTML = timer;

    if (timer === 0) {
      document.querySelector(".timer").innerHTML = 0;
      gameOver();
    }
  }, 1000);
}

//Times out and the game is over
function gameOver() {
  started = false;

  position = 0;
  clearInterval(timerIntervalId);
  alert("Times Up. The Game is Over. Your Score is " + score);
  timer = 20;
  score = 0;
  document.querySelector(".score").innerHTML = score;
  document.querySelector(".timer").innerHTML = timer;
  bgm.pause();
  document.querySelector(".word").classList.add("notVisible");
  document.querySelector(".start-btn").disabled = false;
}

// Change to a random word
function changeWord() {
  position = 0;
  let rand = Math.floor(Math.random() * words.length);
  word = words[rand];
  correctSound.play();
  score++;
  document.querySelector(".score").innerHTML = score;
  document.querySelector(".word").innerHTML = word;
}

// Match input character to word
function matchWord(input) {

  if (input === word[position]) {
    position++;

    //Highlights the correct character
    document.querySelector(".word").innerHTML =
      `<span class="highlight">` +
      word.substring(0, position) +
      `</span>` +
      word.substring(position, word.length);

    if (position === word.length) {
      changeWord();
    }
  } 
  
}

//When user presses any key
document.addEventListener("keydown", function (event) {
  if (started) {
    matchWord(event.key.toUpperCase());
  }
});

//When user clicks the start button
document.querySelector(".start-btn").addEventListener("click", function () {
  startGame();
});

// Read words.txt
fetch("words.txt")
  .then((response) => response.text())
  .then((text) => {
    words = text.split(",");
    initialize();
  });
