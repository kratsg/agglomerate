//creates window
var win = Titanium.UI.createWindow({
	title:'Exercise Tracker',
	backgroundColor:'#000'
});

//create mapview

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

win.add(mapview);
win.open();
//add map to window


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

 
  	

//now we will conver lat and lon coords to an address

//create a search view 

var searchview = Titanium.UI.createView({
	top:0,
	left:0,
	width:320,
	height:110
});

//style it uo

var bottomBorder = Titanium.UI.createView({
	height:1,
	width:320,
	left:0,
	bottom:0,
	backgroundColor:'#000'
});
searchview.add(bottomBorder);

//add search box for start

var txtStartLocation = Titanium.UI.createTextField({
	backgroundColor:'#fff',
	left:10,
	top:20,
	width:200,
	height:30,
	borderColor:'#000',
	borderRadius:5,
	hintText:'Current Location',
	paddingLeft:10
});
searchview.add(txtStartLocation);



//add a search box for starting location 
var txtEndLocation = Titanium.UI.createTextField({  
	 backgroundColor: '#fff',  
	 left: 10,   
	top: 60,   
	width: 200,  
	 height: 30,   
	borderColor: '#000', 
	  borderRadius: 5,   
	hintText: 'End Location',  
	 paddingLeft: 10 }); 
	searchview.add(txtEndLocation); 
	
	//add the button with an empty click event, this will fire off 
	//our forwardGeocoder 
	
	var btnSearch = Titanium.UI.createButton({  
		 width: 80,   
		height: 30,  
		 top: 60,  
		 right: 10,  
		 backgroundImage: 'images/search.png',   
		borderRadius: 3 
	}); 
		
	//btnsearch event listener fires on button tap 
		
	btnSearch.addEventListener('click',function(e){  
			
		 });
 searchview.add(btnSearch);
 
 
 //btnsearch event listener fires on button tap 
 
 btnSearch.addEventListener('click',function(e){   
 	
 	//check for a start address   
 	if(txtStartLocation.value != '')   
 	{     
 		//works out the start co-ords
 	
 	 Ti.Geolocation.forwardGeocoder(txtStartLocation.value, function(e){  
 		     //we'll set our map view to this initial region so it   
 		    //appears on screen     
 		   mapview.region = {latitude: e.latitude,        
 		  	 longitude: e.longitude,         
 		  	latitudeDelta:0.5,         
 		  	longitudeDelta:0.5      
 		  	 };          
 		  	
 		 Ti.API.info('Start location co-ordinates are: ' +       
 		 e.latitude + ' lat, ' + e.longitude +       
 		 'lon');     
 		 });   
 		 }   
 		 else   
 		 {     
 		 	alert('You must provide a start address!');   
 		 	}   
 		 	//check for an end address   
 		 	if(txtEndLocation.value != '')   
 		 	{          
 		 		//do the same and work out the end co-ords     
 		 	Ti.Geolocation.forwardGeocoder(txtEndLocation.value, function(e){       
 		 		Ti.API.info('End location co-ordinates are: ' + e.latitude + ' lat, ' + 
 		 		e.longitude + ' lon');     
 		 		});   
 		 		}   
 		 		else   
 		 		{     
 		 			alert('You must provide an end address!');   
 		 			} 
 		 			
 		 			}); 






