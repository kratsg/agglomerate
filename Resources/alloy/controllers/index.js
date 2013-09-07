function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
    require("/helper");
    var XHR = require("/xhr");
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
            alert("Sorry, but it seems geo location is not available on your device!");
            return 0;
        }
        mapview.region = {
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            latitudeDelta: .5,
            longitudeDelta: .5
        };
        var url = "http://appconglomerate-env-2dargnpmjn.elasticbeanstalk.com/api/locations/";
        url += encodeURIComponent(e.coords.latitude) + "," + encodeURIComponent(e.coords.longitude);
        var onSuccess = function(result) {
            dic = JSON.parse(result.data);
            $.name.text = dic[0].businesses[0].name;
            dic[0].businesses[0].location.display_address.forEach(function(el) {
                $.name.text += "\n" + el;
            });
            Ti.API.info("Received data: " + JSON.stringify(result));
            alert("success");
        };
        var onError = function(result) {
            Ti.API.debug(JSON.stringify(result));
            alert("There was an error in making the request.");
        };
        var xhr = new XHR();
        xhr.get(url, onSuccess, onError, {
            ttl: 5,
            contentType: "application/json"
        });
        xhr.get("http://httpbin.org/headers", function(result) {
            Ti.API.log(JSON.stringify(result));
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;