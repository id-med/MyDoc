if (isAndroid) {
  var tableHeight=6;
}else{
  var tableHeight=5;
}
var officesNumber=0;

var DWidth=  Ti.Platform.displayCaps.platformWidth;
var DHeight= Ti.Platform.displayCaps.platformHeight;

var OfficeTableView= Ti.UI.createTableView({
  height:DHeight/12*tableHeight,
  top:2,
  left:2
});
// 
if (!isAndroid) {
  OfficeTableView.separatorStyle=Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;  
};

//day name array
var dayNames=[
  'Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag','Feiertage'
];

var MedicPictureView=Ti.UI.createImageView({
  image:'http://data0.eklablog.fr/miki/mod_article1506219_1.png?9950',
  height:DHeight/12*2,
  width:DWidth/6*2,
  canScale:true,
  enableZoomControls:false,
  top:2,
  right:2
});

var OfficeOverView= Ti.UI.createView({
  layout:'vertical',
  width:DWidth/6*4,
  height:'auto',
  left:4
});

var MedicOverView= Ti.UI.createView({
  height:'auto'
});

var OfficeViewRow= Ti.UI.createTableViewRow({
  layout:'vertical',
  height:'auto'
});

// office and name of the medic
var OfficeLabel = Titanium.UI.createLabel({
  text:'praxis von '+respo.data.id,
  font:{fontWeight:'bold'},
  width:'auto',
  textAlign:'left',
  left:2,
  height:'auto',
  touchEnabled:false
});

// the name of the office and the street
var OfficeStreet = Titanium.UI.createLabel({
  text:respo.data.DoctorOffices[officesNumber].name+'\n'+respo.data.DoctorOffices[officesNumber].street,
  font:{fontWeight:'normal'},
  width:'auto',
  textAlign:'left',
  top:0,
  left:2,
  height:'auto',
  touchEnabled:false
});

// zipcode and city
var OfficePlace = Titanium.UI.createLabel({
  text:respo.data.DoctorOffices[officesNumber].zipcode+' '
       +respo.data.DoctorOffices[officesNumber].city,
  font:{fontWeight:'normal'},
  width:'auto',
  textAlign:'left',
  top:2,
  left:2,
  height:'auto',
  touchEnabled:false
});

// tel
var OfficeTel = Titanium.UI.createLabel({
  text:respo.data.DoctorOffices[officesNumber].telefon?
       respo.data.DoctorOffices[officesNumber].telefon:'keine telefon nummer',
  font:{fontWeight:'normal'},
  width:'auto',
  textAlign:'left',
  left:2,
  height:'auto',
  touchEnabled:false
});

// fax
var OfficeFax = Titanium.UI.createLabel({
  text:respo.data.DoctorOffices[officesNumber].fax?
       respo.data.DoctorOffices[officesNumber].fax:'keine fax nummer',
  font:{fontWeight:'normal'},
  width:'auto',
  textAlign:'left',
  left:2,
  height:'auto',
  touchEnabled:false
});

// opening times layout helper view
var OpeningTimesView= Ti.UI.createView({
  height:'auto',
  layout:'vertical',
  touchEnabled:false,
  top:2
});

// container for the different days
var OpeningTimes=[];

// insert as much days as possible =D
for (var i=0; i < dayNames.length; i++) {
  // push it in
  OpeningTimes.push(Ti.UI.createView({
    height:'auto',
    touchEnabled:false
  }));
  // then create the day name label
  OpeningTimes[i].add(Ti.UI.createLabel({
    text:dayNames[i],
    left:4,
    height:'auto',
    top:0,
    touchEnabled:false
  }));
  // and the place for the times
  OpeningTimes[i].add(Ti.UI.createLabel({
    text:'',
    right:2,
    height:'auto',
    top:0,
    width:DWidth/3*2,
    touchEnabled:false
  }));
};
  
// add them all to the view
for (var i=0; i < dayNames.length; i++) {
  OpeningTimesView.add(OpeningTimes[i]);
};

// hey its the "this day has not jet a time" array
// ... no seriously its just to show if the day already had a time gotten or not
var hasDaysTime=[
  {first:true},// mon
  {first:true},// tue
  {first:true},// wed
  {first:true},// thu
  {first:true},// fri
  {first:true},// sat
  {first:true},// sun
  {first:true} // hol
];
// go through the opening times
// and add the time to the singel days
for (var i = 0;i<respo.data.DoctorOffices[officesNumber].OpeningTimes.length;i++){
  // shorten the variable
  var day=respo.data.DoctorOffices[officesNumber].OpeningTimes[i];
  
  // switch each day TYPE up
  switch (day.type){
    case 'MONDAY':
      // will only say once coz its all the same
      
      // test if it already has a time gotten
      // if so put a line break at the end
      if (!hasDaysTime[0].first)
        {OpeningTimes[0].children[1].text+='\n';};
      // put the from and to time in the text
      OpeningTimes[0].children[1].text+=day.from+' - '+day.to;
      // now it has a time set...
      hasDaysTime[0].first=false;
    break;
    case 'TUESDAY':
      if (!hasDaysTime[1].first)
        {OpeningTimes[1].children[1].text+='\n';};
      OpeningTimes[1].children[1].text+=day.from+' - '+day.to;
      hasDaysTime[1].first=false;
    break;
    case 'WEDNESDAY':
      if (!hasDaysTime[2].first)
        {OpeningTimes[2].children[1].text+='\n';};
      OpeningTimes[2].children[1].text+=day.from+' - '+day.to;
      hasDaysTime[2].first=false;
    break;
    case 'THURSDAY':
      if (!hasDaysTime[3].first)
        {OpeningTimes[3].children[1].text+='\n';};
      OpeningTimes[3].children[1].text+=day.from+' - '+day.to;
      hasDaysTime[3].first=false;
    break;
    case 'FRIDAY':
      if (!hasDaysTime[4].first)
        {OpeningTimes[4].children[1].text+='\n';};
      OpeningTimes[4].children[1].text+=day.from+' - '+day.to;
      hasDaysTime[4].first=false;
    break;
    case 'SATURDAY':
      if (!hasDaysTime[5].first)
        {OpeningTimes[5].children[1].text+='\n';};
      OpeningTimes[5].children[1].text+=day.from+' - '+day.to;
      hasDaysTime[5].first=false;
    break;
    case 'SUNDAY':
      if (!hasDaysTime[6].first)
        {OpeningTimes[6].children[1].text+='\n';};
      OpeningTimes[6].children[1].text+=day.from+' - '+day.to;
      hasDaysTime[6].first=false;
    break;
    case 'HOLIDAY':
      if (!hasDaysTime[7].first)
        {OpeningTimes[7].children[1].text+='\n';};
      OpeningTimes[7].children[1].text+=day.from+' - '+day.to;
      hasDaysTime[7].first=false;
    break;
    // there is no need for a default is there???
    // ok maybe an alert
    default:
    alert('there is a wrong day type');
  } 
}
  // check if any day has no time and set the text to closed
for (var day=0; day < hasDaysTime.length; day++) {
  if(hasDaysTime[day].first)
    OpeningTimes[day].children[1].text='geschlossen';
};

var OptionsViewLayer= Ti.UI.createView({
  height:DHeight/12*2,
  bottom:0,
  left:0
});

var OptionsView= Ti.UI.createView({
  height:DHeight/12*2,
  layout:'horizontal',
  bottom:0
});

var NewsLayer= Ti.UI.createView({
  height:DHeight/12*2,
  width:DWidth/6*2,
  top:0,
  left:0
});

var NewsImageView= Ti.UI.createImageView({
  id:'NewsButton',
  image:'/images/news_icon.png',
  canScale:true,
  enableZoomControls:false,
  top:0,
  left:0
});

var NewsNumber= Ti.UI.createLabel({
  text:'5',// TODO insert json here
  top:(DHeight/12*2)/2,
  left:(DWidth/6*2)/2,
  font:{fontSize:40,fontweight:'bold'}
})
NewsLayer.add(NewsImageView);
NewsLayer.add(NewsNumber);

var InfoLayer= Ti.UI.createView({
  height:DHeight/12*2,
  width:DWidth/6*2,
  top:0,
  left:0
});

var InfoImageView= Ti.UI.createImageView({
  id:'InfoButton',
  image:'/images/content_icon.png',
  canScale:true,
  enableZoomControls:false,
  top:0,
  left:0
});
InfoLayer.add(InfoImageView);

var MapLayer= Ti.UI.createView({
  height:DHeight/12*2,
  width:DWidth/6*2,
  top:0,
  left:0
});

var MapImageView= Ti.UI.createImageView({
  id:'MapButton',
  image:'/images/gmap_icon.png',
  height:DHeight/12*2,
  width:DWidth/6*2,
  canScale:true,
  enableZoomControls:false,
  clickable:true,
  MD_medic:'muhkuh',// TODO insert json medic name
  top:0,
  left:0,
});

MapLayer.add(MapImageView);

var win = Titanium.UI.currentWindow;

var buttonsClicked=[{
  NewsButton:false,InfoButton:false,MapButton:false
}];

// get tab group object
var tabGroup = win.tabGroup;

function buttonEvents(e){
  if (e.source.id== 'NewsButton' && !buttonsClicked.NewsButton){
    // TODO must be changed
    var win = Titanium.UI.createWindow({
      url:'json_test.js',
      title:'json',
      backgroundColor:'#000',
      //infoAgain:true,
      // to open a new window on stack write this line
      // it even works fine with the android return button
      fullscreen:false
    });
    Ti.UI.currentTab.open(win,{animated:true});
    buttonsClicked.NewsButton=true;
    setTimeout(function(){
      buttonsClicked.NewsButton=false;
      },5000);
  }else if (e.source.id=='InfoButton' && !buttonsClicked.InfoButton){
    // TODO must be changed
    var win = Titanium.UI.createWindow({
      url:'/others/map.js',
      title:Ti.Platform.displayCaps.platformWidth,
      backgroundColor:'#000',
      //infoAgain:true,
      // to open a new window on stack write this line
      // it even works fine with the android return button
      fullscreen:false
    });
    Ti.UI.currentTab.open(win,{animated:true});
    buttonsClicked.InfoButton=true;
    setTimeout(function(){
      buttonsClicked.InfoButton=false;
    },5000);
  }else if (e.source.id=='MapButton' && !buttonsClicked.MapButton){
    var win = Titanium.UI.createWindow({
      url:'/others/map.js',
      title:e.source.MD_medic+' Location',// TODO insert json medic name
      backgroundColor:'#000',
      place:respo.data.DoctorOffices[0].name,
      lat:respo.data.DoctorOffices[0].lat,
      lng:respo.data.DoctorOffices[0].lng,
      //infoAgain:true,
      // to open a new window on stack write this line
      // it even works fine with the android return button
      fullscreen:false
    });
    Ti.UI.currentTab.open(win,{animated:true});
    buttonsClicked.MapButton=true;
    setTimeout(function(){
      buttonsClicked.MapButton=false;
    },5000);
  }
}


OptionsView.add(NewsLayer);
OptionsView.add(InfoLayer);
OptionsView.add(MapLayer);
OptionsView.addEventListener('click',buttonEvents);

var VacationTableView=Ti.UI.createTableView({
  height:DHeight/12*2,
  width:DWidth,
  top:0
});

var substData=[];

for (var substs=0; substs < 5/* TODO insert JSON here */; substs++) {
  var row=Ti.UI.createTableViewRow({
    height:'auto',
    touchEnabled:false
  });
  
  row.add(Ti.UI.createLabel({
    // TODO insert JSON here
    text:'von da bis daa',
    height:'auto',
    left:2,
    touchEnabled:false
  }));
  
  row.add(Ti.UI.createLabel({
    // TODO insert JSON here
    text:'der arzt hier',
    id:'substName',
    height:'auto',
    right:2,
    textAlign:'right',
    touchEnabled:true
  }));
  // the data for the click event
  row._medicID='10005';
  row._medicName='dr. wayne';
  substData.push(row);
};
VacationTableView.setData(substData);

OfficeOverView.add(OfficeLabel);
OfficeOverView.add(OfficeStreet);
OfficeOverView.add(OfficePlace);
OfficeOverView.add(OfficeTel);
OfficeOverView.add(OfficeFax);

MedicOverView.add(OfficeOverView);
MedicOverView.add(MedicPictureView);

OfficeViewRow.add(MedicOverView);
OfficeViewRow.add(OpeningTimesView);
var data=[];

data.push(OfficeViewRow);


OfficeTableView.setData(data);

MainView.add(OfficeTableView);
MainView.add(VacationTableView);
OptionsViewLayer.add(OptionsView);

win.add(OptionsViewLayer);
