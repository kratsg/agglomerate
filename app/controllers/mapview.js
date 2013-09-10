var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.HYBRID_TYPE,
		region: {latitude:37.389569, longitude:-122.050212,
						latitudeDelta:0.1, longitudeDelta:0.1},
		userLocation:true,
			 animate:true,
		regionFit:true
});

mapview.addEventListener('complete', function(e) {
Ti.API.info('complete');
Ti.API.info(e);
});
mapview.addEventListener('error', function(e) {
Ti.API.info('error');
Ti.API.info(e);
});
mapview.addEventListener('loading', function(e) {
Ti.API.info('loading');
Ti.API.info(e);
});
mapview.addEventListener('regionChanged', function(e) {
Ti.API.info('regionChanged');
Ti.API.info(e);
});

//set the distance filter 
Titanium.Geolocation.distanceFilter = 10; 

//apple now requires this parameter so it can inform the user //of why you are accessing their location data 
Ti.Geolocation.purpose = "To obtain user location for tracking distance travelled."; 

Titanium.Geolocation.getCurrentPosition(function(e) 
{
	if(e.error)
	{
		alert('Sorry, but it seems geo location is not available on your device!');
		return 0;
	}

		//apply the lat and lon properties to our mapview   
		mapview.region = {
			latitude: e.coords.latitude,
			longitude: e.coords.longitude,
			latitudeDelta:0.5,
			longitudeDelta:0.5
		};


	var url = "locations/"+encodeURIComponent(e.coords.latitude)+","+encodeURIComponent(e.coords.longitude);
	
	// function called on success
	var onSuccess = function(result) {
		dic=JSON.parse(result.data);
		$.name.text= dic[0].businesses[0].name;
		dic[0].businesses[0].location.display_address.forEach(function(el){
			$.name.text+= "\n" + el ;
		});

		Ti.API.info("Received data: " + result.data);
		alert('success');
	};
	
	// function called when an error occurs, including a timeout
	var onError = function(result) {
		Ti.API.debug(JSON.stringify(result));
		alert('There was an error in making the request.');
	};
	

	var xhr = new XHR();
	// create an XHR request and cache for 5 minutes
	xhr.get(Ti.App.API_URL+url,onSuccess,onError,{ttl: 5, contentType: 'application/json'});
});

//making an http request to send lat and long info to our server