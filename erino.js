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

	// Other omissions 
	// Add more as necessary
	self.other = ["erino"]

	// -------------------------------------------------------

	//  #############################
	//	#	    Input Handling      #
	//  #############################

	// Line getter
	self.getLine = function() {
		return self.newLine();
	};

	// Gets the next word
	self.getWord = function() {
		//console.log("Getting word");
		spaceAt = self.line().indexOf(" ");
		word = self.line().substring(0, spaceAt);
		self.line(self.line().slice(spaceAt + 1, self.line().length));
		//console.log("Sliced into: " + self.line());
		return word;
	};

	// Checks to see if the word is one we omit from adding -erino
	self.canErino = function(w) {
		word = w;
		if (-1 == self.prepositions.indexOf(word.toLowerCase()) && -1 == self.contractions.indexOf(word.toLowerCase()) && -1 == self.articles.indexOf(word.toLowerCase()) && -1 == self.other.indexOf(word.toLowerCase()))
			return true;
		return false; 
	};

	// Main translate function to Erino
	self.translateToErino = function() {
		//console.log("Translate To Erino"); 
		wordsLeft = true;
		index = 0;
		self.newLine('');
		self.word('');
		self.line(document.getElementById("text-input").value);
		self.line(self.line() + " "); // "Hack". Easier to add space for getWord
		// Loop through all the words in the input
		while (wordsLeft) {
			self.word(self.getWord());
			if (self.canErino(self.word())) {
				newWord = self.handleWord(self.word());
				self.newLine(self.newLine() + newWord + " ");
			}
			else {
				self.newLine(self.newLine() + self.word() + " ");
			}
			// Check if there are any words remaining
			if ('' == self.line()) {
				wordsLeft = false;
			}
		};
	};

	// -------------------------------------------------------

	//  #############################
	//	#	    Word Handlers       #
	//  #############################
	// TODO: 
		// 1) All caps handling
		// 2) Punctuation handling
	

	// NOTE: substring(inclusive start, exclusive end)

	// Main world handler to check for suffix exceptions 
	self.handleWord = function(w) {
		//console.log("Handling Word ...");
		word = w;
		// Apostrophe s (possession & contraction)
		if ("'s" == word.substring(word.length - 2, word.length)) {
			return self.handleWord(word.substring(0, word.length - 2)) + "'s";
		}
		// Words that end in y turn into i
		if ("y" == word.charAt(word.length - 1)) {
			return word.substring(0, word.length - 1) + "ierino";
		}
		// Words that end in -ing
		wcheck = self.handleIng(w);
		if (word != wcheck) {
			return wcheck;
		}
		// Words that end in -ed
		wcheck = self.handleEd(w);
		if (word != wcheck) {
			return wcheck;
		}
		// Words that end in (repeated) vowels
		wcheck = self.handleVowel(w);
		if (word != wcheck) {
			return wcheck;
		}
		// Plural words
		wcheck = self.handlePlural(w);
		if (word != wcheck) {
			return wcheck;
		}
		// Words that end in -r (EX: -ar, -er)
		wcheck = self.handleR(w);
		if (word != wcheck) {
			return wcheck;
		}
		else {
			//console.log("Converting normally ...");
			return w + "erino";
		}
	};

	// -ing word handler helper function
	self.handleIng = function(w) {
		length = w.length;
		if ("ing" == w.substring(length - 3, length)) {
			//console.log("Converting -ing ...")
			return self.handleVowel(w.substring(0, length - 3)) + "ing";
		}
		return w;
	};

	// -ed word handler helper function
	self.handleEd = function(w) {
		length = w.length;
		if (length > 2 && "ed" == w.substring(length - 2, length)) {
			//console.log("Converting -ed ...");
			return w.substring(0, length - 2) + "erinoed";
		}
		return w;
	};

	// -ar, -er word handler helper function
	self.handleR = function(w) {
		length = w.length;
		if ("ar" == w.substring(length - 2, length)) {
			//console.log("Converting -ar ...");
			return w.substring(0, length - 2) + "arino";
		}
		else if ("er" == w.substring(length - 2, length)) {
			//console.log("Converting -er ...");
			return w.substring(0, length - 2) + "erino";
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
			//console.log("Converting -ee ...");
			return w.substring(0, length - 1) + "erino";  
		}
		else if ("e" == w.charAt(length - 1)) {
			//console.log("Converting -e ...");
			return w.substring(0, length - 1) + "erino";
		}
		else if ("ie" == w.substring(length - 2, length)) {
			//console.log("Converting -ie ...");
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
		else if ("ar" == w.substring(length - 3, length - 1)) { // test -ar plural
			//console.log("Converting -ar plural ...");
			return self.handleR(w.substring(0, length-1)) + "s";
		}
		else if ("er" == w.substring(length - 3, length - 1)) { // test -er plural
			//console.log("Converting -er plural ...");
			return self.handleR(w.substring(0, length - 1)) + "s";
		}
		else if ("es" == w.substring(length - 2, length)) {
			//console.log("Converting -es plural ...");
			return w.substring(0, length - 2) + "erinos";
		}
		else if ("s" == w.charAt(length -1)) {
			//console.log("Converting plural ...");
			return w.substring(0, length - 1) + "erinos";
		}
		else {
			return w;
		}
	};

}

ko.applyBindings(new translateModel());