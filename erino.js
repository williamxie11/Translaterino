// @name erino.js
// @author William Xie
// #
// @desc JavaScript filerino for translaterinoing English into Erino 

function translateModel() {
	var self = this;

	self.line = ko.observable('');
	self.newLine = ko.observable('');
	self.word = ko.observable('');

	// Ending vowels that would need special exceptions
	self.vowels = ["a", "e", /*"i"*/, /*"o"*/, /*"u"*/];

	// -------------------------------------------------------

	//  #############################
	//	#	   Omitted English      #
	//  #############################

	// http://www.englishclub.com/grammar/prepositions-list.htm
	// Prepositions omitted
	self.prepositions = ["aboard", "about", "above", "across", "after", "against",
			"along", "amid", "among", "anti", "around", "as", "at", "before", 
			"behind", "below", "beneath", "beside", "besides", "between",
			"beyond", "but", "by", "despite", "down", "except", "for", "from",
			"in", "inside", "into", "like", "minus", "near", "of", "off", "on", 
			"onto", /*"opposite"*/, /*"outside"*/, "over", "past", "per", "plus", 
			"round", /*"save"*/, "since", "than", "through", "to", "toward", 
			"towards", "under", "underneath", "unlike", "until", "up", 
			"upon", "versus", "via", "with", "within", "without"];

    // http://grammar.about.com/od/words/a/EnglishContractions.htm
	// Contractions omitted
	self.contractions = ["aren't", "can't", "couldn't", "didn't", "doesn't", "don't",
			"hadn't", "hasn't", "haven't", "he'd", "he'll", "he's", "i'd",
			"i'll", "i'm", "i've", "isn't", "it's", "let's", "mightn't",
			"mustn't", "shan't", "she'd", "she'll", "she's", "shouldn't",
			"that's", "there's", "they'd", "they'll", "they're", "they've",
			"we'd", "we're", "we've", "weren't", "what'll", "what're", 
			"what's", "what've", "where's", "who'd", "who'll", "who're",
			"who's", "who've", "won't", "wouldn't", "you'd", "you'll",
			"you're", "you've"];

	// Articles, pronouns, and other things omitted
	self.articles = ["is", "am", "are", "was", "were", "be", "being", "been", 
			"have", "had", "having", "me", "he", "him", "she", "her", "it", "here",
			"the", "this", "these", "those", "there", "their", "than", "then",
			"you"];

	// -------------------------------------------------------

	//  #############################
	//	#	    Input Handling      #
	//  #############################

	// Line getter
	self.getLine = function() {
		return self.newLine;
	};

	// Main translate function to Erino
	self.translateToErino = function() {
		console.log("Translate To Erino"); 
		wordsLeft = true;
		index = 0;
		self.line(document.getElementById("text-input").value);
		self.newLine(self.handleWord(self.line()));
	};

	// Gets the next word
	self.getWord = function() {
		console.log("LINE: " + self.line());
		if (self.line().length <= 2) { // 1?
			console.log("None left. Returning.");
			return '';
		}
		else {
			space = self.line().indexOf(" ");
			console.log(space);
			if (-1 == space) {
				console.log("LAST WORD: " + self.line());
				return self.line();
			}
			else {
				w = self.line().substring(0, space);
				console.log("GOT WORD: " + w);
				return w;
			}
		}
	};

	// Checks to see if the word is one we omit from adding -erino
	self.canErino = function(w) {
		word = w;
		if (-1 == self.prepositions.indexOf(word.toLowerCase()) && -1 == self.contractions.indexOf(word.toLowerCase()) && -1 == self.articles.indexOf(word.toLowerCase()))
			return true;
		return false; 
	};

	// -------------------------------------------------------

	//  #############################
	//	#	    Word Handlers       #
	//  #############################

	/* NEEDS HANDLERS FOR:
		1) Words ending in -ar/-er/-ur | EX: Grammar should be grammarino or grammerino  
		2) Words ending in -erino should not be changed
	*/

	// NOTE: substring(inclusive start, exclusive end)

	// Main world handler to check for suffix exceptions 
	self.handleWord = function(w) {
		console.log("Handling Word ...");
		word = w;
		if ("'s" == word.substring(word.length - 2, word.length)) {
			return self.handleWord(word.substring(0, word.length - 2)) + "'s";
		}
		else if ("y" == word.charAt(word.length - 1)) {
			return word.substring(0, word.length - 1) + "ierino";
		}
		else if (word != self.handleIng(w)) {
			return self.handleIng(w);
		}
		else if (word != self.handleEd(w)) {
			return self.handleEd(w);
		}
		else if (word != self.handleVowel(w)) {
			return self.handleVowel(w);
		}
		else if (word != self.handlePlural(w)) {
			return self.handlePlural(w);
		}
		else {
			return w + "erino";
		}
	};

	// -ing word handler helper function
	self.handleIng = function(w) {
		length = w.length;
		if ("ing" == w.substring(length - 4, length)) {
			return w.substring(0, length - 5) + "erinoing";
		}
		return w;
	};

	// -ed word handler helper function
	self.handleEd = function(w) {
		length = w.length;
		if (length > 2 && "ed" == w.substring(length - 2, length)) {
			return w.substring(0, length - 2) + "erinoed";
		}
		return w;
	};

	// vowel handler helper function
	// ex: -e, -ee, -ie
	self.handleVowel = function(w) {
		length = w.length;
		if (length <= 2) {
			return w;
		}
		else if ("ee" == w.substring(length - 2, length)) {
			return w.substring(0, length - 1) + "erino";  
		}
		else if ("e" == w.charAt(length - 1)) {
			return w.substring(0, length - 1) + "erino";
		}
		else if ("ie" == w.substring(length - 2, length)) {
			return w.substring(0, length - 1) + "erino";
		}
		else {
			return w;
		}
	};

	// -s word handler helper function
	self.handlePlural = function(w) {
		length = w.length;
		if (length < 3) {
			return w;
		}
		else if ("es" == w.substring(length - 2, length)) {
			return w.substring(0, length - 2) + "erinos";
		}
		else if ("s" == w.charAt(length -1)) {
			return w.substring(0, length - 1) + "erinos";
		}
		else {
			return w;
		}
	};

}

ko.applyBindings(new translateModel());