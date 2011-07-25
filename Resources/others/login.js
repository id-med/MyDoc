var isAndroid= Ti.Platform.osname == 'android'?true:false;

var DWidth=  Ti.Platform.displayCaps.platformWidth;
var DHeight= Ti.Platform.displayCaps.platformHeight;

var win= Ti.UI.currentWindow;

var MainView= Ti.UI.createView({
  layout:'vertical',
  top:0,
  left:0,
  height:'auto',
  width:DWidth
});

/**
 * ############################################################################
 * ATTENTION
 * ALL PARENTAL VIEWS TO A TEXTFIELD MUST BE AT LEAST THE SIZE OF THE TEXTFIELD
 * ELSE IT CANT BE FOCUSED WITH CLICKING
 * i tought so... it seems to work now AFTER i have done this *cry*
 * ############################################################################
 */
var RegisterTitleLabel= Ti.UI.createLabel({
  text:'Login',
  top:0,
  left:5,
  width:DWidth/3*2,
  height:'auto'
});
var LoginLayer= Ti.UI.createView({
  layout:'vertical',
  left:0,
  top:0,
  height:'auto',
  width:DWidth/3*2
});

var LoginLabel= Ti.UI.createLabel({
  text:'login/e-mail',
  left:10,
  top:10,
  width:'auto',
  height:'auto'
});

var LoginTextField= Ti.UI.createTextField({
  color:'#336699',
  height:isAndroid?'auto':35,
  top:5,
  left:10,
  width:isAndroid?'auto':DWidth/3*2-10,
  borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
  autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

var PWLayer= Ti.UI.createView({
  layout:'vertical',
  left:0,
  top:0,
  height:'auto',
  width:DWidth/3*2
});

var PWLabel= Ti.UI.createLabel({
  text:'Passwort',
  top:10,
  left:10,
  width:'auto',
  height:'auto'
});

var PWTextField= Ti.UI.createTextField({
  color:'#336699',
  height:isAndroid?'auto':35,
  top:5,
  left:10,
  width:isAndroid?'auto':DWidth/3*2-10,
  borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
PWTextField.passwordMask=true;

LoginLayer.add(LoginLabel);
LoginLayer.add(LoginTextField);

PWLayer.add(PWLabel);
PWLayer.add(PWTextField);


MainView.add(RegisterTitleLabel);
MainView.add(LoginLayer);
MainView.add(PWLayer);

var SubmitButton= Ti.UI.createButton({
  height:isAndroid?'auto':35,
  width: 100,
  title:'login',
  right:10
});

MainView.add(SubmitButton);
win.add(MainView);

// ####################################
//var phoneMac= Ti.Platform.macaddress;

var JsonWindow= win;
Ti.include('/others/http_requester.js');

SubmitButton.addEventListener('click',function(e){
  if (LoginTextField.value=='') {
    alert('geben sie einen nutzernamen ein')
  }else if (PWTextField.value=='') {
    alert('geben sie ein passwort ein')
  }else{
    loGister='login';
    win.remove(MainView);

    httpRequest({
      url:'http://mydoc.id-med.de/?login_email='+LoginTextField.value+'&login_password='+PWTextField.value+'&create_session=0&return=json&module=mydoc&sektion=my_doctors',
      fileDoTo:'/others/json_content/loGister.js'
    });
  }
  
});


