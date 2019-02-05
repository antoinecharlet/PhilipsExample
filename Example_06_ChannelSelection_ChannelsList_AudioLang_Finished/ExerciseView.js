/* 
*
* This can be reused in as is or even modified freely.
*
*/

const ChannelNumber = "Channel Number: ";
const ChannelSelectionStatus = "Channel Selection Status: ";
const ChannelSelectionFailureReason = "Channel Selection Failure Reason: ";
const ChannelPlayingStatus = "Channel Playing Status: ";
const ChannelPlayingStatusErrorDetails = "Channel Playing Status Error Details : ";

var channelListAlreadyQueried = "false";

function Exercise01ViewInit()
{
	CreateHTMLElements();
	ShowDivIO("None");
}

function CreateHTMLElements()
{
	IdDiv01 = document.getElementById("DivIO1");
	IdDiv02 = document.getElementById("DivIO2");
	IdChannelNumber = document.getElementById("IdChannelNumber");
	IdChannelSelectionStatus = document.getElementById("IdChannelSelectionStatus");
	IdChannelSelectionFailureReason = document.getElementById("IdChannelSelectionFailureReason");
	IdChannelPlayingStatus = document.getElementById("IdChannelPlayingStatus");
	IdChannelPlayingStatusErrorDetails = document.getElementById("IdChannelPlayingStatusErrorDetails");
	
	/*
	IdTimeInputText = document.getElementById("IdTimeInputText");
	
	IdMainFirmwareVersion = document.getElementById("IdMainFirmwareVersion");
	IdTVSettingsVersion = document.getElementById("IdTVSettingsVersion");
	IdTVChannelListVersion = document.getElementById("IdTVChannelListVersion");
	*/
}

function ChangeChannel() 
{
	//alert("Enter selectChannelFromTV \n");
	var channelNum = document.getElementById("chNum").value;
	SelectChannelByNumber(parseInt(channelNum));
	//alert("You entered channel number " + channelNum);	
}

function HandleChannelSelectionResponse(WIXPJsonResponse)
{
	ShowDivIO("DivIO1");
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

function HandleAudioLanguageResponse(WIXPJsonResponse)
{
	alert("Enter HandleAudioLanguageResponse \n");
	var c = 0;
	// var counter = 1;
	var i = 0;
	var loop = 1;

	var table = document.getElementById("IDAudioLanguageList");
	
	/*
	while(table.rows.length > 0) {
		table.deleteRow(0);
	}*/
	
	//for (i; i < WIXPJsonResponse.CommandDetails.AudioLangugeList.length; i++) { //chanNumArray.length; i++) {
	do
	{
		if(WIXPJsonResponse.CommandDetails.AudioLanguageList[i] === 'undefined')
		{
			loop = 0;
			break;
		}
		else
		{
			var row = table.insertRow(i+1);
			var cell0 = row.insertCell(c);
			var cell1 = row.insertCell(c+1);
			//var cell2 = row.insertCell(c+2);
			// var cell3 = row.insertCell(c+3);

			cell0.appendChild(document.createTextNode(WIXPJsonResponse.CommandDetails.AudioLanguageList[i].AudioLanguageIndex));
			cell1.appendChild(document.createTextNode(WIXPJsonResponse.CommandDetails.AudioLanguageList[i].Language));
			i++;
			//cell2.appendChild(document.createTextNode(chanTypeArray[i]));
			// cell3.appendChild(document.createTextNode(counter++));
		}
	}while(loop == 1)
	
	/*totalNumOfChannels = 0;
	j=0;
	start=0;
	*/
	alert("Exit HandleAudioLanguageResponse \n");
}

function GetChannelList()
{
	if(channelListAlreadyQueried == "false")
	{
		GetNumberOfChannelsInTV();
		channelListAlreadyQueried = "true";
	}
	else
	{
		//Dont do anything
	}
	ShowDivIO("DivIO2");
}

/* a function to process the TV response; either to get or display the channels */
function HandleChannelListResponse(WIXPJsonResponse) {
	
	alert("Enter HandleChannelListResponse \n");
	var ChList = WIXPJsonResponse.CommandDetails.ChannelList;
	var i = 0;
	channelsReceived += ChList.length;

	// alert("ChList.length = " + ChList.length + "\n");
	// alert("HandleChannelListResponse  --> totalNumOfChannels =  " + totalNumOfChannels + " \n");
	// alert("HandleChannelListResponse  --> ChList =  " + ChList.length + " \n");
	// alert("HandleChannelListResponse  --> start =  " + start + " \n");
	// alert("HandleChannelListResponse  --> channelsReceived =  " + channelsReceived + " \n");

	//assigning the total number of channels only once in the first request
	if (totalNumOfChannels == 0) {
		totalNumOfChannels = WIXPJsonResponse.CommandDetails.NumberOfChannels;
		document.getElementById("demo").innerHTML = "Number of channels: " + totalNumOfChannels;
		// alert("HandleChannelListResponse 1 --> totalNumOfChannels =  " + totalNumOfChannels + " \n");
		// alert("HandleChannelListResponse 1 --> start =  " + start + " \n");
		requestChannelsFromTV(start);
	}

	// alert("after --> totalNumOfChannels =  " + totalNumOfChannels + " \n");
	// alert("after  --> ChList =  " + ChList.length + " \n");
	
	start += 40;

	for(i; i < ChList.length; i++) {
		// alert("for loop " + j + "\n");
		chanNumArray[j] = WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelNo;
		chanNameArray[j] = WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelName;
		chanTypeArray[j] = WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelType;
		//  = WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelPackage;
		// alert("WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelNo = " + WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelNo + "\n");
		// alert("chanNumArray[j] = " + chanNumArray[j] + "\n");
		j++;
	}

	if ((channelsReceived < totalNumOfChannels) && (start <= totalNumOfChannels)){
	
		// alert("HandleChannelListResponse 2 --> channelsReceived =  " + channelsReceived + " \n");
		// alert("HandleChannelListResponse 2 --> start =  " + start + " \n");
		requestChannelsFromTV(start);

	}  else if ((channelsReceived >= totalNumOfChannels) && (start > totalNumOfChannels)){
		// alert("HandleChannelListResponse 3 --> channelsReceived =  " + channelsReceived+ " \n");
		DisplayChannelList(chanNumArray,chanNameArray,chanTypeArray);
	}
	else
	{
	
	}
}


/* a function to dispaly the channels list */
function DisplayChannelList(chanNumArray,chanNameArray,chanTypeArray){

	alert("Enter printChanList \n");
	var c = 0;
	// var counter = 1;
	var i = 0;

	var table = document.getElementById("chTable");
	
	for (i; i < 5; i++) { //chanNumArray.length; i++) {

		// alert("call back function loop " + counter + "\n"); 

		var row = table.insertRow(i+1);
		var cell0 = row.insertCell(c);
    	var cell1 = row.insertCell(c+1);
    	var cell2 = row.insertCell(c+2);
    	// var cell3 = row.insertCell(c+3);

		cell0.appendChild(document.createTextNode(chanNumArray[i]));
		cell1.appendChild(document.createTextNode(chanNameArray[i]));
		cell2.appendChild(document.createTextNode(chanTypeArray[i]));
		// cell3.appendChild(document.createTextNode(counter++));
	}
	
	/*totalNumOfChannels = 0;
	j=0;
	start=0;
	*/
	alert("Exit printChanList \n");
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
	
}

detach

/* a function to showLogs the page */
function ShowDivIO(DivIOTobeShown)
{
	if(DivIOTobeShown == "DivIO1")
	{
		/*
		function () { $("#IdDiv02").detach(); }
		function () { $("body").prepend("#IdDiv01"); }
		*/
		alert("ShowDivIO DivIO1 (Channel Selection status) \n");
		document.getElementById("demo").style.visibility = "hidden";
		document.getElementById("demo2").style.visibility = "hidden";
		document.getElementById("chTable").style.visibility = "hidden";
		document.getElementById("DivIO2").style.visibility = "hidden";
		
		document.getElementById("DivIO1").style.visibility = "visible";
		document.getElementById("IdChannelNumber").style.visibility = "visible";
		document.getElementById("IdChannelSelectionStatus").style.visibility = "visible";
		document.getElementById("IdChannelSelectionFailureReason").style.visibility = "visible";
		document.getElementById("IdChannelPlayingStatus").style.visibility = "visible";
		document.getElementById("IDAudioLanguageList").style.visibility = "visible";
	}
	else if(DivIOTobeShown == "DivIO2")
	{
		/*
		function () { $("#IdDiv01").detach(); }
		function () { $("body").prepend("#IdDiv02"); }
		*/
		
		alert("ShowDivIO DivIO2 (Channel List) \n");
		document.getElementById("IdChannelNumber").style.visibility = "hidden";
		document.getElementById("IdChannelSelectionStatus").style.visibility = "hidden";
		document.getElementById("IdChannelSelectionFailureReason").style.visibility = "hidden";
		document.getElementById("IdChannelPlayingStatus").style.visibility = "hidden";
		document.getElementById("IDAudioLanguageList").style.visibility = "hidden";
		document.getElementById("DivIO1").style.visibility = "hidden";
		
		document.getElementById("DivIO2").style.visibility = "visible";
		document.getElementById("demo").style.visibility = "visible";
		document.getElementById("demo2").style.visibility = "visible";
		document.getElementById("chTable").style.visibility = "visible";
	}
	else
	{
		alert("ShowDivIO None \n");
		/*
		function () { $("#IdDiv01").detach(); }
		function () { $("#IdDiv02").detach(); }
		*/
		
		document.getElementById("IdChannelNumber").style.visibility = "hidden";
		document.getElementById("IdChannelSelectionStatus").style.visibility = "hidden";
		document.getElementById("IdChannelSelectionFailureReason").style.visibility = "hidden";
		document.getElementById("IdChannelPlayingStatus").style.visibility = "hidden";
		document.getElementById("DivIO1").style.visibility = "hidden";
		
		document.getElementById("demo").style.visibility = "hidden";
		document.getElementById("demo2").style.visibility = "hidden";
		document.getElementById("chTable").style.visibility = "hidden";
		document.getElementById("DivIO2").style.visibility = "hidden";
	}
}