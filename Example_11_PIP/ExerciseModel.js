/* 
*
*	Example_11_PIP
*
*/

var cookie = 0;
var playerRect__ = {
	fChanged: false,
	Timer: undefined,
	element: undefined,
	style: {
		width: "100%",
		height: "100%",
		left: "0px",
		top: "0px",
		zIndex: "0"
	}
};

var CurrentTuningParameters;
var FullScreenTuningParameters= {"ChannelTuningDetails":{"URL":"multicast://227.0.11.1:11022/0/0/0"}};
var PipTuningParameters= 		{"ChannelTuningDetails":{"URL":"multicast://229.0.11.1:11022/0/0/0"}};

function ExerciseModelInit() {
	try {
		// Register Callback
		JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
	} catch (e) {
		Logout("exception in ExerciseModelInit()" + e);
	}

}






/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON) {

	alert("typeof Logout: " + typeof Logout);

	try {
		Logout("Enter WIXPResponseHandler \n");
		dataToPass = JSON.parse(WIXPResponseJSON);
		PrintLogsWIXPFromTV(dataToPass);

		if (dataToPass.Fun == "ChannelSelection") {
			if (dataToPass.CommandDetails.ChannelSelectionStatus != undefined) {

				var myChannelSelectionStatus = dataToPass.CommandDetails.ChannelSelectionStatus;
				Logout("ChannelSelectionStatus: " + myChannelSelectionStatus);
				if (myChannelSelectionStatus == "Started") {
				} else if (myChannelSelectionStatus == "Failure" && dataToPass.CommandDetails.ChannelSelectionStatusErrorDetails != undefined) {
					Logout("ChannelSelectionStatusErrorDetails: " + dataToPass.CommandDetails.ChannelSelectionStatusErrorDetails);
				} else if (myChannelSelectionStatus == "Successful") {

					// Set Frame for PIP
					if (playerRect__.fChanged == true) {
						setPipPlayerRect();
					}
				}
			}

			if (typeof (dataToPass.CommandDetails.ChannelPlayingStatus) != 'undefined') {
				Logout("ChannelPlayingStatus: " + dataToPass.CommandDetails.ChannelPlayingStatus);
			}

			if (typeof (dataToPass.CommandDetails.ChannelTuningDetails) != 'undefined') {
				var TuningDetails = {};
				TuningDetails = dataToPass.CommandDetails.ChannelTuningDetails;
				// IP
				if (typeof (TuningDetails.URL) != 'undefined') {
					Logout("ChannelTuningDetails: " + TuningDetails.URL);
				}
				if (typeof (TuningDetails.TuningType) != 'undefined') {
					Logout("ChannelTuningDetails: " + TuningDetails.TuningType +
						', f: ' + TuningDetails.Freq + ', SID: ' + TuningDetails.ServiceID);
				}
			}
		}

	} catch (e) {
		Logout("WIXPResponseHandler() ERROR. " + e);
		return e;
	}
	Logout("Exit WIXPResponseHandler \n");
}

/* function to send commands to TV */
function sendWIxPCommand(command) {
	Logout("Enter sendWIxPCommand");
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


function tuneFullscreen() {


	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = FullScreenTuningParameters;
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function tunePIP() {
	
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = PipTuningParameters;
	sendWIxPCommand(JAPITObjForWIXPSvc);

}


function SetPictureSize(left, top, width, height, element) {

	var VideoDiv = document.getElementById(element);

	try {
		Logout("SetPictureSize(" + left + ", " + top + ", " + width + ", " + height + ")");

		playerRect__.element = element;

		if (top == -1 || left == -1 || width == -1 || height == -1) {
			Logout("set Fullscreen");

			stopCurrentChannel();

			VideoDiv.style.width = "100%";
			VideoDiv.style.height = "100%";
			VideoDiv.style.left = "0px";
			VideoDiv.style.top = "0px";
			VideoDiv.style.zIndex = 0;

			Logout('STYLE AFTER CHANGE');
			Logout(element + '.style.height: ' + this.getStyle(element, "height"));
			Logout(element + '.style.width: ' + this.getStyle(element, "width"));
			Logout(element + '.style.top: ' + this.getStyle(element, "top"));
			Logout(element + '.style.left: ' + this.getStyle(element, "left"));
			Logout(element + '.style.zIndex: ' + this.getStyle(element, "zIndex"));

		} else {

			// PIP tuning. resize after succesful tuning
			playerRect__.fChanged = true;
			playerRect__.style.left = left + "px";
			playerRect__.style.top = top + "px";
			playerRect__.style.width = width + "px";
			playerRect__.style.height = height + "px";
			playerRect__.style.zIndex = 1000;

			Logout("playerRect__.left  : " + this.playerRect__.style.left);
			Logout("playerRect__.top   : " + this.playerRect__.style.top);
			Logout("playerRect__.width : " + this.playerRect__.style.width);
			Logout("playerRect__.height: " + this.playerRect__.style.height);
			Logout("playerRect__.zIndex: " + this.playerRect__.style.zIndex);

			if (playerRect__.Timer != undefined) {
				window.clearTimeout(playerRect__.Timer);
			}

			playerRect__.Timer = window.setTimeout(function () {
				try {
					this.playerRect__.fChanged = false;
				} catch (e) {
					Logout("playerRect__.Timer ERROR." + e.message);
				}
			}, 5000);
		}


	} catch (e) {
		Logout("setPictureSize() ERROR" + e.message);
	}
}

/* set the style for the Player window with the given values in this.playerRect__ */
function setPipPlayerRect() {
	Logout("setPlayerRect()");

	var element = playerRect__.element;
	var VideoDiv = document.getElementById(element);


	try {
		playerRect__.fChanged = false;

		if (playerRect__.Timer != undefined) {
			Logout("clear Timer for playerRect__");
			window.clearTimeout(playerRect__.Timer);
		}



		VideoDiv.style.left = playerRect__.style.left;
		VideoDiv.style.top = playerRect__.style.top;
		VideoDiv.style.width = playerRect__.style.width;
		VideoDiv.style.height = playerRect__.style.height;
		VideoDiv.style.zIndex = playerRect__.style.zIndex;

		vidObject.bindToCurrentChannel();

		Logout("setPlayerRect(" + playerRect__.style.left + ", " +
			playerRect__.style.top + ", " +
			playerRect__.style.width + ", " +
			playerRect__.style.height + ", " +
			playerRect__.style.zIndex);

		Logout('STYLE AFTER CHANGE');
		Logout(element + '.style.height: ' + SmartCom.TvPhilipsManager.getStyle(element, "height"));
		Logout(element + '.style.width: ' + SmartCom.TvPhilipsManager.getStyle(element, "width"));
		Logout(element + '.style.top: ' + SmartCom.TvPhilipsManager.getStyle(element, "top"));
		Logout(element + '.style.left: ' + SmartCom.TvPhilipsManager.getStyle(element, "left"));
		Logout(element + '.style.zIndex: ' + SmartCom.TvPhilipsManager.getStyle(element, "zIndex"));
	} catch (e) {
		this.LogError("setPlayerRect() ERROR#1. " + e.message);
	}
}

function stopCurrentChannel()	{
	try {
		var ParameterObj;
		document.getElementById(playerRect__.element).style.zIndex = "0";

		if (TuningParameters != undefined) {
			Logout("stopCurrentChannel()");

			var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
			JAPITObjForWIXPSvc.CmdType = "Change";
			JAPITObjForWIXPSvc.Fun = "ChannelSelection";
			JAPITObjForWIXPSvc.CommandDetails = CurrentTuningParameters;
			JAPITObjForWIXPSvc.CommandDetails.ChannelTuningDetails.TrickMode = "Stop";
			sendWIxPCommand(JAPITObjForWIXPSvc);

		}
	} catch (e) {
		Logout("stopCurrentChannel() ERROR. " + e.message);
	}
}