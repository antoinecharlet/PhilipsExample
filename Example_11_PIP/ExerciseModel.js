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
var urlFullScreen = "multicast://227.0.11.1:11022/0/0/0";
var urlPip = "multicast://229.0.11.1:11022/0/0/0";

function ExerciseModelInit() {
	try {
		// Register Callback
		JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
		if (vidObject.bindToCurrentChannel != undefined) {
			vidObject.bindToCurrentChannel();
		}
		tuneFullscreen();
	} catch (e) {
		Logout("exception in ExerciseModelInit()" + e);
	}

}






/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON) {


	try {
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
					/*
					if (playerRect__.fChanged == true) {
						setPipPlayerRect();
					}
					*/
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
}

/* function to send commands to TV */
function sendWIxPCommand(command) {
	Logout("Enter sendWIxPCommand");
	try {
		cookie = cookie + 1;
		command.Cookie = cookie;
		var WIXPJSONStringForm = JSON.stringify(command);
		PrintLogsWIXPToTV(command);
		Logout("sendWIxPCommand: " + WIXPJSONStringForm);
		JAPITWIXPPlugin.WebIxpSend(WIXPJSONStringForm);
	}
	catch (e) {
		Logout("sendWIxPCommand ERROR. " + e);
	}
}

/* create some attributes of the WIXP object */
function CreateJAPITObjectForWIXPSvc() {
	this.Svc = "WIXP";
	this.SvcVer = "3.0";
	this.CommandDetails = {};
}


function tuneFullscreen() {
	Logout("tuneFullScreen()");

	try {
		SetPictureSize(-1, -1, -1, -1, "vidDiv");
		var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
		Logout("JAPITObjForWIXPSvc Fullscreen 1: " + JSON.stringify(JAPITObjForWIXPSvc));
		JAPITObjForWIXPSvc.CmdType = "Change";
		JAPITObjForWIXPSvc.Fun = "ChannelSelection";
		JAPITObjForWIXPSvc.CommandDetails = { "ChannelTuningDetails": { "URL": urlFullScreen } };
		CurrentTuningParameters = JAPITObjForWIXPSvc.CommandDetails;
		sendWIxPCommand(JAPITObjForWIXPSvc);
	} catch (e) {
		Logout("tuneFullScreen() ERROR. " + e.message);
	}
}

function tunePIP() {
	Logout("tunePIP()");

	try {
		SetPictureSize(435, 480, 427, 240, "vidDiv");
		var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
		JAPITObjForWIXPSvc.CmdType = "Change";
		JAPITObjForWIXPSvc.Fun = "ChannelSelection";
		JAPITObjForWIXPSvc.CommandDetails = { "ChannelTuningDetails": { "URL": urlPip } };
		CurrentTuningParameters = JAPITObjForWIXPSvc.CommandDetails;
		sendWIxPCommand(JAPITObjForWIXPSvc);
	} catch (e) {
		Logout("tunePIP() ERROR. " + e.message);
	}
}


function SetPictureSize(left, top, width, height, element) {

	Logout("SetPictureSize(" + left + ", " + top + ", " + width + ", " + height + ")");

	try {

		stopCurrentChannel();
		var VideoDiv = document.getElementById(element);

		//playerRect__.element = element;

		if (top == -1 || left == -1 || width == -1 || height == -1) {
			Logout("set Fullscreen");

			VideoDiv.style.width = "1080px";
			VideoDiv.style.height = "720px";
			VideoDiv.style.left = "200px";
			VideoDiv.style.top = "0px";
			VideoDiv.style.zIndex = 0;




		} else {

			VideoDiv.style.width = width + "px";
			VideoDiv.style.height = height + "px";
			VideoDiv.style.left = left + "px";
			VideoDiv.style.top = top + "px";
			VideoDiv.style.zIndex = 1000;

			// PIP tuning. resize after succesful tuning
			/*
			playerRect__.fChanged = true;
			playerRect__.style.left = left + "px";
			playerRect__.style.top = top + "px";
			playerRect__.style.width = width + "px";
			playerRect__.style.height = height + "px";
			playerRect__.style.zIndex = 1000;
			*/
			/*
			Logout("playerRect__.left  : " + this.playerRect__.style.left);
			Logout("playerRect__.top   : " + this.playerRect__.style.top);
			Logout("playerRect__.width : " + this.playerRect__.style.width);
			Logout("playerRect__.height: " + this.playerRect__.style.height);
			Logout("playerRect__.zIndex: " + this.playerRect__.style.zIndex);
			*/
			/*
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
			*/
		}

		Logout('STYLE AFTER CHANGE');
		Logout(element + '.style.height: ' + getStyle(element, "height"));
		Logout(element + '.style.width: ' + getStyle(element, "width"));
		Logout(element + '.style.top: ' + getStyle(element, "top"));
		Logout(element + '.style.left: ' + getStyle(element, "left"));
		Logout(element + '.style.zIndex: ' + getStyle(element, "zIndex"));

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



		Logout("setPlayerRect(" + playerRect__.style.left + ", " +
			playerRect__.style.top + ", " +
			playerRect__.style.width + ", " +
			playerRect__.style.height + ", " +
			playerRect__.style.zIndex);

		Logout('STYLE AFTER CHANGE');
		Logout(element + '.style.height: ' + getStyle(element, "height"));
		Logout(element + '.style.width: ' + getStyle(element, "width"));
		Logout(element + '.style.top: ' + getStyle(element, "top"));
		Logout(element + '.style.left: ' + getStyle(element, "left"));
		Logout(element + '.style.zIndex: ' + getStyle(element, "zIndex"));
	} catch (e) {
		this.LogError("setPlayerRect() ERROR#1. " + e.message);
	}
}

function stopCurrentChannel() {

	Logout("stopCurrentChannel()");

	try {
		var ParameterObj;
		if (playerRect__.element != undefined) {
			document.getElementById(playerRect__.element).style.zIndex = "0";
		}
		if (CurrentTuningParameters != undefined) {
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

function getStyle(el, styleProperty) {
	var myId = document.getElementById(el);
	var o;
	if (myId.currentStyle)
		o = myId.currentStyle[styleProperty];
	else if (window.getComputedStyle)
		o = document.defaultView.getComputedStyle(myId, null).getPropertyValue(styleProperty);
	return o;
}