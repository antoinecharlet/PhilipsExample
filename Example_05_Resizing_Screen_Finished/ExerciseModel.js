/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/

function Exercise01ModelInit()
{
	vidObject.bindToCurrentChannel();
}

var VideoDiv = document.getElementById("vidDiv");

function fullScreen() {
        VideoDiv.style.width = "100%";
        VideoDiv.style.height = "100%";
        VideoDiv.style.right = "0px";
        VideoDiv.style.top = "0px";
}
    
function smallScreen() {
        VideoDiv.style.width = "75%";
        VideoDiv.style.height = "75%";
        VideoDiv.style.right = "0px";
        VideoDiv.style.top = "0px"; 
}

function smallerScreen() {
        VideoDiv.style.width = "50%";
        VideoDiv.style.height = "50%";
        VideoDiv.style.right = "0px";
        VideoDiv.style.top = "0px"; 
} 

function muchSmallerScreen() {
        VideoDiv.style.width = "25%";
        VideoDiv.style.height = "25%";
        VideoDiv.style.right = "0px";
        VideoDiv.style.top = "0px"; 
}