'use strict'


function showSelectedImg(elValue) {

console.log('elValue: ' , elValue);
var imgUrl = '';
var alt = '';
    switch (elValue) {
        case 'ca':
            console.log('cat');
            imgUrl = 'image/cat.jpg'
            alt = 'cat'
            break;
        case 'do':
            console.log('dog');
            imgUrl = 'image/dog.jpg'
            alt = 'dog'
            break;
        case 'fi':
            console.log('fish');
            imgUrl = 'image/fish.jpg'
            alt = 'fish'
            break;
        default:
            break;
    } 
    
    var elContiner = document.querySelector('.continer');
    console.log(elContiner)
    elContiner.innerHTML = '<img src="'+imgUrl+'" alt="'+alt+'">'
}



function clickedSend() {
    console.log('click');
    // ValidateEmail(); 
    // CheckPassword(); 
    // checkDescLength();
    checkIfAgreed();
    showPopUp();
}

   

function ValidateEmail()  
{  
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    var elEmail = document.getElementById('email');
    if(elEmail.value.match(mailformat)) {   
        return true;  
    } else{  
        alert("You have entered an invalid email address!");  
        elEmail.focus();  
        return false;  
    }  
}  


function CheckPassword()  {   
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; 
    var elPass = document.getElementById('pass');
    if(elPass.value.match(passw)){     
        return true;  
    } else {   
        alert('Your password is wrong! please tip again!')  
        elPass.focus();
        return false;  
    }  
}  

function checkDescLength() {
    var elDesc = document.getElementById('desc');
    if(elDesc.value.length > 10){
        console.log('true');
           
        return true;  
    } else {   
        alert('Your self Description is to short !')  
        elDesc.focus();
        return false;  
        
    }
}

function checkIfAgreed() {
    var elcheckbox = document.getElementById('agree');
    if(elcheckbox.checked === true){
        console.log('true');
           
        return true;  
    } else {   
        alert('You have to agree to the terms !')  
        elcheckbox.focus();
        return false;  
        
    }
}

function showPopUp() {
    var elDiv = document.querySelector('popUp');
    console.log(elDiv);
    
    elDiv.style = 'display: block'; 
}





