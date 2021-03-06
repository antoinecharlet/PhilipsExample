/* 
*	Example_10_RC
*/

/* a function to refresh the page */

var fAlertLog= false;

function Logout(message)	{
	if (fAlertLog)	{
		alert(message + "\n");
	} else {
		console.log(message);
	}
}

function UtilityInit() {
	document.getElementById('logmsgcallback').style.fontSize = "10px";
	document.getElementById('logmsg').style.fontSize = "10px";

	document.getElementById('logmsgcallback').style.color = "green";
	document.getElementById('logmsg').style.color = "blue";

	UtilityToggleLogsWindow();
}

function UtilityRefreshPage() {
	window.location.reload(true);
}

function SetupUserAgent() {
	if (navigator.userAgent.toUpperCase().match('PHILIPS')) {
		fAlertLog = true;
	}
}


/* a function to showLogs the page */
function UtilityToggleLogsWindow() {
	if (document.getElementById('logmsgcallback').style.visibility == "hidden") {

		document.getElementById('IDJAPITFromTV').style.visibility = "visible";
		document.getElementById('IDJAPITToTV_Misc').style.visibility = "visible";
		document.getElementById('IdHeadingLogMsgCallback').style.visibility = "visible";
		document.getElementById('IdHeadingLogMsg').style.visibility = "visible";



		document.getElementById('logmsgcallback').style.visibility = "visible";
		document.getElementById('logmsg').style.visibility = "visible";

		document.getElementById('ButtonToggleLogs').innerHTML = "Hide Logs";

	}
	else {
		document.getElementById('logmsgcallback').style.visibility = "hidden";
		document.getElementById('logmsg').style.visibility = "hidden";
		document.getElementById('IdHeadingLogMsgCallback').style.visibility = "hidden";
		document.getElementById('IdHeadingLogMsg').style.visibility = "hidden";

		document.getElementById('IDJAPITFromTV').style.visibility = "hidden";
		document.getElementById('IDJAPITToTV_Misc').style.visibility = "hidden";

		document.getElementById('ButtonToggleLogs').innerHTML = "Show Logs";
	}
}

function UtilityClearLogsWindow() {
	document.getElementById("logmsg").value = '';
	document.getElementById("logmsg").scrollTop = document.getElementById("logmsg").scrollHeight;

	document.getElementById("logmsgcallback").value = '';
	document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;
}

function PrintLogsWIXPToTV(Log) {
	var FormattedJSON = JSON.stringify(Log, null, 4);

	document.getElementById("logmsg").value += '\n' + FormattedJSON + '\n';
	document.getElementById("logmsg").scrollTop = document.getElementById("logmsg").scrollHeight;
}

function PrintLogsWIXPFromTV(Log) {
	var FormattedJSON = JSON.stringify(Log, null, 4);

	document.getElementById("logmsgcallback").value += '\n' + FormattedJSON + '\n';
	document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;
}
