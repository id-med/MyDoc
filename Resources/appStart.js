/**
 * this file is the standard mydoc list
 * it will be shown if the user is registered
 */

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
  url:'http://mydoc.id-med.de/?login_email='+settings.user.name+'&login_password='+settings.user.password+'&create_session=0&return=json&module=mydoc&sektion=my_doctors',
  fileDoTo:'/others/json_content/myDocs.js'
});

// add tabs to the tabgroup
tabGroup.addTab(ContentTab);  
tabGroup.addTab(SettingsTab);  
