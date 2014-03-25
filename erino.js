// @name erino.js
// @author William Xie
// #
// @desc JavaScript filerino for translaterinoing English into Erino 

function translateModel() {
	var self = this;

	// http://www.englishclub.com/grammar/prepositions-list.htm
	// Prepositions omitted
	var prepositions = ["aboard", "about", "above", "across", "after", "against",
						"along", "amid", "among", "anti", "around", "as", "at", "before", 
						"behind", "below", "beneath", "beside", "besides", "between",
						"beyond", "but", "by", "despite", "down", "except", "for", "from",
						"in", "inside", "into", "like", "minus", "near", "of", "off", "on", 
						"onto", "opposite", "outside", "over", "past", "per", "plus", 
						"round", "save", "since", "than", "through", "to", "toward", 
						"towards", "under", "underneath", "unlike", "until", "up", 
						"upon", "versus", "via", "with", "within", "without"];

    // http://grammar.about.com/od/words/a/EnglishContractions.htm
	// Contractions omitted
	var contractions = ["aren't", "can't", "couldn't", "didn't", "doesn't", "don't",
						"hadn't", "hasn't", "haven't", "he'd", "he'll", "he's", "I'd",
						"I'll", "I'm", "I've", "isn't", "it's", "let's", "mightn't",
						"mustn't", "shan't", "she'd", "she'll", "she's", "shouldn't",
						"that's", "there's", "they'd", "they'll", "they're", "they've",
						"we'd", "we're", "we've", "weren't", "what'll", "what're", 
						"what's", "what've", "where's", "who'd", "who'll", "who're",
						"who's", "who've", "won't", "wouldn't", "you'd", "you'll",
						"you're", "you've"];

	// Articles, pronouns, and other things omitted
	var articles = ["is", "am", "are", "was", "were", "be", "being", "been", "have", 
					"had", "having", "me", "he", "him", "she", "her", "it",
					"the", "this", "these", "those", "there", "their", "than", "then"];

	var line = "";

	self.displayLine = ko.computed(function() {
		console.log(line);
		return line;
	});
}

ko.applyBindings(new translateModel());