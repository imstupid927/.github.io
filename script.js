const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let cluesFound = 0;
const totalClues = 3;
let intro = true;
let room = false;

const clues = [
    { x: 200, y: 150, found: false },
    { x: 400, y: 300, found: false },
    { x: 600, y: 450, found: false }
];

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (intro) {
            intro = false;
            room = true;
            document.getElementById('intro-text').style.display = 'none';
        }
    }
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    checkClick(x, y);
});

function drawText(text, x, y) {
    ctx.fillStyle = 'white';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText(text, x, y);
}

function drawClues() {
    for (const clue of clues) {
        if (!clue.found) {
            ctx.fillStyle = 'red';
            ctx.fillRect(clue.x, clue.y, 20, 20);
        }
    }
}

function checkClick(x, y) {
    for (const clue of clues) {
        if (
            !clue.found &&
            x >= clue.x &&
            x <= clue.x + 20 &&
            y >= clue.y &&
            y <= clue.y + 20
        ) {
            clue.found = true;
            cluesFound += 1;
            break;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (intro) {
        drawText('Welcome to the 8-Bit Murder Mystery Game!', 50, 100);
        drawText('Press SPACE to start your investigation.', 50, 150);
    } else if (room) {
        drawText(`Clues found: ${cluesFound}/${totalClues}`, 10, 20);
        drawText('Investigate the room and find clues!', 50, 100);
        drawClues();
        if (cluesFound === totalClues) {
            drawText("You've found all the clues! Solve the mystery!", 50, 200);
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

