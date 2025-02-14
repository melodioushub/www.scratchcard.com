let canvas = document.getElementById('scratch-card');
let ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 180;

let isScratching = false;
let scratched = false;

// Create the scratchable layer (light pink overlay)
function initScratchCard() {
    ctx.fillStyle = "#f5a9b8"; // Light pink
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

initScratchCard();

// Scratch functionality
canvas.addEventListener('mousedown', () => { isScratching = true; });
canvas.addEventListener('mouseup', () => { isScratching = false; checkScratch(); });
canvas.addEventListener('mousemove', (e) => {
    if (isScratching) {
        scratch(e);
    }
});

canvas.addEventListener('touchstart', (e) => { 
    isScratching = true; 
    scratch(e.touches[0]); 
});

canvas.addEventListener('touchmove', (e) => { 
    if (isScratching) scratch(e.touches[0]); 
});

canvas.addEventListener('touchend', () => { 
    isScratching = false; 
    checkScratch();
});

function scratch(e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
}

// Check if most of the card is scratched
function checkScratch() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;
    let clearPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++;
    }

    if (clearPixels > (pixels.length / 4) * 0.5) {
        revealMessage();
    }
}

// Reveal hidden message
function revealMessage() {
    document.getElementById('scratch-card').style.display = 'none';
    document.getElementById('revealed-message').classList.remove('hidden');
}

// Button click to show rose animation
document.getElementById('collect-btn').addEventListener('click', () => {
    document.getElementById('animation-container').classList.remove('hidden');
    document.querySelector('.scratch-card-container').classList.add('hidden');
});
