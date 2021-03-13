// ===== intial set up =====

// set a array to store all quotes
let apiQuotes = [];

// DOM selection
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote-content');
const authorText = document.querySelector('#author')
const fbShareBtn = document.querySelector('#facebook');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');


// ===== load spinner =====

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.classList.add('hide');
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    quoteContainer.classList.remove('hide');
    loader.hidden = true;
}

// ===== Show New Quote ======

function newQuote() {
    showLoadingSpinner();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with unkown
    if (!quote.author) {
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = `- ${quote.author}`;
    }
    // check quote length and determine font-size
    if (quote.text.length > 140) {
        quoteText.classList.add('extreme-long-quote');
    } else if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
        quoteText.classList.remove('extreme-long-quote');

    }
    // Set Quote, Hide Loader
    quoteText.innerText = quote.text;
    removeLoadingSpinner();
}


// ====== get quote from API ======

let errorCount = 0;
async function getQuote() {
    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        return newQuote();
    } catch (error) {
        errorCount++;
        if (errorCount < 10) {
            getQuote();
        } else {
            removeLoadingSpinner();
            fbShareBtn.setAttribute('disabled', null);
            newQuoteBtn.setAttribute('disabled', null);
            quoteContainer.classList.add('error-msg');
            quoteText.innerText = "Sorry, we are unable to show you a quote right now ...";
        }
    }
}


// initiate first quote
getQuote();


// event listener
newQuoteBtn.addEventListener('click', newQuote);
fbShareBtn.addEventListener('click', shareFaceBook);


//  ====== share quote to facebook =====

window.fbAsyncInit = function () {
    FB.init({
        appId: '373400220516632',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
    });
};

const shareFaceBook = function () {
    FB.ui({
        display: 'popup',
        method: 'share',
        href: 'https://wei-yiting.github.io/quote-generator/.',
        quote: `${quoteText.innerText} \n- ${authorText.innerText}`,
    }, function (response) { });
};
