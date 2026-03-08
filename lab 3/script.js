// DOM 
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';

// Event 
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // We pull the instructions directly from the HTML data-attributes
        const action = button.getAttribute('data-action');
        const value = button.getAttribute('data-value');
        
        processInput(action, value);
    });
});

// Logic 
function processInput(action, value) {
    switch (action) {
        case 'append':

            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay(currentInput);
            break;

        case 'clear':
            currentInput = '0';
            updateDisplay(currentInput);
            break;

        case 'delete':
            if (currentInput.length > 1) {

                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay(currentInput);
            break;

        case 'calculate':
            try {

                let mathExpression = currentInput.replace(/%/g, '/100');
                

                let result = eval(mathExpression);
                
                // Fix weird floating point math issues (like 0.1 + 0.2 = 0.30000000000000004)
                result = Math.round(result * 100000000) / 100000000; 
                
                currentInput = result.toString();
                updateDisplay(currentInput);
            } catch (error) {

                updateDisplay('ERR_SYNTAX');
                

                setTimeout(() => {
                    currentInput = '0';
                    updateDisplay(currentInput);
                }, 1500);
            }
            break;
    }
}

function updateDisplay(value) {
    display.innerText = value;
}