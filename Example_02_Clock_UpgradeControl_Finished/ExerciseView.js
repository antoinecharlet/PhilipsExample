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

const SysTime = "Current System Date: ";
const SysDate = "Current System Time: ";
const LinuxDateTime = "Linux Date Time: ";
const InputSysTime = "System Time: ";
const InputSysDate = "System Date: ";
const FWVesrion = "MainFirmware Vesrion: ";
const TVSettingsVersion = "TVSettings Version/Identifier: ";
const TVChannelListVersion = "TVChannelList Version/Identifier: ";


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
	IdTVChannelListVersion.innerHTML = TVChannelListVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[2]["CloneItemVersionNo"];	
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

function ChangeNewSystemDateAndTime()
{
	setSystemDate(IdDateInputText.value, IdTimeInputText.value);
}

function GetSystemAndLinuxDateAndTime()
{
	getSystemDate();
}
