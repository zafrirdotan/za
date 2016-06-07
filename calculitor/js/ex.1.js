'use strict'

var gNum1 = '';
var gNum2 = null;
var gOperator = null;
var gStrConsule = null;
var gResult = null;

function resetGlobals() {
    gNum1 = '';
    gNum2 = null;
    gOperator = null;
    gStrConsule = null;
}
function pressNum(elNum){
    if (gNum2 === null) {  
        gNum1 += elNum.innerText;
        console.log('gNum1: ', gNum1);
        gStrConsule = gNum1;  
        console.log('gStrConsule: ', gStrConsule);
        
    }else{
        gNum2 = '';
        gNum2 += elNum.innerText;
        console.log('gNum1: ', gNum1, 'gNum2: ', gNum2);
        gStrConsule += gNum2;
        console.log('gStrConsule: ', gStrConsule);
        
    }
    printToConsole(gStrConsule);
}

function printToConsole(str) {
    var elConsole = document.querySelector('.console');     
    elConsole.innerText = str;      
}

function pressPlus() {
    gNum2 = 0;
    gOperator = 'plus';  
    console.log('+');
    gStrConsule += '+';
    printToConsole(gStrConsule);
    
}

function pressMinus() {
    gNum2 = 0;
    gOperator = 'minus';
    console.log('-');
    gStrConsule += '-';
    printToConsole(gStrConsule);
}


function pressDivide() {
    gNum2 = 0;
    gOperator = 'divide';
    console.log('/');
    gStrConsule += '/';
    printToConsole(gStrConsule);
}
function pressMultiply() {
    gNum2 = 0;
    gOperator = 'multiply';
    console.log('*');
    gStrConsule += '*';
    printToConsole(gStrConsule);
}
function pressPercent() {
    if (gNum2 !== null) {
        console.log('i am hear');
    }else{
        gResult = gNum1/100;
        console.log('gResult: ', gResult);
        
        printToConsole(gResult);
    }
    gNum2 = null;
}


function pressEqual() {
    console.log('startpressEqual. gOperator is:',gOperator);
    
    var elConsole = document.querySelector('.console');
    switch (gOperator) {
        case 'plus':
            gResult = +gNum1 + +gNum2;
            console.log('gResult :', gResult);
            break;
        case 'minus':
            gResult = +gNum1 - +gNum2;
            console.log('gResult :', gResult);
            break;
        case 'divide':
            gResult = +gNum1 / +gNum2;
            console.log('gResult :', gResult);
            break;
        case 'multiply':
            gResult = +gNum1 * +gNum2;
            console.log('gResult :', gResult);
            break;
            
        default:
        console.log('gOperator:',gOperator,' type of:',typeof(gOperator));
        
            break;
    }
    printToConsole(gResult);
    resetGlobals();        
}


