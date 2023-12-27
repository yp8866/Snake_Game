// Snake Game developed by Yashpal Puri (puriyash45@gmail.com)

var highestScoreOld=5;//read from file the old highest score
var tym=300;  //default speed
var currspeed;  //currspeed interval
const board= document.getElementById("main"); //gameboard div of html
let snakeobjarray= [{x: 0, y:0}]; //default length snake
let foodobj= generateFoodObj(); //food with random position
let direction='right'; //default directions
let gameOver=false;  //flag for gameOver


document.getElementById('highestscorecnt').innerHTML = highestScoreOld;

// get the random positions for food
function generateFoodObj(){
    const x = Math.floor(Math.random() * 50) * 20;
    const y = Math.floor(Math.random() * 25) * 20;
    return {x,y};
}

// drawing the food
function drawFood(){
    // erase the old food because sanke has eaten it
    if(document.querySelector('.food')!=undefined)
        document.querySelector('.food').remove();
    const foodElement= document.createElement('div');
    foodElement.className='food';
    foodElement.style.left= `${foodobj.x}px`;
    foodElement.style.top= `${foodobj.y}px`;
    board.appendChild(foodElement);
}

    


// drawing the snake
function snakedraw(){
    // erase all the snake divs from the board
    document.querySelectorAll('.snake').forEach(segment => segment.remove());
    var cnt=0;

    // make new snake divs for all the snakeobjarray Elements and append it to the gameboard
    snakeobjarray.forEach((sgmt)=>{
        const snakesegment=document.createElement('div');
        snakesegment.className='snake';
        snakesegment.style.left=`${sgmt.x}px`;
        snakesegment.style.top=`${sgmt.y}px`;
        if (cnt++==0){
            snakesegment.style.borderRadius='50%';
            snakesegment.style.backgroundColor='green';
        }
        board.appendChild(snakesegment);
    })
}


// To move the snake
function snakeMove(){
    // logic to move the snake
    // 1. pick the head of the snake and make a copy
    // 2. change the position of this copy according to the direction
    // 3. append this copy at the head
    // 4. now snake length has increased by one segment so check:
            // isCollision with the food --> do nothing 
            // if goes out of boundary then terminate the game
            // else normal move --> remove last element from array
    // 5. finnally objectarray has been modified so draw the snake again


    // pick the top segment of the snakeobjarray 
    const snakeHead= {...snakeobjarray[0]};


    // change its coordinate according to the direction
    switch (direction) {
        case 'up':
            snakeHead.y -= 20;
            break;
        case 'down':
            snakeHead.y += 20;
            break;
        case 'left':
            snakeHead.x -= 20;
            break;
        case 'right':
            snakeHead.x += 20;
            break;
    }

    // finnally append it at the head
    snakeobjarray.unshift(snakeHead);

    
    // goes out of boundary
    if (
        snakeHead.x < 0 || snakeHead.x >= board.clientWidth ||
        snakeHead.y < 0 || snakeHead.y >= board.clientHeight ||
        isCollision()
    ) {
        gameOver = true;
        snakeobjarray= [{x: 0, y:0}];
        alert('Game Over!');
        location.reload();
    }

    // collision with the food
    if (snakeHead.x === foodobj.x && snakeHead.y === foodobj.y) {
        foodobj = generateFoodObj();
        drawFood();

        // score update

        // oldscore update
        let ini = document.getElementById('scorecnt').innerHTML - '0';
        ini += 5;
        document.getElementById('scorecnt').innerHTML = ini;

        //highest score update
        if(ini>highestScoreOld){
            highestScoreOld = ini;
            // file mai write krdo
            document.getElementById('highestscorecnt').innerHTML = ini;

        }
    } 
    
    // normal move
    else {
        snakeobjarray.pop();
    }

    // draw the snake
    snakedraw();
}



// to detect the collision with the boundary of the box
function isCollision(){
    for (let i = 1; i < snakeobjarray.length; i++) {
        if (snakeobjarray[i].x === snakeobjarray[0].x && snakeobjarray[i].y === snakeobjarray[0].y) {
            return true;
        }
    }
    return false;
}


// for changing the direction of the moving snake
function handleKeydown(event) {
    if (gameOver) {
        return;
    }

    switch (event.key) {
        case 'ArrowUp':
            if(direction!='down')
                direction = 'up';
        break;
        case 'ArrowDown':
            if(direction!='up')
                direction = 'down';
        break;
        case 'ArrowLeft':
            if(direction!='right')
                direction = 'left';
        break;
        case 'ArrowRight':
            if(direction!='left')
                direction = 'right';
            break;
    }
}


// on clicking start button start the game 
document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").style.display = "none"; 

    // initially draw the default length snake   
    snakedraw();

    // draw the initial food
    drawFood();
    
    // trigger the  direction change
    document.addEventListener('keydown', handleKeydown);

    // move the snake at the speed of {tym variable} 
    currspeed=setInterval(function () {
        if (!gameOver) {
            snakeMove();
        }
    }, tym);   

})



// changing the speed while snake is moving or game has to be started yet
function speedChange(newtym){
    tym=newtym;
    board.focus();
    if(currspeed!=undefined){
        clearInterval(currspeed);
        currspeed=setInterval(function () {
            if (!gameOver) {
                snakeMove();
            }
        }, tym);
    }
}

document.getElementById('speedoption').addEventListener('keydown', function (event) {
    // Disable arrow key navigation for the select dropdown
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  });