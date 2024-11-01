// app.ts
import { pawn, king, horse, rook, bishop, queen } from './pieces/pieces';

type PieceColor = 'white' | 'black';
type PieceType = 'pawn' | 'king' | 'queen' | 'bishop' | 'knight' | 'rook';

interface Piece {
    position: number;
    type: PieceType;
    color: PieceColor;
    svg: string;
}

const gameBoard = document.querySelector("#gameboard") as HTMLElement;
const playerDisplay = document.querySelector("#player") as HTMLElement;
const infoDisplay = document.querySelector("#info-display") as HTMLElement;

const width = 8;
let playerGo: PieceColor = 'white';
playerDisplay.textContent = playerGo;

const startPieces: Piece[] = [
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
        type: 'pawn' as PieceType, 
        color: 'black' as PieceColor, 
        svg: pawn 
    })),
    ...Array(8).fill(null).map((_, i) => ({ 
        position: i + 48, 
        type: 'pawn' as PieceType, 
        color: 'white' as PieceColor, 
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
] as const;

function createBoard(): void {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('square-id', i.toString());
        square.classList.add(i % 2 === 0 ? 'beige' : 'brown');
        
        const row = Math.floor(i / 8);
        if (row <= 1) {
            square.classList.add('black');
        }
        if (row >= 6) {
            square.classList.add('white');
        }
        
        gameBoard.append(square);
    }
console.log("Piezas: ",pawn, king, horse, bishop, rook, queen);

}

function startGame(): void {
    startPieces.forEach(piece => {
        const square = document.querySelector(`[square-id="${piece.position}"]`) as HTMLElement;
        if (square) {
            square.innerHTML = piece.svg;
            const pieceElement = square.firstChild as HTMLElement;
            if (pieceElement) {
                pieceElement.classList.add(piece.color, 'piece'); 
                pieceElement.setAttribute('draggable', 'true');
                pieceElement.setAttribute('data-type', piece.type);
            }
        }
    });
console.log("Piezas: ",pawn, king, horse, bishop, rook, queen);
    
}

createBoard();
startGame();

document.addEventListener('dragstart', (e: DragEvent) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains('piece')) {
        element.classList.add('dragging');
    }
});

document.addEventListener('dragend', (e: DragEvent) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains('piece')) {
        element.classList.remove('dragging');
    }
});