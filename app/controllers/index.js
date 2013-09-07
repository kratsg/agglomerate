function doClick(e) {  
    alert($.label.text);
}

$.index.open();
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
{  if(e.error)  
	{     
	  alert('Sorry, but it seems geo location     is not available on your device!');
	      return;   }   
	  
	  //get the properties from Titanium.GeoLocation   
	  
	  var longitude = e.coords.longitude;   
	  var latitude = e.coords.latitude;   
	  var altitude = e.coords.altitude;   
	  var heading = e.coords.heading;   
	  var accuracy = e.coords.accuracy;   
	  var speed = e.coords.speed;   
	  var timestamp = e.coords.timestamp;   
	  var altitudeAccuracy = e.coords.altitudeAccuracy;     
	  
	   //apply the lat and lon properties to our mapview   
	  
	  mapview.region = {latitude: latitude,
	  	    longitude: longitude,    
	  	 latitudeDelta:0.5,     
	  	 longitudeDelta:0.5   };
	  	 
 var url = "http://appconglomerate-env-2dargnpmjn.elasticbeanstalk.com/api/locations/"+String(latitude)+","+String(longitude);
 var data123 = {};
 var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
 
 
     onload : function(e) {
         data123 = this.responseText;
         dic=JSON.parse(data123);
		 $.name.text= dic[0].businesses[0].name;
 		 dic[0].businesses[0].location.display_address.forEach(function(e){
 		 	$.name.text+= "\n" + e ;
 		 });
 
         Ti.API.info("Received text: " + this.responseText);
         alert('success');
          Titanium.API.log(data123);
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert(url);
     },
     timeout : 5000  // in milliseconds
 });
 // Prepare the connection.
 client.open("GET", url);
 // Send the request.
 client.send();
  });
	  	

//making an http request to send lat and long info to our server