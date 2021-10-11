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
    powerPelletEaten();
}
document.addEventListener('keyup', control);

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score++;
        scoreDisplay.innerHTML = score;
    }
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        //add a score of 10
        score += 10;
        scoreDisplay.innerHTML = score;
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost =>ghost.isScared = true);
        //use setTimeout to unscare ghosts after 10 seconds
        setTimeout(unScareGhosts, 100000)
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost =>ghost.isScared = false); 
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
};

const ghosts = [
    new Ghost('pinky', 348, 250),
    new Ghost('blinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
];

// starting position of ghosts:
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});

// move the ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    console.log('moved ghost');
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    console.log(direction);

    ghost.timerId = setInterval(function() {
        //if the next square does not contain a wall and does not contain a ghost:
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') && 
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
            ) {
        //remove ghosts:
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
            //add direction to current Index:
            ghost.currentIndex += direction;
            //add ghost class:
            squares[ghost.currentIndex].classList.add(ghost.className);
            squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)];  

        //if ghost is currently scared
        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        // if ghost is currently scared and pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }

    }, ghost.speed);
}

//clearInterval(ghost.timerId);

