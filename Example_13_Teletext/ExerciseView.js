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

function Exercise01ViewInit()
{
	CreateHTMLElements();
}

function CreateHTMLElements()
{
	IdDateText = document.getElementById("IdDateText");
	IdTimeText = document.getElementById("IdTimeText");
	IdLinuxDateTime = document.getElementById("IdLinuxDateTime");
	IdDateInputText = document.getElementById("IdDateInputText");
	IdTimeInputText = document.getElementById("IdTimeInputText");
	
	IdMainFirmwareVersion = document.getElementById("IdMainFirmwareVersion");
	IdTVSettingsVersion = document.getElementById("IdTVSettingsVersion");
	IdTVChannelListVersion = document.getElementById("IdTVChannelListVersion");
}

function DisplayUpgradeControl(WIXPJsonResponse)
{
	IdMainFirmwareVersion.innerHTML = FWVesrion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[0]["CloneItemVersionNo"];
	IdTVSettingsVersion.innerHTML = TVSettingsVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[1]["CloneItemVersionNo"];
	IdTVChannelListVersion.innerHTML = TVChannelListVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[4]["CloneItemVersionNo"];		
}

function DisplayProfessionalSettingsControl(WIXPJsonResponse)
{
	IdIPAddress.innerHTML = IPAddress + WIXPJsonResponse.CommandDetails.NetworkStatus.IPAddress;
	IdRoomID.innerHTML = RoomID + WIXPJsonResponse.CommandDetails.RoomID;
	IdSerial.innerHTML = SerialNumber + WIXPJsonResponse.CommandDetails.SerialNumber;
	IdModel.innerHTML = TVModel + WIXPJsonResponse.CommandDetails.TVModel;
}

function HandleChannelSelectionResponse(WIXPJsonResponse)
{
	//ShowDivIO("DivIO1");
	IdChannelNumber.innerHTML = ChannelNumber + WIXPJsonResponse.CommandDetails.ChannelTuningDetails.ChannelNumber;
	IdChannelSelectionStatus.innerHTML = ChannelSelectionStatus + WIXPJsonResponse.CommandDetails.ChannelSelectionStatus;
	if(WIXPJsonResponse.CommandDetails.ChannelSelectionStatus == "Failure")
	{
		IdChannelSelectionFailureReason.innerHTML = ChannelSelectionFailureReason + WIXPJsonResponse.CommandDetails.ChannelSelectionStatusErrorDetails;
	}
	else
	{
		IdChannelPlayingStatus.innerHTML = ChannelPlayingStatus + WIXPJsonResponse.CommandDetails.ChannelPlayingStatus;
		if(WIXPJsonResponse.CommandDetails.ChannelPlayingStatus == "Error")
		{
			IdChannelPlayingStatusErrorDetails.innerHTML = ChannelPlayingStatusErrorDetails + WIXPJsonResponse.CommandDetails.ChannelPlayingStatusErrorDetails;
		}
		else
		{
			IdChannelPlayingStatusErrorDetails.innerHTML = ChannelPlayingStatusErrorDetails + "None";
		}
		IdChannelSelectionFailureReason.innerHTML = ChannelSelectionFailureReason + "None";
	}
}
				
function DisplayCurrentDateAndTime(WIXPJsonResponse)
{
	var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
				
	if(WIXPJsonResponse)
	{
		var clockTime = WIXPJsonResponse.CommandDetails.ClockTime;
		var currentDate = WIXPJsonResponse.CommandDetails.CurrentDate;
	}
	else
	{
		var clockTime = "Unkown";
		var currentDate = "Unkown";
	}

	IdDateText.innerHTML = SysDate + currentDate;
	IdTimeText.innerHTML = SysTime + clockTime;
	IdLinuxDateTime.innerHTML = LinuxDateTime + datetime;
}

function HandleLogo(WIXPJsonResponse)
{
	PrintLogsWIXPToTV("HandleLogo handler");
	logo=WIXPJsonResponse.CommandDetails.ChannelList[0].BasicChannelDetails.ChannelLogo;
	IdLogo.innerHTML = ChannelLogo + logo;
	document.getElementById("IdChannelLogo").src=logo;
}

function UserAgent() {
    var x = "User-agent header sent: " + navigator.userAgent;
    document.getElementById("IdUA").innerHTML = x;
}

function ChangeNewSystemDateAndTime()
{
	setSystemDate("16/10/2016","10:10:10");	// Date, Time
}

function GetSystemAndLinuxDateAndTime()
{
	getSystemDate();
}

function TVInfoRequest()
{
	getSystemDate();
	getCloneInformation();
	getProfessionalSettings();
	UserAgent();
	//getKeys();
	//getAudioLang();
	//getSubtitleLang();
}

function KeyChange()
{
	//AllKeyForward();
	SelectiveKeyForward();
	//SelectiveKeyForward_TakTik();
	//CustomKeysForward();
}

function Power()
{
	requestPower();
}

function NoKeyChange()
{
	NoKeyForward();
}

function Stop(){
	AudioMute("On");	
	VideoMute("On");
}

function Start(){
	VideoMute("Off");
	AudioMute("Off");	
}

function RFStop(){
	//RFTuningStop(482000000,4112,"DVBT");	// K1 DVBT EEN HD
	//TuneToCh2();
	getSubtitleLang();
	//RFTuningStop(274000000,17,"DVBC");			// K1 DVBC TV1
	//RequestPMS();
	
}

function TuneFunction(){
	//ActivateApp();
	//ActivateTeletext("Activate");
	//ActivateSmartTV();
	changeCDBstate("Deactivate");
	//url1 = "multicast://239.232.209.21:50000/0/0/0/VBR";
	//IPTuning(url1);
}

function TuneToCh2(){
	TuneViaChannelNumber(2);
}

function Weather(){
	//GetNumberOfChannelsInTV();
	RequestChannelList();
	//ActivateApp("Googlecast");
	//RequestWeather();
	//WeatherRequest();
	//RequestSource();
	//DeActivateApp();
}

function GetChannelList()	// DirectTune1
{
	//TuneTo("MainTuner");
	//RFTuning(330000000,701,"DVBC");
	//RequestMiracast();
	//WeatherRequest();
	//ChangeSwitchOn();
	//ChangeSwitchOnSource();
	//UserInputRequest();
	//url1 = "multicast://239.232.209.112:50000/0/0/0/VBR";	// EEN HD
	//url1 = "multicast://239.192.5.2:1234/0/0/0/VBR";
	url1 = "multicast://227.0.11.1:11022/0/0/0";		// Jeevan
	//RFTuning(274000000,17,"DVBC");			// K1 DVBC TV1
	IPTuning(url1);
	//GoToMedia();
}

function DirectTune2(){
	//TuneTo("HDMI1");
	//MyChoiceRequest();
	//RFTuning(826000000,1,"DVBC");	// K4 DVBC EenHD
	//var url1 = "multicast://239.192.5.3:1234/0/0/0/VBR";		// Linux
	//var url1 = "multicast://239.1.51.1:1234/0/0/0/VBR";		// TEST PIDs
	//var url1 = "multicast://239.232.209.132:50000/0/0/0/VBR";	// KanaalZ
	var url1 = "multicast://239.232.209.48:50000/0/0/0/VBR";	// Dobbit
	//RFTuning(482000000,4112,"DVBT");	// K1 DVBT EEN HD does not exist anymore
	//RFTuning(642000000,1,"DVBT");	// K1 DVBT EEN HD
	IPTuning(url1);
}

function DirectTune3(){
	//RFTuning(826000000,2,"DVBC");	// K4 DVBC Canvas HD
	//RequestBrightness();
	//var url1 = "multicast://239.232.209.92:50000/0/0/0/VBR";	// CAZ
	var url1 = "multicast://239.232.209.21:50000/0/0/0/VBR";		// 4HD	
	//var url1 = "multicast://239.232.209.48:50000/0/0/0/VBR";	// Dobbit
	//var url1 = "multicast://239.192.100.4:1234/0/0/0/VBR";	// temp
	IPTuningStop(url1);
//	RFTuning(610000000,4165,"DVBT");	// K1 DVBT BBC one
	//IPTuning(url1);
}

function DirectTune4(){
	//RFTuning(818000000,17540,"DVBT2");	// K1 DVBT2 BBC one HD
	//var url1 = "multicast://239.232.209.48:50000/0/0/0/VBR";	// Dobbit
	//var url1 = "multicast://239.1.0.1:1234/0/0/0/VBR";
	var url1 = "multicast://239.232.209.112:50000/0/0/0/VBR";	// EEN HD
	//IPTuningStop(url2);
	IPTuning(url1);
	//GoToDefaultDB();
	//setSubtitleLang();
	//Reboot();
}

function DirectTune5(){
	var url1 = "multicast://239.232.209.112:50000/0/0/0/VBR";	// EEN HD
	//var url1 = "unicast://192.168.103.115:1234/0/0/0/VBR";	// EEN HD
	//var url1 = "multicast://239.232.209.21:50000/0/0/0/VBR";		// 4HD
	IPTuning(url1);
	//GoToLocalCDB();
	//IPTuningStop(url1);
		//GoToEPG();
	//ActivateApp("SmartTV");
	//ActivateApp("Miracast");
	//CustomKeysForward();
}

function RequestApps(){
	//RequestApplicationControl2();
	SetVolumeDestination(15);
}

function Stress(){
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

function TuneTest()
{
	delay = 15000;
//	addtext("Delay =" + delay);
	count=1;
	setInterval(function(){
	switch(count){
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
			count=1;
			break;
		}
		startTest++;
	}, delay);
}
