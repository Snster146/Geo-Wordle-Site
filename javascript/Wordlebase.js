import { fiveLetterWords } from "./Relient.js";

const TURN_LIMITS = {
    1: 5,
    2: 7,
    4: 10,
    8: 13,
};

const numOfWordles = Number(localStorage.getItem("numofwordle") || 1);
const maxTurns = TURN_LIMITS[numOfWordles] || 5;
const selectedWords = Array.from({ length: numOfWordles }, pickRandomWord);
const boardStates = selectedWords.map((word) => ({
    solution: word,
    solved: false,
    rows: [],
    rowStates: [],
}));

const usedLetters = [];
let totalTurns = 0;
let gameWon = false;

const statusEl = document.getElementById("userStatus");
const messageEl = document.getElementById("messageBox");
const inputEl = document.getElementById("inputbox");
const attemptsEl = document.getElementById("movediv");
const gameBoardEl = document.getElementById("wordle-game");

function pickRandomWord() {
    const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
    return fiveLetterWords[randomIndex];
}

function evaluateGuess(guess, target) {
    const result = Array(5).fill("absent");
    const remaining = {};

    for (let i = 0; i < target.length; i++) {
        if (guess[i] === target[i]) {
            result[i] = "correct";
        } else {
            remaining[target[i]] = (remaining[target[i]] || 0) + 1;
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (result[i] === "correct") continue;

        const letter = guess[i];
        if ((remaining[letter] || 0) > 0) {
            result[i] = "present";
            remaining[letter] -= 1;
        }
    }

    return result;
}

function renderBoards() {
    gameBoardEl.innerHTML = "";

    boardStates.forEach((board, index) => {
        const boardWrap = document.createElement("div");
        boardWrap.className = "wordle-board";

        const title = document.createElement("div");
        title.className = "wordle-board-title";
        title.textContent = `Wordle ${index + 1}`;
        boardWrap.appendChild(title);

        const rows = [];
        for (let row = 0; row < maxTurns; row++) {
            const rowEl = document.createElement("div");
            rowEl.className = "wordle-row";

            const guess = board.rows[row] || "";
            const states = board.rowStates[row] || Array(5).fill("empty");

            for (let cell = 0; cell < 5; cell++) {
                const tile = document.createElement("span");
                tile.className = `wordle-tile ${states[cell] || "empty"}`;
                tile.textContent = guess[cell] || "";
                rowEl.appendChild(tile);
            }

            rows.push(rowEl);
        }

        rows.forEach((rowEl) => boardWrap.appendChild(rowEl));
        gameBoardEl.appendChild(boardWrap);
    });
}

function updateAttempts() {
    attemptsEl.textContent = `${totalTurns}/${maxTurns}`;
}

function handleWinState() {
    if (boardStates.every((board) => board.solved)) {
        gameWon = true;
        statusEl.textContent = "Solved";
        statusEl.style.color = "#173d2d";
        statusEl.style.background = "#d5f0d8";
        messageEl.textContent = "You solved every wordle!";
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1200);
        return true;
    }

    return false;
}

function handleLossState() {
    if (totalTurns >= maxTurns && !gameWon) {
        statusEl.textContent = "Lost";
        statusEl.style.color = "#4d2f05";
        statusEl.style.background = "#f9eac3";
        messageEl.textContent = `Out of turns. The answers were: ${selectedWords.join(", ")}`;
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1600);
        return true;
    }

    return false;
}

function submitGuess() {
    const guess = inputEl.value.trim().toLowerCase();

    if (!guess) {
        messageEl.textContent = "Must enter a word.";
        return;
    }

    if (!/^[a-z]{5}$/.test(guess)) {
        messageEl.textContent = "Input must be exactly 5 letters.";
        return;
    }

    if (usedLetters.includes(guess)) {
        messageEl.textContent = "Cannot enter word already entered.";
        return;
    }

    totalTurns += 1;
    usedLetters.push(guess);
    updateAttempts();

    let solvedBoardCount = 0;

    boardStates.forEach((board) => {
        if (board.solved) return;

        const states = evaluateGuess(guess, board.solution);
        board.rows.push(guess);
        board.rowStates.push(states);

        if (guess === board.solution) {
            board.solved = true;
            solvedBoardCount += 1;
        }
    });

    renderBoards();

    if (solvedBoardCount > 0) {
        messageEl.textContent = `${solvedBoardCount} wordle${solvedBoardCount > 1 ? "s" : ""} solved this round.`;
    } else {
        messageEl.textContent = "Keep guessing.";
    }

    if (handleWinState()) return;
    if (handleLossState()) return;

    inputEl.value = "";
    inputEl.focus();
    statusEl.textContent = "In Progress";
    statusEl.style.color = "#223f43";
    statusEl.style.background = "#dfeef3";
}

$(document).ready(function () {
    statusEl.textContent = "In Progress";
    statusEl.style.color = "#223f43";
    statusEl.style.background = "#dfeef3";
    attemptsEl.textContent = `0/${maxTurns}`;
    renderBoards();

    $("#enterbutton").on("click", submitGuess);
    $("#inputbox").on("keydown", function (event) {
        if (event.key === "Enter") {
            submitGuess();
        }
    });
});

