function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, y, operator) {
    return operator(x, y);
}

function updateDisplay() {
    let display = document.querySelector('#number-display');
    display.textContent = getNumberStorage();

}

function setNumberStorage(update) {
    if(getNumberStorage() == 0 && update == 0) {
        return;
    }
    if(getNumberStorage().toString().length == 11 && !(update == getNumberStorage().toString().substr(0, getNumberStorage().toString().length - 1 ))) {
        return;
    }

    sessionStorage.setItem('number', update);
}

function getNumberStorage() {
    return sessionStorage.getItem('number');
}

let backButton = document.querySelector('#backspace');
backButton.addEventListener('click', function() {
    setNumberStorage( +getNumberStorage().toString().substr(0, getNumberStorage().toString().length - 1 ) );
    updateDisplay();
});

let numericNodelist = document.querySelectorAll('.numeric-button');
for (let i = 0; i < numericNodelist.length; i++) {
    console.log(numericNodelist[i]);
    let button = numericNodelist[i];
    button.addEventListener('click', function() {
        setNumberStorage( +(getNumberStorage().toString() + button.textContent) );
        updateDisplay();
    })
}

