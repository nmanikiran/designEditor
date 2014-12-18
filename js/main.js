 var haveExecCommand = false;
 var loaded = false;
 var editable = null;
 var viewPre = null;

 function getExecCommand() {
     try {
         if (!!document.execCommand) haveExecCommand = true;
         else alert('This browser does not support the document editing API.');
     } catch (e) {
         alert('This browser does not support the document editing API.');
     }
 }

 function format(cmd, promptString, myvalue) {
     var value = myvalue || null;
     if (!loaded || !haveExecCommand) return true;

     if (promptString && !value) value = prompt(promptString);
     document.execCommand(cmd, true, value);
     document.execCommand("enableObjectResizing", false, "true");
     document.execCommand("enableInlineTableEditing", false, "true");
     loadView();
 }

 function loadView() {
     viewPre.textContent = editable.innerHTML;
 }

 function printDoc() {
     var oPrntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
     oPrntWin.document.open();
     oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + editable.innerHTML + "<\/body><\/html>");
     oPrntWin.document.close();
 }

 function selectChange(cmd,selectedValue) {
     format(cmd, null, selectedValue);
 }

 function fullscreen(){
    var element = document.getElementById('editable');
    if(element.requestFullscreen){
        element.requestFullscreen();
    }else if(element.webkitRequestFullscreen){
        element.webkitRequestFullscreen();
    }else if(element.mozRequestFullscreen){
        element.mozRequestFullscreen();
    }else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
    }
 }
 function init() {
     loaded = true;
     getExecCommand();
     editable = document.getElementById('editable')
     viewPre = document.getElementById('viewPre');

     document.execCommand('styleWithCSS', false, true);
     editable.onblur = loadView;
     loadView();
 }

 window.onload = init;
