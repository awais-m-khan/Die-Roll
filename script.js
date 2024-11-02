const rollButton = document.getElementById('rollButton');
const addDieButton = document.getElementById('addDie');
const removeDieButton = document.getElementById('removeDie');
const diceCountDisplay = document.getElementById('diceCountDisplay');
const diceContainer = document.getElementById('diceContainer');
const resultTableBody = document.getElementById('resultTableBody');
const totalScoreDisplay = document.getElementById('totalScore');
let diceCount = 1;

function createCube() {
    const cube = document.createElement('div');
    cube.classList.add('cube');

    for (let i = 1; i <= 6; i++) {
        const face = document.createElement('div');
        face.classList.add('face', `face-${i}`);
        face.textContent = i; // Replace this with dots if needed
        cube.appendChild(face);
    }

    return cube;
}

function rollDice() {
    rollButton.disabled = true;
    resultTableBody.innerHTML = '';
    diceContainer.innerHTML = '';
    let totalScore = 0;

    for (let i = 0; i < diceCount; i++) {
        const cube = createCube();
        const randomValue = Math.floor(Math.random() * 6) + 1;
        totalScore += randomValue;

        // Apply rotation for the random value
        let rotationX = 0;
        let rotationY = 0;
        switch(randomValue) {
            case 1: rotationX = 0; rotationY = 0; break;
            case 2: rotationX = 0; rotationY = 90; break;
            case 3: rotationX = 0; rotationY = 180; break;
            case 4: rotationX = 0; rotationY = -90; break;
            case 5: rotationX = 90; rotationY = 0; break;
            case 6: rotationX = -90; rotationY = 0; break;
        }

        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        diceContainer.appendChild(cube);

        // Add result to the table
        const row = document.createElement('tr');
        row.innerHTML = `<td>Die ${i + 1}</td><td>${randomValue}</td>`;
        resultTableBody.appendChild(row);
    }

    // Display the total score
    totalScoreDisplay.textContent = `Total Score: ${totalScore}`;
    rollButton.disabled = false;
}

function updateDiceCount(change) {
    diceCount = Math.max(1, Math.min(3, diceCount + change));
    diceCountDisplay.textContent = diceCount;
}

rollButton.addEventListener('click', rollDice);
addDieButton.addEventListener('click', () => updateDiceCount(1));
removeDieButton.addEventListener('click', () => updateDiceCount(-1));
