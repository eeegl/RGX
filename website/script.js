// Constant declarations.
const INPUT_BOX = document.getElementById("input-box");
const WORD_COUNTER = document.getElementById("word-count");
const CHAR_COUNTER = document.getElementById("char-count");

// Count the number of words in the input text.
function countWords(text) {
    let words = text.split(' '); // Split at one or more whitespace characters.
    return words.length;
}

// Count the number of characters in the input text.
function countChars(text) {
    let chars = text.split(''); // Split at every character (including whitespace).
    return chars.length;
}

// Count words and characters and update for every new user input.
INPUT_BOX.addEventListener("input", e => {
    let text = INPUT_BOX.value; // Get text input.
    // Update counts.
    WORD_COUNTER.innerHTML = "Words: " + countWords(text);
    CHAR_COUNTER.innerHTML = "Characters: " + countChars(text);
})
