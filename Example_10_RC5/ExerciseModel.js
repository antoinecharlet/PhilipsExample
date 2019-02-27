/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/

var cookie = 0;

var Keys__ = {
	"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
	"VirtualKeyMapDetails": [
		{	// This one is working, if it is set without others
			"RCProtocol": "RC5",
			"RCCode": 49,
			"RCSystem": 0,
			"MapToVirtualKey": "HBBTV_VK_SOURCE"
		},
		{	// this one cause an error
			"RCProtocol": "RC5",
			"RCCode": 38,
			"RCSystem": 0,
			"MapToVirtualKey": "HBBTV_VK_SLEEP"
		},
		{	// this one cause an error
			"RCProtocol": "RC5",
			"RCCode": 10,
			"RCSystem": 3,
			"MapToVirtualKey": "HBBTV_VK_SETTINGS"
		}

	]
};

function ExerciseModelInit() {
	try {
		RegisterCallbacks();
		var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
		JAPITObjForWIXPSvc.CmdType = "Change";
		JAPITObjForWIXPSvc.Fun = "UserInputControl";
		JAPITObjForWIXPSvc.CommandDetails = {
			"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
			"VirtualKeyToBeForwarded": [
				{ "Vkkey": "HBBTV_VK_SOURCE" }
			],
			"VirtualKeyMapDetails": [
				{
					"RCProtocol": "RC5",
					"RCCode": 49,
					"RCSystem": 0,
					"MapToVirtualKey": "HBBTV_VK_SOURCE"
				}
			]
		};
		sendWIxPCommand(JAPITObjForWIXPSvc);
	} catch (e) {
		Logout("exception in ExerciseModelInit()" + e);
	}

}

/* assigning the callback function from the TV to another function*/
function RegisterCallbacks() {
	//Logout("Enter RegisterCallbacks \n");
	JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
	//Logout("Exit RegisterCallbacks \n");
}



function keyDownHandler(e) {
	Logout("Enter keyDownHandler keydown handler - key received " + e.keyCode + "  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n");
	keyHandler(e.keyCode);
	Logout("Exit keyDownHandler \n");
}

function OnKeyReceivedHandler(event) {

	// Logout("Enter onKeyReceived - key received " + event + " ******************************** \n");


	try {
		var eventDetail = event.detail; //It contains key code and window ID                       
		var eventval = eventDetail.split(',');
		var keyStatus = parseInt(eventval[1]);
		var keyCode = -1;

		Logout("Enter OnKeyReceivedHandler keystatus : " + keyStatus + "  keycode : " + keyCode + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n");

		keyCode = parseInt(eventval[0]);
		Logout('OnKeyReceivedHandler(keyCode: ' + keyCode + ', Length: ' + eventval.length + ')');
		if (keyStatus == 2) {
			keyCode = parseInt(eventval[0]);
			keyHandler(keyCode);
		}

	} catch (e) {
		Logout("OnKeyReceiveHandler ERROR. " + e.message);
	}


	// keyHandler(event);
	Logout("Exit OnKeyReceivedHandler \n");
}


function keyHandler(keyCode) {
	Logout("Enter keyHandler - key received " + keyCode + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n");
	document.getElementById("idReceivedKey").innerHTML = "";

	try {
		switch (keyCode) {
			case VK_SOURCE:
				Logout("Received VK_SOURCE");
				document.getElementById("idReceivedKey").innerHTML = "VK_SOURCE";
				break;

			case VK_SETTINTS:
				Logout("Received VK_SETTINGS");
				document.getElementById("idReceivedKey").innerHTML = "VK_SETTINGS";
				break;

			case VK_SLEEP:
				Logout("Received VK_SLEEP");
				document.getElementById("idReceivedKey").innerHTML = "VK_SLEEP";
				break;

			default:
				break;
		}
	}
	catch (e) {
		Logout(e);
	}

	//Logout("Exit keyHandler \n");
}



/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON) {
	Logout("Enter WIXPResponseHandler \n");
	try {
		parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
		PrintLogsWIXPFromTV(parsedWIXPJSON);
		/*
		if (parsedWIXPJSON.Fun == "UserInputControl") {
			DisplayCurrentPowerState(parsedWIXPJSON);
		} 
		else {
			Logout("Do nothing !! \n");
		}
		*/
	} catch (e) {
		Logout(e);
		return e;
	}
	Logout("Exit WIXPResponseHandler \n");
}

/* function to send commands to TV */
function sendWIxPCommand(command) {
	Logout("Enter sendWIxPCommand \n");
	try {
		cookie = cookie + 1;
		command.Cookie = cookie;
		var WIXPJSONStringForm = JSON.stringify(command);
		PrintLogsWIXPToTV(command);
		JAPITWIXPPlugin.WebIxpSend(WIXPJSONStringForm);
		Logout("Exit sendWIxPCommand \n");
	}
	catch (e) {
		Logout("Exit sendWIxPCommand: " + e + " \n");
	}
}

/* create some attributes of the WIXP object */
function CreateJAPITObjectForWIXPSvc() {
	this.Svc = "WIXP";
	this.SvcVer = "3.0";
}


function mapVkSleep() {
	mapClear();
	setTimeout(function () {
		try {
			var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
			JAPITObjForWIXPSvc.CmdType = "Change";
			JAPITObjForWIXPSvc.Fun = "UserInputControl";
			JAPITObjForWIXPSvc.CommandDetails = {
				"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
				"VirtualKeyToBeForwarded": [
					{ "Vkkey": "HBBTV_VK_SLEEP" }
				],
				"VirtualKeyMapDetails": [
					{	// this one cause an error
						"RCProtocol": "RC5",
						"RCCode": 49,
						"RCSystem": 0,
						"MapToVirtualKey": "HBBTV_VK_SLEEP"
					}
				]
			};
			sendWIxPCommand(JAPITObjForWIXPSvc);
		} catch (e) {
			Logout("exception in mapVkSleep()" + e);
		}
	}, 2000);

}

function mapVkSettings() {
	mapClear();

	setTimeout(function () {
		try {
			var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
			JAPITObjForWIXPSvc.CmdType = "Change";
			JAPITObjForWIXPSvc.Fun = "UserInputControl";
			JAPITObjForWIXPSvc.CommandDetails = {
				"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
				"VirtualKeyToBeForwarded": [
					{ "Vkkey": "HBBTV_VK_SETTINGS" }
				],
				"VirtualKeyMapDetails": [
					{
						"RCProtocol": "RC5",
						"RCCode": 49,
						"RCSystem": 0,
						"MapToVirtualKey": "HBBTV_VK_SETTINGS"
					}
				]
			};
			sendWIxPCommand(JAPITObjForWIXPSvc);
		} catch (e) {
			Logout("exception in mapVkSettings()" + e);
		}
	}, 2000);


}

function mapVkSource() {
	mapClear();

	setTimeout(function () {
		try {
			var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
			JAPITObjForWIXPSvc.CmdType = "Change";
			JAPITObjForWIXPSvc.Fun = "UserInputControl";
			JAPITObjForWIXPSvc.CommandDetails = {
				"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
				"VirtualKeyToBeForwarded": [
					{ "Vkkey": "HBBTV_VK_SOURCE" }
				],
				"VirtualKeyMapDetails": [
					{
						"RCProtocol": "RC5",
						"RCCode": 49,
						"RCSystem": 0,
						"MapToVirtualKey": "HBBTV_VK_SOURCE"
					}
				]
			};
			sendWIxPCommand(JAPITObjForWIXPSvc);
		} catch (e) {
			Logout("exception in mapVkSource()" + e);
		}
	}, 2000);



}

function mapClear() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyMapDetails": []
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function getInputControl() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	sendWIxPCommand(JAPITObjForWIXPSvc);

} 
