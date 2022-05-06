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

// Count the number of characters in the input text.
function countChars(text) {
    let charCount = countCharsAndSpace(text);
    let spaceCount = 0;

    // Count number of spaces in text.
    for (let i = 0; i < text.length; i++) {

        // Count spaces and linebreaks.
        if (text.charAt(i) === ' ' || text.charAt(i) === '\n') {
            spaceCount++;
        }
    }

    return charCount - spaceCount; // Exclude spaces and linebreaks.
}

// Count the number of characters (with whitespace) in the input text.
function countCharsAndSpace(text) {
    let chars = text.split(''); // Split at every character (including whitespace).
    return chars.length;
}

// Count words and characters and update for every new user input.
INPUT_BOX.addEventListener("input", e => {
    let text = INPUT_BOX.value; // Get text input.
    // Update counts.
    WORD_COUNTER.innerHTML = "Words: " + countWords(text);
    CHAR_COUNTER.innerHTML = "Characters: " + countChars(text);
    CHAR_SPACE_COUNTER.innerHTML = "Characters (with space): " + countCharsAndSpace(text);
})
