/*     
*                            erino.js       
*   JavaScript filerino for translaterinoing English into Erino 
*                           William Xie
 */

//  #############################
//	#	   Omitted English      #
//  #############################

/*
	TODO: 
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
			"you"];

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
   var text = document.getElementById("text-input").value;
   var wordsList = text.split(' ');

   for (var i in wordsList) {
      // Omit non-translatable words
      var word = wordsList[i];
      if (!shouldOmit(word)) {
         newWord = toErino(word);
         wordsList[i] = newWord; 
      }
   }
   console.log(wordsList);
   //document.getElementById("text-output").innerHTML = wordsList;
}

/* Single word translation function
 * 
 * Handles Erino grammar and decides which 
 */
function toErino(word) {
   // Check for punctuation 

   // -ing words
   if (word.slice(-3) == "ing") {
      return ingTranslate(word);
   }
   // -ed words
   if (word.slice(-2) == "ed") {
      return edTranslate(word);
   }
   // TODO: Other erino translation words
   return word + "erino";
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

 