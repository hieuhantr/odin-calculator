let currentResult;
let displayValue = '';
let previousValue = '';
let operator;
let operatorForMath;
let num1;
let num2;

const bigDisplay = document.querySelector("#bigDisplay");

//link HTML numbers to JS
const numberButtonsNode = document.querySelectorAll('.numbers');
const numberButtons = Array.from(numberButtonsNode);

//link HTML operators to JS
const operatorButtonsNode = document.querySelectorAll('.operators');
const operatorButtons = Array.from(operatorButtonsNode);

//add event: display number when clicked
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
        //reset bigDisplay
        if (bigDisplay.innerText == '0') {
            displayValue = '';
        }
        if (!operator) { //for first number calculation
            displayValue += numberButton.innerText;
        }
        else { //from 0.5 calculation
            displayValue = numberButton.innerText;
            // operatorButtons.forEach((operatorButton) => {
            //     operatorButton.style.backgroundColor = '#282A31';
            // })
            if (currentResult && num1) {
                previousValue = currentResult + ' ' + operator;
            }
        }
        bigDisplay.innerText = displayValue;
    })
})

//add event: bigDisplay operator when clicked, store operator in operatorForMath
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        if (!currentResult && !num1 && !num2) { //first calculation
            num1 = Number(bigDisplay.innerHTML);
            console.log(num1, operator, num2, currentResult)
        }
        else {
            if (!currentResult && num1 && !num2)//if did not click equal
            {
                console.log(num1, operator, num2, currentResult)
                getNum2;
                calcResult;
                console.log(num1, operator, num2, currentResult)
             }
            num1 = currentResult; //from 2nd calculation
        }
        //set operator
        operator = operatorButton.innerText;
        // operatorButton.style.backgroundColor = 'lightBlue';
    })
})


//get num2
const getNum2 = () => {
    num2 = Number(displayValue)
}

//calculate result
const calcResult = () => {
    switch (operator) {
        case '+':
            currentResult = num1 + num2;
            break;
        case '−':
            currentResult = num1 - num2;
            break;
        case '×':
            currentResult = num1 * num2;
            break;
        case '÷':
            currentResult = num1 / num2;
            break;
    }
    bigDisplay.innerText = currentResult;
    num1 = '';
    num2 = '';
    operator = '';
    displayValue = '0';
}

const equal = document.querySelector('#equal')
equal.addEventListener('click', () => {
    getNum2;
    calcResult;
})

const clear = document.querySelector('#AC')
clear.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operatorForMath = null;
    operator = null;
    currentResult = '';
    displayValue = '0';
    bigDisplay.innerText = displayValue;
    operatorButtons.forEach(operatorButton => {
        operatorButton.style.backgroundColor = '#282A31';
    })
})

//operate %
//divide 0
//decimal cut