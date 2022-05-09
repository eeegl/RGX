// Constant declarations.
const REMOVE_RADIO = document.getElementById("remove");
const FILTER_TEXT = document.getElementById("filter-box");
const INPUT_BOX = document.getElementById("input-box");
const OUTPUT_BOX = document.getElementById("output-box");
const WORD_COUNTER = document.getElementById("word-count");
const CHAR_COUNTER = document.getElementById("char-count");
const FILTER_BUTTON = document.getElementById("filter-button");
const CHAR_SPACE_COUNTER = document.getElementById("char-count-with-space");
const COPY_BUTTON = document.getElementById("copy-button");;

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

// Count the number of single spaces in the input text.
function countSpaces(text) {
    let spaceCount = 0;

    // Find and count every space.
    for (let i = 0; i < text.length; i++) {

        if (text.charAt(i) === ' ') {
            spaceCount++;
        }
    }

    return spaceCount;
}

// Copy input text to clipboard.
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

// Count words and characters and update for every new user input.
// Also, print filtered text to output box.
INPUT_BOX.addEventListener("input", () => {
    // Get text input from our contenteditable dev
    var contenteditable = document.querySelector('[contenteditable]'),
    text = contenteditable.textContent;
    // Update counts.
    WORD_COUNTER.innerHTML = "Words: " + countWords(text);
    CHAR_COUNTER.innerHTML = "Characters: " + countChars(text);
    CHAR_SPACE_COUNTER.innerHTML = "Characters (excluding spaces): " + (countChars(text) - countSpaces(text));
    // Uptdate text output.
    //OUTPUT_BOX.innerHTML = text; // TODO: change to actual filtered text. Now it only displays input text.
})

// Copy output text to clipboard when the copy button is clicked.
COPY_BUTTON.addEventListener("click", () => {
    copyToClipboard(OUTPUT_BOX.value);
})

// When you click the Search button, have an if case for every radio button and based on that
// call a filtering function
FILTER_BUTTON.onclick = function(){
    var contenteditable = document.querySelector('[contenteditable]'),
    text = contenteditable.textContent;
    let returnString;
    if(REMOVE_RADIO.checked) {
        returnString = remove(text, FILTER_TEXT.value);
    }
    OUTPUT_BOX.innerHTML = returnString;
}

// Remove filtering function
let remove = (userText, searchText) => {
    return returnString = userText.replaceAll(searchText, "");
}

// Highlight search query in input box for every user input
FILTER_TEXT.addEventListener("input", () => {
    let text = INPUT_BOX.innerHTML;
    let query = FILTER_TEXT.value;
    INPUT_BOX.innerHTML = highlight(text, query);
})

// Add highlighting to search query in text
let highlight = (text, query) => {
    // HTML highlighting tags
    let tagOpen = '<span class="highlight">';
    let tagClose = '</span>';
    // Remove current highlighting
    text = text.replaceAll(tagOpen, '');
    text = text.replaceAll(tagClose, '');
    // Add new highlighting
    let highlighted = tagOpen + query + tagClose;
    return text.replaceAll(query, highlighted);

}

let getWordIndices = (searchString) => {
    let userText = INPUT_VALUE.innerHTML;
    let words = getWords(searchString);
    let wordIndices = [];
    for(let i=0; i<words.length; i++){
        if (words[i] === searchString){
            wordIndices.push(i);
        }
    }
    return wordIndices;
}

let getWords = (text) => {
    let words = text.split(/\s+/);
    return words;
}
