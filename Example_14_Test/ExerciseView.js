// URLs for TESTING here:
// fill in URLs for testing here:
var url1 = "multicast://227.0.11.1:11022/0/0/0";	// TV1 ARD
var url2 = "multicast://227.0.14.9:11022/0/0/0";	// TV2 ZDV
var url3 = "multicast://227.0.14.1:11022/0/0/0";	// TV3 arte
var url4 = "multicast://228.0.1.10:11022/0/0/0";	// Acentic info channel
var url5 = "multicast://228.0.1.5:11022/0/0/0";		// Video 
var urlradch1 = "multicast://239.232.223.211:50000/0/0/0";	// RadioTelenet

/* 
*
* This can be reused in as is or even modified freely.
*
*/

var IdDateText;
var IdTimeText;
var IdLinuxDateTime;

var IdDateInputText;
var IdTimeInputText;

var IdFWVersion;
var IdSSBSettingsVersion;
var IdChannelTableVersion;

var SequenceState = 0;
var SequenceTimer;

var startTest = 0;

const SysTime = "Current System Date: ";
const SysDate = "Current System Time: ";
const LinuxDateTime = "Linux Date Time: ";
const InputSysTime = "System Time: ";
const InputSysDate = "System Date: ";
const FWVesrion = "MainFirmware Vesrion: ";
const TVSettingsVersion = "TVSettings Version/Identifier: ";
const TVChannelListVersion = "TVChannelList Version/Identifier: ";
const IPAddress = "IPAddress: ";
const RoomID = "Room ID: ";
const SerialNumber = "S/N: ";
const TVModel = "TVModel: ";
const ChannelNumber = "Channel Number: ";
const ChannelSelectionStatus = "Channel Selection Status: ";
const ChannelSelectionFailureReason = "Channel Selection Failure Reason: ";
const ChannelPlayingStatus = "Channel Playing Status: ";
const ChannelPlayingStatusErrorDetails = "Channel Playing Status Error Details : ";

function Exercise01ViewInit() {
	CreateHTMLElements();
	DirectTune1(false);
}

function CreateHTMLElements() {
	IdDateText = document.getElementById("IdDateText");
	IdTimeText = document.getElementById("IdTimeText");
	IdLinuxDateTime = document.getElementById("IdLinuxDateTime");
	IdDateInputText = document.getElementById("IdDateInputText");
	IdTimeInputText = document.getElementById("IdTimeInputText");

	IdMainFirmwareVersion = document.getElementById("IdMainFirmwareVersion");
	IdTVSettingsVersion = document.getElementById("IdTVSettingsVersion");
	IdTVChannelListVersion = document.getElementById("IdTVChannelListVersion");
}

function DisplayUpgradeControl(WIXPJsonResponse) {
	IdMainFirmwareVersion.innerHTML = FWVesrion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[0]["CloneItemVersionNo"];
	IdTVSettingsVersion.innerHTML = TVSettingsVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[1]["CloneItemVersionNo"];
	IdTVChannelListVersion.innerHTML = TVChannelListVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[4]["CloneItemVersionNo"];
}

function DisplayProfessionalSettingsControl(WIXPJsonResponse) {
	IdIPAddress.innerHTML = IPAddress + WIXPJsonResponse.CommandDetails.NetworkStatus.IPAddress;
	IdRoomID.innerHTML = RoomID + WIXPJsonResponse.CommandDetails.RoomID;
	IdSerial.innerHTML = SerialNumber + WIXPJsonResponse.CommandDetails.SerialNumber;
	IdModel.innerHTML = TVModel + WIXPJsonResponse.CommandDetails.TVModel;
}

function HandleChannelSelectionResponse(WIXPJsonResponse) {
	//ShowDivIO("DivIO1");
	IdChannelNumber.innerHTML = ChannelNumber + WIXPJsonResponse.CommandDetails.ChannelTuningDetails.ChannelNumber;
	IdChannelSelectionStatus.innerHTML = ChannelSelectionStatus + WIXPJsonResponse.CommandDetails.ChannelSelectionStatus;
	if (WIXPJsonResponse.CommandDetails.ChannelSelectionStatus == "Failure") {
		IdChannelSelectionFailureReason.innerHTML = ChannelSelectionFailureReason + WIXPJsonResponse.CommandDetails.ChannelSelectionStatusErrorDetails;
	}
	else {
		IdChannelPlayingStatus.innerHTML = ChannelPlayingStatus + WIXPJsonResponse.CommandDetails.ChannelPlayingStatus;
		if (WIXPJsonResponse.CommandDetails.ChannelPlayingStatus == "Error") {
			IdChannelPlayingStatusErrorDetails.innerHTML = ChannelPlayingStatusErrorDetails + WIXPJsonResponse.CommandDetails.ChannelPlayingStatusErrorDetails;
		}
		else {
			IdChannelPlayingStatusErrorDetails.innerHTML = ChannelPlayingStatusErrorDetails + "None";
		}
		IdChannelSelectionFailureReason.innerHTML = ChannelSelectionFailureReason + "None";
	}
}

function DisplayCurrentDateAndTime(WIXPJsonResponse) {
	var currentdate = new Date();
	var clockTime = "Unkown";
	var currentDate = "Unkown";

	var datetime = currentdate.getDate() + "/" +
		(currentdate.getMonth() + 1) + "/" +
		currentdate.getFullYear() + " @ " +
		currentdate.getHours() + ":" +
		currentdate.getMinutes() + ":" +
		currentdate.getSeconds();

	if (WIXPJsonResponse) {
		clockTime = WIXPJsonResponse.CommandDetails.ClockTime;
		currentDate = WIXPJsonResponse.CommandDetails.CurrentDate;
	}


	IdDateText.innerHTML = SysDate + currentDate;
	IdTimeText.innerHTML = SysTime + clockTime;
	IdLinuxDateTime.innerHTML = LinuxDateTime + datetime;
}

function HandleLogo(WIXPJsonResponse) {
	PrintLogsWIXPToTV("HandleLogo handler");
	logo = WIXPJsonResponse.CommandDetails.ChannelList[0].BasicChannelDetails.ChannelLogo;
	IdLogo.innerHTML = ChannelLogo + logo;
	document.getElementById("IdChannelLogo").src = logo;
}

function UserAgent() {
	var x = "User-agent header sent: " + navigator.userAgent;
	document.getElementById("IdUA").innerHTML = x;
}

function ChangeNewSystemDateAndTime() {
	setSystemDate("16/10/2016", "10:10:10");	// Date, Time
}

function GetSystemAndLinuxDateAndTime() {
	getSystemDate();
}

function TVInfoRequest() {
	getSystemDate();
	getCloneInformation();
	getProfessionalSettings();
	UserAgent();
	//getKeys();
	//getAudioLang();
	//getSubtitleLang();
}

function KeyChange() {
	//AllKeyForward();
	SelectiveKeyForward();
	//SelectiveKeyForward_TakTik();
	//CustomKeysForward();
}

function Power() {
	requestPower();
}

function NoKeyChange() {
	NoKeyForward();
}

function Stop() {
	AudioMute("On");
	VideoMute("On");
}

function Start() {
	VideoMute("Off");
	AudioMute("Off");
}

function RFStop() {
	//RFTuningStop(482000000,4112,"DVBT");	// K1 DVBT EEN HD
	//TuneToCh2();
	getSubtitleLang();
	//RFTuningStop(274000000,17,"DVBC");			// K1 DVBC TV1
	//RequestPMS();

}

function TuneFunction() {
	//ActivateApp();
	//ActivateTeletext("Activate");
	//ActivateSmartTV();
	changeCDBstate("Deactivate");
	//url1 = "multicast://239.232.209.21:50000/0/0/0/VBR";
	//IPTuning(url1);
}



function DirectTune1(fStop) {

	if (fStop) {
		stopCurrentChannel();
	}
	IPTuning(url1);
}

function DirectTune2(fStop) {
	if (fStop) {
		stopCurrentChannel();
	}
	IPTuning(url2);
}

function DirectTune3(fStop) {
	if (fStop) {
		stopCurrentChannel();
	}
	IPTuning(url3);
}


function AcenticSequence() {
	Logout("Enter AcenticSequence()");
	var JAPITObjForWIXPSvc;


	// #################################################################
	Logout("Sequence Command 1 - Tune to " + url2);
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 201;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails":
			{ "URL": url2 }
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(5000);

	// #################################################################
	Logout("Sequence Command 2 - Trickmode stop: " + url2);
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 202;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails":
		{
			"URL": url2,
			"TrickMode": "Stop"
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(2739);

	// #################################################################
	Logout("Sequence Command 3 - Trickmode stop again: " + url2);
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 203;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails":
		{
			"URL": url2,
			"TrickMode": "Stop"
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(993);

	// #################################################################
	Logout("Sequence Command 4 - Tune to " + url4);
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 204;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails":
			{ "URL": url4 }
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(5206);

	// #################################################################
	Logout("Sequence Command 5 - Trick mode stop " + url4);
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 205;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails":
		{
			"URL": url4,
			"TrickMode": "Stop"
		}

	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(12395);

	// #################################################################
	Logout("Sequence Command 6 - Set the time");
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 206;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ClockControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ClockTime": "17:00:00",
		"CurrentDate": "30/03/2019"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(43);

	// #################################################################
	Logout("Sequence Command 7 - Request ApplicationControl");
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 207;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(25814);

	// #################################################################
	Logout("Sequence Command 8 - Tune to " + url5);
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 208;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails":
			{ "URL": url5 }
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(15);

	// #################################################################
	Logout("Sequence Command 9 - UserInputControl");
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 209;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded": [
			{ "Vkkey": "HBBTV_VK_0" },
			{ "Vkkey": "HBBTV_VK_1" },
			{ "Vkkey": "HBBTV_VK_2" },
			{ "Vkkey": "HBBTV_VK_3" },
			{ "Vkkey": "HBBTV_VK_4" },
			{ "Vkkey": "HBBTV_VK_5" },
			{ "Vkkey": "HBBTV_VK_6" },
			{ "Vkkey": "HBBTV_VK_7" },
			{ "Vkkey": "HBBTV_VK_8" },
			{ "Vkkey": "HBBTV_VK_9" },
			{ "Vkkey": "HBBTV_VK_RED" },
			{ "Vkkey": "HBBTV_VK_GREEN" },
			{ "Vkkey": "HBBTV_VK_YELLOW" },
			{ "Vkkey": "HBBTV_VK_BLUE" },
			{ "Vkkey": "HBBTV_VK_MENU" },
			{ "Vkkey": "HBBTV_VK_CHANNEL_UP" },
			{ "Vkkey": "HBBTV_VK_CHANNEL_DOWN" },
			{ "Vkkey": "HBBTV_VK_CHANNEL_MENU" },
			{ "Vkkey": "HBBTV_VK_CHANNEL_TV" },
			{ "Vkkey": "HBBTV_VK_POWER" },
			{ "Vkkey": "HBBTV_VK_GUIDE" },
			{ "Vkkey": "HBBTV_VK_BACK" },
			{ "Vkkey": "HBBTV_VK_ALARM" },
			// Additional Keys. Used to support Acentic Remote
			{ "Vkkey": "HBBTV_VK_MYCHOICE" },       // used to reload CDB
			{ "Vkkey": "HBBTV_VK_SMARTINFO" },      // Use this virtual key for Audio    (RC5.VK_AUDIO_SETTINGS)
			{ "Vkkey": "HBBTV_VK_TV" },             // Use this virtual key for Subtitle (RC5.VK_SUBTITLE)
			{ "Vkkey": "HBBTV_VK_OPTIONS" },        // Use this virtual key for EXIT     (RC5.VK_EXIT)
			{ "Vkkey": "HBBTV_VK_FORMAT" }          // Use this virtual key for ARC      (RC5.VK_ARC)

		],
		"VirtualKeyMapDetails": [
			{
				"RCProtocol": "RC5",
				"RCCode": 77,
				"RCSystem": 3,
				"MapToVirtualKey": "HBBTV_VK_MENU"
			},
			{
				"RCProtocol": "RC5",
				"RCCode": 44,
				"RCSystem": 3,
				"MapToVirtualKey": "HBBTV_VK_GUIDE"
			},
			{
				"RCProtocol": "RC5",
				"RCCode": 54,
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_BACK"
			},
			{
				"RCProtocol": "RC5",
				"RCCode": 49,
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_SOURCE"
			},
			{
				"RCProtocol": "RC5",
				"RCCode": 69,
				"RCSystem": 3,
				"MapToVirtualKey": "HBBTV_VK_ALARM"
			},
			{
				"RCProtocol": "RC5",    // RC5 Key (Audio) mapped to VK_SMARTINFO --> OK
				"RCCode": 35,           // to change Audio Language
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_SMARTINFO"
			},
			{
				"RCProtocol": "RC5",    // RC5 Key (16:9) mapped to VK_FORMAT --> OK
				"RCCode": 126,          // to change Aspect Ratio
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_FORMAT"
			},
			{
				"RCProtocol": "RC5",    // RC5 Key (EXIT) mapped to VK_OPTIONS --> OK
				"RCCode": 100,          //
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_OPTIONS"
			},
			{
				"RCProtocol": "RC5",    // RC5 Key (SUBTITLE) mapped to VK_TV --> OK
				"RCCode": 58,          //
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_TV"
			},
			{
				"RCProtocol": "RC5",    // RC5 Key (Settings) mapped to VK_PICTURESTYLE --> OK
				"RCCode": 10,          //
				"RCSystem": 3,
				"MapToVirtualKey": "HBBTV_VK_PICTURESTYLE"
			}

		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(4405);

	// #################################################################
	Logout("Sequence Command 10 - Set the time");
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 206;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ClockControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ClockTime": "17:09:26",
		"CurrentDate": "30/03/2019"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(197);


	// #################################################################
	Logout("Sequence Command 11 - Request ApplicationControl");
	JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 207;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	sendWIxPCommand(JAPITObjForWIXPSvc);
	sleep(1500);

	Logout("Exit AcenticSequence()");

}


function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}


function RequestApps() {
	//RequestApplicationControl2();
	SetVolumeDestination(15);
}

function Stress() {
	Reboot();
	//TuneTo("HDMI1");
	//InstallChannelTestPieter();
	//if(startTest == 1)
	//	TuneTest();
	//else{
	//	startTest=0;
	//addtext("Stop Test");
	//}   
}

function TuneTest() {
	delay = 15000;
	//	addtext("Delay =" + delay);
	count = 1;
	setInterval(function () {
		switch (count) {
			case 0:
				break;
			case 1:
				//	addtext("Tune to url: " + url1);
				TuneIPChannel(url1);
				count++;
				break;
			case 2:
				//	addtext("Tune to url: " + url2);
				TuneIPChannel(url2);
				count++;
				break;
			case 3:
				//   addtext("Tune to url: " + url3);
				TuneIPChannel(url3);
				count = 1;
				break;
		}
		startTest++;
	}, delay);
}
