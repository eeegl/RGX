/* 
 * Constant declarations.
 */

// Text boxes
const FILTER_TEXT = document.getElementById("filter-box");
const INPUT_BOX = document.getElementById("input-box");
const OUTPUT_BOX = document.getElementById("output-box");

// Buttons
const REMOVE_RADIO = document.getElementById("remove");
const FILTER_BUTTON = document.getElementById("filter-button");
const COPY_BUTTON = document.getElementById("copy-button");

// Counters
const WORD_COUNTER = document.getElementById("word-count");
const CHAR_COUNTER = document.getElementById("char-count");
const CHAR_SPACE_COUNTER = document.getElementById("char-count-with-space");
const SENTENCE_COUNT = document.getElementById("sentence-count");
const WORD_MATCH = document.getElementById("word-match");

let searchIndex = 1;
let searchHits = 0;

/*
 * Event listeners.
 */

// Keyboard input
window.addEventListener("keydown", event => {

    switch (event.key) {
        case "Enter" :
            document.execCommand("insertLineBreak");
            event.preventDefault();
            break;
        // Go backward in search selection
        case 'ArrowLeft':
            console.log(event.key);
            if (searchIndex > 1) { searchIndex--; }
            highlightAll();
            highlightSelection(searchIndex);
            break;
        // Go forward in search selection
        case 'ArrowRight':
            console.log(event.key);
            if (searchIndex < searchHits) { searchIndex++; }
            highlightAll();
            highlightSelection(searchIndex);
            break;
        default:
            break;
    }
})

// Count words and characters and update for every new user input.
// Also, print filtered text to output box.
INPUT_BOX.addEventListener("input", () => {
    searchHits = getSearchHitCount();
    // Get text input from our contenteditable dev
    var contenteditable = document.querySelector('[contenteditable]'),
        text = contenteditable.textContent;
    // Update counts.
    WORD_COUNTER.innerHTML = "Words: " + getWordCount();
    CHAR_COUNTER.innerHTML = "Characters: " + getCharCount();
    CHAR_SPACE_COUNTER.innerHTML = "Characters (excluding spaces): " + (getCharCount() - getSpaceCount());
    // Count amount of sentences
    amountOfSentencesInText = getAmountOfSentences();
    SENTENCE_COUNT.innerHTML = "sentences: " + amountOfSentencesInText;
})

// Copy output text to clipboard when the copy button is clicked.
COPY_BUTTON.addEventListener("click", () => {
    copyToClipboard(OUTPUT_BOX.value);
})

// When you click the Search button, have an if case for every radio button and based on that
// call a filtering function
FILTER_BUTTON.onclick = function () {
    var contenteditable = document.querySelector('[contenteditable]'),
        text = contenteditable.textContent;
    let returnString;
    if (REMOVE_RADIO.checked) {
        returnString = remove(text, FILTER_TEXT.value);
    }
    OUTPUT_BOX.innerHTML = returnString;
}

// Highlight search query in input box for every user input
FILTER_TEXT.addEventListener("input", () => {
    highlightAll();
    highlightSelection(searchIndex);
    searchHits = getSearchHitCount();
    WORD_MATCH.innerHTML = "matches: " + getSearchHitCount();
})

/*
 * Function declarations.
 */

// Count the number of words in the input text.
let getWordCount = () => {
    let text = getTextPlain();
    let word = /\w+/g;
    let onlyNonWords = /^[^\w]*$/;
    if (text.match(onlyNonWords)) { return 0; }
    // Return number of words
    return text.match(word).length;
}

// Count the number of characters (including whitespace) in the input text.
let getCharCount = () => {
    let text = getTextFromInputBox();
    // All characters except linebreaks
    let character = /[^\n]/g;
    if (isEmpty(text)) { return 0; }
    return text.match(character).length;
}

// Count the number of single spaces in the input text.
let getSpaceCount = () => {
    let text = getTextFromInputBox();
    let space = /\s/g;
    let onlyNonSpace = /^[^\s]*$/;
    if (text.match(onlyNonSpace)) { return 0; }
    // Return number of spaces
    return text.match(space).length;
}

// Returns amount of scentences
let getAmountOfSentences = () => {
    InputTextBox = getTextFromInputBox();
    getWords(InputTextBox);
    let count = (InputTextBox.match(/[a-zA-Z0-9]\.\s/g) || []).length;
    return count;
}

// Gets text from input box
let getTextFromInputBox = () => {
    var contenteditable = document.querySelector('[contenteditable]');
    text = contenteditable.textContent;
    return text;
}

let getWordIndices = (searchString) => {
    let userText = INPUT_VALUE.innerHTML;
    let words = getWords(searchString);
    let wordIndices = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i] === searchString) {
            wordIndices.push(i);
        }
    }
    return wordIndices;
}

let isEmpty = text => {
    return text === '';
}

// Splits text and returns array with each word
let getWords = (text) => {
    let words = text.split(/\s+/);
    return words;
}

// Remove filtering function
let remove = (userText, searchText) => {
    return returnString = userText.replaceAll(searchText, "");
}

// Copy input text to clipboard.
let copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
}

// Get search query
let getQuery = () => {
    return FILTER_TEXT.value;
}

// Get text in plain format
let getTextPlain = () => {
    return INPUT_BOX.innerText;
}

// Get text in HTML format
let getTextHTML = () => {
    return INPUT_BOX.innerHTML;
}

// Set text HTML
let setTextHTML = input => {
    INPUT_BOX.innerHTML = input;
}

// Get number of search hits
let getSearchHitCount = () => {
    // Return 0 for empty query
    if (getQuery() === '') { return 0; }
    // Return number of matches for query
    let query = RegExp(getQuery(), 'g');
    return (getTextPlain().match(query) || []).length;
}

// Update highlighting for all search hits
let highlightAll = () => {
    let query = getQuery();
    let highlight = '<span class="highlight-all">' + query + '</span>';
    let highlightedText = getTextPlain().replaceAll(query, highlight);
    setTextHTML(highlightedText);
}

// Update highlighting for selected search hit
let highlightSelection = index => {
    // CSS class for highlighting current selection
    let highlight = 'highlight-selection';
    // Defines selector for span at index
    let selector = '#input-box span:nth-of-type(' + index + ')';
    let selected = document.querySelector(selector);
    // Only add highlight if something was selected
    if (selected) { selected.classList.add(highlight); }
}