const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');
const buttons = document.querySelectorAll('.keyboard button');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
const restartButton = document.getElementById('restartButton');
const container = document.querySelector('.container');

const textSamples = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A picture is worth a thousand words."
];

let timer;
let timeLeft = 20;
let gameRunning = false;
let isTypingCorrect = true;

// Get a random text from the array
function getRandomText() {
    return textSamples[Math.floor(Math.random() * textSamples.length)];
}

// Start the typing game
function startGame() {
    const newText = getRandomText();
    textDisplay.textContent = newText;
    textInput.value = '';
    textInput.focus();
    timeLeft = 20;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    textInput.disabled = false; // Enable the input field
    gameRunning = true;
    startButton.disabled = true; // Disable the start button during the game
    endButton.disabled = false; // Enable the end button during the game
    restartButton.disabled = false; // Enable restart button
    container.style.height = '100vh'; // Full screen
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    isTypingCorrect = true;
    showError('');
}

// Update the timer countdown
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time is up! Try again.');
        textInput.disabled = true; // Disable input when time is up
        gameRunning = false;
        startButton.disabled = false; // Enable start button again
        endButton.disabled = true; // Disable end button when the game ends
    }
}

// End the game manually
function endGame() {
    clearInterval(timer);
    textInput.disabled = true;
    gameRunning = false;
    startButton.disabled = false; // Enable start button again
    endButton.disabled = true; // Disable end button when the game ends
    showError('Game ended.');
}

// Restart the game manually
function restartGame() {
    clearInterval(timer);
    startGame();
}

// Show error message when the typing is wrong
function showError(message) {
    const errorDiv = document.querySelector('.error');
    if (!errorDiv) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = message;
        container.appendChild(errorElement);
    } else {
        errorDiv.textContent = message;
    }
}

// Show success message when the typing is correct
function showSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = 'Congratulations! You typed the text correctly!';
    container.appendChild(successDiv);
}


// Add event listeners for keyboard buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        textInput.value += button.textContent;
        textInput.dispatchEvent(new Event('input'));
    });
});

// Handle input and check for correctness
textInput.addEventListener('input', () => {
    const inputText = textInput.value;
    const targetText = textDisplay.textContent;

    if (inputText !== targetText.substring(0, inputText.length)) {
        isTypingCorrect = false;
        showError('There is a mistake in your typing. Please try again!');
    } else if (inputText === targetText) {
        showSuccess();
        startGame(); // Restart the game when the text is typed correctly
    } else {
        if (isTypingCorrect) {
            showError('');
        }
    }
});

// Add visual feedback for real keyboard presses
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    buttons.forEach(button => {
        if (button.textContent === key) {
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 200);
        }
    });
});

// Event listener for the "Start" button
startButton.addEventListener('click', () => {
    startGame();
});

// Event listener for the "End" button
endButton.addEventListener('click', () => {
    endGame();
});

// Event listener for the "Restart" button
restartButton.addEventListener('click', () => {
    restartGame();
});
