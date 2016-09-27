



angular.element(document).ready(function () {

	var startZindex = 16777271;
	// Create two divs dynamically that store the two images 
	$("#containerBgOutside").append('<div id="containerBgInside"> <img src="#" id="showImageInside" />  </div>');

	$("#containerBgOutside").append('<div id="containerBgInside2"> <img src="#" id="showImageInside2" />  </div>');


	// Begin rotating BG
	var storeImagesInArray = new Array ();

	function getFilesForBG(location){
		data = { directoryTosearch: location }
		$.post('./scripts/listFiles.php', data, function(returnedData) {
			fadeImagesInAndOut ( );
			storeImagesInArray = JSON.parse (returnedData);



			//$("#containerBgOutside").append('<div id = "test" style=" position:absolute; z-index:7; top:0px; left: 0px;" ><h1> hello world </h1></div>');

			//$('#test').remove();
			// Call this to populate the array of images to preload
						
			randomlyPickPhotosAndPreloadThem ();

			// Add random photos
			//$( "#containerBgInside2" ).children('img').attr( 'src', "img/bg/"+ threeImagesArray [0] );
			$( "#containerBgInside2" ).children('img').attr( 'src', "img/bg/"+ threeImagesArray.shift() );
			//threeImagesArray.shift();
			$( "#containerBgInside" ).children('img').attr( 'src', "img/bg/"+ threeImagesArray.shift() );
			//threeImagesArray.shift();
			
			// Repopulate the array of three with two new photos
			randomlyPickPhotosAndPreloadThem ();
		});
	}

	getFilesForBG ("../img/bg");



	//var drawNum = Math.floor(Math.random() * drawCard.length);


	// This function fades the image out

	
	//fadeImagesInAndOut (["t1.jpg", "t2.jpg"]);
	function fadeImagesInAndOut(){
		//var drawNum = Math.floor(Math.random() * arrayOfImages.length);
		flipflop ();
		//var whichDivIsOnTop = flipflop ();
		// Check which div is on top
		//console.log ( "#showImageInside : " + $("#showImageInside").zIndex() +" #showImageInside2 : " + $("#showImageInside2").zIndex());

		//console.log ( drawNum );
		//$("#showImageInside").fadeOut(2000, 

		//$( thisDivIsOnTop ).fadeTo(0,4000);
		//$( thisDivIsOnTop ).delay( 4000 ).fadeOut(3000);

		//$(thisDivIsOnTop).delay( 4000 ).animate({opacity: 0}, 2000);


		/*
		$( thisDivIsOnTop ).delay( 4000 ).fadeOut(3000, 

			//console.log ( flipflop () );
			function(){

				//console.log  ( imageIdToRestore );
				//$( thisDivIsOnTop ).css('z-index', 4);
				
				//$( thisDivIsOnTop ).remove();
				$( thisDivIsBelow ).css('z-index', 5);

				//console.log ( whichDivIsOnTop+ " :: " + $( whichDivIsOnTop ).zIndex());
				//console.log ( $('#showImageOutside').attr('src') );
				//console.log ($('#containerBgInside').zIndex());
				//$('#containerBgInside').css('z-index', 7);
				//console.log ($('#containerBgInside').zIndex());

				//$('#showImageInside').attr( 'src', $('#showImageOutside').attr('src') );

				//$("#showImageInside").fadeIn();

				//$(thisDivIsOnTop).show();
				//console.log ( $('#showImageInside').attr('src') );
				//Randomly asign an image in the back to the showImageOutside div


				$( thisDivIsOnTop ).children('img').attr( 'src', "img/bg/"+ threeImagesArray [0] );

				//console.log (threeImagesArray);
				threeImagesArray.shift();
				//console.log (threeImagesArray);

				randomlyPickPhotosAndPreloadThem ();

				//$(thisDivIsOnTop).show();
				//$( thisDivIsOnTop ).children('img').attr('src', "img/bg/IMG_6344.JPG");

				//randomlyPickPhotosAndPreloadThem ();
				
				fadeImagesInAndOut ( );
				//console.log ( typeof (storeImagesInArray) + " :: " + storeImagesInArray );
			}
			

		); */
	}

	var arrayOfDiv = new Array ( "#containerBgInside", "#containerBgInside2");
	var arrayOfImagIn = new Array ( "#showImageInside", "#showImageInside2");
	var startHere = 1;
	var thisDivIsOnTop = '';
	var thisDivIsBelow = '';
	var imageIdToRestore = '';

	function flipflop (){
		//var sendMeBack = '';
		//console.log(startHere);
		if (startHere == 1){
			//sendMeBack = arrayOfDiv [startHere];
			thisDivIsOnTop = arrayOfDiv [startHere];
			imageIdToRestore = arrayOfImagIn [ startHere ];
			//console.log (startHere + " :: " + arrayOfDiv [startHere]);
			startHere = 0;
			
			thisDivIsBelow = arrayOfDiv [startHere];
			//return ( arrayOfDiv [startHere] );
		} else{
			//sendMeBack = arrayOfDiv [startHere];
			thisDivIsOnTop = arrayOfDiv [startHere];
			imageIdToRestore = arrayOfImagIn [ startHere ];
			//console.log (startHere + " :: " + arrayOfDiv [startHere]);
			startHere = 1;
			thisDivIsBelow = arrayOfDiv [startHere];
			//return ( arrayOfDiv [startHere] );
		}
		//console.log ( "CC :: "+ sendMeBack );
		//return ( sendMeBack );
		//return ( thisDivIsOnTop );
	}
		




	//Randomly pick three images and preload them
	// *** MUST have a minimum of three images to choose from ***
	var threeImagesArray = new Array ();
	function randomlyPickPhotosAndPreloadThem () {

		// Choose three unique images
		while (threeImagesArray.length < 3){
			//threeImages.push ("ADD STUFF");
			var checkThis = storeImagesInArray [ Math.floor(Math.random() * storeImagesInArray.length) ] ;
			if ($.inArray(checkThis , threeImagesArray ) ==-1){
				threeImagesArray.push ( checkThis );
				//console.log ('PRELOADING :: "img/bg/'+checkThis+'"');
				jQuery.preLoadImages ( 'img/bg/'+checkThis );
				checkIfImageIsLoaded ( 'img/bg/'+checkThis );
				//console.log ("checkThis : " + checkThis + " threeImagesArray : " + threeImagesArray );
			}
		}

		var myString= threeImagesArray.join('","img/bg/');
		myString = myString.concat('"');
		myString = '"img/bg/' + myString;

		//jQuery.preLoadImages ( myString );

		//console.log ( myString );
		/*
		console.log( threeImagesArray );
		console.log ( threeImagesArray [0] );
		threeImagesArray.shift();
		console.log( threeImagesArray );
		*/

	}

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



	function checkIfImageIsLoaded (XX) {
		var myImg = new Image();
		myImg.onload = function(){
			//console.log ( 'loaded :: ' + this.src );
		}	    
		myImg.onerror = function(){
			//console.log ( 'error: ' + this.src + ' is not valid image' );
		}

		myImg.src = XX;
	}
	

	function preload(preloadMePlease) {
		//console.log (" preloading");
	    $(preloadMePlease).each(function(){
		$('<img/>')[0].src = this;
		// Alternatively you could use:
		// (new Image()).src = this;
	    });
	}





});




