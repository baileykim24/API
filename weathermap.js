// Step 2: Ask students what kinds of information they need to start with:
//  -- Since this is a "Map API" - we probably need a map.
//  -- We also need to specify where to center the map!
//     Have the students go to Google and find out the
//     longitude and latitude of the SIP location.
//  -- In order to "see" the map and interact with it, we need
//     a view. A view is like a computer screen. The computer
//     can do processes without it, but we won't be able to see.
var ourLoc;
var view;
var map;

// Step 3: We should initalize our variables!
function init() {
	// Initalize things here
	ourLoc = ol.proj.fromLonLat([41.043316, 28.862457]);

	view = new ol.View({
		center: ourLoc,
		zoom: 6 // Students can play around with the starting zoom.
	});

	map = new ol.Map({
		target: 'map', // The "Target" is our <div> name.
		layers: [
		  new ol.layer.Tile({
		    source: new ol.source.OSM() // Explain: this is a required variable.
		  }) 
		  // Explain: Open Layer offers different types of layers. Layers are like
		  // different brushes used to make the same image. They look different.
		  // Some might take more time than others.
		],
		// Note from the View Animation website:
		// Improve user experience by loading tiles while animating. Will make
		// animations stutter on mobile or slow devices.
		loadTilesWhileAnimating: true,
		view: view
	});
}

function panHome() {
	view.animate({
		center: ourLoc, // "Home" Location
		duration: 2000  // Two seconds
	});
}
function makeCountryRequest() {
	// Step 2: add the basic values we know we'll need
	var countryName = document.getElementById("country-name").value;
    
    if(countryName === "") {
	 	alert("You didn't enter a country name!");
	 	return;
	}
    
    var query = "https://restcountries.eu/rest/v2/name/"+countryName;
	
    var lon = 0.0;
    var lat = 0.0;
    
    var query = "https://restcountries.eu/rest/v2/name/"+countryName
	// Step 3: Let's do some error checks and input modification
	// Explain: When we make requests in a browser, we want to 
	// replace spaces with %20.
	query = query.replace(/ /g, "%20")
	alert(query);
    
    var countryRequest = new XMLHttpRequest();
	countryRequest.open('GET', query, true);
    
    countryRequest.onload = processCountryRequest
    
    
    
    
    countryRequest.send();
    
    alert("Ready State " + countryRequest.readyState);
	alert("Status " + countryRequest.status);
	alert("Response" + countryRequest.responseText);
    
    if(countryRequest.readyState != 4 || countryRequest.status != 200 || countryRequest.responseText === "") {
	 	window.console.error("Request had an error!");
	 	return;
    }
    
    if (countryRequest.status != 200 || countryRequest.responseText === "") {
	 	alert("We were unable to find your requested country!");
	 	return;
    }
        
    var countryInformation = JSON.parse(countryRequest.responseText);
    
    var lat = countryInformation[0].latlng[0];
    var lon = countryInformation[0].latlng[1];
    
    window.console.log(countryName + ": lon " + lon + " & lat " + lat);
    
    
    
    var location = ol.proj.fromLonLat([lon, lat]);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    view.animate({
		center: location, // Location
		duration: 2050  // Two seconds
	});
}


// Step 4: We can run the init function when the window loads.
window.onload = init;