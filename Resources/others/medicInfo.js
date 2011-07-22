var isAndroid= Ti.Platform.osname == 'android'?true:false;
var win      = Ti.UI.currentWindow;
var DWidth   = Ti.Platform.displayCaps.platformWidth;
var DHeight  = Ti.Platform.displayCaps.platformHeight;

var MainView = Ti.UI.createView({
  layout:'vertical',
  height:'auto',
  top:0
});
win.add(MainView);
var login     = 'Superadmin';
var password  = 'kasten';
var medicID   = win.medicID;
var JsonWindow= win;

Ti.include('/others/http_requester.js')
httpRequest({
  url:'http://mydoc.id-med.de/?login_email='+login+'&login_password='+password+'&create_session=0&return=json&module=mydoc&sektion=my_doctors&id_doctor='+medicID,
  fileDoTo:'/others/json_content/info.js'
});

