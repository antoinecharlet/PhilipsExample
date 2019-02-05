/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/

function Exercise01ModelInit()
{
	RegisterCallbacks();
}

/* assigning the callback function from the TV to another function*/
function RegisterCallbacks(){
	//alert("Enter RegisterCallbacks \n");
	JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
	//alert("Exit RegisterCallbacks \n");
}

/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON){
	alert("Enter WIXPResponseHandler \n");
	try {
		parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
		PrintLogsWIXPFromTV(parsedWIXPJSON);
		
		if (parsedWIXPJSON.Fun == "PowerState") {
			DisplayCurrentPowerState(parsedWIXPJSON);
		} 
		else {
			alert("Do nothing !! \n");
		}
	} catch(e){
		alert(e);
		return e;
	}
	alert("Exit WIXPResponseHandler \n");
}

/* function to send commands to TV */
function sendWIxPCommand(command) {
	alert("Enter sendWIxPCommand \n");
	try {
		var WIXPJSONStringForm = JSON.stringify(command);
		PrintLogsWIXPToTV(command);
		JAPITWIXPPlugin.WebIxpSend(WIXPJSONStringForm);
		alert("Exit sendWIxPCommand \n");
	}
	catch (e) {
		alert("Exit sendWIxPCommand: " + e + " \n");
	}
}

/* create some attributes of the WIXP object */
function CreateJAPITObjectForWIXPSvc(){
	this.Svc    = "WIXP";
	this.SvcVer = "1.0";
	this.Cookie = 222;
}

/* a function to send a "Request" command to the TV to get the system date and time */
function GetPowerState(){
	alert("Enter GetPowerState \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1050;
	JAPITObjForWIXPSvc.CmdType        = "Request";
	JAPITObjForWIXPSvc.Fun            = "PowerState";
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

/* a function to send a "Change" command to the TV to set the system date and time */
function ChangePower(newPowerState){
	alert("Enter ChangePower \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1060;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "PowerState";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ToPowerState":newPowerState
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
} 
