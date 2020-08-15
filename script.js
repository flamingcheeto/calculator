sessionStorage.setItem('number', 0);

function operate(x, y, operator) {
    switch(operator) {
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "*":
            return x * y;
        case "/":
            if (y == 0) {
                return;
            }
            return x / y;
    }
    
}

function updateDisplay() {
    let display = document.querySelector('#number-display');
    display.textContent = getNumberStorage();

}

function setNumberStorage(update) {
    if(getNumberStorage().toString().length == 11 && !(update == getNumberStorage().toString().substr(0, getNumberStorage().toString().length - 1 ))) {
        return;
    }

    if(update.toString().charAt(0) == 0 && update.toString().length > 1) {
        update = update.toString().substr(1);
    }

    if( isNaN( update.toString().charAt(update.toString().length - 1) ) && isNaN( update.toString().charAt(update.toString().length - 2) ) ) {
        update = update.toString().substr(0, update.toString().length - 1);
    }

    if(getNumberStorage().length == 0 && (isNaN(update) || update == 0) ) {
        return;
    } 

    if(update.length > 11) {
        return;
    }

    sessionStorage.setItem('number', update);

}

function getNumberStorage() {
    return sessionStorage.getItem('number');
}

function displayFormat() {
    let displayString = getNumberStorage();
    let lastOperator = 0;
    let array = [];
    for (let i = 0; i < displayString.length; i++) {
        if( displayString.charAt(i) == "+" || displayString.charAt(i) == "-" || displayString.charAt(i) == "*" || displayString.charAt(i) == "/" ) {
            if (lastOperator == 0) {
                array.push(displayString.slice(0, i));
            }
            else if (lastOperator){
                array.push(displayString.slice(lastOperator + 1, i));
            }
            array.push(displayString.charAt(i));
            lastOperator = i;
            
        }
        if(i == displayString.length - 1) {
            array.push(displayString.slice(lastOperator + 1));
        }
    }
    console.table(array);
    return array;
}

function calculateFromArray(array) {
    while (array.length >= 3) {
        let tempCalculation = operate(+array[0], +array[2], array[1]);
        array.shift();
        array.shift();
        array.shift();
        array.unshift(tempCalculation)

    }
    let calculation = array[0];
    console.log(calculation.toString().length);
    if(calculation.toString().length > 11) {
        calculation = +calculation.toString().substr(0, 11);
    }

    if(calculation.toString().length >= 7) {
        calculation = +calculation.toFixed(7);
    }

    return calculation;

}

let backButton = document.querySelector('#backspace');
backButton.addEventListener('click', function() {
    setNumberStorage( getNumberStorage().toString().substr(0, getNumberStorage().toString().length - 1 ) );
    updateDisplay();
});

let numericNodelist = document.querySelectorAll('.numeric-button');
for (let i = 0; i < numericNodelist.length; i++) {
    let button = numericNodelist[i];
    button.addEventListener('click', function() {
        setNumberStorage( getNumberStorage().toString() + button.textContent );
        updateDisplay();
    })
}

let operatorNodeList = document.querySelectorAll('.operator-button');
for (let i = 0; i < operatorNodeList.length; i++) {
    let button = operatorNodeList[i];
    button.addEventListener('click', function() {
        setNumberStorage( getNumberStorage().toString() + button.textContent );
        updateDisplay();
    })
}


let equalButton = document.querySelector('#button-equals');
equalButton.addEventListener('click', function() {
    if(isNaN(getNumberStorage().charAt(getNumberStorage.length - 1))) {
        alert ("No operators at the end");
        return;
    }
    setNumberStorage(calculateFromArray(displayFormat()));
    updateDisplay();
});

let decimalButton = document.querySelector('#button-decimal');
decimalButton.addEventListener('click', function() {
    let array = [...getNumberStorage()];
    for (let i = array.length - 1; i > 0; i--) {
        if(array[i] == "." ) {
            return;
        }
        if(array[i] == "+" || array[i] == "-" || array[i] == "*" || array[i] == "/") {
            break;
        }

    }

    setNumberStorage( getNumberStorage().toString() + decimalButton.textContent );
        updateDisplay();
});

let clearButton = document.querySelector('#button-clear');
clearButton.addEventListener('click', function() {
    setNumberStorage(0);
    updateDisplay();
});