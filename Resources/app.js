/**
 * this is the start file
 * it is to choose if the user is registered with the MyDoc website
 * if he isnt there will built a login window to input all the data and register with the website
 * if he already is (data will be taken from the file) the normal app will be loaded
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
var file= Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'MyDocSettings.txt');
var tabGroup = Titanium.UI.createTabGroup();



if (file.size==0) {
  Ti.include('/appLogin.js');
}else{
  var settings= JSON.parse(file.read().text);
  file.write('');
  
  //alert(settings.user.name)
  Ti.include('/appStart.js');
}



// open tab group
tabGroup.open();