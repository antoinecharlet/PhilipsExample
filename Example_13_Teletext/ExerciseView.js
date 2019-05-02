// URLs for TESTING here:
// fill in URLs for testing here:
var url1 = "multicast://227.0.11.1:11022/0/0/0/VBR";	// Dobbit
var url2 = "multicast://239.232.209.112:50000/0/0/0/VBR";	// een HD
var url3 = "multicast://239.192.3.7:1234/0/0/0/VBR";		// Eurosport A2B
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
	
	if (fStop)	{
		stopCurrentChannel();
	}
	IPTuning(url1);
}

function DirectTune2(fStop) {
	if (fStop)	{
		stopCurrentChannel();
	}
	IPTuning(url2);
}

function DirectTune3(fStop) {
	if (fStop)	{
		stopCurrentChannel();
	}
	IPTuning(url3);
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
