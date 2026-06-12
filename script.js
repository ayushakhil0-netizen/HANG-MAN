const WORDS = {

    Programming:[
        "PYTHON",
        "JAVASCRIPT",
        "REACT",
        "ALGORITHM",
        "DATABASE",
        "TYPESCRIPT"
    ],

    Gaming:[
        "MINECRAFT",
        "VALORANT",
        "FORTNITE",
        "ROBLOX",
        "OVERWATCH"
    ],

    Technology:[
        "COMPUTER",
        "KEYBOARD",
        "NETWORK",
        "SOFTWARE",
        "INTERNET"
    ]
};

let word = "";
let guessed = [];
let lives = 6;
let score = 0;

const wordEl = document.getElementById("word");
const livesEl = document.getElementById("lives");
const keyboardEl = document.getElementById("keyboard");
const scoreEl = document.getElementById("score");
const categoryEl = document.getElementById("category");

const highscoreEl =
document.getElementById("highscore");

let highscore =
localStorage.getItem("hangmanHighscore") || 0;

highscoreEl.textContent =
"Best: " + highscore;

function startGame(){

    guessed = [];
    lives = 6;

    keyboardEl.innerHTML = "";

    const categories =
    Object.keys(WORDS);

    const category =
    categories[
        Math.floor(
            Math.random() *
            categories.length
        )
    ];

    categoryEl.textContent =
    "Category: " + category;

    word =
    WORDS[category][
        Math.floor(
            Math.random() *
            WORDS[category].length
        )
    ];

    createKeyboard();
    renderWord();
    renderLives();

    hideModal();
}

function createKeyboard(){

    for(let i=65;i<=90;i++){

        const letter =
        String.fromCharCode(i);

        const button =
        document.createElement("button");

        button.className = "key";

        button.textContent =
        letter;

        button.onclick = () =>
        guessLetter(letter,button);

        keyboardEl.appendChild(button);
    }
}

function guessLetter(letter,button){

    button.disabled = true;

    if(word.includes(letter)){

        guessed.push(letter);

        button.classList.add("correct");

    }else{

        lives--;

        button.classList.add("wrong");
    }

    renderWord();
    renderLives();
    checkGame();
}

function renderWord(){

    wordEl.textContent =
    word
    .split("")
    .map(char =>
        guessed.includes(char)
        ? char
        : "_"
    )
    .join(" ");
}

function renderLives(){

    livesEl.textContent =
    "❤️".repeat(lives);
}

function checkGame(){

    const won =
    word
    .split("")
    .every(char =>
        guessed.includes(char)
    );

    if(won){

        score += 10;

        scoreEl.textContent =
        "Score: " + score;

        if(score > highscore){

            highscore = score;

            localStorage.setItem(
                "hangmanHighscore",
                highscore
            );

            highscoreEl.textContent =
            "Best: " + highscore;
        }

        showModal(
            "🎉 Victory",
            "You guessed " + word
        );
    }

    if(lives <= 0){

        showModal(
            "💀 Game Over",
            "Word was " + word
        );
    }
}

function showModal(title,text){

    document
    .getElementById("modal")
    .classList
    .remove("hidden");

    document
    .getElementById("modalTitle")
    .textContent = title;

    document
    .getElementById("modalText")
    .textContent = text;
}

function hideModal(){

    document
    .getElementById("modal")
    .classList
    .add("hidden");
}

document
.getElementById("newGame")
.addEventListener(
    "click",
    startGame
);

startGame();
