
console.log('Welcome to content.js');



//==============================================
//Chrome message listener
//============================================== 
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.task === 'changeTitle') {
    console.log('TitleString =>' + request.titleString);
    changeTitle(request.titleString);
  } 
  else if (request && request.task == 'checkToggleState') {
    sendResponse({isEditMode :document.body.contentEditable});
  } 
  else if (request && request.task == 'toggleEdit') {
    toggleEdit();
  }
});



function changeTitle(titleStr) {
  document.title = titleStr;
}

function resetPage() {
  console.log('resetting page..');
}

function toggleEdit(){
  console.log('on toggle==> ' + document.body.contentEditable);

  switch(document.body.contentEditable){
    case 'inherit':
    case 'false':
      document.body.spellcheck=false;
      document.body.contentEditable = true;
      document.designMode='on';
      void 0;
      break;
    case 'true':
      document.body.contentEditable = false;
      document.body.spellcheck=true;
      document.designMode='off';
      break;
    default:
      console.log("default");
      break;
  }
}

function checkToggleState(){
  toggleEdit();
}