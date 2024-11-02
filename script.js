const rollButton = document.getElementById('rollButton');
const diceCountInput = document.getElementById('diceCount');
const diceContainer = document.getElementById('diceContainer');
const rollHistory = document.getElementById('rollHistory');
let history = [];

function createDieElement() {
    const die = document.createElement('div');
    die.classList.add('die');
    return die;
}

function updateDieFace(die, value) {
    die.innerHTML = '';
    die.setAttribute('data-value', value);
    for (let i = 0; i < value; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        die.appendChild(dot);
    }
}

function rollDice() {
    rollButton.disabled = true;
    let count = 0;
    const dice = [];
    diceContainer.innerHTML = '';
    const numDice = Math.min(Math.max(diceCountInput.value, 1), 10);
    for (let i = 0; i < numDice; i++) {
        const die = createDieElement();
        dice.push(die);
        diceContainer.appendChild(die);
    }

    const interval = setInterval(() => {
        dice.forEach(die => {
            const randomValue = Math.floor(Math.random() * 6) + 1;
            updateDieFace(die, randomValue);
        });
        count++;
        if (count === 5) {
            clearInterval(interval);
            rollButton.disabled = false;
            const finalValues = dice.map(die => parseInt(die.getAttribute('data-value')));
            addToHistory(finalValues);
        }
    }, 100); // Rolls for 0.5 seconds (5 * 100ms)
}

function addToHistory(values) {
    const total = values.reduce((sum, value) => sum + value, 0);
    const rollTime = new Date().toLocaleTimeString();
    const historyEntry = {
        time: rollTime,
        values,
        total
    };
    history.unshift(historyEntry);
    if (history.length > 5) history.pop();
    updateHistory();
}

function updateHistory() {
    rollHistory.innerHTML = '';
    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.time} - Total: ${entry.total}, Rolls: ${entry.values.join(', ')}`;
        rollHistory.appendChild(listItem);
    });
}

rollButton.addEventListener('click', rollDice);
