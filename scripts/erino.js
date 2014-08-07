/*     
*                            erino.js       
*   JavaScript filerino for translaterinoing English into Erino 
*                           William Xie
 */

// Translaterino button click listener
var tClicked = document.getElementById("buttonerino");
if (tClicked.addEventListener) {
   tClicked.addEventListener("click", translaterino, false);
}
else {
   tClicked.attachEvent("onclick", translaterino);
}

function translaterino() {
   var text = document.getElementById("text-input").value;
   console.log(text);
   var words = text.split(" ");
   console.log(words);
}