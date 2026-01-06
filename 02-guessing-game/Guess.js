//DOM To get elements 
const guessInput = document.getElementById('guessInput');
const sumbitGuessBtn = document.getElementById("submitGuess");
const attemptsDisplay = document.getElementById('attempts');
const resultDisplay = document.getElementById('feedback');
const resetGameBtn = document.getElementById('restartGame');

// Genartaing a random Number betweem 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
console.log(`Random Number : ${randomNumber}`);//for debbugging purpose

//function to handle the guess submission 
sumbitGuessBtn.addEventListener('click', function() {
    const userGuess = Number(guessInput.value); //getting the user input and converting to a Number 
    
//validate input -make sure user entered a number
if(!userGuess || userGuess < 1 || userGuess > 100){
    resultDisplay.textContent = "please enter a valid number between 1 and 100.";
    resultDisplay.className = 'hint'; //use css classed instead of inline styles 
    return;// exit the function early 
}
    attempts++; //increment attempts 
    attemptsDisplay.textContent = `Attempts: ${attempts}`;

//check if guess is correct
if (userGuess === randomNumber){
    resultDisplay.textContent = " Congratualations! You guessed the correct number!"
    resultDisplay.className = "correct";
    
    //Disable input and sumbit button 
    guessInput.disabled = true;
    sumbitGuessBtn.disabled = true;

    //show reset button
    resetGameBtn.classList.remove('hidden');
} else if (userGuess < randomNumber){
    resultDisplay.textContent = "Too Low! Try a higher number.";
    resultDisplay.className = 'wrong';
}else{
    resultDisplay.textContent = "Too High! Try a lower number.";
    resultDisplay.className = 'wrong';
}
  
//clear input field after each guess
guessInput.value = "";
guessInput.focus(); //keeps focus for easy typing of number in the input field
});

//Function to handle restart game
resetGameBtn.addEventListener('click', ()=> {
    //Reset all game starts
   randomNumber = Math.floor(Math.random() * 100) +1;
   attempts = 0;
   console.log(`Random Number: ${randomNumber}`); //for debugging purpose

   //reset display elements 
   resultDisplay.textContent = '';
   resultDisplay.className = "";
  attemptsDisplay.textContent = 'Attempts: 0';
  guessInput.value = '';
  
  //renable the input and sumbit button
  guessInput.disabled = false;
    sumbitGuessBtn.disabled = false;

    //hide reset button
    resetGameBtn.classList.add('hidden');
    console.log(`New Random Number: ${randomNumber}`); //for debugging purpose

    //focus input for new game
    guessInput.focus();
});

//Allow Enter key to submit guess 
guessInput.addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        sumbitGuessBtn.click();
    }
});

