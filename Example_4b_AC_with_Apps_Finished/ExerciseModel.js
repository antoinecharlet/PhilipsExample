/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/
/* global variables */

var CurrentAvailableApplicationList = ["com.google.android.youtube.tv"];
var CurrentAvailableApplicationListIndex = -1;
var CDBState = "Activate";

function Exercise01ModelInit() {
	alert("Enter Exercise01ModelInit \n");
	RegisterCallbacks();
	SelectiveKeyForward();
	GetAllApplications();
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
		
		if (parsedWIXPJSON.Fun == "ApplicationControl") {
			
			alert("parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList.length = " + parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList.length + "\n");
			if(parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList.length > 0)
			{
				var index = 0;
				var i = 0;
				for(i = 0; i < parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList.length; i++)
				{
					if(parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList[i].ApplicationType == "NonNative")
					{
						if(
							(parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList[i].ApplicationName == "SmartInfo") || 
							(parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList[i].ApplicationName == "CustomDashboard") || 
							(parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList[i].ApplicationName == "HbbTV")
							)
						{
								
						}
						else
						{
							CurrentAvailableApplicationList[index] = parsedWIXPJSON.CommandDetails.CurrentAvailableApplicationList[i].ApplicationName;
							alert("CurrentAvailableApplicationList[" + index + "]" + CurrentAvailableApplicationList[index] + "\n");
							index++;
						}
					}
				}
			}
		}
		else {
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

function SelectiveKeyForward(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 475;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"VirtualKeyForwardMode" : "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded" : 
		[
			{
				"Vkkey" : "HBBTV_VK_MENU"
			}, 
			{
				"vkkey" : "HBBTV_VK_CHANNELGRID"
			},
			{
				"vkkey" : "HBBTV_VK_RED"
			},
			{
				"vkkey" : "HBBTV_VK_GREEN"
			},
			{
				"vkkey" : "HBBTV_VK_BLUE"
			}, 
			{
				"vkkey" : "HBBTV_VK_YELLOW"
			}, 
			{
				"vkkey" : "HBBTV_VK_ALARM"
			},
			{
				"vkkey" : "HBBTV_VK_CLOCK"
			},
			{
				"vkkey" : "HBBTV_VK_SMARTTV"
			},
			{
				"vkkey" : "HBBTV_VK_FORMAT"
			},
			{
				"vkkey" : "HBBTV_VK_POWER"
			},
			{
				"vkkey" : "HBBTV_VK_SOURCE"
			},
			{
				"vkkey" : "HBBTV_VK_OSRC"
			},
			{
				"vkkey" : "HBBTV_VK_TV"
			},
			{
				"vkkey" : "HBBTV_VK_SMARTINFO"
			},
			{
				"vkkey" : "HBBTV_VK_MYCHOICE"
			},
			{
				"vkkey" : "HBBTV_VK_INFO"
			},
			{
				"vkkey" : "HBBTV_VK_SLEEP"
			},
			{
				"vkkey" : "HBBTV_VK_CHANNEL_UP"
			},
			{
				"vkkey" : "HBBTV_VK_CHANNEL_DOWN"
			},
			/*
			{
				"vkkey" : "HBBTV_VK_VOLUME_DOWN"
			},
			*/
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
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
		{ "ApplicationName" : "CustomDashboard" },
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
			case VK_ACCEPT:
				alert("VK_ACCEPT pressed \n");
				if(document.activeElement.onclick)
				{
					//alert(document.activeElement.tagName + ".onclick called \n");
					document.activeElement.onclick();
				}
				else
				{
					//alert(document.activeElement.tagName + "Nothing called \n");
				}
				break;
			
			case VK_MENU:
				alert("VK_MENU pressed\n");
				if(CDBState == "Deactivate")
				{
					CDBState = "Activate";
				}
				else
				{
					CDBState = "Deactivate";
				}
				changeCDBstate(CDBState);
				break;
			
			case VK_SMARTTV:
				alert("VK_SMARTTV pressed\n");
				LaunchNonNativeAndroidApp("Activate");
				break;
				
			case VK_INFO:
				alert("VK_INFO pressed \n");
				GetAllApplications();
				break;
			
			case VK_RED:
				alert("VK_RED pressed \n");
				LaunchNonNativeAndroidApp("Deactivate");
				break;
			
			case VK_LEFT:
				alert("arrow left pressed \n");
				window.location.reload(true);
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

function LaunchNonNativeAndroidApp(state)
{
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	alert("0 CurrentAvailableApplicationList.length = " + CurrentAvailableApplicationList.length + "\n");
	if(state == "Activate")
	{
		if(CurrentAvailableApplicationListIndex >= (CurrentAvailableApplicationList.length - 1))
		{
			CurrentAvailableApplicationListIndex = 0;
			alert("1 CurrentAvailableApplicationList[" + CurrentAvailableApplicationListIndex + "]" + CurrentAvailableApplicationList[CurrentAvailableApplicationListIndex] + "\n");
		}
		else
		{
			CurrentAvailableApplicationListIndex++;
			alert("2 CurrentAvailableApplicationList[" + CurrentAvailableApplicationListIndex + "]" + CurrentAvailableApplicationList[CurrentAvailableApplicationListIndex] + "\n");
		}
	}
	else
	{
		if(CurrentAvailableApplicationListIndex <= -1)
		{
			CurrentAvailableApplicationListIndex = 0;
			alert("3 CurrentAvailableApplicationList[" + CurrentAvailableApplicationListIndex + "]" + CurrentAvailableApplicationList[CurrentAvailableApplicationListIndex] + "\n");
		}
		else
		{
			
		}
	}
	
	JAPITObjForWIXPSvc.Cookie  = 1094;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": 
		{
			"ApplicationName": CurrentAvailableApplicationList[CurrentAvailableApplicationListIndex],
			"ApplicationType": "NonNative"
		},
		"ApplicationState": state
	};
	
	if(state == "Activate")
	{
		
	}
	else
	{
		if(CurrentAvailableApplicationListIndex <= -1)
		{
			CurrentAvailableApplicationListIndex = 0;
			alert("3 CurrentAvailableApplicationList[" + CurrentAvailableApplicationListIndex + "]" + CurrentAvailableApplicationList[CurrentAvailableApplicationListIndex] + "\n");
		}
		else
		{
			alert("4 CurrentAvailableApplicationList[" + CurrentAvailableApplicationListIndex + "]" + CurrentAvailableApplicationList[CurrentAvailableApplicationListIndex] + "\n");
			CurrentAvailableApplicationListIndex--;
		}
	}

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function GetAllApplications()
{
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	alert("Enter GetAllApplications \n");
	JAPITObjForWIXPSvc.Cookie  = 1092;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"RequestListOfAvailableApplications": 
		{
			"Filter": 
			[
				"Native",
				"NonNative"
			]
		}
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
	alert("Exit GetAllApplications \n");
}
