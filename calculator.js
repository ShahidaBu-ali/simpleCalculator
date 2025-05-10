document.addEventListener('DOMContentLoaded', function() {
    const displayElement = document.getElementById('display');
    let display = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        displayElement.textContent = display;
    }

    function inputDigit(digit) {
        if (waitingForSecondOperand) {
            display = String(digit);
            waitingForSecondOperand = false;
        } else {
            display = display === '0' ? String(digit) : display + digit;
        }
        updateDisplay();
    }

    function inputDecimal() {
        if (waitingForSecondOperand) {
            display = '0.';
            waitingForSecondOperand = false;
            updateDisplay();
            return;
        }

        if (display.indexOf('.') === -1) {
            display = display + '.';
            updateDisplay();
        }
    }

    function clearDisplay() {
        display = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }

    function performOperation(nextOperator) {
        const inputValue = parseFloat(display);

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            display = String(result);
            firstOperand = result;
            updateDisplay();
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    function handleEquals() {
        if (!operator) return;
        
        const inputValue = parseFloat(display);
        const result = calculate(firstOperand, inputValue, operator);
        
        display = String(result);
        firstOperand = result;
        operator = null;
        waitingForSecondOperand = true;
        updateDisplay();
    }

    function changeSign() {
        display = String(parseFloat(display) * -1);
        updateDisplay();
    }

    function calculatePercent() {
        display = String(parseFloat(display) / 100);
        updateDisplay();
    }

    // Digit buttons
    document.getElementById('zero').addEventListener('click', () => inputDigit(0));
    document.getElementById('one').addEventListener('click', () => inputDigit(1));
    document.getElementById('two').addEventListener('click', () => inputDigit(2));
    document.getElementById('three').addEventListener('click', () => inputDigit(3));
    document.getElementById('four').addEventListener('click', () => inputDigit(4));
    document.getElementById('five').addEventListener('click', () => inputDigit(5));
    document.getElementById('six').addEventListener('click', () => inputDigit(6));
    document.getElementById('seven').addEventListener('click', () => inputDigit(7));
    document.getElementById('eight').addEventListener('click', () => inputDigit(8));
    document.getElementById('nine').addEventListener('click', () => inputDigit(9));

    // Operation buttons
    document.getElementById('add').addEventListener('click', () => performOperation('+'));
    document.getElementById('subtract').addEventListener('click', () => performOperation('-'));
    document.getElementById('multiply').addEventListener('click', () => performOperation('*'));
    document.getElementById('divide').addEventListener('click', () => performOperation('/'));
    document.getElementById('equals').addEventListener('click', handleEquals);

    // Other buttons
    document.getElementById('clear').addEventListener('click', clearDisplay);
    document.getElementById('decimal').addEventListener('click', inputDecimal);
    document.getElementById('sign').addEventListener('click', changeSign);
    document.getElementById('percent').addEventListener('click', calculatePercent);

    // Initialize display
    updateDisplay();

    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        // Numbers 0-9
        if (/^\d$/.test(key)) {
            event.preventDefault();
            inputDigit(parseInt(key));
        }
        
        // Operators
        switch (key) {
            case '+':
                event.preventDefault();
                performOperation('+');
                break;
            case '-':
                event.preventDefault();
                performOperation('-');
                break;
            case '*':
                event.preventDefault();
                performOperation('*');
                break;
            case '/':
                event.preventDefault();
                performOperation('/');
                break;
            case 'Enter':
            case '=':
                event.preventDefault();
                handleEquals();
                break;
            case '.':
            case ',':
                event.preventDefault();
                inputDecimal();
                break;
            case 'Escape':
                event.preventDefault();
                clearDisplay();
                break;
            case 'Backspace':
                event.preventDefault();
                if (display.length > 1 && !waitingForSecondOperand) {
                    display = display.slice(0, -1);
                    if (display === '') display = '0';
                } else {
                    display = '0';
                }
                updateDisplay();
                break;
        }
    });
});