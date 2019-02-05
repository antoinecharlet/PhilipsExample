/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/
/* global variables */


function Exercise01ModelInit() {
	alert("Enter Exercise01ModelInit \n");
	// setTimeout(function(){setRcControlAll();},400);
	// setTimeout(function(){RegisterCallbacks();},400);
	// setRcControlAll();
	setRcControlSelective();
	RegisterCallbacks();
	alert("Exit Exercise01ModelInit \n");
}

/* assigning the callback function from the TV to another function*/
function RegisterCallbacks(){
	alert("Enter RegisterCallbacks \n");
	JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
	alert("Exit RegisterCallbacks \n");
}

/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON){
	alert("Enter WIXPResponseHandler \n");
	try {
		parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
		PrintLogsWIXPFromTV(parsedWIXPJSON);
		
		if (parsedWIXPJSON.Fun == "ProfessionalSettingsControl") {
			alert("ProfessionalSettingsControl !! \n");
		
		} else if (parsedWIXPJSON.Fun == "ChannelList") {
			channelListResponseFromTV(parsedWIXPJSON);
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
function sendWIxPCommand(command){
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

function switchToMainTuner(){
	alert("Entering switchToMainTuner !! \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1055;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "Source";
	JAPITObjForWIXPSvc.CommandDetails = {
		"TuneToSource": "MainTuner"
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
	alert("Exiting switchToMainTuner !! \n");
}

function activateTeletext(){
	alert("Activate Teletext \n");

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1021;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"ApplicationDetails" :
		{ "ApplicationName" : "Teletext" ,
			"ApplicationAttributes" : 
			{
				"TeletextPage": 120,
				"TeletextSubcode": 34 
			}

		},
		"ApplicationState": "Activate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function deactivateTeletext() {
	alert("Deactivate Teletext \n");

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1022;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"ApplicationDetails" :
		{ "ApplicationName" : "Teletext" ,
		},
		"ApplicationState": "Deactivate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function setRcControlAll(){
	alert("sent AllVirtualKeyForward \n");
	
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1011;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode"   : "AllVirtualKeyForward"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function setRcControlExTxt() {
	alert("setRcControlExTxt called \n");

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1013;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode"   : "ForwardAllExceptVirtualKeysRequiredForTeletext"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function setRcControlSelective(){
	alert("Enter setRcControlSelective called \n");

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1012;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode" : "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded" :
			[
			// { "vkkey" : "HBBTV_VK_POWER" }, // not existing 
			// { "vkkey" : "HBBTV_VK_MYCHOICE" },
			// { "vkkey" : "HBBTV_VK_CLOCK" },
			// { "vkkey" : "HBBTV_VK_SMARTTV" },
			// { "vkkey" : "HBBTV_VK_CHANNELGRID" },
			// { "vkkey" : "HBBTV_VK_ALARM" },
			// { "vkkey" : "HBBTV_VK_SMARTINFO" },
			// { "vkkey" : "HBBTV_VK_SOURCE" },
			// { "vkkey" : "HBBTV_VK_TV" },
			// { "vkkey" : "HBBTV_VK_FORMAT" },
			// { "vkkey" : "HBBTV_VK_HOME" }, // not existing
			// { "vkkey" : "HBBTV_VK_PLAY_PAUSE" }, // previously was VK_OSRC
			// { "vkkey" : "HBBTV_VK_GUIDE" },
			// { "vkkey" : "HBBTV_VK_UP" }, // not existing
			// { "vkkey" : "HBBTV_VK_INFO" },
			{ "vkkey" : "HBBTV_VK_LEFT" }, // not existing
			// { "vkkey" : "HBBTV_VK_ACCEPT" }, // not existing
			// { "vkkey" : "HBBTV_VK_RIGHT" }, // not existing
			// { "vkkey" : "HBBTV_VK_ADJUST" },
			// { "vkkey" : "HBBTV_VK_DOWN" }, // not existing
			// { "vkkey" : "HBBTV_VK_MENU" }, // options button
			// { "vkkey" : "HBBTV_VK_BACK_SPACE" }, // not existing
			// { "vkkey" : "HBBTV_VK_CHANNEL_UP" },
			// { "vkkey" : "HBBTV_VK_CHANNEL_DOWN" },
			// { "vkkey" : "HBBTV_VK_VOLUME_DOWN" },
			// { "vkkey" : "HBBTV_VK_VOLUME_UP" },
			// { "vkkey" : "HBBTV_VK_MUTE" },
			// { "vkkey" : "HBBTV_VK_RED" },
			// { "vkkey" : "HBBTV_VK_GREEN" },
			// { "vkkey" : "HBBTV_VK_BLUE" },
			// { "vkkey" : "HBBTV_VK_YELLOW" },
			// { "vkkey" : "HBBTV_VK_SUBTITLE" },
			// { "vkkey" : "HBBTV_VK_TEXT" }, // not existing
			// { "vkkey" : "HBBTV_VK_1" },
			// { "vkkey" : "HBBTV_VK_2" },
			// { "vkkey" : "HBBTV_VK_3" },
			{ "vkkey" : "HBBTV_VK_4" },
			// { "vkkey" : "HBBTV_VK_5" },
			{ "vkkey" : "HBBTV_VK_6" },
			// { "vkkey" : "HBBTV_VK_7" },
			{ "vkkey" : "HBBTV_VK_8" },
			// { "vkkey" : "HBBTV_VK_9" },
			// { "vkkey" : "HBBTV_VK_0" }
		]
	}

	sendWIxPCommand(JAPITObjForWIXPSvc);
	alert("Exit setRcControlSelective called \n");
}

function changeCDBstate(state) {
	alert("ActivateCustomDashBoard to " + state + " \n");

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1020;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"ApplicationDetails" :
		//{ "ApplicationName" : "SystemUI" },
		{ "ApplicationName" : "CustomDashboard" },// from htvlib 0.72 onwards
		"ApplicationState": state
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function keyDownHandler(e) {
	alert("Enter keyDownHandler keydown handler - key received " + e.keyCode + "  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n");
	//    if (evt.keyCode == 37) window.location.reload(true);
	// switch (e.keyCode) {
	
	// 	case VK_LEFT:
	// 		alert("arrow left pressed");
	// 		window.location.reload(true);
	// 		break;
	// }
	keyHandler(e.keyCode);
	alert("Exit keyDownHandler \n");
}

function OnKeyReceivedHandler(event) {
	
	// alert("Enter onKeyReceived - key received " + event + " ******************************** \n");
	var eventDetail = event.detail; //It contains key code and window ID                       
	var eventval = eventDetail.split(',');
	var keyStatus = parseInt(eventval[1]);
	var keyCode = -1;

	alert("Enter OnKeyReceivedHandler keystatus : " + keyStatus + "  keycode : " + keyCode + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n");
	
	if(keyStatus == 2){
		keyCode = parseInt(eventval[0]);
		keyHandler(keyCode);
	}
	// keyHandler(event);
	alert("Exit OnKeyReceivedHandler \n");
}


function keyHandler(keyCode) {
	alert("Enter keyHandler - key received " + keyCode + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n");
	try {
		switch (keyCode) {
			case VK_LEFT:
				alert("arrow left pressed");
				window.location.reload(true);
				break;
	
			case VK_4:
				alert("digit 4 pressed - CB OFF");
				// document.getElementById('DivIO').append("Press digit 5 to activate the dashboard again.");
				state = "Deactivate";
				changeCDBstate(state);
				break;

			// case VK_5:
				// document.getElementById('DivIO').append("Key 6 is pressed !!");
				// break;

			case VK_6:
				alert("digit 5 pressed - CB ON");
				state = "Activate";
				changeCDBstate(state);
				break;

			case VK_8:
				alert("digit 7 pressed - TXT ON ");
				activateTeletext();
				state = "Deactivate";
				changeCDBstate(state);
				break;

			default:
				alert("Nothing to handle \n");
				break;
		}
	}
	catch (e) {
		alert(e);
	}

	alert("Exit keyHandler \n");
}

