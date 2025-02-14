const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let cluesFound = 0;
const totalClues = 3;
let intro = true;
let room = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (intro) {
            intro = false;
            room = true;
            document.getElementById('intro-text').style.display = 'none';
        }
    }
});

function drawText(text, x, y) {
    ctx.fillStyle = 'white';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText(text, x, y);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (intro) {
        drawText('Welcome to the 8-Bit Murder Mystery Game!', 50, 100);
        drawText('Press SPACE to start your investigation.', 50, 150);
    } else if (room) {
        drawText(`Clues found: ${cluesFound}/${totalClues}`, 10, 20);
        drawText('Investigate the room and find clues!', 50, 100);
        // Placeholder for room investigation logic
        if (cluesFound === totalClues) {
            drawText("You've found all the clues! Solve the mystery!", 50, 200);
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
