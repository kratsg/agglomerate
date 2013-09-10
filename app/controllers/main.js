require("helper");
var XHR = require("xhr");
var xpng = require('xpng');

if (OS_IOS && !Alloy.CFG.nav){
	Alloy.CFG.nav=$.nav;
}


function openwin(windowName){
	xpng.openWin(Alloy.CFG.nav,windowName);
}

$.buttonNotification.addEventListener('click', function(){
	openwin('notification');
});

$.buttonHistory.addEventListener('click',function(){
	openwin('history');
});

$.buttonSuggestion.addEventListener('click',function(){
	openwin('suggestion');
});

$.buttonUser.addEventListener('click',function(){
	openwin('user');
});

$.buttonYes.addEventListener('click',function(){
	openwin('yes');
});
