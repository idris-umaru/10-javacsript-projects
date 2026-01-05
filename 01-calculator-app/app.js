//For the calculator App 
const textInput = document.getElementById("calculator-input");
const button = document.querySelectorAll("button");
let firstValue = "";
let secondValue = "";
let operatorValue = "";
let waitingForSecondValue = false;

//function to handle button clicks 
button.forEach(function (button){
    button.addEventListener("click", (event)=>{
        const value = event.target.value;
        //Handle AC button (All clear)
        if (value ==="all-clear" ){
            firstValue = "";
            secondValue = "";
            operatorValue = "";
            waitingForSecondValue = false;
            textInput.value = "0";
            return;

        }
        //Handle Numbers and Decimal Point
        if(!isNaN(value) || value === "."){
            if(waitingForSecondValue){
                secondValue += value;
                textInput.value = secondValue;
            }else{
                firstValue += value;
                textInput.value = firstValue;
            }
            return;
        }

        //handle operators
        if (value === "+" || value === "-" || value === "*" || value === "/"){
            operatorValue = value;
            waitingForSecondValue = true;
            return;
        }
        //handle equals button
        if (value === "=") {
            if (firstValue && secondValue && operatorValue) {
                const num1 = parseFloat(firstValue);
                const num2 = parseFloat(secondValue);
                let result = 0;
                
                switch(operatorValue) {
                    case "+":
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "*":
                        result = num1 * num2;
                        break;
                    case "/":
                        if (num2 !== 0) {
                            result = num1 / num2;
                        } else {
                            alert("Cannot divide by zero!");
                            return;
                        }
                        break;
                }
                
                            textInput.value = result;
                            firstValue = result.toString();
                            secondValue = "";
                            operatorValue = "";
                            waitingForSecondValue = false;
                        }
                        return;
                    }
                });
});



