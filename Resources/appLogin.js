// create the 2 windows for each tab
var InfoWindow = Titanium.UI.createWindow({  
  layout:'vertical',
  backgroundColor:BGC
});

var LoginWindow= Ti.UI.createWindow({
  layout:'vertical',
  backgroundColor:BGC,
  url:'/others/login.js'
});

var RegistrationWindow= Ti.UI.createWindow({
  layout:'vertical',
  backgroundColor:BGC,
  url:'/others/register.js'
});

// create the 2 tabs
var InfoTab = Titanium.UI.createTab({  
    icon:'/images/'+'KS_nav_views.png',
    title:'MyDoc',
    window:InfoWindow
});

var LoginTab = Titanium.UI.createTab({  
    icon:'/images/'+'KS_nav_ui.png',
    // TODO ver.1+ language
    title:'Login',
    window:LoginWindow
});

var RegistrationTab= Ti.UI.createTab({
  //icon:'',
  title:'Registration',
  window:RegistrationWindow
})

// ##########################
// got file from parent js
// contains MyDocSettings.txt

var InfoRow= Ti.UI.createTableViewRow({
});

InfoRow.add(Ti.UI.createLabel({
  text:'logen sie sich mit einem schon existierendem account ein oder registrieren sie einen neuen',
  width:'auto',
  height:'auto',
  top:0,
  left:0
}));

var InfoScroll=Ti.UI.createTableView({
  height:DHeight,
  width:DWidth/3*2,
  left:5,
  top:5
});

if (!isAndroid) {
  InfoScroll.separatorStyle=Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;  
};

InfoScroll.setData([InfoRow]);

InfoWindow.add(InfoScroll);

tabGroup.addTab(InfoTab);  
tabGroup.addTab(LoginTab);
tabGroup.addTab(RegistrationTab);  
