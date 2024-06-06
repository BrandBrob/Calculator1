const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operators = ['+', '-', '*', '/', '√', '^2'];

// Elementos del DOM
const screenText = document.querySelector(".calculator-p");
const calculator = document.querySelector(".characters");
const minresult = document.createElement("p");

// Crear botones de números y agregarles funcionalidad
numbers.forEach(number => {
    const numberButton = document.createElement("button");
    numberButton.classList.add("number");
    numberButton.innerHTML = number;

    numberButton.addEventListener("click", () => {
        const lastChar = screenText.textContent.slice(-1);
        if (lastChar === ')') {
            screenText.textContent += '*' + number;
        } else {
            screenText.textContent += number;
        }
    });

    calculator.appendChild(numberButton);
});

const point = document.createElement("button")
point.innerHTML = '.'
point.addEventListener("click",()=>{
    screenText.textContent += '.'
})
calculator.appendChild(point)


const parenthesisl = document.createElement('button');
parenthesisl.innerHTML = `(`;
parenthesisl.addEventListener("click", () => {
    const lastChar = screenText.textContent.slice(-1);
    if (/\d/.test(lastChar) || lastChar === ')') {
        screenText.textContent += '*(';
    } else {
        screenText.textContent += '(';
    }
});
calculator.appendChild(parenthesisl);

const parenthesisr = document.createElement('button');
parenthesisr.innerHTML = `)`;
parenthesisr.addEventListener("click", () => {
    screenText.textContent += ')';
});
calculator.appendChild(parenthesisr);

operators.forEach(operator => {
    const operatorButton = document.createElement("button");
    operatorButton.classList.add("operators");
    operatorButton.innerHTML = operator;

    operatorButton.addEventListener("click", () => {
        const lastChar = screenText.textContent.slice(-1);
        if (operator === '√') {
            if (/\d/.test(lastChar) || lastChar === ')') {
                screenText.textContent += '*√(';
            } else {
                screenText.textContent += '√(';
            }
        } else if (operator === '^2') {
            if (/\d/.test(lastChar) || lastChar === ')') {
                screenText.textContent += '**2';
            } else {
                alert('Invalid input');
            }
        } else {
            screenText.textContent += operator;
        }
    });

    calculator.appendChild(operatorButton);
});

const equalButton = document.createElement("button");
equalButton.innerHTML = '=';

equalButton.addEventListener("click", () => {
    let expression = screenText.textContent;
    try {
        // Reemplazar √ con Math.sqrt para que eval pueda manejarlo
        expression = expression.replace(/√\(/g, 'Math.sqrt(');
        const result = eval(expression);
        const screen2 = document.querySelector(".calculator-window");
        minresult.innerHTML = result;
        screen2.appendChild(minresult);
    } catch (error) {
        alert("Something went wrong: " + error.message);
    }
});

calculator.appendChild(equalButton);

const cButton = document.createElement("button");
cButton.innerHTML = 'C';
cButton.addEventListener("click", () => {
    screenText.textContent = '';
    minresult.innerHTML = '';
});

const ceButton = document.createElement("button");
ceButton.innerHTML = 'CE';
ceButton.addEventListener("click", () => {
    const array = Array.from(screenText.textContent);
    array.pop();
    screenText.textContent = array.join('');
    if(screenText.textContent === ""){
        minresult.innerHTML=""
    }
});

calculator.appendChild(cButton);
calculator.appendChild(ceButton);
