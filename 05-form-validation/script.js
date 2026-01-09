//Getting the DOM Elements
const form = document.querySelector('.registrationForm');
const userName = document.getElementById("userName");
const UserEmail = document.getElementById("userEmail");
const password = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("userPhone");
const userAge = document.getElementById("userAge");

//Get the span error input
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const userPhoneError = document.getElementById("phoneError");
const ageError = document.getElementById("ageError");
const sucessMessage = document.getElementById("sucessMessage");

//validation of name 
function validateUser (){
    const name = userName.value.trim();
    if (name === ''){
        ShowError(userName, nameError,"Name is required")
        return false;
    }

    if(name.length < 3){
        ShowError(name, nameError, "Name must be at least 2 characters ")
    }
    const nameRegz = /^[a-zA-z\s]+/;

    if(!nameRegz.test(name)){
        ShowError(userName, nameError, "Name can only conatin letters and spaces")
        return false;
    }
  //After Validation
  ShowSucess(userName, nameError);
  return true;

}

//Function To validate Email
 function validateEmail (userEmail){
    const email = userEmail.value.trim();
    if(email === ''){
        ShowError(userEmail, email, "Email is required ")
        return false;
    }

    const emailRez =  /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if(!emailRez.test(email)){
        ShowError(email, emailError, "please enter a valid email")
        return false;

    }

    ShowSucess(email,emailError);
    return true;
 }

 //function to validate Password
 


