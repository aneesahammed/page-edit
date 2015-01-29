$(document).ready(function () {  
  console.log('===popup.js===');
  init();


  //==============================================
  //init
  //==============================================
  function init() {
    console.log('\ninitializing popup.js..');
    $('#titleId').focus();
    //resetPage();
    checkToggleState();
  }


  //==============================================
  //events
  //==============================================

  $('#titleId').keyup(function (e) {
  if (e.which == 13) {
    console.log("Enter");
    var titleText = $('#titleId').val();
    if (titleText) {
      query(titleText);
    }
  }
});



  //onChangeBtnClick
  $('#changeId').click(function () {
    console.log('change click');
    var titleText = $('#titleId').val();
    if (titleText) {
      query(titleText);
    } 
    else {
      resetPage();
    }
  });

//onClick
  $('#toggleId').click(function(event) {
    console.log('toggle click');

    var $this = $(this);
    if ($this.val()=="Edit") {
      $this.val("Reset");
      $('#cb1').attr('checked', 'true');
    }      
    else 
      $this.val("Edit");

    queryToggle();
  });

  

 
 //==============================================
 //functions
 //==============================================
  function query(titleStr) {
    chrome.tabs.query({active: true,currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {task: 'changeTitle',titleString: titleStr}, function (response) {
      }); //sendMessage
    }); //query
  }
});


function queryToggle()
{
  chrome.tabs.query({active: true,currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {task: 'toggleEdit'}, function (response) {
      }); //sendMessage
    }); //query
}


function checkToggleState(){
  chrome.tabs.query({active: true,currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {task: 'checkToggleState'}, function (response) {
        console.log("response ==> " + response.isEditMode);
        if(response.isEditMode == 'true'){
          $('#toggleId').val("Reset");
          $('#cb1').attr('checked', 'true');
        }
      }); //sendMessage
    }); //query
}




function resetPage(){
chrome.tabs.query({active: true,currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {task: 'resetPage'}, function (response) {
      }); //sendMessage
    }); //query  
}
