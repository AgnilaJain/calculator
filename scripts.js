const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');
const deleteButton = document.getElementById('deleteButton');
const decimalButton = document.getElementById('decimalButton');
const percentButton = document.getElementById('percentButton');
const doubleZeroButton = document.getElementById('doubleZeroButton');
const clearButton = document.getElementById('clearButton');

function updateDisplay(value) {
  // Check for multiple percentage signs
  if (value === '%' && document.calculator.display.value.endsWith('%')) {
    return; // Prevent multiple percentage signs
  }
  // Check for multiple double zeros
  if (value === '00' && document.calculator.display.value.endsWith('00')) {
    return; // Prevent multiple double zeros
  }
  document.calculator.display.value += value;
}

function clearDisplay() {
  document.calculator.display.value = '';
}

function deleteLastCharacter() {
  const currentDisplay = document.calculator.display.value;
  document.calculator.display.value = currentDisplay.slice(0, -1);
}

function calculate() {
  try {
    let expression = document.calculator.display.value;

    // Handle percentages in the expression
    expression = expression.replace(/%/g, '/100*');

    // Evaluate the expression
    const result = eval(expression);
    document.calculator.display.value = result;
    addHistory(document.calculator.display.value);
  } catch (e) {
    document.calculator.display.value = 'Error';
  }
}

function addHistory(operation) {
  const listItem = document.createElement('li');
  listItem.textContent = operation;
  historyList.appendChild(listItem);
}

// Add event listener for clear history button
clearHistoryButton.addEventListener('click', function() {
  historyList.innerHTML = '';
});

// Add event listener for decimal button
decimalButton.addEventListener('click', function() {
  // Check if there's already a decimal in the current number
  const displayValue = document.calculator.display.value;
  if (!displayValue.includes('.')) {
    updateDisplay('.');
  }
});

// Add event listener for percent button
percentButton.addEventListener('click', function() {
  // Add percentage operator to the current number
  updateDisplay('%');
});

// Add event listener for double zero button
doubleZeroButton.addEventListener('click', function() {
  updateDisplay('00');
});

// Add event listener for clear button
clearButton.addEventListener('click', function() {
  clearDisplay();
});

  
