// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.ENV = 'dev';//'dev' or 'prod'
Alloy.Globals.API_URL_DEV = 'http://192.168.1.105:8000/api/';
Alloy.Globals.API_URL_PROD = 'http://appconglomerate-env-2dargnpmjn.elasticbeanstalk.com/api/';
Alloy.Globals.API_URL = (Alloy.Globals.ENV == 'dev') ? Alloy.Globals.API_URL_DEV : Alloy.Globals.API_URL_PROD;
