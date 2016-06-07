

var cards = [
    {
    name: 'joni',
    profession: 'plumber',
    tel: '054-4278910',
    address: 'tel-aviv',
    recommendations: null
    },
    {
    name: 'robert',
    profession: 'plumber',
    tel: '054-769870',
    address: 'rishon',
    recommendations: null
    },
    {
    name: 'yuval',
    profession: 'mathematiks',
    tel: '054-769870',
    address: 'rishon',
    recommendations: null
    },
    {
    name: 'artur',
    profession: 'gardener',
    tel: '054-769870',
    address: 'rishon',
    recommendations: null
    }
]
function printCardes(){
    var elScreen = document.querySelector('.mainScreen');    
    var strHTML;
    cards.forEach( function (card, i) {
        strHTML +='<div class="card">'+
                    '<address>'+
                    '<strong>Twitter, Inc.</strong><br>'+
                        '1355 Market Street, Suite 900<br>'+
                        'San Francisco, CA 94103<br>'+
                        '<abbr title="Phone">P:</abbr> (123) 456-7890'+
                    '</address>'+
                    '<address>'+
                        '<strong>Full Name</strong><br>'+
                        '<a href="mailto:#">first.last@example.com</a>'+
                    '</address>'+
                '</div>'
    })
    elScreen.innerHTML = strHTML;

}
printCardes();
   