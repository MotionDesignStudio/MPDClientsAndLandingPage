
angular.element(document).ready(function () {

// Set default Directory
var defaultDirectory = getUrlVarsForDirectory()["d"];
//var theTitle = decodeURI (theTitle);
if (defaultDirectory==undefined) {
	defaultDirectory="bg";
}

	// Create two divs dynamically that store the two images 
	//$("#containerBgOutside").append('<div id="containerBgInside"> <img src="#" id="showImageInside" />  </div>');
	//$("#containerBgOutside").append('<div id="containerBgInside2"> <img src="#" id="showImageInside2" />  </div>');

	// Begin rotating BG
	var storeImagesInArray = new Array ();

	// This function retrieve a list of files at a specified location
	// It requires listFiles.php to assist
	function getFilesForBG(location){
		data = { directoryTosearch: location }
		$.post('./scripts/listFiles.php', data, function(returnedData) {
			fadeImagesInAndOut ( );
			storeImagesInArray = JSON.parse (returnedData);

			// Call this to populate the array of images to preload
			randomlyPickPhotosAndPreloadThem ();
			$( "#containerBgInside2" ).children('img').attr( 'src', "img/"+defaultDirectory+"/"+ threeImagesArray.shift() );
			$( "#containerBgInside" ).children('img').attr( 'src', "img/"+defaultDirectory+"/"+ threeImagesArray.shift() );
			randomlyPickPhotosAndPreloadThem ();
		});
	}

	getFilesForBG ("../img/"+defaultDirectory);

	// This function fades the image out

	function fadeImagesInAndOut(){		
		
		// flipflop will get the name of the current div on top
		flipflop ();

		$(thisDivIsOnTop).delay( 60000 ).animate({opacity: 0}, 3000,

			function(){
				//Change the z -index of the div on top to below
				$( thisDivIsOnTop ).css('z-index', 4);
				$( thisDivIsBelow ).css('z-index', 5);
	
				// Add random image from collection to the top div
				$( thisDivIsOnTop ).children('img').attr( 'src', "img/"+defaultDirectory+"/"+ threeImagesArray [0] );

				// Remove the image name from the array of three
				threeImagesArray.shift();

				// Add the name of a new image to the array of three
				randomlyPickPhotosAndPreloadThem ();

				// Set the opacity to the div that is no on the layer below to  100% visible
				$(thisDivIsOnTop).css({ opacity: 1 });

				// Call this function again so it remain in a loop forever
				fadeImagesInAndOut ( );
			}
			
		);
	}

	var arrayOfDiv = new Array ( "#containerBgInside", "#containerBgInside2");
	var startHere = 1;
	var thisDivIsOnTop = '';
	var thisDivIsBelow = '';

	function flipflop (){
		var sendMeBack = '';
		if (startHere == 1){
			sendMeBack = arrayOfDiv [startHere];
			thisDivIsOnTop = arrayOfDiv [startHere];
			startHere = 0;
			thisDivIsBelow = arrayOfDiv [startHere];
		} else{
			sendMeBack = arrayOfDiv [startHere];
			thisDivIsOnTop = arrayOfDiv [startHere];
			startHere = 1;
			thisDivIsBelow = arrayOfDiv [startHere];
		};
		return ( sendMeBack );
	}
		
	//Randomly pick three images and preload them
	// *** MUST have a minimum of three images to choose from ***
	var threeImagesArray = new Array ();
	function randomlyPickPhotosAndPreloadThem () {

		// Choose three unique images
		while (threeImagesArray.length < 3){
			var checkThis = storeImagesInArray [ Math.floor(Math.random() * storeImagesInArray.length) ] ;
			if ($.inArray(checkThis , threeImagesArray ) ==-1){
				threeImagesArray.push ( checkThis );
				//console.log ('PRELOADING :: "img/bg/'+checkThis+'"');
				jQuery.preLoadImages ( 'img/'+defaultDirectory+'/'+checkThis );
				checkIfImagesArePreloaded ( 'img/'+defaultDirectory+'/'+checkThis );
			}
		}
	}

	// This jQuery function is for preloadling images
	(function($) {
		var cache = [];
	  	// Arguments are image paths relative to the current page.
	  	$.preLoadImages = function() {
		    	var args_len = arguments.length;
		    	for (var i = args_len; i--;) {
		      		var cacheImage = document.createElement('img');
		      		cacheImage.src = arguments[i];
		      		cache.push(cacheImage);
		    	}
	  	}
	})(jQuery)

	// This function will check if the images are preloaded or even exist
	// Enable conslose.log it is good for debugging.
	function checkIfImagesArePreloaded (XX) {
		var myImg = new Image();
		myImg.onload = function(){
			//console.log ( 'loaded :: ' + this.src );
		}	    
		myImg.onerror = function(){
			//console.log ( 'error: ' + this.src + ' is not valid image' );
		}

		myImg.src = XX;
	}
	
});


// This extracts the values from the url string
function getUrlVarsForDirectory() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

