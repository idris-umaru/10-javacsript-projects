//Creating a guessing game 
const input = document.getElementById("inputId");
const btn = document.getElementById("btn");
const message = document.getElementById("message");

// Generate a random Number
let randomNumber = Math.random() *10;
randomNumber = Math.floor(randomNumber) + 1; // to get a number between 1-10

//Getting the value from the input field 
btn.addEventListener('click', ()=> {
    let userInput = Number(input.value.trim());
    //validating the input first 
    if (!userInput || userInput < 1 || userInput > 10){
        message.textContent = "please enter a number";
        message.style.color = "orange ";
        return;
    }

    //Comparimg the Number Aftter Vlaidation
    if(isNaN(userInput===randomNumber)){
        message.textContent = "You guessed it right!";
        message.style.color = "green";
    }else{
        message.textContent = `Wrong guess, try again! The number was ${randomNumber}`;
        message.style.color = "red";


    }
//For Debugging purpose
console.log("user Input:", userInput);
console.log("random randomNumber:", randomNumber);



})

//process to follow 
//1. generate a random number between 1-10
//2 collect the input from user 
//3.validate the input 
//4. compare the input with the random number 