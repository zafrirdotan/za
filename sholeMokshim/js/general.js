function printMat(mat, selector) {
  
  var elContainer = document.querySelector(selector);
 
  var strHTML = '<table border="1"><tbody>';
  mat.forEach(function (row, i) {
    strHTML += '<tr>';

    row.forEach(function (cell, j) {
      
      var className = 'cell cell' + i + '-' + j;
      
      strHTML += '<td class="' + className +   '" onclick="callClicked(this)" oncontextmenu="cellRightClick(this);return false;" > ' + cell +  ' </td>'
    });    
    
    strHTML += '</tr>'
    
  })
  strHTML += '</tbody></table>';
  
    elContainer.innerHTML = strHTML;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}