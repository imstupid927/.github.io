const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let cluesFound = 0;
const totalClues = 6;
let intro = true;
let room = false;
let currentRoom = 0;
let timer = 60; // 60 seconds time limit

const rooms = [
    { clues: [{ x: 100, y: 150, found: false }, { x: 500, y: 300, found: false }] },
    { clues: [{ x: 200, y: 200, found: false }, { x: 600, y: 450, found: false }] },
    { clues: [{ x: 300, y: 100, found: false }, { x: 700, y: 400, found: false }] },
];

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (intro) {
            intro = false;
            room = true;
            document.getElementById('intro-text').style.display = 'none';
            startTimer();
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
    const room = rooms[currentRoom];
    for (const clue of room.clues) {
        if (!clue.found) {
            ctx.fillStyle = 'red';
            ctx.fillRect(clue.x, clue.y, 20, 20);
        }
    }
}

function checkClick(x, y) {
    const room = rooms[currentRoom];
    for (const clue of room.clues) {
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

function startTimer() {
    const interval = setInterval(() => {
        if (timer > 0 && cluesFound < totalClues) {
            timer -= 1;
        } else {
            clearInterval(interval);
            if (cluesFound < totalClues) {
                alert('Time is up! You failed to find all the clues.');
                room = false;
                intro = true;
                cluesFound = 0;
                timer = 60;
                currentRoom = 0;
                resetClues();
                document.getElementById('intro-text').style.display = 'block';
            }
        }
    }, 1000);
}

function resetClues() {
    for (const room of rooms) {
        for (const clue of room.clues) {
            clue.found = false;
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
        drawText(`Time left: ${timer}s`, 10, 50);
        drawText('Investigate the room and find clues!', 50, 100);
        drawClues();
        if (cluesFound === totalClues) {
            drawText("You've found all the clues! Solve the mystery!", 50, 200);
        } else if (currentRoom < rooms.length - 1 && cluesFound >= (currentRoom + 1) * 2) {
            currentRoom += 1;
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

