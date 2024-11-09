const puzzleContainer = document.getElementById("puzzle");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");

const imageUrl = "path/to/your/image.jpg"; // https://files.oaiusercontent.com/file-bjduxriyGxDrnH1qbhGjd6UD?se=2024-11-09T11%3A31%3A48Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D9129a319-67ac-4d7f-b7d4-ddbbb2cd7766.webp&sig=cMD3zFXpLluKsMUd%2BgjfsxlTlnqxUorIO6AJmVc0E%2Bo%3D
const rows = 3;
const cols = 3;
let pieces = [];

// Create puzzle pieces
function createPuzzle() {
    pieces = [];
    puzzleContainer.innerHTML = "";
    for (let i = 0; i < rows * cols; i++) {
        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `${(i % cols) * 100}px ${(Math.floor(i / rows)) * 100}px`;
        piece.setAttribute("data-index", i);
        piece.setAttribute("draggable", "true");
        piece.addEventListener("dragstart", handleDragStart);
        piece.addEventListener("dragover", handleDragOver);
        piece.addEventListener("drop", handleDrop);
        pieces.push(piece);
        puzzleContainer.appendChild(piece);
    }
}

// Shuffle puzzle pieces
function shufflePieces() {
    const shuffled = [...pieces].sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = "";
    shuffled.forEach(piece => puzzleContainer.appendChild(piece));
}

// Handle drag events
let draggedPiece = null;

function handleDragStart(event) {
    draggedPiece = event.target;
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const droppedPiece = event.target;
    if (droppedPiece !== draggedPiece && droppedPiece.classList.contains("piece")) {
        const draggedIndex = draggedPiece.getAttribute("data-index");
        const droppedIndex = droppedPiece.getAttribute("data-index");

        draggedPiece.setAttribute("data-index", droppedIndex);
        droppedPiece.setAttribute("data-index", draggedIndex);

        puzzleContainer.innerHTML = "";
        pieces.forEach(piece => puzzleContainer.appendChild(piece));
    }
}

// Reset game
resetBtn.addEventListener("click", createPuzzle);

// Shuffle pieces on button click
shuffleBtn.addEventListener("click", shufflePieces);

// Initialize game
createPuzzle();
