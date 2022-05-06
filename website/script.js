// Constant declarations.
const INPUT_BOX = document.getElementById("input-box");
const WORD_COUNTER = document.getElementById("word-count");
const CHAR_COUNTER = document.getElementById("char-count");
const CHAR_SPACE_COUNTER = document.getElementById("char-count-with-space");

// Count the number of words in the input text.
function countWords(text) {
    let words = text.split(/\s+/); // Split at one or more whitespace characters.
    let miscounts = 0; // Words are miscounted when input is a single space or all input is deleted.

    // Count occurences of miscounted words.
    for (let i = 0; i < words.length; i++) {

        // Every empty string is a miscounted word.
        if (words[i] === '') {
            miscounts++;
        }
    }

    return words.length - miscounts; // Exclude miscounts.
}

// Count the number of characters (including whitespace) in the input text.
function countChars(text) {
    let chars = text.split(''); // Split at every character (including whitespace).
    let linebreakCount = 0;

    // Count amount of line breaks in text.
    for (let i = 0; i < text.length; i++) {

        if (text.charAt(i) === '\n') {
            linebreakCount++;
        }
    }

    return chars.length - linebreakCount; // Exclude linebreaks.
}

// Count the number of characters in the input text.
function countSpaces(text) {
    let spaceCount = 0;

    // Count amount of spaces in text.
    for (let i = 0; i < text.length; i++) {

        if (text.charAt(i) === ' ') {
            spaceCount++;
        }
    }

    return spaceCount;
}

// Count words and characters and update for every new user input.
INPUT_BOX.addEventListener("input", e => {
    let text = INPUT_BOX.value; // Get text input.
    // Update counts.
    WORD_COUNTER.innerHTML = "Words: " + countWords(text);
    CHAR_COUNTER.innerHTML = "Characters: " + countChars(text);
    CHAR_SPACE_COUNTER.innerHTML = "Characters (excluding spaces): " + (countChars(text) - countSpaces(text));
})
