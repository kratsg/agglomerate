require("helper");
var XHR = require("xhr");
var xpng = require('xpng');

var xhr = new XHR();

var fontawesome = require('IconicFont').IconicFont({
	font: 'FontAwesome',
	ligature: false	// optional
});

Alloy.CFG.red = "red";

$.mainwin.statusBarStyle = Titanium.UI.iPhone.StatusBar.DEFAULT;

Alloy.CFG.nav=$.nav;

if (OS_ANDROID){
	$.index.open();
}
else {
	$.nav.open();
}