// get the current window and create a waiterview

var WaiterView= Ti.UI.createView({
  top:2,
  left:2
});
//must be out of the function to work properly
var respo;

var httpRequest = function(params) {
// add the wait text to the waitview
  WaiterView.add(Ti.UI.createLabel({
    text:'bitte warten\nDaten werden geladen und verarbeitet',
    font:{fontSize:15,fontWeight:'normal'},
    touchEnabled:false
  }));
  JsonWindow.add(WaiterView);
  
  // create the http client
  var xhr = Titanium.Network.createHTTPClient();  
  
  /**
   * set the onload function with all that has to happen
   * 
   * ###################################################
   * ATTENTION!!!
   * the http client is asynchron so u have to build
   * the window in the onload function
   * ###################################################
   */
  xhr.onload = function() {
    if(params.hasOwnProperty('fileDoTo')) {
      // parse the json and include the "do me" file 
      respo= JSON.parse(this.responseText);
      Ti.include(params.fileDoTo)
      // now u can remove the waiter window
      JsonWindow.remove(WaiterView);
    }  
  };
  /**
   * set some exceptions in the on error funtcion
   * or give some hints for the one that is debugging ur shit
   */
  xhr.onerror = function() {
      Ti.API.error(this.status + ' - ' + this.statusText);
      // error 0 occured wehn i had some syntax errors so he gets this error message in the debugger
      if (this.status==0) {
        Ti.API.error('maybe a syntax error somewhere in the code');
      };
      WaiterView.children[0].text='es ist ein fehler aufgetreten\nbitte probieren sie es nocheinmal oder melden sie das problem bei dem support';
  };  
  
  /**
   * dont be confused that here is the first time where the url is used
   * it has to be
   * dont ask
   * dont change
   */
  xhr.open( params.hasOwnProperty('method') ? params.method : 'GET', params.url);
  /**
   * pretty much self explaining think about it i bet u will get it
   */
  xhr.send();  
};