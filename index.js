const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let score = 0;

// 28 * 28 = 784 
  // 0 - pack-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power pellet
  // 4 empty
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

// create board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        // create a square
        const square =  document.createElement('div');
        // put square into grid
        grid.appendChild(square);
        // put square into squares array
        squares.push(square);

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if (layout[i] === 2) {
            squares[i].classList.add('gost-lair');
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        }
    }
}

createBoard();

// starting position of pacman
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pacman');

// down key - 40 
// up - 38
// left - 37
// right - 39

function control(e) {
    // if (e.key === 'ArrowDown') {
    //    console.log('pressed down key'); 
    // } else if (e.key === 'ArrowUp') {
    //     console.log('pressed up key');
    // } else if (e.key === 'ArrowLeft') {
    //     console.log('pressed left key');
    // } else if (e.key === 'ArrowRight') {
    //     console.log('pressed right key');
    // }

    squares[pacmanCurrentIndex].classList.remove('pacman');
    switch(e.key) {
        case 'ArrowDown':
            console.log('pressed down');
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('gost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width
               ) 
               pacmanCurrentIndex += width;
            break;
        case 'ArrowUp':
            console.log('pressed up');
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('gost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0
                ) 
                pacmanCurrentIndex -= width;
            break;
        case 'ArrowLeft':
            console.log('pressed left');
            if (
                !squares[pacmanCurrentIndex - 1].classList.contains('gost-lair') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
                ) 
                pacmanCurrentIndex -= 1;
                if (pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391;
                }
            break;
        case 'ArrowRight':
            console.log('pressed right');
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('gost-lair') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1
                ) 
                pacmanCurrentIndex += 1;
                if (pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364;
                }
            break;
        default:
            console.log('not a command');
            break;            
    
    }
    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
}
document.addEventListener('keyup', control);

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score++;
        scoreDisplay.innerHTML = score;
    }
}

