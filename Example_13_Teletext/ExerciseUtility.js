/* 
*
* This File contains some Utility Functions.
* This can be reused in as is or even modified freely.
*
*/

/* a function to refresh the page */

var fAlertLog = false;


function UtilityInit(){
	document.getElementById('logmsgcallback').style.fontSize = "13px";
	document.getElementById('logmsg').style.fontSize = "13px";

	document.getElementById('logmsgcallback').style.color = "green";
	document.getElementById('logmsg').style.color = "blue";

	//UtilityToggleLogsWindow();
}

function Logout(message) {
	try {
		if (fAlertLog) {
			alert(message + "\n");
		} else {
			console.log(message);
		}
	} catch (e) {
		window.alert("ERROR in Logout. " + e);
	}
}

function UtilityRefreshPage(){
	window.location.reload(true);
}

/* a function to showLogs the page */
function UtilityToggleLogsWindow(){
	if(document.getElementById('logmsgcallback').style.visibility == "hidden")
	{
		
		document.getElementById('IDJAPITFromTV').style.visibility = "visible";
		document.getElementById('IDJAPITToTV_Misc').style.visibility = "visible";
		document.getElementById('IdHeadingLogMsgCallback').style.visibility = "visible";
		document.getElementById('IdHeadingLogMsg').style.visibility = "visible";
		
		document.getElementById('logmsgcallback').style.visibility = "visible";
		document.getElementById('logmsg').style.visibility = "visible";
		
		document.getElementById('ButtonToggleLogs').innerHTML="Hide Logs";

	}
	else
	{
		document.getElementById('logmsgcallback').style.visibility = "hidden";
		document.getElementById('logmsg').style.visibility = "hidden";
		document.getElementById('IdHeadingLogMsgCallback').style.visibility = "hidden";
		document.getElementById('IdHeadingLogMsg').style.visibility = "hidden";
		
		document.getElementById('IDJAPITFromTV').style.visibility = "hidden";
		document.getElementById('IDJAPITToTV_Misc').style.visibility = "hidden";
		
		document.getElementById('ButtonToggleLogs').innerHTML="Show Logs";
	}
}

function UtilityClearLogsWindow()
{
	document.getElementById("logmsg").value = '';
	document.getElementById("logmsg").scrollTop=document.getElementById("logmsg").scrollHeight;
	
	document.getElementById("logmsgcallback").value = '';
	document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
	//window.open("http://www.google.com");
}

function PrintLogsWIXPToTV(Log)
{
	var FormattedJSON = JSON.stringify(Log, null, 4);
	
	document.getElementById("logmsg").value += '\n' + FormattedJSON + '\n';
	document.getElementById("logmsg").scrollTop=document.getElementById("logmsg").scrollHeight;
}

function PrintLogsWIXPFromTV(Log)
{
	var FormattedJSON = JSON.stringify(Log, null, 4);
	
	document.getElementById("logmsgcallback").value += '\n' + FormattedJSON + '\n';
	document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
}
