function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.name = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "name"
    });
    $.__views.index.add($.__views.name);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    var mapview = Titanium.Map.createView({
        mapType: Titanium.Map.HYBRID_TYPE,
        region: {
            latitude: 37.389569,
            longitude: -122.050212,
            latitudeDelta: .1,
            longitudeDelta: .1
        },
        userLocation: true,
        animate: true,
        regionFit: true
    });
    mapview.addEventListener("complete", function(e) {
        Ti.API.info("complete");
        Ti.API.info(e);
    });
    mapview.addEventListener("error", function(e) {
        Ti.API.info("error");
        Ti.API.info(e);
    });
    mapview.addEventListener("loading", function(e) {
        Ti.API.info("loading");
        Ti.API.info(e);
    });
    mapview.addEventListener("regionChanged", function(e) {
        Ti.API.info("regionChanged");
        Ti.API.info(e);
    });
    Titanium.Geolocation.distanceFilter = 10;
    Ti.Geolocation.purpose = "To obtain user location for tracking distance travelled.";
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            alert("Sorry, but it seems geo location     is not available on your device!");
            return;
        }
        var longitude = e.coords.longitude;
        var latitude = e.coords.latitude;
        e.coords.altitude;
        e.coords.heading;
        e.coords.accuracy;
        e.coords.speed;
        e.coords.timestamp;
        e.coords.altitudeAccuracy;
        mapview.region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: .5,
            longitudeDelta: .5
        };
        var url = "http://appconglomerate-env-2dargnpmjn.elasticbeanstalk.com/api/locations/" + String(latitude) + "," + String(longitude);
        var data123 = {};
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                data123 = this.responseText;
                dic = JSON.parse(data123);
                $.name.text = dic[0].businesses[0].name;
                dic[0].businesses[0].location.display_address.forEach(function(e) {
                    $.name.text += "\n" + e;
                });
                Ti.API.info("Received text: " + this.responseText);
                alert("success");
                Titanium.API.log(data123);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert(url);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;