var win= Ti.UI.currentWindow;

var file= Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'MyDocSettings.txt');
file.write('');

win.add(Ti.UI.createLabel({
  text:'mac:'+Ti.Platform.macaddress,
  width:'200',
  backgroundColor:'blue',
  font:{fontWeight:'bold'}
}))
