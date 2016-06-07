'use strict';

var PACMAN  = '&#9785;';
var WALL    = '#';
var FOOD    = '.';
var EMPTY   = ' ';

var gBoard;
var gPacman = {
  color: 'red',
  location : {
    i: 3,
    j: 5
  }
}

function init() {
  gBoard = buildBoard();  
  console.table(gBoard);
  printMat(gBoard, '.boardContainer');
  
  handleUserPref();
  
}



function buildBoard() {
  var SIZE = 12;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      
        board[i][j] = FOOD;
      
      
        if (i === 0 || i === SIZE-1 ||
            j === 0 || j === SIZE-1) {
              
          board[i][j] = WALL;
              
        }
    } 
  }
  board[gPacman.location.i][gPacman.location.j] = PACMAN;

  return board;
}




function movePacman(event) {
  // console.log('event:', event);
  
  
  var newLocation = {
    i: gPacman.location.i, 
    j: gPacman.location.j
  };
  
  switch (event.code) {
    
    case 'ArrowUp': 
      console.log('Arrow Up!');
      newLocation.i--;
      break;
    case 'ArrowDown': 
      console.log('Arrow Down!');
      newLocation.i++;
      break;   
    
  }
  
  // 
  
  console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);
  
  // hitting a wall, not moving anywhere
  if (gBoard[newLocation.i][newLocation.j] === WALL) return;
  
  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  
  // render updated model to the DOM
  renderCell(gPacman.location, EMPTY);
  
  // Update the pacman MODEL to new location  
  gPacman.location = newLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  
  
  // render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
  
  
  // console.table(gBoard);
  //printMat(gBoard, '.boardContainer');
  
}

function renderCell(location, value) {
  var cellSelector = '.cell' + location.i + '-' + location.j;
  var cell = document.querySelector(cellSelector);
  cell.innerHTML = value;
}




function handleUserPref() {
  
  if (localStorage.getItem('pref')) {
    
    var pref = JSON.parse(localStorage.getItem('pref'));
    
    console.log('pref, ',pref);
    
    
    document.body.style.backgroundColor = pref.bgColor;
    document.body.style.color           = pref.color;
  }
}