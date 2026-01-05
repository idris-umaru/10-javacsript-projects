// creating a function to perform calculations

const add = document.getElementById("add");
const substract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
let result;
//Add event listerner to buttons 
add.addEventListener("click", ()=> {
    const number1 = Number(document.getElementById('num1').value);
    const number2 = Number(document.getElementById('num2').value);
    result = number1 + number2;
    displayResult();    
})
substract.addEventListener("click", () => {
    const number1 = Number(document.getElementById('num1').value);
    const number2 = Number(document.getElementById('num2').value);
    result = number1 - number2;
    displayResult();
});
multiply.addEventListener("click", () => {
    const number1 = Number(document.getElementById('num1').value);
    const number2 = Number(document.getElementById('num2').value);
    result = number1 * number2;
    displayResult();
});
divide.addEventListener("click", () => {
    const number1 = Number(document.getElementById('num1').value);
    const number2 = Number(document.getElementById('num2').value);
    if (number2 !== 0) {
        result = number1 / number2;
        displayResult();
    } else {
        alert("Error: Division by zero");
    }
});

//function to display result 
const displayResult = ()=>{
    const display = document.getElementById('result');
    display.textContent = `Result: ${result}`;
    display.style.fontWeight = "bold";

}
