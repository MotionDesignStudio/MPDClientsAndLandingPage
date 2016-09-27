
Cufon.replace('#randomQuotes', { fontFamily: 'Myriad Pro' });

angular.element(document).ready(function () {

	// Start random loading text
	var lines;

	// Max number of random quotes to retrieve
	var maxRandomQuotesToRetrieve =  10;

	// Fade quotes in and out 

	var durationOfQuote = 15000;
	var fadeOfQuote = 2000;

	var arrayOfQuotesToDisplay = new Array ();

	usetoDeleteQuotesFadeOut = undefined;

	function startQuotesRotation ( quotefiletoLoad) { 
		console.log (quotefiletoLoad);
		// Load the text file to be read
		$.ajax ({
			url: './text/'+quotefiletoLoad
		}).done(function(content) {
			// Split into lines
			lines = content.replace (/\r\n|\r/g, '\n').trim().split('\n');

			// If the file contains less than maxRandomQuotesToRetrieve lines add them all and shuffle the order
			if (lines.length < maxRandomQuotesToRetrieve ){
				shuffleArrayQuotes (lines);
				arrayOfQuotesToDisplay = lines;
			// Else for files with more than maxRandomQuotesToRetrieve lines
			} else {
				// Add my maxRandomQuotesToRetrieve unique quotes to the web page
				while (arrayOfQuotesToDisplay.length <maxRandomQuotesToRetrieve ){
					var checkThis = lines [ Math.floor(Math.random() * lines.length) ] ;
					if ($.inArray(checkThis , arrayOfQuotesToDisplay ) ==-1){
						arrayOfQuotesToDisplay.push ( checkThis );
					}
				}				
			}

			// Must recall this to get the font face on the dynmaic text	
			/*Cufon.replace('#randomQuotes', { fontFamily: 'Myriad Pro' });
	

			*/

			usetoDeleteQuotesFadeOut = new quoteWithPrototypeSoIcanStopTheFadeOutffect;
			usetoDeleteQuotesFadeOut.showNextQuote ();
		
		}); // End Done function

		// END Load the text file to be read

	}
	
	//startQuotesRotation();
	function quoteWithPrototypeSoIcanStopTheFadeOutffect (){};

		quoteWithPrototypeSoIcanStopTheFadeOutffect.prototype.showNextQuote = function(){

			$('.randomQuotesInside').text ( arrayOfQuotesToDisplay.shift() );
			// Must recall this to get the font face on the dynmaic text	
			Cufon.replace('#randomQuotes', { fontFamily: 'Myriad Pro' });

				$(function () {
	 				$('.randomQuotesInside').fadeIn( fadeOfQuote , function () {
	    					$(this).delay( durationOfQuote ).fadeOut( fadeOfQuote 	, function () {
							if (arrayOfQuotesToDisplay.length ==0){
								// Store the prototype I want to delete here so I can add it back
								tmp = quoteWithPrototypeSoIcanStopTheFadeOutffect.prototype.showNextQuote;
								delete quoteWithPrototypeSoIcanStopTheFadeOutffect.prototype.showNextQuote;
								// Add it back here.  If not done it will 
								// usetoDeleteQuotesFadeOut = new quoteWithPrototypeSoIcanStopTheFadeOutffect will have no value
								quoteWithPrototypeSoIcanStopTheFadeOutffect.prototype.showNextQuote=tmp;
								startQuotesRotation( chooseRandomObjectFromList () );
							}else{
								quoteWithPrototypeSoIcanStopTheFadeOutffect.prototype.showNextQuote ();

							}
						
						});
	  				});
				});			

		}

	// This function retrieves a list of files at a specified location
	// It requires listFiles.php to assist
	var filesOfQuotes="";

	function getFilesForQuotes(location){
		data = { directoryTosearch: location }
		$.post('./scripts/listFiles.php', data, function(returnedData) {
			filesOfQuotes = JSON.parse (returnedData);
			startQuotesRotation( chooseRandomObjectFromList () );
		});
	}


	//Get the list of quotes from the directory
	getFilesForQuotes ("../text/");

	var previouslyChoosen="voidValue1";
	var chosenObject= "voidValue2";
	function chooseRandomObjectFromList (){
		
		//Get random object aka file names from list make sure it was not selected before.
		do {
			chosenObject = getRandomInt (0, filesOfQuotes.length-1);
		} while (chosenObject == previouslyChoosen);

		previouslyChoosen = chosenObject;
		return filesOfQuotes [ chosenObject ];
	}

});

//Random shuffle array
function shuffleArrayQuotes(a){
	var j, x, i;
	for (i = a.length; i; i -= 1){
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

// Return random number
function getRandomInt(minimum, maximum) {
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

