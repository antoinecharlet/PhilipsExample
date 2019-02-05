/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/
/* global variables */

var totalNumOfChannels = 0;
var channelsReceived = 0;
var start = 1;
var j = 0;
var chanNumArray = [];
var chanNameArray = [];
var chanTypeArray = [];


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
		
		if (parsedWIXPJSON.Fun == "ChannelSelection") {
			HandleChannelSelectionResponse(parsedWIXPJSON);
		} else if (parsedWIXPJSON.Fun == "ChannelList") {
			HandleChannelListResponse(parsedWIXPJSON);
		} else if (parsedWIXPJSON.Fun == "AudioLanguage") {
			HandleAudioLanguageResponse(parsedWIXPJSON);
		} else {
			alert("Do nothing !! \n");
		}
	} catch(e) {
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
	this.SvcVer = "3.0";
	this.Cookie = 222;
}

function switchToSource(Source){
	alert("Entering switchToSource !!");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1055;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "Source";
	JAPITObjForWIXPSvc.CommandDetails = {
		"TuneToSource": Source
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	alert("Exiting switchToSource !!");
}

function SelectChannelByNumber(channelNum) {
	// alert("Enter selectChannelFromTV \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1051;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
 			"ChannelNumber": channelNum,
 		}
 	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
	// alert("Exit selectChannelFromTV \n");
}

/*  a function to get the number of channels that exist on the TV by sending a WIXP command with the required details  */
function GetNumberOfChannelsInTV() {

	alert("Enter GetNumberOfChannelsInTV \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1050;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {	
			"ContentLevel" : "NumberOfChannels",            		/* ContentLevel can have one of the following values: "BasicChannelDetails", "CompleteChannelDetails", or "NumberOfChannels" */
			"Filter": ["ALL"]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
	alert("Exit GetNumberOfChannelsInTV \n");
}

/*  a function to get the channels details from the TV by sending a WIXP command with the required details  */
function requestChannelsFromTV(start) {

	alert("Enter requestChannelsFromTV \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1055;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {	
			"ContentLevel" : "BasicChannelDetails",            		/* "BasicChannelDetails" "CompleteChannelDetails" "NumberOfChannels" */
			"SearchDirection":"CURRENT",							/* <string>, <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
			"SearchFromChannelNumber": start,							/* 1 to _WIXP_MAX_CHANNELS_SUPPORTED, <integer>, <<OPTIONAL> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
   			"Loop":"Yes",											/* <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
			"NumberOfChannels": 40, 					/* <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
			"Filter": ["ALL"]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);

	alert("Exit requestChannelsFromTV \n");
}

function getAudioLang(){

	alert("Enter getAudioLang \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1060;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "AudioLanguage";

	sendWIxPCommand(JAPITObjForWIXPSvc);

	alert("Exit getAudioLang \n");
}


