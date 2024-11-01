// app.ts
import { pawn, king, horse, rook, bishop, queen } from './pieces/pieces.js';
const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = 'white';
playerDisplay.textContent = playerGo;
const startPieces = [
    { position: 0, type: 'rook', color: 'black', svg: rook },
    { position: 1, type: 'knight', color: 'black', svg: horse },
    { position: 2, type: 'bishop', color: 'black', svg: bishop },
    { position: 3, type: 'queen', color: 'black', svg: queen },
    { position: 4, type: 'king', color: 'black', svg: king },
    { position: 5, type: 'bishop', color: 'black', svg: bishop },
    { position: 6, type: 'knight', color: 'black', svg: horse },
    { position: 7, type: 'rook', color: 'black', svg: rook },
    ...Array(8).fill(null).map((_, i) => ({
        position: i + 8,
        type: 'pawn',
        color: 'black',
        svg: pawn
    })),
    ...Array(8).fill(null).map((_, i) => ({
        position: i + 48,
        type: 'pawn',
        color: 'white',
        svg: pawn
    })),
    { position: 56, type: 'rook', color: 'white', svg: rook },
    { position: 57, type: 'knight', color: 'white', svg: horse },
    { position: 58, type: 'bishop', color: 'white', svg: bishop },
    { position: 59, type: 'queen', color: 'white', svg: queen },
    { position: 60, type: 'king', color: 'white', svg: king },
    { position: 61, type: 'bishop', color: 'white', svg: bishop },
    { position: 62, type: 'knight', color: 'white', svg: horse },
    { position: 63, type: 'rook', color: 'white', svg: rook },
];
function createBoard() {
    if (!gameBoard) {
        console.error("El contenedor de juego no está definido.");
        return;
    }
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('square-id', i.toString());
        const row = Math.floor(i / 8);
        const isBeige = (row % 2 === 0 && i % 2 === 0) || (row % 2 !== 0 && i % 2 !== 0);
        square.classList.add(isBeige ? 'beige' : 'brown');
        gameBoard.append(square);
    }
    console.log("Tablero creado.");
}
function startGame() {
    if (!startPieces || startPieces.length === 0) {
        console.error("Las piezas iniciales no están definidas.");
        return;
    }
    startPieces.forEach(piece => {
        const square = document.querySelector(`[square-id="${piece.position}"]`);
        if (square) {
            square.innerHTML = piece.svg;
            const pieceElement = square.firstChild;
            if (pieceElement) {
                pieceElement.classList.add(piece.color, 'piece');
                pieceElement.setAttribute('draggable', 'true');
                pieceElement.setAttribute('data-type', piece.type);
            }
            console.log(`Pieza ${piece.type} colocada en la posición ${piece.position}.`);
        }
        else {
            console.warn(`No se encontró la casilla para la posición ${piece.position}.`);
        }
    });
    console.log("Piezas iniciales colocadas.");
}
createBoard();
startGame();
document.addEventListener('dragstart', (e) => {
    const element = e.target;
    if (element.classList.contains('piece')) {
        element.classList.add('dragging');
    }
});
document.addEventListener('dragend', (e) => {
    const element = e.target;
    if (element.classList.contains('piece')) {
        element.classList.remove('dragging');
    }
});
