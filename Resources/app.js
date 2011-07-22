/**
 * this is the start file it will be called at first
 */
// android test
var isAndroid= Ti.Platform.osname == 'android'?true:false;
// android is black and iphone is white
// (resist the urge to write some stupid line after that)
if (isAndroid) {
  var BGC='#000'
}else{
  var BGC='#fff'
}
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor(BGC);

// get size of device
var DWidth=  Ti.Platform.displayCaps.platformWidth;
var DHeight= Ti.Platform.displayCaps.platformHeight;

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create the 2 windows for each tab
var ContentWindow= Ti.UI.createWindow({
  layout:'vertical',
  backgroundColor:BGC
});
var SettingsWindow = Titanium.UI.createWindow({  
  layout:'vertical',
  backgroundColor:BGC,
  url:'/others/settings.js'
});

// create the 2 tabs
var ContentTab = Titanium.UI.createTab({  
    icon:'/images/'+'KS_nav_views.png',
    title:'MyDoc',
    window:ContentWindow
});
var SettingsTab = Titanium.UI.createTab({  
    icon:'/images/'+'KS_nav_ui.png',
    // TODO ver.1+ language
    title:'Einstellungen',
    window:SettingsWindow
});

// include the http requester for the json stream
Ti.include('/others/http_requester.js');

// TODO get login and password from file
var login= 'Superadmin';
var password= 'kasten';
// set JSONWindow for the http requester file
var JsonWindow= ContentWindow;

/**
 * try to get the url and do what he must do in the fileDoTo
 */
httpRequest({
	url:'http://mydoc.id-med.de/?login_email='+login+'&login_password='+password+'&create_session=0&return=json&module=mydoc&sektion=my_doctors',
	fileDoTo:'/others/json_content/myDocs.js'
});

// add tabs to the tabgroup
tabGroup.addTab(ContentTab);  
tabGroup.addTab(SettingsTab);  

// open tab group
tabGroup.open();