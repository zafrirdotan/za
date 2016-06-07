// Tasks:
  // playNote as reusable function
  // -. when note is played play sounds
  // -. sound when loosing
  // -. sound when correct seq
// Score
// BONUS:
// support mute 
  // visual
// keep max score in localStorage
// levels
 
 
 // first change
 
 //zaki
 
'use strict';
var NOTES;
var gPointsPerRound = 5;
var gScore = 0;
var gLastScore = 0;
var gBestScore = 0;
// This is my State:
var gState = {
    isUserTurn : false,
    seqNoteIndexes: [],
    currNoteIndexToClick: 0,  
    // score: 0,
}

function init() {
    renderNotes(NOTES); 
}

var NOTES = [{sound: 'sounds/do.wav', color: 'red'},
             {sound: 'sounds/re.wav', color: 'blue'},
             {sound: 'sounds/mi.wav', color: 'green'},
             {sound: 'sounds/fa.wav', color: 'yellow'}] 

var gWinSound = 'sounds/win.mp3';
var gLoseSound = 'sounds/wrong.mp3';
var gGameOver = 'sounds/gameover.wav';
var gTick = 'sounds/tick.mp3';
var gStart = 'sounds/start.wav';

var gIsMuted = false;

function playSound(sound) {
    if (!gIsMuted) {
    var soundToPlay = new Audio(sound);
    soundToPlay.play()
    };
    return; 
}

// update the Score in the html
function updateScoreToHTML(currScore){
    var elScore = document.querySelector('.scoreContiner')
    elScore.innerText = 'Score: ' + currScore;
}
// reset Score wen game is srarting from 2nd time
function resetScore() {
    gScore = 0;
    updateScoreToHTML(gScore);
}
// finds the best score from when the browser refreshed 
function findBestScore(){ 
    if(gScore >= gLastScore) gBestScore = gScore;
    else gBestScore = gLastScore;
}
//update the Best Score To the localStorage
function updateBestScoreTolocalStorage() {
    var LSlastScore =  localStorage.getItem("simonBestScore");
    if(LSlastScore = null || LSlastScore < gBestScore){
    localStorage.setItem("simonBestScore", gBestScore);
    }
}
// update best score to html
function updateBestScoreToHTML() {
    var elScore = document.querySelector('.bestScoreContiner')
    var LSlastScore =  localStorage.getItem("simonBestScore");
    if(LSlastScore = null || LSlastScore < gBestScore){
          elScore.innerText = 'Best score: ' + gBestScore;
    }
    else  elScore.innerText = 'Best score: ' + LSlastScore;
}


function renderNotes(notes) {
    // mapping notes to html tags
    var strHtmls = notes.map(function(note, i){
        var strHtml =  '<div class="note note' + i + '" onmousedown="noteClicked(this)" data-note="'+i+'"  onmouseup="noteReleased(this)"' + 
                             'style="background:'+ note.color +'">' + 
                        '</div>';
        return strHtml;
    });
    
    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = strHtmls.join('');
}

function addRandomNote() {
    gState.seqNoteIndexes.push(getRandomIntInclusive(0,NOTES.length-1));
}

function playSeq() {
    
    var elNotes = document.querySelectorAll('.note');
    
    gState.seqNoteIndexes.forEach(function (seqNoteIndex, i) {
        
        setTimeout(function playNote() {
            elNotes[seqNoteIndex].classList.add('playing');
            playSound(NOTES[seqNoteIndex].sound);
            
            setTimeout(function donePlayingNote() {
                elNotes[seqNoteIndex].classList.remove('playing');
            }, 500);
            
            console.log('Playing: ', NOTES[seqNoteIndex].sound);
        }, 700 * i + 500);
        
    });
    
    setTimeout(function () {
        console.log('Done Playing Sequence!!');
        gState.isUserTurn = true;
    }, 700 * gState.seqNoteIndexes.length + 500);
   
}

function noteClicked(elNote) {
    
    if (!gState.isUserTurn) return;
    
    elNote.classList.add('playing');
}

function noteReleased(elNote) {
    if (!gState.isUserTurn) return;
    
    var noteIndex = +elNote.getAttribute('data-note');
    console.log('noteIndex is: ', noteIndex);

    elNote.classList.remove('playing');
    
    if (noteIndex === gState.seqNoteIndexes[gState.currNoteIndexToClick]) {
        console.log('User OK!');
        playSound(NOTES[noteIndex].sound);
        
        gState.currNoteIndexToClick++;
        if (gState.currNoteIndexToClick === gState.seqNoteIndexes.length) {
            gState.isUserTurn = false;
            setTimeout(function(){
                // updates the score every turn
                gScore += gPointsPerRound;
                updateScoreToHTML(gScore);
                // finds the best score and update it to the localStorage
                findBestScore();
                updateBestScoreTolocalStorage();
                // updateBestScoreToHTML();
                
                computerTurn();
            }, 1000);
        } 
    } else {
            console.log('User Wrong!');
            playSound(gLoseSound);
            gState.isUserTurn = false;
            setTimeout(gameOver, 1000);
            // when game over update glastScore
                gLastScore = gScore;
        }
    console.log('Note', NOTES[noteIndex]);
    
}

function computerTurn() {
     gState.isUserTurn = false;
     gState.currNoteIndexToClick  = 0;
     addRandomNote();
     playSeq();
}

function startGame(elBtn) {
    elBtn.innerText = 'Restart Game'
    gState = {
        isUserTurn : false,
        seqNoteIndexes: [],
        currNoteIndexToClick: 0
    }
    setTimeout(function(){
        computerTurn();
    },1000)
}

function startCountDown(elBtn) {
    //if restart keep last score
    gLastScore = gScore;
    
    var i = 3;
    var elCountDown = document.querySelector('.piano');
    var countInterval = setInterval(function(){
        elCountDown.innerHTML = i;
        if (i > 0) playSound(gTick);
        i--;
        if (i < 0) {
            clearInterval(countInterval);
            elCountDown.innerHTML = 'GO!';
            playSound(gStart);

            
            setTimeout(function(){
                renderNotes(NOTES);
                startGame(elBtn);
            // elCountDown.innerHTML = '';
            }, 1000);
        
        }
    }, 1000);
}

function gameOver() {
    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = 'GAME OVER!'
    playSound(gGameOver);
    
}

function mute() {
    var elBtn = document.querySelector('.muteBtn');
    if (!gIsMuted) {
        elBtn.innerText = 'UnMute';
        elBtn.classList.remove('btn-success');
        elBtn.classList.add('btn-danger');
        gIsMuted = true;
    } else {
        elBtn.innerText = 'Mute';
        elBtn.classList.remove('btn-danger');
        elBtn.classList.add('btn-success');
        gIsMuted = false;
    }
    document.querySelector('.piano').muted = true;

    
}