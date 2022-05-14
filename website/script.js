

// OLD CODE WITHOUT OBJECT ORIENTATION


/*
 *
 * RGX / Text Analyzer is an online text editing and filtering tool,
 * created by Mathias Grindsäter and Örn Segerstedt.
 * 
 * This file handles the functionality of the application.
 *
 */


/* * * * * * * * * * * * * * * * * * *
 *                                   *
 *                                   *
 *       – TABLE OF CONTENTS –       *
 *                                   *
 *      I....Elements and data       *
 *      II...Event listeners         *
 *      III..Functions               *
 *       :. i....Text handling       *
 *       :. ii...Counting            *
 *       :. iii..Helpers             *
 *                                   *
 *                                   *
 *    © 2022 mathiasgrin & eeegl     *
 *                                   *
 *                                   *
 * * * * * * * * * * * * * * * * * * */

/*
 *
 * I. ELEMENTS AND DATA
 * 
 */


/* Read current data */

let readData = () => {
    text = getText();
    search = getSearch();
    numOfMatches = getMatchCount();
    words = getWords();
}

                    
/* TEXT */
const SEARCH = document.getElementById("filter-box"); // Same as FILTER_TEXT
const TEXT = document.getElementById("input-v2-textbox");
const HIGHLIGHT = document.getElementById("input-v2-highlight");
const COPY = document.getElementById("copy-button"); // Same as COPY_BUTTON

/* COUNTERS */
const WORDS = document.getElementById("word-count");
const CHARS = document.getElementById("char-count");
const SPACES = document.getElementById("char-count-with-space");
const SENTENCES = document.getElementById("sentence-count");
const MATCHES = document.getElementById("word-match");
const MOST_COMMON_WORD = document.getElementById("most-common-word");

/* BUTTONS */
const REMOVE_RADIO = document.getElementById("remove");
const FILTER_BUTTON = document.getElementById("filter-button");
const CLEAR_BUTTON = document.getElementById("clear-button");

/* DATA */
let index = 1; // Start att first match
let numOfMatches = 0;
let search = '';
let text = '';
let words = [];

/*
 *
 * II. EVENT LISTENERS
 * 
 */

/* Update text when user types into textbox */
TEXT.addEventListener('input', () => {
    readData();
    setHighlightText(text);
    highlightMatches();
    markCurrentMatch();
    updateCounts();
    getMostFrequentWords();
})

/* Update text when user types into search bar */
SEARCH.addEventListener('input', () => {
    readData();
    setHighlightText(text);
    highlightMatches();
    markCurrentMatch();
    updateCounts();
})

/* Sync highlight scrolling to text scrolling */
// When the textbox is focused…
TEXT.addEventListener('focus', () => {
    // …listen to scroll inside the textbox…
    TEXT.addEventListener('scroll', () => {
        // …and set highlight scroll position equal to text scroll position.
        HIGHLIGHT.scrollTop = TEXT.scrollTop;
    })
})

/* Handle key presses */
window.addEventListener("keydown", event => {
    readData();
    changeCurrentMatch(event.key); // Cycle through matches with arrow keys
    updateCounts(); // Needs to be after change to current match to know position
})

/* Copy text to user clipboard */
COPY.addEventListener("click", () => {
    copyToClipboard();
})

//Clear button clears all counters and resets their value
CLEAR_BUTTON.onclick = function () {
    TEXT.value = "";

    WORD_COUNTER.value = 0;
    WORD_COUNTER.innerHTML = "Words: 0";

    CHAR_COUNTER.value = 0;
    CHAR_COUNTER.innerHTML = "Characters: 0";

    CHAR_SPACE_COUNTER.value = 0;
    CHAR_SPACE_COUNTER.innerHTML = "Characters (excluding spaces): 0";

    WORD_MATCH.value = 0;
    WORD_MATCH.innerHTML = "Matches: 0";

    SENTENCE_COUNT.value = 0;
    SENTENCE_COUNT.innerHTML = "Sentences: 0";
    
    MOST_COMMON_WORD.value = 0;
    MOST_COMMON_WORD.innerHTML = "Most common word: 0";
    removeHighlighting();
}

/*
 *
 * III. FUNCTIONS
 * 
 */

/*
* i. TEXT HANDLING
*/


/* Highlight all matches */
let highlightMatches = () => {
    if (isEmpty(search)) { removeHighlighting(text); }
    // Add new highlighting
    let highlighted = text.replaceAll(search, `<mark>${search}</mark>`);
    // Update text
    setHighlightText(highlighted);
}

/* Mark currently selected match */
let markCurrentMatch = () => {
    // Get selection at index
    let selected = HIGHLIGHT.querySelector('mark:nth-of-type(' + index + ')');
    // Only mark selected if it exists
    if (selected) { selected.classList.add('selected'); }
}

/* Clear current highlighting */
let removeHighlighting = () => {
    // Clear selected
    let noSelection = text.replace(/\s*class="selected"/g, '');
    // Clear highlighting
    let noHighlight = noSelection.replace(/<\/?mark>/g, '');
    // Update text
    setHighlightText(noHighlight);
}

/* Change highlighting selection */
let changeCurrentMatch = key => {
    // Check which key was pressed
    switch (key) {
        // Go backward in search selection
        case 'ArrowLeft':
            // Stop when first match is reached
            if (index > 1) { index--; }
            highlightMatches();
            markCurrentMatch();
            break;
        // Go forward in search selection
        case 'ArrowRight':
            // Stop when last match is reached
            if (index < numOfMatches) { index++; }
            highlightMatches();
            markCurrentMatch();
            break;
        default:
            break;
    }
}

/* Update text counts */
let updateCounts = () => {
    WORDS.innerHTML = "Words: " + getWordCount();
    CHARS.innerHTML = "Characters: " + getCharCount();
    SPACES.innerHTML = "Characters (excluding spaces): " + (getCharCount() - getSpaceCount());
    SENTENCES.innerHTML = "Sentences: " + getSentenceCount();
    // Index of current match against number of total matches
    if (isEmpty(search) || numOfMatches === 0) {
        MATCHES.innerHTML = 'Matches: 0/0';
    } else {
        MATCHES.innerHTML = 'Matches: ' + index + '/' + numOfMatches;
    }
    MOST_COMMON_WORD.innerHTML = "Most common word: " + getMostFrequentWords();
    
    //getMostCommonWords()[1] + getMostCommonWords()[2]
    //+ getMostCommonWords()[3] + getMostCommonWords()[4];
}

/* Copy input text to clipboard */
let copyToClipboard = () => {
    navigator.clipboard.writeText(text);
}

/*
* ii. COUNTING
*/

// Count the number of words in the input text.
let getWordCount = () => {
    let word = /\w+/g;
    let onlyNonWords = /^[^\w]*$/;
    if (text.match(onlyNonWords)) { return 0; }
    // Return number of words
    return text.match(word).length;
}

// Count the number of characters (including whitespace) in the input text.
let getCharCount = () => {
    // All characters except linebreaks
    let character = /[^\n]/g;
    let onlyNonChars = /^\n*$/;
    if (text.match(onlyNonChars)) { return 0; }
    // Return number of characters
    return text.match(character).length;
}

// Count the number of single spaces in the input text.
let getSpaceCount = () => {
    let space = /\ /g
    let onlyNonSpace = /^[^\ ]*$/;
    if (text.match(onlyNonSpace)) { return 0; }
    // Return number of spaces
    return text.match(space).length;
}

// Returns amount of scentences
let getSentenceCount = () => {
    let sentence = /[a-zA-Z0-9]\.\s/g;
    return (text.match(sentence) || []).length;
}

/* Get number of matches */
let getMatchCount = () => {
    // Return 0 for empty search
    if (getSearch() === '') { return 0; }
    // 
    let search = RegExp(getSearch(), 'g');
    // Return number of matches for search
    return (getText().match(search) || []).length;
}

/* 
* iii. HELPERS 
*/

let getSearch = () => {
    return SEARCH.value;
}

let getText = () => {
    return TEXT.value;
}

let setHighlightText = text => {
    HIGHLIGHT.innerHTML = text;
}

let isEmpty = text => {
    return text === '';
}

/* * * * * * *
 *           *
 * OLD CODE  *
 *           *
 * * * * * * */

// Constants
const FILTER_TEXT = document.getElementById("filter-box");
const INPUT_BOX = document.getElementById("input-box");
const OUTPUT_BOX = document.getElementById("output-box");
const COPY_BUTTON = document.getElementById("copy-button");
const WORD_COUNTER = document.getElementById("word-count");
const CHAR_COUNTER = document.getElementById("char-count");
const CHAR_SPACE_COUNTER = document.getElementById("char-count-with-space");
const SENTENCE_COUNT = document.getElementById("sentence-count");
const WORD_MATCH = document.getElementById("word-match");

// Functions
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

// Splits text and returns array with each word
let getWords = () => {
    return text.split(/\s+/);
}

// When you click the Search button, have an if case for every radio button and based on that
// call a filtering function
FILTER_BUTTON.onclick = function () {
    var contenteditable = document.querySelector('[contenteditable]'),
        text = contenteditable.textContent;
    let returnString;
    if (REMOVE_RADIO.checked) {
        returnString = remove(text, SEARCH.value);
    }
    OUTPUT_BOX.innerHTML = returnString;
}

// Remove filtering function
let remove = (userText, searchText) => {
    return returnString = userText.replaceAll(searchText, "");
}

/*
let updateMostCommonWord = () => {
    if (isEmpty(text)){
        return ['no text', ''];
    }
    let hashMapAllWordsAndFrequency = new Map();
    for(let i = 0; i < words.length; i++){
        // If words already exists in hashMap, add +1 to its value.
        if(hashMapAllWordsAndFrequency.has(words[i])){
            hashMapAllWordsAndFrequency.set(words[i], hashMapAllWordsAndFrequency.get(words[i]) + 1);
        } else { //else add it and give it value 1
            hashMapAllWordsAndFrequency.set(words[i], 1);
        }
    }
    let maxCount = 0;
    let maxWord;
    hashMapAllWordsAndFrequency.forEach((value, key) => {
        if (maxCount < value){
            maxWord = key;
            maxCount = value;
        }
    });
    returnArray = [maxWord, maxCount];
    return returnArray;    
}
*/

/* Get k most frequent words */
let getMostFrequentWords = () => {
    if (isEmpty(text)){
        return ['no text', ''];
    }
    
    words = getWords();
    k=5;
    let map = new Map();
    words.forEach(word => {
        if(map.has(word)) {
            map.set(word, map.get(word) + 1);
        }
        else {
            map.set(word, 1);
        }
    });

    return [...map].sort((x, y) => {
        const f1 = x[1], f2 = y[1]
        if (f1 < f2) return 1;
        if (f1 > f2) return -1;
        return x[0].localeCompare(y[0]);
    }).map(x => x[0]).slice(0, k);
};

/*
let getMostCommonWords = () => {
    let mostCommonWords = mostFrequentWords();
    returnArray = {};
    for (let i = 0; i < mostCommonWords.length; i++) { 
        if (mostCommonWords[i] === undefined){
            returnArray[i] = '';
        } else {
            returnArray[i] = mostCommonWords[i];
        }
    }
    return returnArray;
}
*/





