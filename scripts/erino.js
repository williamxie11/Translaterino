/*     
*                            erino.js       
*   JavaScript filerino for translaterinoing English into Erino 
*                           William Xie
 */

//  #############################
//  #       Omitted English     #
//  #############################

/*
	TODO for Grammar: 
		Leg = Leggerino
		Met = Metterino
		Martyr = Marterino
		Gyro = Gyrino
*/

// http://www.englishclub.com/grammar/prepositions-list.htm
// Prepositions omitted
self.prepositions = ["aboard", "about", "above", "across", "after", "against",
			"along", "amid", "among", "anti", "around", "as", "at", "before", 
			"behind", "below", "beneath", "beside", "besides", "between",
			"beyond", "but", "by", "during", "despite", "down", "except", "for", "from",
			"in", "inside", "into", "like", "minus", "near", "of", "off", "on", 
			"onto", "opposite", /*"outside"*/, "over", "past", "per", "plus", 
			"round", "since", "than", "through", "to", "toward", 
			"towards", "under", "underneath", "unlike", "until", "up", 
			"upon", "versus", "via", "with", "within", "without"];

// Articles, pronouns, and other things omitted
self.articles = ["i", "a", "is", "am", "are", "was", "were", "be", "being", "been", 
			"have", "had", "having", "me", "he", "him", "she", "her", "it", "its", "here",
			"the", "this", "that", "these", "those", "there", "their", "than", "then",
			"you", "your"];

// Other omissions - add more as necessary
self.other = ["erino", "just", "not", "or", "what", "will"];

/* ------------------------------------------------------- */

// Translaterino button click listener
var tClicked = document.getElementById("buttonerino");
if (tClicked.addEventListener) {
   tClicked.addEventListener("click", translaterino, false);
}
else {
   tClicked.attachEvent("onclick", translaterino);
}

/* Link click listeners */
var originLink = document.getElementById("origin-link");
if (originLink.addEventListener) {
   originLink.addEventListener("click", function() { 
      toggle("origin") 
   }, false);
}
else {
   originLink.attachEvent("onclick", function() { 
      toggle("origin")
   });
}

var grammarLink = document.getElementById("grammar-link");
if (grammarLink.addEventListener) {
   grammarLink.addEventListener("click", function() { 
      toggle("grammar")
   }, false);
}
else {
   grammarLink.attachEvent("onclick", function() {
      toggle("grammar");
   });
}

/* Hide/show toggle function
 * 
 * 
 */
 function toggle(ele) {
   var tag = document.getElementById(ele);
   if (tag.style.display === 'none') {
      hideAll();
      tag.style.display = 'block';
   }
   else {
      hideAll();
   }
 }

 function hideAll() {
   var og = document.getElementById('origin');
   var gr = document.getElementById('grammar');
   og.style.display = 'none';
   gr.style.display = 'none';
 }

/* Omission checking function
 *
 * Checks certain cases where the word will not be translated
 */
function shouldOmit(word) {
   // Brevity. No translation of words of three characters or less
   if (word.length <= 3) 
{      return true;
   }
   // Omit words with numbers, apostrophes, or quotation marks
   if (word.match('[0-9]') !== null || word.indexOf('\'') >= 0 || word.indexOf('"') >= 0) {
      return true;
   }
   // Omissions based on prepositions, articles, and other cases
   for (var om in prepositions) {
      if (word === prepositions[om]) {
         return true;
      }
   }
   for (var om in articles) {
      if (word === articles[om]) {
      	 return true;
      }
   }
   for (var om in other) {
      if (word === other[om]) {
      	 return true;
      }
   }
   return false;
}

/* Main translate function
 *
 * 
 */
function translaterino() {
   document.getElementById('output-title').style.display = 'block';
   var text = document.getElementById("text-input").value;
   var wordsList = text.split(' ');

   for (var i in wordsList) {
      // Omit non-translatable words
      var word = wordsList[i];
      if (!shouldOmit(word)) {
         var newWord = "";
         // Punctuation check (this needs to handle more than just common punctuation later)
         if (word.slice(-1) === "." || word.slice(-1) === "," || word.slice(-1) === "!" || word.slice(-1) === "\n") {
            var punct = word.slice(-1);
            newWord = toErino(word.slice(0, -1));
            wordsList[i] = newWord + punct;
         }
         else {
            newWord = toErino(word);
            wordsList[i] = newWord; 
         }
      }
   }

   // Output translation
   //console.log(wordsList);
   var output = document.getElementById("text-output");
   output.innerHTML = "";
   for (var w in wordsList) {
      output.innerHTML += wordsList[w] + " ";
   }
}

/* Single word translation function
 * 
 * Handles Erino grammar and decides which 
 */
function toErino(word) {
   var last = word.slice(-1);
   var lastTwo = word.slice(-2);
   var lastThree = word.slice(-3);

   // Common character ending translations
   if (last === "s" || last === "y" || last === "e") {
      return charTranslate(word);   
   }
   // -ing words
   if (lastThree === "ing") {
      return ingTranslate(word);
   }
   // -ed words
   if (lastTwo === "ed") {
      return edTranslate(word);
   }
   // TODO: Other erino translation words
   return word + "erino";
}
/* Erino Translation for common endings of words including: 
 * -s, -es, -y, -e, -ee
 */
function charTranslate(word) {
   var root = "";
   var last = word.slice(-1);
   var secondLast = word.slice(-2, -1);
   var lastTwo = word.slice(-2);

   if (last === "s") {
      if (secondLast === "e") {
         root = word.slice(0, -2)
      }
      else {
         root = word.slice(0, -1);
      }
      return root + "erinos";
   }
   if (last === "y") {
      root = word.slice(0, -1);
      return root + "ierino";
   }
   if (last === "e" || last === "ee") {
      return word + "rino";
   }
}

/* Erino Translation for -ing 
 * 
 */
 function ingTranslate(word) {
   var root = word.slice(0, -3);
   if (root.slice(-2) == "ee") {
      return root + "rinoing";
   }
   else if (root.slice(-1) == 'y') {
      return root.slice(0, -1) + "ierinoing";
   }
   return word.slice(0, -3) + "erinoing";
 }

 /* Erino Translation for -ed 
 * 
 */
 function edTranslate(word) {
    var root = word.slice(0, -2);
    return root + "erinoed";
 }

window.onload = function() {
   document.getElementById('output-title').style.display = 'none';
   document.getElementById('origin').style.display = 'none';
   document.getElementById('grammar').style.display = 'none';
};
 