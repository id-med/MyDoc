var isAndroid        = Ti.Platform.osname == 'android'?true:false;
var SettingsWindow   = Ti.UI.currentWindow;
// get size of device
var DWidth=  Ti.Platform.displayCaps.platformWidth;
var DHeight= Ti.Platform.displayCaps.platformHeight;

if (!isAndroid) {
  SettingsWindow.title='Einstellungen';
};

var data=[
  { title:'hilfe',url:'helpFile.js',hasChild:true},
  { title:'urlaubszeiten grenze',url:'vacationLimit.js',hasChild:true},
  { title:'status genauigkeit',url:'statusAccuracy.js',hasChild:true},
  { title:'aktualisierungs option',url:'refreshOption.js',hasChild:true},
  { title:'notdienst umkreis',url:'emergencyRadius.js',hasChild:true}
];
var rowData=[];

for (var i=0; i < data.length; i++) {
  var row= Ti.UI.createTableViewRow({
    height:'auto',
    width:'auto'
  });
  
  var TitelLabel= Ti.UI.createLabel({
    text:data[i].title,
    left:0,
    top:2,
    height:'auto',
    width:'auto'
  });
  
  row.add(TitelLabel);
  row.url='/others/settings/'+data[i].url;
  row.hasChild=data[i].hasChild;
  rowData.push(row);
};

/**
 * 
 */

var SettingsTableView= Ti.UI.createTableView({
  top:0,
  left:0,
  height:DHeight,
  width:DWidth,
  data:rowData,
  minRowHeight:10
});

SettingsTableView.addEventListener('click',function(e){
  if (e.rowData.url!=null) {
    if (isAndroid) {
      var win = Ti.UI.createWindow({
        url:e.rowData.url,
        title:e.rowData.title
      });
    } else {
      var win = Ti.UI.createWindow({
        url:e.rowData.url,
        title:e.rowData.title,
        backgroundColor:'#fff',
        barColor:'#111',
        fullscreen:false
      });
    }
    // open in the current tab
    Ti.UI.currentTab.open(win,{animated:true});
  }
});
SettingsWindow.add(SettingsTableView);



























