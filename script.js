const sudokuGrid = document.getElementById("sudoku-grid");
const timerElement = document.getElementById("timer");
let solution = [];
let currentTimer;
let elapsedTime = 0;

// Generate the Sudoku grid
function createGrid() {
    sudokuGrid.innerHTML = "";
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const input = document.createElement("input");
        input.maxLength = 1;
        input.type = "text";
        cell.appendChild(input);
        sudokuGrid.appendChild(cell);
    }
}

// Start Timer
function startTimer() {
    clearInterval(currentTimer);
    elapsedTime = 0;
    currentTimer = setInterval(() => {
        elapsedTime++;
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime % 60;
        timerElement.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Set difficulty levels
function setDifficulty(level) {
    createGrid();
    startTimer();
    switch (level) {
        case "easy":
            solution = generateSudoku(30); // 30 pre-filled cells
            break;
        case "medium":
            solution = generateSudoku(20); // 20 pre-filled cells
            break;
        case "hard":
            solution = generateSudoku(10); // 10 pre-filled cells
            break;
    }
}

// Show answers
function showAnswers() {
    const inputs = document.querySelectorAll(".cell input");
    inputs.forEach((input, index) => {
        input.value = solution[index];
    });
}

// Provide a hint by filling a random empty cell
function giveHint() {
    const inputs = document.querySelectorAll(".cell input");
    const emptyCells = [];
    inputs.forEach((input, index) => {
        if (input.value === "") emptyCells.push(index);
    });
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        inputs[randomIndex].value = solution[randomIndex];
    }
}

// Regenerate a new Sudoku puzzle
function regeneratePuzzle() {
    setDifficulty("easy");
}

// Generate a valid Sudoku puzzle
function generateSudoku(preFilledCells) {
    // Initialize a complete, valid Sudoku solution for the sake of demonstration
    const baseSolution = [
        5, 3, 4, 6, 7, 8, 9, 1, 2,
        6, 7, 2, 1, 9, 5, 3, 4, 8,
        1, 9, 8, 3, 4, 2, 5, 6, 7,
        8, 5, 9, 7, 6, 1, 4, 2, 3,
        4, 2, 6, 8, 5, 3, 7, 9, 1,
        7, 1, 3, 9, 2, 4, 8, 5, 6,
        9, 6, 1, 5, 3, 7, 2, 8, 4,
        2, 8, 7, 4, 1, 9, 6, 3, 5,
        3, 4, 5, 2, 8, 6, 1, 7, 9
    ];
    shuffleSudoku(baseSolution); // Shuffle the solution

    const puzzle = [...baseSolution];
    for (let i = 0; i < 81 - preFilledCells; i++) {
        const randomIndex = Math.floor(Math.random() * 81);
        puzzle[randomIndex] = 0; // Remove some cells
    }

    const inputs = document.querySelectorAll(".cell input");
    inputs.forEach((input, index) => {
        input.value = puzzle[index] !== 0 ? puzzle[index] : "";
    });
    return baseSolution;
}

// Shuffle rows and columns in a valid Sudoku solution to randomize it
function shuffleSudoku(array) {
    for (let i = 0; i < 9; i++) {
        const row1 = Math.floor(i / 3) * 3 + (i % 3);
        const row2 = Math.floor(i / 3) * 3 + Math.floor(Math.random() * 3);
        swapRows(array, row1, row2);
    }
}

function swapRows(array, row1, row2) {
    const start1 = row1 * 9;
    const start2 = row2 * 9;
    for (let i = 0; i < 9; i++) {
        [array[start1 + i], array[start2 + i]] = [array[start2 + i], array[start1 + i]];
    }
}

// Event Listeners for difficulty buttons
document.getElementById("easy").addEventListener("click", () => setDifficulty("easy"));
document.getElementById("medium").addEventListener("click", () => setDifficulty("medium"));
document.getElementById("hard").addEventListener("click", () => setDifficulty("hard"));
document.getElementById("show-answers").addEventListener("click", showAnswers);
document.getElementById("hint").addEventListener("click", giveHint);
document.getElementById("regenerate").addEventListener("click", regeneratePuzzle);

// Initialize with an easy grid
setDifficulty("easy");
