var gBooks = [
   { 
    id: 0,
    name: 'sherlock holmes',
    price: 18, 
    src: 'image/sherlok.jpg',
    rate: 0
   },
   { 
    id: 1,
    name: 'harry potter',
    price: 22,
    src: 'image/harryPotter.jpg',
    rate: 0 
   },
   { 
    id: 2,
    name: 'moby deck',
    price: 22,
    src: 'image/mobyDick.jpg',
    rate: 0        
   },
   { 
    id: 3,
    name: 'life of pi',
    price: 22,
    src: 'image/lifeOf.jpg',
    rate: 0
   },
   { 
    id: 4,
    name: 'Don Quixote',
    price: 22,
    src: 'image/donQihote.jpg',
    rate: 0        
   }  
];

// console.log(Object.getOwnPropertyNames(gBooks[0])[1]);
// console.log('gBooks[4].name: ', gBooks[4].name);
function init() {
    printBookMat();
   
}

function printBookMat() {
   
    
    var elContainer = document.querySelector('container');
    var strHTML = '<table border= "1"> <tbody> <tr class = "tableHead">';
   
    
    for (var j = 0; j < Object.keys(gBooks[0]).length; j++) {
        var property =  Object.getOwnPropertyNames(gBooks[0])[j];
        strHTML += '<td class="' + property +'" >' + property + '</td>';   
        }
        strHTML += '<td class="actions" >Actions</td>'
        strHTML += '</tr>';
      
    for (var i = 0; i < gBooks.length; i++) {
  
        strHTML += '<tr class="tableRows" id="'+gBooks[i].id+'">';
      
   
        
        for (var j = 0; j < Object.keys(gBooks[0]).length ; j++) {
            property = Object.getOwnPropertyNames(gBooks[0])[j]
            strHTML += '<td class="'+property+'" >'+gBooks[i][property]+'</td>';   
        }
        strHTML += '<td class="readCall"> <button class="readButton" onclick="showBookDetails('+gBooks[i].id+')" > Read </button></td>';
        strHTML += '<td class="updateCall"> <button class="updateButton" onclick="readAndUpdateBook('+gBooks[i].id+')"> Update </button></td>';
        strHTML += '<td class="deleteCall"> <button class="deleteButton" onclick="deleteBook('+gBooks[i].id+')"> Delete </button></td>';
        
        strHTML += '</tr>';
      
    }
    
    
    strHTML += '</tbody> </table>';
    elContainer.innerHTML = strHTML;
}





function deleteBook(elBookId){
        var i = 0; 
        while( elBookId !== gBooks[i].id && i< gBooks.length ){
            i++
        }
        gBooks.splice(i, 1);
        printBookMat();
    }
    
   
   
   function readAndAddNewBook(){
       var bookName = prompt('hay... what is the name of the book?'); 
       var price = prompt('what is its price?'); 
       addBook( bookName, price );
       printBookMat();
   }
   
   function addBook(bookName, price){
       gBooks.push({
            id: gBooks.length,
            name: bookName,
            price: price, 
            rate: 0
       }) 
   }


function readAndUpdateBook (elBookId){
     var bookPrice = prompt('what is its new price?'); 
     updateBook(elBookId, bookPrice);
     printBookMat();
}

function updateBook(elBookId, bookPrice){
    var i = 0; 
    while( elBookId !== gBooks[i].id && i< gBooks.length ){
        i++
    }
    gBooks[i].price = bookPrice; 
}

function showBookDetails(elBookId){
    var i = 0; 
    while( elBookId !== gBooks[i].id && i< gBooks.length ){
        i++
    }
    console.log('gBooks[i].rate: ', gBooks[i].rate);
    
    var elDetails = document.querySelector('.bookDetails');
    console.log('elDetails: ', elDetails);
    
    var strHTML = '<h1> name:'+gBooks[i].name+'</h1>';
    strHTML += '<h1> price:'+ gBooks[i].price+'</h1>';
    strHTML += '<h1 class="rateDisplay"> rate:'+ gBooks[i].rate +'</h1>';
    strHTML += '<img class="thumbsUpButton" id="'+ elBookId +'" onclick="addRate('+i+')" src="image/thumbsUp.png" alt="thumbs up">';
    strHTML += '<img class="thumbsUpButton" id="'+ elBookId +'" onclick="reduceRate('+i+')" src="image/thumbsDown.png" alt="thumbs down">';
    elDetails.innerHTML = strHTML;
    var elBookImg = document.querySelector('.bookImg');
    elBookImg.innerHTML = '<img src="'+gBooks[i].src+'" alt="pic of'+gBooks[i].name+'">'
}


// 

function addRate( i ){    
   gBooks[i].rate++;
   if ( gBooks[i].rate >10) {
       gBooks[i].rate = 10;
   }else{
   console.log('gBooks[i].rate: ', gBooks[i].rate);
   var elRateDisplay = document.querySelector('.rateDisplay');
   elRateDisplay.innerHTML =  '<h1 class="rate"> rate:'+ gBooks[i].rate +'</h1>';
   printBookMat();
   }
}

function reduceRate( i ){
       gBooks[i].rate--;
   if ( gBooks[i].rate < 0) {
       gBooks[i].rate = 0;
   }else{
   console.log('gBooks[i].rate: ', gBooks[i].rate);
   var elRateDisplay = document.querySelector('.rateDisplay');
   elRateDisplay.innerHTML =  '<h1 class="rate"> rate:'+ gBooks[i].rate +'</h1>';
   printBookMat();
   }
}