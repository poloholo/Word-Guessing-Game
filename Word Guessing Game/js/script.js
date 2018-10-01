//setup with variables
const wordToGuess = "supercalifragilisticexpialidocious";
// words [Math.floor(Math.random() * words.length)]

const wordState = [];

let guessesLeft = 18;

const prevGuesses = [];

const form = document.getElementById('player-input');

function displayWordState(state){
    let output= '';

for(let i = 0; i < state.length; i++){
    const char=state[i];
    output = output + char;
    output = output + " ";

}

const wordStateContainer = document.getElementById('word');
wordStateContainer.innerHTML = output;
}

function displayGuessesLeft(num){
    document.getElementById('guesses-left').innerHTML = num;
}

function displayPreviousGuesses(guessesArray) {
    
    const list = document.getElementById('past-guesses');
    // clear list before adding guesses
    list.innerHTML = '';

    //for each guess, append a li child
     for(let i = 0; i < guessesArray.length; i++){
        const guess = document.createElement('li');
        guess.innerHTML = guessesArray[i];
        list.appendChild(guess);
    }
}

// takes in word to guess, the current state of the word and te new character to guess
function guess(wordToGuess, wordState, currGuess){
    // for each character in the word to
    for(let i =0; i < wordToGuess.length; i++){
        // if the character matches the current guess,
        //update word state at that position
        if(wordToGuess [i] == currGuess){
            wordState[i] = currGuess;
        }
    }

 displayWordState(wordState);
}


function checkWon(wordState){
  let hasBlanks = false;
  for(let i = 0; i < wordState.length; i++){
    //if any parts of wordState has blank, return true
    if(wordState[i] == '_') {
          hasBlanks = true;
    }
}



return !hasBlanks;
}

function setup() {
for(let i =0; i < wordToGuess.length; i++){
wordState.push('_')
}

displayGuessesLeft(guessesLeft);
displayWordState(wordState);
displayPreviousGuesses(prevGuesses);
}


function setupForm(){

form.onsubmit = function (event){
    event.preventDefault();

    const input = document.getElementById('player-guess');
    console.log(input.value);

    //get current guess
    const currentInput = input.value.toLowerCase();

    //clear input field
    input.value = '';

    //check if input is valid
    debugger;
    if(!validateInput(currentInput, prevGuesses)){
        window.alert ('Please choose a character from A-Z that has not been guess before.')
        return;
    }

    // add guess to previouis guesses
    prevGuesses.push (currentInput);

    // update guesses left
    guessesLeft = guessesLeft - 1;
    displayGuessesLeft(guessesLeft);

    //make guess
    guess(wordToGuess, wordState, currentInput)

    //check if user has won
    const won = checkWon(wordState);
    if(won){
        window.alert('You Won')
    }

    //check if user has lost
    else if(guessesLeft == 0) {
        window.alert ('You Lost!')
    }
    
    //update previous guesses
    displayPreviousGuesses(prevGuesses)
    }

}


// if guess is a valid choice, them return true else return false
function validateInput(guess, prevGuesses) {
//guess is one character and character is not in prevGuesses

if(guess.length == 1 && prevGuesses.indexOf(guess) == -1){
    return true;
}

return false;

}






//initial setup
setup();
setupForm();

