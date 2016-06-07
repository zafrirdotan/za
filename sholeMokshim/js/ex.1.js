'use strict'
var gLevel = {
    SIZE: 10,
    MINES: 6
}

var gBoard = [];
var MINE = '*';
var EMPTY = '';


var gIsPlaying = false;
var gStartTime = 0;
var gEndTime = 0;
var gTotalTime = 0;
var gCellOpen =0;
var gCellFlaged = 0;
var gAllCallCount = 0; 




function initGame() {
    buildBoard(gLevel.SIZE, gLevel.MINES, gBoard);
    printMat(gBoard, '.boardContainer')
}

// count time 

// function countTotalTime(){
//  totalTime = endTime - startTime;
//  }


// building the board functions

function buildBoard(size, mines,board) {
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
             board[i][j] = EMPTY;
        }
    }
    addMines(board)
    setMinesNegbsCount(board)

    console.table(board);
}

// add the mines
function addMines(board) {
    for (var i = 0; i <= gLevel.MINES; i++) {
        var iRand = parseInt(Math.random()*(board.length));
        var jRand = parseInt(Math.random()*(board.length));
        // console.log('iRand',iRand,'jRand',jRand );
        board[iRand][jRand] = MINE;
        
    }
}

// give value to the celles surrounding the mines
function setMinesNegbsCount(board) {
    board.forEach(function (row, i) {
         row.forEach(function (cell, j) {
             if(cell === MINE){
                for (var m = i-1; m <= i+1; m++) {
                    for (var n = j-1; n <= j+1; n++){
                       if(m < 0 || m >=row.length || n < 0|| n >= row.length) continue;
                       if (board[m][n] === MINE)    continue; 
                       if (board[m][n] === EMPTY)   board[m][n] = 1;
                       else                         board[m][n]++  
                    }
                }
            }   
        })
    })
}

// on click functions

function callClicked(elCell) {
    if(!gIsPlaying){
        gStartTime = Date.now();
        console.log('startTime: ', gStartTime);
        gIsPlaying = true;
    }    
    // console.log('elCell.innerText: ',elCell.innerText );
    switch(elCell.innerText){
     
        case MINE:
            showBum(elCell);
            gEndTime = Date.now();
            gIsPlaying = false;
            alert('bum!!!....Game Over!!!');
            
            break;
        
        case EMPTY:     
            // console.log('case o');
            showNgbersOf0(elCell);
            break;
        
        default:
            showCall(elCell);
            console.log(elCell.innerText);
            break;        
    }      
    chakeIfGameFinished();
    
}

// function of case '0'

function showNgbersOf0(elCell) {
    var i = +elCell.className.charAt(9);
    var j = +elCell.className.charAt(11);
    // console.log('i', i, 'j', j);          
    for (var m = i-2 ; m <= i+2; m++) {
        if(m < 0 || m >= gBoard.length ) continue;
        for (var n = j-2 ; n <= j+2; n++){
            if( n < 0 || n >= gBoard.length) continue;        
            var elNgber = document.querySelector('.cell' + m + '-' + n); 
            // console.log('elNgber: ', elNgber);
            if(elNgber.innerText !== MINE && elNgber.classList[2] !== 'opened'){
                 elNgber.classList.add('opened');
                 gCellOpen++;
            }
        }      
    }
    console.log('countCallOpen: ', gCellOpen);    
}

// function of case default

function showCall(elCell) {
    if(elCell.classList[2] !== 'opened'){
        elCell.classList.add('opened');
        gCellOpen++;
    }
}

//function of case MINE

function showBum(elCell) {
    elCell.style.backgroundColor = 'red';
    elCell.style.color = 'black';
}


// function of flag a call
function cellRightClick(elCell) {
    // console.log('elCell.classList:', elCell.classList);  
    // if not clicked yet
    if(elCell.classList[2] !== 'flaged'){
        elCell.classList.add('flaged');
        if( elCell.innerText === MINE ) gCellFlaged++;
        console.log('callFlaged: ', gCellFlaged);
    } else {
         elCell.classList.remove('flaged');
        if( elCell.innerText === MINE ) gCellFlaged--;
        console.log('callFlaged: ', gCellFlaged);
    }
}
  
    
// finishGame

function chakeIfGameFinished(){
    gAllCallCount = gCellOpen + gCellFlaged;
    console.log('allCallCount: ', gAllCallCount);
    if(gAllCallCount === Math.pow(gBoard.length,2)){
        gEndTime = Date.now();
        findGameTime()
        alert('you wone');
        alert('game finished'); 
    }  
}
    
        
 // findGameTime    
        
function findGameTime() {
    totalTime = gEndTime - gStartTime;
    console.log('totalTime: ', totalTime/1000);
    
}

// var timer = 0;

// function createTimer () {
//     timer = setTimeout(, 3000);
// }