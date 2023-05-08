let currentResult;
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
        if ((bigDisplay.innerText == '0' && numberButton.innerText !== '.') || bigDisplay.innerText == num1) {
            bigDisplay.innerText = '';
        }
        if (bigDisplay.innerText.lastIndexOf('.') < 0 || numberButton.innerText !== '.') {
            if (bigDisplay.innerText.length < 10 || operator) {
                if (bigDisplay.innerText.length < 10) {
                    bigDisplay.innerText += numberButton.innerText;
                }
            }
        }
    })
});

//add event: bigDisplay operator when clicked, store operator in operatorForMath
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        if (operatorButton.innerText == '%') {
            operator = operatorButton.innerText;
            calcResult();
        }
        else { // for the rest: + - * /
            if (!num1) { //first calculation
                num1 = Number(bigDisplay.innerHTML);
            }
            else {
                //no equal, straight to operator
                if (operator && !currentResult) {
                    getNum2();
                    calcResult();
                }
            }
            //save operator
            operatorButton.style.backgroundColor = 'lightBlue';
            operatorButton.addEventListener('mouseleave', () => {
                operatorButton.style.backgroundColor = 'lightBlue';
            });
            operator = operatorButton.innerText;
        }
    })
})

//get num2
const getNum2 = () => {
    if (operator) {
        num2 = Number(bigDisplay.innerText);
    }
}

//calculate result
const calcResult = () => {
    operatorButtons.forEach(operatorButton => {
        //style buttons
        operatorButton.style.backgroundColor = '#282A31';
        if (operatorButton.innerText !== '%') {
            operatorButton.addEventListener('mouseleave', () => {
                operatorButton.style.backgroundColor = '#282A31';
            });
            operatorButton.addEventListener('mousemove', () => {
                operatorButton.style.backgroundColor = 'rgba(255,255,255,0.2)';
            });
            operatorButton.addEventListener('click', () => {
                operatorButton.style.backgroundColor = '#lightBlue';
                operatorButton.addEventListener('mouseleave', () => {
                    operatorButton.style.backgroundColor = 'lightBlue';
                });
            });
        }
    });
    //error case from previously
    if (num1 == 'Error') {
        currentResult = 'Error';
    } else if (!operator) {
        currentResult = bigDisplay.innerText;
    }
    //calculate
    else {
        switch (operator) {
            case '+':
                currentResult = Number(num1 + num2);
                break;
            case '−':
                currentResult = Number(num1 - num2);
                break;
            case '×':
                currentResult = Number(num1 * num2)
                break;
            case '÷':
                if (num2 == '0') {
                    currentResult = 'Error';
                    break;
                }
                currentResult = num1 / num2;
                break;
            case '%':
                currentResult = Number(bigDisplay.innerText) / 100;
                break;
        }
    }
    //in case of long result
    if (String(currentResult).length > 11) {
        if (String(currentResult).indexOf('.') >= 0) {
            currentResult = String(currentResult).slice(0, 10);
        } else {
            currentResult = String(currentResult).slice(0, 10) + '...';
        }
    }
    bigDisplay.innerText = currentResult;
    num1 = currentResult;
    currentResult = '';
    num2 = '';
    operator = '';
}

//get result
const equal = document.querySelector('#equal');
equal.addEventListener('click', () => {
    getNum2();
    calcResult();
})

//clear all
const clear = document.querySelector('#AC')
clear.addEventListener('click', () => {
    num1 = '';
    num2 = 0;
    operatorForMath = null;
    operator = null;
    currentResult = '';
    bigDisplay.innerText = '0';
    operatorButtons.forEach(operatorButton => {
        operatorButton.style.backgroundColor = '#282A31';
    })
})

//erase one number
const erase = document.querySelector('#erase');
erase.addEventListener('click', () => {
    bigDisplay.innerText = bigDisplay.innerText.slice(0, bigDisplay.innerText.length - 1);
});