var days=[
  {type:'SUNDAY',day:''},
  {type:'MONDAY',day:''},
  {type:'TUESDAY',day:''},
  {type:'WEDNESDAY',day:''},
  {type:'THURSDAY',day:''},
  {type:'FRIDAY',day:''},
  {type:'SATURDAY',day:''},
  {type:'HOLIDAY',day:''}
];
/**
 * this file will be called through the http requester
 * and will be done if the request is finished
 */
var DWidth=  Ti.Platform.displayCaps.platformWidth;
var DHeight= Ti.Platform.displayCaps.platformHeight;
// iphone has a title bar that can be changed
// android has it only on every other window but the start
// also the botom tabbar isnt there in android
if (!isAndroid) {
  JsonWindow.title="MyDoc's";
  var tableHeight=7;
  
}else{
  var tableHeight=8;  
}
// tableView for the medics
var MedicTableView= Ti.UI.createTableView({
  height:DHeight/12*tableHeight,
  width:DWidth,
  top:2
});

// the view for the buttons to switch between days
// (yesterday-today-tomorrow)
var MedicCalendarView=Ti.UI.createView({
  layout:'horizontal',
  height:DHeight/12
});

// the view for the different options
// (refresh-search-emergency)
var OptionsView=Ti.UI.createView({
  layout:'horizontal',
  height:DHeight/12
});

//########################################
// the 3 day switch buttons 
var YesterdayButton= Ti.UI.createButton({
  id:'yesterday',
  backgroundImage:'/images/'+'left_arrow.png',
  left:0,
  height:DHeight/12,
  width:DWidth/6
});

// TODO get date  from file
var lastUpdate= new Date();
var today= new Date()

var TodayButton= Ti.UI.createButton({
  id:'today',
  //backgroundImage :'/images/'+'refresh_icon.png',
  title:'heute\n'+lastUpdate.toLocaleDateString()==today.toLocaleDateString?lastUpdate.toLocaleTimeString:lastUpdate.toLocaleDateString(),
  left:0,
  height:DHeight/12,
  width:DWidth/6*4
});

var TomorrowButton= Ti.UI.createButton({
  id:'tomorrow',
  backgroundImage:'/images/'+'right_arrow.png',
  left:0,
  height:DHeight/12,
  width:DWidth/6
});

// add to view
MedicCalendarView.add(YesterdayButton);
MedicCalendarView.add(TodayButton);
MedicCalendarView.add(TomorrowButton);

// the 3 option buttons
var RefreshButton= Ti.UI.createButton({
  id:'RefreshButton',
  backgroundImage :'/images/'+'refresh_icon.png',
  left:0,
  height:DHeight/12,
  width:DWidth/6
});

var SearchButton= Ti.UI.createButton({
  id:'RefreshButton',
  backgroundImage :'/images/'+'search_icon.png',
  left:0,
  height:DHeight/12,
  width:DWidth/6*2.5
});

var EmergencyButton= Ti.UI.createButton({
  id:'RefreshButton',
  backgroundImage :'/images/'+'emergency_icon.png',
  left:0,
  height:DHeight/12,
  width:DWidth/6*2.5
});

// add to view
OptionsView.add(RefreshButton);
OptionsView.add(SearchButton);
OptionsView.add(EmergencyButton);

//NewsButton.addEventListener('click',buttonEvents);
//InfoButton.addEventListener('click',buttonEvents);
//MapButton.addEventListener('click',buttonEvents);

// add everything to the window
JsonWindow.add(MedicTableView);
JsonWindow.add(MedicCalendarView);
JsonWindow.add(OptionsView);

// data array will be filled with pushing
var data=[];

for (var i = 0;i<respo.data.length;i++){
//  Ti.API.info('##################################################################################');
//  Ti.API.info('##################################################################################');
//  Ti.API.info('##################################################################################');
  var medic= respo.data[i];

  
  // the row
  var row  = Ti.UI.createTableViewRow({
  });
  var MedicLayer= Ti.UI.createView({
    left:0,
    layout:'vertical'
  });
  
  // the name
  var MedicLabel= Ti.UI.createLabel({
    text:medic.lastname,
    font:{fontSize:16,fontWeight:'bold'},
    width:'auto',
    textAlign:'left',
    left:2,
    height:20
  });
  
  // the vacation time
  var VacationLabel =  Ti.UI.createLabel({
    text:'from here to there',//CustomData[i].vacation,
    font:{fontSize:12,fontWeight:'bold'},
    width:'auto',
    textAlign:'left',
    bottom:2,
    left:22,
    height:20
  });
  
  var StatusView= Ti.UI.createView({
    layout:'horizontal',
    // you must type manuely the width of this view coz titanium sucks
    // (well actually it went flying through the other side id you type in auto or nothing)
    // there is an extra space for 2 extra views so that the pictures have space between em
    width:140,
    top:0,
    right:2
  });

  var isThere=false;
  var today=new Date();
  
  for (var office=0; office < medic.DoctorOffices.length; office++) {
    for (var j=0; j < medic.DoctorOffices[office].OpeningTimes.length; j++) {
      if(medic.DoctorOffices[office].OpeningTimes[j].type==days[today.getDay()].type){
        isThere=true;
      }
    }
  }
  
  // the status
  var StatusImage =  Ti.UI.createImageView({
    id:'id_status',
    image:isThere?'/images/status1.png':'/images/status2.png',
    canScale:true,
    enableZoomControls:false,
    width:40,
    height:40,
    top:2,
    right:0
  });
  
  // the subst
  var SubstImage =  Ti.UI.createImageView({
    id:'id_subst',
    image:medic.AbsencePeriods.length?
      medic.AbsencePeriods[0].SubstituteDoctor.id!=0?
        '/images/has_subst_icon.png':
        '/images/has_no_subst_icon.png':
      '/images/has_no_subst_icon.png',
    canScale:true,
    enableZoomControls:false,
    width:40,
    height:40,
    top:2,
    right:0
  });
  
  //the phone
  var PhoneImage =  Ti.UI.createImageView({
    id:'id_phone',
    // TODO has no phone icon needed
    image:medic.DoctorOffices[0].telefon?'/images/'+'phone_icon.png':'phone_icon.png',
    phoneNumber:medic.DoctorOffices[0].telefon?medic.DoctorOffices[0].telefon:'',
    canScale:true,
    enableZoomControls:false,
    width:40,
    height:40,
    top:2,
    right:0
  });

  StatusView.add(StatusImage);
  // the extra space view so they have some space between
  StatusView.add(Ti.UI.createView({
    width:10
  }))
  StatusView.add(SubstImage);
  // the extra space view so they have some space between
  StatusView.add(Ti.UI.createView({
    width:10
  }))
  StatusView.add(PhoneImage);
  
  // put all togetha
  MedicLayer.add(MedicLabel);
  MedicLayer.add(VacationLabel);

  row.add(MedicLayer)
  row.add(StatusView);  

  

  // set child flag
  row.hasChild=false;
  // give url for the new window
  row._url      = '/others/medicInfo.js';
  
  // additional data for the next window
  row._medicName= medic.lastname;
  row._medicID  = medic.id;
  // dummy for layout class (for the news)
  if (true) {
    
  } else{
    row.className= 'coutry_row';
  }
  // mix em togetha
  data.push(row);
}
// button functions
function buttonEvents(e){
  if (e.source.id== 'NewsButton'){
    var win = Ti.UI.createWindow({
      url:'json_test.js',
      // TODO must be changed
      title:'json',
      backgroundColor:'#000',
      //infoAgain:true,
      // to open a new window on stack write this line
      // it even works fine with the android return button
      fullscreen:false
    });
    win.open();
  }else if (e.source.id=='InfoButton'){

    
    var win = Ti.UI.createWindow({
      url:'map.js',
      title:Ti.Platform.displayCaps.platformWidth,
      backgroundColor:'#000',
      //infoAgain:true,
      // to open a new window on stack write this line
      // it even works fine with the android return button
      fullscreen:false
    });
    win.open();
  }else if (e.source.id=='MapButton'){
    var win = Ti.UI.createWindow({
      url:'/others/map.js',
      title:e.source.MD_medic+' Location',
      backgroundColor:'#000',
      place:respo.data.DoctorOffices[0].name,
      lat:respo.data.DoctorOffices[0].lat,
      lng:respo.data.DoctorOffices[0].lng,
      //infoAgain:true,
      // to open a new window on stack write this line
      // it even works fine with the android return button
      fullscreen:false
    });
    //win.open();
  };
};

/**
 * event handler for the whole table excluded the images
 * e= the (e)lement clicked
 */
MedicTableView.addEventListener('click', function(e){
  if (e.source.id== 'id_status'){
    // TODO click on status icon
  }else if (e.source.id== 'id_subst'){
    // TODO click on subst icon http req
  }else if (e.source.id== 'id_phone'){
    // TODO click on phone icon direct phoning
  }else{
    // all other row clicks
      var win = Ti.UI.createWindow({
        url:e.rowData._url,
        title:e.rowData._medicName+' Info',
        backgroundColor:BGC,
        medicID:e.rowData._medicID
      });
      if (!isAndroid) {
        win.barColor='#111'
      };
    // open in the current tab (which is ContentTab)
    ContentTab.open(win,{animated:true});
  }
});

MedicTableView.setData(data);
