
Cufon.replace('#randomQuotes', { fontFamily: 'Myriad Pro' });
Cufon.replace('#clickSendEmailInfo', { fontFamily: 'Myriad Pro' });
//Setup Weather Fonts

Cufon.replace('#weather1stRow', { fontFamily: 'Myriad Pro' });
Cufon.replace('#weather2ndRow', { fontFamily: 'Myriad Pro' });
Cufon.replace('#weather3rdRow', { fontFamily: 'Myriad Pro' });
Cufon.replace('#weather5thRow', { fontFamily: 'Myriad Pro' });
Cufon.replace('#myLocation', { fontFamily: 'Myriad Pro' });

Cufon.replace('#myDateAndTimeRight', { fontFamily: 'Myriad Pro' });
Cufon.replace('#theDate', { fontFamily: 'Myriad Pro' });
Cufon.replace('#mpdInfoRightTop', { fontFamily: 'Myriad Pro' });
Cufon.replace('#mpdInfoRightBottom', { fontFamily: 'Myriad Pro' });
Cufon.replace('#clickSendEmailInfo', { fontFamily: 'Myriad Pro' });

Cufon.replace('#theDay', { fontFamily: 'Haettenschweiler' });

Cufon.replace('#photoCredit', { fontFamily: 'Myriad Pro' });


// Set default Name
var defaultName = getUrlVars()["title"];
//var theTitle = decodeURI (theTitle);
if (defaultName==undefined) {
	defaultName="Motion Design's Studio";
}

//Strip out the weird characters
defaultName = defaultName.replace(/%20/g, " ");
defaultName = defaultName.replace(/%27/g, "'");


angular.element(document).ready(function () {
	//Change the welcome name
	var myWelcomeMessage = angular.element( document.querySelector( '#welcomeMessage' ) );
	myWelcomeMessage.text("Greetings, " + defaultName); 
	// Cufon.replace("#welcomeMessage");
	Cufon.replace('#welcomeMessage', { fontFamily: 'Myriad Pro' });

	//var myIp="";
	//var myLocationInfo="";
	//var myurl = "http://bot.whatismyipaddress.com";

	/*
	$.ajax({
	  dataType: "jsonp",
	  url: myurl ,
	  }).done(function ( data ) {
		myIp = data;
		//console.log (myIp);
	});
	*/

	// Begin Getting users Geoloaction Info
	var myPostal = '';

	$.getJSON('http://ipinfo.io', function(data){
		$( '<div id="locationId">'+data.city.toUpperCase()  + ', '+ data.region.toUpperCase() + ' '+ data.country+'</div>' ).appendTo( ".locationInfoInside" );
		// Must recall this to get the font face on the dynmaic text
		Cufon.replace('#locationInfo', { fontFamily: 'Myriad Pro' });

		myPostal = data.postal;
		hackToGetPostalValue();

		//Send Wan Ip
		displayWanIp(data.ip);
	}); 

	// End Getting users Geoloaction Info


	
	// Begin Weather Stuff

	function hackToGetPostalValue () {
		//http://api.wunderground.com/api/bd042b2f03044fd5/geolookup/conditions/q/IA/19146.json
	
		$.getJSON('http://api.wunderground.com/api/bd042b2f03044fd5/geolookup/conditions/q/IA/'+myPostal+'.json', function(data){

			$("#weatherWind").text ( data.current_observation.wind_string );
			Cufon.replace('#weatherWind', { fontFamily: 'Myriad Pro' });

			$("#weatherFahrenheitTemp").text( data.current_observation.temp_f + " ° |");
			Cufon.replace('#weatherFahrenheitTemp', { fontFamily: 'Myriad Pro' });

			$("#weatherCelsiusTemp").text( data.current_observation.temp_c + " ° " );
			Cufon.replace('#weatherCelsiusTemp', { fontFamily: 'Myriad Pro' });

			$("#weatherweatherFeelsLikeFahrenheitTemp").text( data.current_observation.feelslike_f + " ° |");
			Cufon.replace('#weatherweatherFeelsLikeFahrenheitTemp', { fontFamily: 'Myriad Pro' });

			$("#weatherweatherFeelsLikeCelsiusTemp").text( data.current_observation.feelslike_c + " ° " );
			Cufon.replace('#weatherweatherFeelsLikeCelsiusTemp', { fontFamily: 'Myriad Pro' });

			$("#weatherIs").text( data.current_observation.weather );
			Cufon.replace('#weatherIs', { fontFamily: 'Myriad Pro' });

			// Update icon to match the weather conditions
			changWeatherIcon ( data.current_observation.weather );

			$("#weatherHumidity").text( data.current_observation.relative_humidity );
			Cufon.replace('#weatherHumidity', { fontFamily: 'Myriad Pro' });

			$("#weatherPrecipitation").text( data.current_observation.precip_today_in );
			Cufon.replace('#weatherPrecipitation', { fontFamily: 'Myriad Pro' });

			// DO once TTS announcement
			if ( doneOnceUpdateGreetingMessage ){
				updateGreetingMessage( "Greetings, "+ defaultName+" the time is "+moment().format('h:mm a') + " and today's date is "+ moment().format('YYYY MM Do, dddd')+ ". The current weather condition is "+ data.current_observation.weather.toLowerCase() + " and the temperature is "+ data.current_observation.temp_f +" degress fahrenheit."  );
		
				doneOnceUpdateGreetingMessage = false;
			}
		
		}); 

		

	} 

// End Weather Stuff

	function changWeatherIcon (weatherConditions){
		//'./img/weatherIcons'
		// Convert to lowercase
		tmp = weatherConditions.toLowerCase().replace(/\s/g, '');
		tmp = tmp+".png";
		$('#weatherIcon').attr('src', './img/weatherIcons/'+tmp);
	}

	//changWeatherIcon ("Scattered Clouds");

	//Update Waether And Date Every Hour
	function updateWeatherAndDateEveryHour () {
		hackToGetPostalValue();
		runOnceForTheDate ();
		//console.log ("EVERY HOUR");
	}
	
	//Update weather and date every hour
	setInterval(updateWeatherAndDateEveryHour, 3600000);
	//setInterval(updateWeatherAndDateEveryHour, 3000);

	// Begin time and date
	// Run once for the date
	function runOnceForTheDate (){
		$( "#theDateRow1" ).text( moment().format('YYYY') ); 
		Cufon.replace('#theDateRow1', { fontFamily: 'Myriad Pro' });
		$( "#theDateRow2" ).text( moment().format('MM.DD') ); 
		Cufon.replace('#theDateRow2', { fontFamily: 'Myriad Pro' });
		$( "#theDay" ).text( moment().format('ddd').toUpperCase() ); 
		Cufon.replace('#theDay', { fontFamily: 'Myriad Pro' });
	}
	runOnceForTheDate ();

	//Update date every hour interval
	//setInterval(runOnceForTheDate, 3600000);

	function dispayTheTimeAndDate (){
		var now = moment().format('h:mm:ss a');
		$( ".timeAndDateInfoInside" ).text( now ); 
		Cufon.replace('.timeAndDateInfoInside', { fontFamily: 'Myriad Pro' });
	
	}

		setInterval(dispayTheTimeAndDate, 1000);
	// End time and date

	// Begin Display WAN
	function displayWanIp (wanIp) {
			var myUrl = "http://"+wanIp.trim()+":8000/music.mp3";
			$( "#wanIpInfoInsideLink" ).text ("Remote Stream " + myUrl);
			$("#wanIpInfoInsideLink").prop("href", myUrl)
			Cufon.replace('#wanIpInfo', { fontFamily: 'Myriad Pro' });
	}
	//End Display Wan

	// Begin Diplay LAN
	$.ajax({
	  	type: "POST",
	  	url: "./scripts/getLocalIp.php",
	  	datatype: "html",
	  	success: function(data) {
	    		var myUrl = "http://"+data.trim()+":8000/music.mp3";
			$( "#lanIpInfoInsideLink" ).text ("Local Stream " + myUrl);
			$("#lanIpInfoInsideLink").prop("href", myUrl);
			Cufon.replace('#lanIpInfo', { fontFamily: 'Myriad Pro' });
	    	}
	});

	//End Display LAN


	// Begin Write text file for audio greeting
	var doneOnceUpdateGreetingMessage = true;
	function updateGreetingMessage(greetingMessage){
		data = { greetingString: greetingMessage }
		$.post('./scripts/tts.php', data, function(returnedData) {
    			// do something here with the returnedData
    			console.log(returnedData);
		});
	}

	// End Write text file for audio greeting




	//Begin update the email address to send text alert to
	function updateEmail(newEmailAddress){
		data = { emailAddress: newEmailAddress }
		$.post('./scripts/updateEmail.php', data, function(returnedData) {
    			// do something here with the returnedData
    			console.log(returnedData);
		});
	}
	
	//updateEmail 
	
	//I need to hide the element before it is displayed
	$(".sendEmailInside").hide();
		
	$( ".clickSendEmailInfoInside" ).click(function(){
		$( ".sendEmailInside" ).toggle("slow", function (){
			
			if ($( ".sendEmailInside" ).is(":visible")){
				$( ".clickSendEmailInfoInside" ).text( "Save Email :" );
			}else {
				$( ".clickSendEmailInfoInside" ).text( "Update Email :" );
				validate();
			}
			Cufon.replace('#clickSendEmailInfo', { fontFamily: 'Myriad Pro' });
		});		
	});

	// Begin Display the current email address being sent sever info 
	function displayCurrentEmail(){

		$.ajax ({
			url: './scripts/emailAddress.txt'
		}).done(function(content) {
			$( ".currentEmail").text(content);
			Cufon.replace('#clickSendEmailInfo', { fontFamily: 'Myriad Pro' });
		
		}); // End Done function
	
	}

	// I call this once at start to populate the div with the current email used 
	// to send server information to
	displayCurrentEmail ();
	// End Display the current email address being sent sever info


	// Begin Validate Email Adrress

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function validate() {
	  	var email = $("#input").text();
		 
		if (validateEmail(email)) {
			console.log("Valid Email");
			// This will only update the email address if valid
			updateEmail ($( "#input" ).text());
			displayCurrentEmail ();
		} else {
			if ($( "#input" ).text()!="Enter an email that will receive server information."){
				$( ".currentEmail").text('"'+email+'"' + " is not valid :(");
				Cufon.replace('#clickSendEmailInfo', { fontFamily: 'Myriad Pro' });

			}
	  	}
		return false;
		
	}

	// End Validate Email Address

	// Begin Roll over affect for the clients

	$("#mpdRompr").css('color', '#ffffff');	

	$( "#mpdRompr" ).mouseover(function() {
		$(this).css('color', '#b91f2d');
		Cufon.replace( this , { fontFamily: 'Myriad Pro' });
	});

	
	$( "#mpdRompr" ).mouseout(function() {
		$(this).css('color', '#ffffff');
		Cufon.replace( this , { fontFamily: 'Myriad Pro' });
	});

	$( "#mpdNetJukeBox" ).mouseover(function() {
		$(this).css('color', '#b91f2d');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( "#mpdNetJukeBox" ).mouseout(function() {
		$(this).css('color', '#ffffff');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( "#mpdOMPD" ).mouseover(function() {
		$(this).css('color', '#b91f2d');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( "#mpdOMPD" ).mouseout(function() {
		$(this).css('color', '#ffffff');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( "#mpdBragi" ).mouseover(function() {
		$(this).css('color', '#b91f2d');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( "#mpdBragi" ).mouseout(function() {
		$(this).css('color', '#ffffff');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});
	
	$( "#wanIpInfoInsideLink" ).mouseover(function() {
		$(this).css('color', '#b91f2d');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( "#wanIpInfoInsideLink" ).mouseout(function() {
		$(this).css('color', '#ffffff');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( "#lanIpInfoInsideLink" ).mouseover(function() {
		$(this).css('color', '#b91f2d');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( "#lanIpInfoInsideLink" ).mouseout(function() {
		$(this).css('color', '#ffffff');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( ".clickSendEmailInfoInside" ).mouseover(function() {
		$(this).css('color', '#b91f2d');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});

	$( ".clickSendEmailInfoInside" ).mouseout(function() {
		$(this).css('color', '#ffffff');
		Cufon.replace(this , { fontFamily: 'Myriad Pro' });
	});


	// Roll over affect for the power button
	var changeOnceAfterClick = false;

	$( "#powerButtonImage" ).mouseover(function() {
		if (changeOnceAfterClick == false ){
			$(this).attr('src', "./img/powerOn.png");
		}
	});

	$( "#powerButtonImage" ).mouseout(function() {
		if (changeOnceAfterClick == false ){
	  		$(this).attr('src', "./img/powerOff.png");
		}
	});

	$( "#powerButtonImage" ).mousedown(function() {
		if (changeOnceAfterClick == false) {
	  	changeOnceAfterClick = true;
			$(this).attr('src', "./img/powerOn.png");
		}
	});

});

// Return ranom number
function getRandomInt(minimum, maximum) {
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}


// This extracts the values from the url string
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
