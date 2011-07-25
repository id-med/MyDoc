var SuccessView= Ti.UI.createView({
  width:isAndroid?'auto':DWidth,
  height:DHeight/12*8  
});

if(respo.success){
  var loGisterText=loGister=='login'?'angemeldet':'registriert'
  var finishingTouch = isAndroid?'drücken sie ok und starten sie die app neu':'drücken sie ok um fortzufahren'
  var successText = 'herzlichen glückwunsch sie haben sich erfolgreich '+loGisterText+'\n\n'+
                    'inzukunft wird die app sofort ihr MyDoc liste starten\n\n'+finishingTouch
  
}else{
  var successText = 'ihr nutzername oder passwort ist nicht correct\n\n'+
                    'drücken sie auf ok und überprüfen sie ihren nutzernamen und ihr passwort'
}
SuccessView.add(Ti.UI.createLabel({
  text:successText
}));

var okButton= Ti.UI.createButton({
  title:'ok',
  bottom:30,
  right:30,
  width:100,
  height:isAndroid?'auto':35
});

JsonWindow.add(SuccessView);
SuccessView.add(okButton);


okButton.addEventListener('click',function(e){
  if (respo.success) {
    
    var file= Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'MyDocSettings.txt');
    var settings={
      user:{
        name:LoginTextField.value,
        password:PWTextField.value
      },
      settings:{
        vacationTimeLimit:10,
        statusAccuracy:'days',
        refreshOptionNow:true,
        emergencyRadius:20
      }
    };
    
    file.write(JSON.stringify(settings));
   
    Ti.UI.currentWindow.tabGroup.close();
    if (!isAndroid) {
      Ti.include('/app.js');
    }
    
  }else{
    JsonWindow.remove(SuccessView);
    //JsonWindow.remove(okButton);
    JsonWindow.add(MainView);
  }
});

