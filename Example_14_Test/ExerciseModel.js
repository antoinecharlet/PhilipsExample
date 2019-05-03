/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/
/*jshint esversion: 6 */
var CurrentTuningParameters;

function Exercise01ModelInit() {
	RegisterCallbacks();
	//AllKeyForward();
	//SelectiveKeyForward();
}

/* assigning the callback function from the TV to another function*/
function RegisterCallbacks() {
	//alert("Enter RegisterCallbacks \n");
	JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
	//alert("Exit RegisterCallbacks \n");
	Logout("------------------------");
	//alert(typeof(JAPITWIXPPlugin.WebIXPOnReceive);
	Logout("------------------------");
}

/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON) {
	Logout("Enter WIXPResponseHandler \n");
	try {
		parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
		PrintLogsWIXPFromTV(parsedWIXPJSON);

		if (parsedWIXPJSON.Fun == "ClockControl") {
			DisplayCurrentDateAndTime(parsedWIXPJSON);
		}
		else if (parsedWIXPJSON.Fun == "UpgradeControl") {
			DisplayUpgradeControl(parsedWIXPJSON);
		}
		else if (parsedWIXPJSON.Fun == "ProfessionalSettingsControl") {
			DisplayProfessionalSettingsControl(parsedWIXPJSON);
		}
		else if (parsedWIXPJSON.Fun == "ContentSecurityControl") {
			HandleVsecureResponse(parsedWIXPJSON);
		}
		else if (parsedWIXPJSON.Fun == "ChannelList") {
			HandleLogo(parsedWIXPJSON);
		}
		//else if (parsedWIXPJSON.Fun == "ChannelSelection") {
		//	HandleChannelSelectionResponse(parsedWIXPJSON);	

		else {
			Logout("Do nothing !! \n");
		}
	} catch (e) {
		alert(e);
		return e;
	}
	Logout("Exit WIXPResponseHandler");
}

/* function to send commands to TV */
function sendWIxPCommand(command) {
	//Logout("Enter sendWIxPCommand");
	try {
		var WIXPJSONStringForm = JSON.stringify(command);
		Logout(WIXPJSONStringForm);
		PrintLogsWIXPToTV(command);
		if (JAPITWIXPPlugin.WebIxpSend != undefined) {
			JAPITWIXPPlugin.WebIxpSend(WIXPJSONStringForm);
		}
		//Logout("Exit sendWIxPCommand \n");
	}
	catch (e) {
		alert("ERROR in sendWIxPCommand(). " + e );
	}
}

/* create some attributes of the WIXP object */
function CreateJAPITObjectForWIXPSvc() {
	this.Svc = "WIXP";
	this.SvcVer = "3.0";
	this.Cookie = 222;
}

/* a function to send a "Request" command to the TV to get the system date and time */
function getSystemDate() {
	Logout("Enter getSystemDate \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1050;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ClockControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ClockControlParameters": [
			"ClockTime",
			"CurrentDate"
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

/* a function to send a "Request" command to the TV to get the ProfessionalSettings */
function getProfessionalSettings() {
	Logout("Enter getSystemDate \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1051;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ProfessionalSettingsControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ProfessionalSettingsParameters": [
			"RawWIXP",
			//"AutoUpgradeDetails",
			"NetworkStatus",
			"TVModel",
			"SerialNumber",
			"RoomID",							//nok
			"CustomDashboardServerURL",			//nok
			//"SwitchOnSource",
			//"SwitchOnChannel",
			//"SwitchOnFeature",
			//"VolumeLimits",
			//"RebootMode",
			//"IdentificationSettings",
			//"ClearUserData",
			//"RegionAndLanguageSettings"
			"PowerSettings",
			//"WLSViaCDB",
			//"SecureSharing",
			//"Resources"
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// MyChoice Request (MSAF only)
function MyChoiceRequest() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 801;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "MyChoice";
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

// Function to set RawWIXP server
function setRawWIXP() {
	Logout("Enter getSystemDate \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1051;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ProfessionalSettingsControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"RawWIXP":
		{
			"Enable": "On",
			"RawWIXPServerIP": "192.168.103.112",
			"RawWIXPPort": "27501"
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

/* a function to send a "Change" command to the TV to set the system date and time */
function setSystemDate(newDate, newTime) {
	Logout("Enter setSystemDate \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1060;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ClockControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ClockTime": newTime,
		"CurrentDate": newDate,
		"RefDate": newDate,
		"RefTime": newTime
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function getCloneInformation() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1082;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "UpgradeControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"UpgradeControlRequestParameters": ["CurrentMainSoftwareVersion", "CurrentCloneVersions"]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function getKeys() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1189;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		//"VSecureStatus": [ "VSecureKeyStatus" ]
		"VSecureStatus": ["VSecureKeyStatus", "VSecureTVData"]
	};
	//JSON.stringify(JAPITObjForWIXPSvc)
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}



function clearKeys() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1189;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VSecureKeyChangeDetails": {
			"ClearKeys": ["All"]
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function setKeys(sharedKey, oddKey, evenKey) {
	// For TV with VSEC ID = 800000000000000f4da9
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1187;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VSecureKeyChangeDetails": {
			"VSecureKeys": {
				"SharedKey": sharedKey,
				"OddKey": oddKey,
				"EvenKey": evenKey
			}
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}


function setKeysKjellProdTV() {
	// For TV with VSEC ID = 800000000000000f4da9
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1189;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VSecureKeyChangeDetails": {
			"VSecureKeys": {
				"SharedKey": "55c088efe9904e6e4811163229b4a84d22a8d92af6eb5c800e05dd46b39eebdff4b7515477de7043a0df9d1378ea49950c9919302dc773be1972c423468f5b68ac1b467eadde95c73b7dbc2e307fbfbbbde92143f31fb8a56e5f65912a727737a90e1ff606fdc32a72119dbd0570bfcaf7400ac0339d90a8c3d01d5c15f3539be5d4e7eb0a553c08a8830697c0f3a12a90b43aaeefe53e7fffd8e4c3675b0c0b55679000391123be36ce0691f97c306d6ac74d6be70102dcdd92e1b4239615101cfbd0184ecc0abb114f444ef3c02af17dfd56457312d4ede8dc937ec9fb8e54b65af498c396eb0de18088dfb6aa51d39fe21ca2e7b35d93685bbfde40452a61",
				"OddKey": "1d4a2da288a1686e7ab3ab81de12cb14",
				"EvenKey": "bcd45d673d15444751580c5b0f5255e5"
			}
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function setKeysPieterDevTV() {
	// For TV with VSEC ID = 800000000000000F4DB8
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1189;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VSecureKeyChangeDetails": {
			"VSecureKeys": {
				"SharedKey": "6a38094895d74e1e862c31625fa2f7c5c1236d99f26e2b2cc655b15e1c5960a7ddc1378e8b916eebb87d0517ca0fb9dc15719d1432bfaf87112c98806bc91586aef88d36489c64ecee237035993fcf94de32d0acac99d85c2d18b04dc24d92acbbb507e5190f2c3eae3d965697626c4c880fb38bc946763341a8cb1c918d4d727f9a9433de8be9cec7d85fc28cd84a6de35e010b3190c9245f046d8858498d615170f6b85eca7a640bb275f2848b608c98a3cef1a20cadb11f461e3781380716256b4bdc49caeeb3f1377ae3372084c9d74e692c1d28856023531645124ba2c55a75a92ab2199e3452e4d8d050621c8e39b4981c1a3d4e7105ba3b459e2f309e",
				"OddKey": "1d4a2da288a1686e7ab3ab81de12cb14",
				"EvenKey": "bcd45d673d15444751580c5b0f5255e5"
			}
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function setKeysKjellDevTV() {
	// For TV with VSEC ID = 800000000000000f4dd3
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1189;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VSecureKeyChangeDetails": {
			"VSecureKeys": {
				"SharedKey": "cbee5b4ca0182c2b0139e25c9d035de1d278d646b410c0503068e316aa434ccb325a65b5bce14df0ca28b09f5bfa227cb3c6f04a81c541678c0f1a64501798e771083569717fd9a793ad2170d2e30fd7247bdd54d4e6bf4aabb2de3c5fdd0d3de423738b9c21e385564e8d62edb5b7cbdd8db717dc5b0a56ac5fa3bdb46d94efa6d536a3e1b49ef1f90706733752b9e17689fb23dfc68411421f86793aefbb4f1ef06c4302d63c8f5ae17143526e97a5f8661558f9616804e6d6ed272b2a8ab066798332653633779ac60b11df85a0142ff02de59f08701cb05a86d13f6f48f47bbbe60580bcd92cd6e7083475e871a0e4bd3f26eee7c08fdbe237bd214a7d71",
				"OddKey": "1d4a2da288a1686e7ab3ab81de12cb14",
				"EvenKey": "bcd45d673d15444751580c5b0f5255e5"
			}
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function setKeysPieter() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1189;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VSecureKeyChangeDetails": {
			"VSecureKeys": {
				"SharedKey": "129d301b602a6beb389dc76db8879946aa6aedf5a49643157515c098c78b7e2aa9593e88635becd275b5409b68dee9195ebcc8a70e0c15a5bb95111f118da8e51912886376ecd129d49758995d90d325670738b1284311d809a78e1f6a01616d7663d00518d20667b2496ee9069dd5118c9ce0e714d634a156973caa5f39908f7d2f717d6fac885679d0d682b8c8457b203075a3d79604964a5e00d5f4ae24086a0ff1a225e19e9b599987bf8d42860d18c5952df977b6ea638ac7460eda165b24e82033b9656c4ab150b011f715f273ae486b394ef1811db7fea6f9930d12f6279047fe548f3faab1b9a541cc443121fdd5c1c316fa5701a49b92d94a406361",
				"OddKey": "1d4a2da288a1686e7ab3ab81de12cb14",
				"EvenKey": "bcd45d673d15444751580c5b0f5255e5"
			}
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}


function setKeysNew() {
	// For TV with VSEC ID = 8000000000000F4DCD
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1189;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VSecureKeyChangeDetails": {
			"VSecureKeys": {
				"SharedKey": "4a52e7bf45e23d994057c07c1bb7d124905c870ec76924c75810c0fed6414947578496358f91843fe2567a87c23d7266f7fac5a40a2e79baf09d7b26aa764f9012d54ebc023462963cd5e21cd823237db1d2f92f1bda317695e50979724f0f6a6a53d5447a7130f829e44a9214198dd11d3f6fa6e5fb07d49eeb99a6cf29f1445d48daec5b278d4306ca1d20ffd589090619cc1da47e1a8fa2cdf5b0f094f4967f38484d9b16b0c772104c7d41ba0233bc2874f2bb5ef60c44ce6db4c27fb0b5f21927dc31932ff83b422c303fe03c5c1e4eaab07d7a6572d55c65cf40500d8dad9379e3f5e80742e1ceca5d51143e390bcd58a9e4b3b6ea9892d2170875179d",
				"OddKey": "1d4a2da288a1686e7ab3ab81de12cb14",
				"EvenKey": "bcd45d673d15444751580c5b0f5255e5"
			}
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function setKeys_OLD() {
	// For TV with VSEC ID = 8000000000000F4DCD
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1189;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VSecureKeyChangeDetails": {
			"VSecureKeys": {
				"SharedKey": "d7da6f98b350e99ce20d3f89b4bc789dde856520cce9b2197b9a69a4aed5c03238ed7a905c2107c43cbedc78db7a4e4b5c27aa312a6b104b52b3e033e9096b1458869d8bcc406584679cfc22156b396caf9ac7f22ea198810eeefcb6c58ffb660e27b2fb7f8be074ddb7d2035b8861730c4cb84e7ad11b619a33d6c9ce8ebe8d332aabfeb5d1087bd1f9e1142ff803eb614c93d8543b29fb81f0c37aa68de5470a06cfff619ae4f9b819147ca6f4a1d5e1509a1bdbd0e997c7ec2b32e41ad01d7e1c54f2697a51a813295afeca1999542f672852289b8349cb36c94f03bb8e0be752810baa96fa3bea977598643cd457f1e9b6918ebf6346ab47b7debce7bfbf",
				"OddKey": "6550ac13ec35e9d455ad65ae1be8836d",
				"EvenKey": "839c075b9139850fb40987ea9dda96fe"
			}
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function TuneViaChannelNumber(channelNum) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1091;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
			"ChannelNumber": channelNum,
		}
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function IPTuning(url) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1091;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
			"URL": url,
		}
	};
	CurrentTuningParameters = JAPITObjForWIXPSvc.CommandDetails;
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function stopCurrentChannel()	{
	Logout("stopCurrentChannel()");

	try {
		var ParameterObj;

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

function IPTuningStop(url) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1093;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
			"URL": url,
		},
		"TrickMode": "Stop"

	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RFTuningStop(freq, sid, type) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1093;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
			"TuningType": type,
			"Freq": freq,
			"ServiceID": sid,
			"ONID": 65535,	//1,
			"NID": 65535,	//0,
			"TSID": 65535,	//11,
			"Modulation": "Auto",
			"SymbolRate": 0//48750	//65535//49000//48750//6874000
		},
		"TrickMode": "Stop"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RFTuning(freq, sid, type) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1092;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
			"TuningType": type,
			"Freq": freq,
			"ServiceID": sid,
			"ONID": 65535,	//1,
			"NID": 65535,	//0,
			"TSID": 65535,	//11,
			"Modulation": "Auto",
			"SymbolRate": 0//48750	//65535//49000//48750//6874000
		}
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

//audio- videomute
function VideoMute(state) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1887;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "PictureControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VideoMute": state
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}
function AudioMute(state) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1887;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "AudioControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"AudioMute": state
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}


function setSubtitleLang() {
	Logout("Enter setSubtitleLang \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 2060;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "Subtitles";
	JAPITObjForWIXPSvc.CommandDetails = {
		"SubtitleState": "On",
		"SubtitleLanguageIndex": 0
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function getSubtitleLang() {
	Logout("Enter getSubtitleLang \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 2060;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "Subtitles";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function removeSubtitles() {
	Logout("Enter Subs OFF \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 2060;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "Subtitles";
	JAPITObjForWIXPSvc.CommandDetails = {
		"SubtitleState": "Off",
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function getAudioLang() {
	Logout("Enter getAudioLang \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 2061;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "AudioLanguage";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function TuneTo(source) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1092;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "Source";
	JAPITObjForWIXPSvc.CommandDetails = {
		"TuneToSource": source
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RequestSource() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 194;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "Source";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RequestApplicationControl() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 295;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RequestApplicationControl2() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 296;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"RequestListOfAvailableApplications": {
				"Filter": ["Native", "NonNative"]
				//"Filter": [ "Native"]
			},
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function ActivateTeletext() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 301;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"ApplicationDetails":
			{
				"ApplicationName": "Teletext",
				"ApplicationAttributes":
				{
					"TeletextPage": 100,
					"TeletextSubcode": 0
				}
			},
			"ApplicationState": "Activate"
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function DeActivateTeletext(state) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 301;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"ApplicationDetails":
				{ "ApplicationName": "Teletext" },
			"ApplicationState": state
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function GoToLocalCDB() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 321;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"ApplicationDetails":
				{ "ApplicationName": "LocalCustomDashboard" },
			"ApplicationState": "Activate"
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function GoToEPG() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 333;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"ApplicationDetails":
				{ "ApplicationName": "EPG" },
			"ApplicationState": "Activate"
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function GoToMedia() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 331;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"ApplicationDetails":
				{ "ApplicationName": "Media" },
			"ApplicationState": "Activate"
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function GoToServerCDB() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 321;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"ApplicationDetails":
				{ "ApplicationName": "CustomDashboard" },
			"ApplicationState": "Activate"
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

//RequestMiracast
function RequestMiracast() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 311;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"ActiveApplications": [
				{
					"ApplicationName": "Miracast"
				}
			]
		};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function GoToDefaultDB() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 303;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails":
		{
			"ApplicationName": "DefaultDashboard",
			"ApplicationType": "Native"
		},
		"ApplicationState": "Activate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}


function ActivateApp(application) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 302;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails":
		{
			"ApplicationName": application,
			// "ApplicationType" : "Native"	
		},
		//  "ApplicationSubState" : "Settings"},
		"ApplicationState": "Activate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function DeActivateApp() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 302;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails":
		{
			"ApplicationName": "Miracast",
			"ApplicationType": "Native"
		},
		//  "ApplicationSubState" : "Settings"},
		"ApplicationState": "Deactivate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function ActivateSmartTV() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 304;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationName": "SmartTV"
		},
		"ApplicationState": "Activate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function WeatherRequest() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 303;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"RequestApplicationAttributesValueDetails": [
			{
				"ApplicationName": "Weather",
				"ApplicationType": "Native",
				"ApplicationAttributes": {
					"GeonameLocationID": 1233434534,
					"GuestLanguage": "ger"
				},
				"RequestListForApplicationAttributesValue": ["WeatherForecast"]
			},
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function changeCDBstate(state) {
	Logout("ActivateCustomDashBoard to " + state + " \n");

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1090;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
		{
			"ApplicationDetails":
				{ "ApplicationName": "CustomDashboard" },
			"ApplicationState": state
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}


function RequestRegionLanguage() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 118;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "RegionAndLanguageControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"RegionAndLanguageControlParameters": ["GuestCountry"]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

//ChangeBrightness();
function ChangeBrightness() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 318;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "PictureControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"Brightness": 5
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

//RequestBrightness();
function RequestBrightness() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 318;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "PictureControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"PictureControlParameters": ["Brightness"]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

//PMS
function RequestPMS() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 418;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "PMS";
	JAPITObjForWIXPSvc.CommandDetails = {
		"PMSParameters": {
			"RequestPMSParameters":
				//[ "PMSFeaturesSupported" ]}
				["GuestDetails"]
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function PowerOff() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 18;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "PowerState";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ToPowerState": "Standby"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function requestPower() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 19;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "PowerState";
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function Reboot() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 18;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "PowerState";
	JAPITObjForWIXPSvc.CommandDetails = {
		"PowerAction": "Reboot"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

//ToQuickClock();
function ToQuickClock() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 18;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "PowerState";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ToPowerState": "QuickClock"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RequestSubtitles() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 295;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "Subtitles";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function ChangeSwitchOn() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 295;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ProfessionalSettingsControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"SwitchOnChannel": {
			/*//"RFChannelDetails" :
				//{
					"TuningType": "DVBC",
					"Freq": 298000000,
					"ServiceID": 1103,
					"ONID": 1,
					"NID": 65535,
					"TSID": 11,
					"Modulation": "Auto",
					"SymbolRate": 0
				//}*/
			//"IPChannelDetails":{
			//	"URL":"multicast://239.232.209.92:50000/0/0/0"
			"ChannelNumberDetails":
			{
				"ChannelNumber": 2
			}
			//}
			//xxx
		}
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function ChangeSwitchOnSource() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 295;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ProfessionalSettingsControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"SwitchOnSource": "HDMI1"
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RequestChannelList() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1523;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ContentLevel": "CompleteChannelDetails",
		"SearchDirection": "NEXT",
		"SearchFromChannelNumber": 21,
		"Loop": "No",
		"NumberOfChannels": 1,
		"Filter": ["ALL"]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function InstallChannelTest() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1492;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {
		"AddChannels": [
			//{
			/* "BasicChannelDetails": {
				 "ChannelNo": 45,
				 "ChannelName": "New Chan",
				 "ChannelType": "RF",
		 //"ChannelLogo": "file://default/Logo.jpg"
			 },
			 "ChannelTuningDetails": {
				 "TuningType": "DVBC",
				 "Freq": 298000000,
				 "ServiceID": 1103,
				 "ONID": 1,
				 "NID": 65535,
				 "TSID": 11,
				 "Modulation": "Auto",
				 "SymbolRate": 0
		 }
	 },*/
			/*	  "BasicChannelDetails": {
							"ChannelNo": 22,
							"ChannelName": "IP Chan",
							"ChannelType": "IP"
						},
						"ChannelTuningDetails": {
					"URL":"multicast://239.232.209.112:50000/0/0/0/VBR"
					}
				},*/
			{
				"BasicChannelDetails": {
					"ChannelNo": 67,
					"ChannelName": "Chan RFnew",
					"ChannelType": "RF",
					//"ChannelLogo": "file://default/Logo.jpg"
				},
				"ChannelTuningDetails": {
					"TuningType": "DVBT",
					"Freq": 634000,
					"ServiceID": 8,
					"ONID": 1,
					"NID": 1,
					"TSID": 2,
					"Modulation": "Auto"
					//        "SymbolRate": 6875000
				}
			}
			/*,
			{
					"BasicChannelDetails": {
						"ChannelNo": 53,
						"ChannelName": "BBC ONE",
						"ChannelType": "RF"
					},
					"ChannelTuningDetails": {
						"TuningType": "DVBT",
						"Freq": 610000,
						"ServiceID": 4165,
						"ONID": 65535,
						"NID": 65535,
						"TSID": 65535,
						"Modulation": "Auto",
				}
			},
			{
					"BasicChannelDetails": {
						"ChannelNo": 54,
						"ChannelName": "BBC ONE HD",
						"ChannelType": "RF"
					},
					"ChannelTuningDetails": {
						"TuningType": "DVBT2",
						"Freq": 818000,
						"ServiceID": 17540,
						"ONID": 65535,
						"NID": 65535,
						"TSID": 65535,
						"Modulation": "Auto",
				}
			},
			{
					"BasicChannelDetails": {
						"ChannelNo": 55,
						"ChannelName": "HD1",
						"ChannelType": "RF"
					},
					"ChannelTuningDetails": {
						"TuningType": "DVBT2",
						"Freq": 514000,
						"ServiceID": 1280,
						"ONID": 65535,
						"NID": 65535,
						"TSID": 65535,
						"Modulation": "Auto",
				}
			}		*/
		]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}


function InstallChannelTestPieter() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1492;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {
		"AddChannels": [
			{
				"BasicChannelDetails": {
					"ChannelNo": 67,
					"ChannelName": "Chan RFnew",
					"ChannelType": "RF",
				},
				"ChannelTuningDetails": {
					"TuningType": "DVBT",
					"Freq": 634000,
					"ServiceID": 8,
					"ONID": 1,
					"NID": 1,
					"TSID": 2,
					"Modulation": "Auto"
				}
			}
		]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function InstallChannelTestIndranil() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1500;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {
		"AddChannels": [
			{
				"BasicChannelDetails": {
					"ChannelNo": 67,
					"ChannelName": "Chan RFnew",
					"ChannelType": "RF",
				},
				"ChannelTuningDetails": {
					"TuningType": "DVBT",
					"Freq": 634000,
					"ServiceID": 8,
					"ONID": 1,
					"NID": 1,
					"TSID": 2,
					"Modulation": "Auto"
				}
			}
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

/*  a function to get the number of channels that exist on the TV by sending a WIXP command with the required details  */
function GetNumberOfChannelsInTV() {

	PrintLogsWIXPToTV("Enter GetNumberOfChannelsInTV \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1050;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ContentLevel": "NumberOfChannels",
		/*"SearchDirection":"NEXT",
		"SearchFromChannelNumber":21,
		"Loop":"No",
		"NumberOfChannels":5,
								/* ContentLevel can have one of the following values: "BasicChannelDetails", "CompleteChannelDetails", or "NumberOfChannels" */
		"Filter": ["ALL"]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
	Logout("Exit GetNumberOfChannelsInTV \n");
}

/*  a function to get the channels details from the TV by sending a WIXP command with the required details  */
function requestChannelsFromTV(start) {

	Logout("Enter requestChannelsFromTV \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1055;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ContentLevel": "CompleteChannelDetails",            		/* "BasicChannelDetails" "CompleteChannelDetails" "NumberOfChannels" */
		"SearchDirection": "CURRENT",							/* <string>, <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
		"SearchFromChannelNumber": start,							/* 1 to _WIXP_MAX_CHANNELS_SUPPORTED, <integer>, <<OPTIONAL> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
		"Loop": "Yes",											/* <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
		"NumberOfChannels": 2, 					/* <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
		"Filter": ["ALL"]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);

	Logout("Exit requestChannelsFromTV \n");
}

// AUDIOCONTROL
function GetVolume() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 575;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "AudioControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"AudioControlParameters": ["Volume"]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

// AUDIOCONTROL
function SetVolume(volume) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 575;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "AudioControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"Volume": volume
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function SetVolumeDestination(volume) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 575;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "AudioControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"IndividualAudioOutDestinationControlParameters": [
			{
				"AudioOutDestination": "MainSpeakers",
				"Volume": volume,
				"AudioMute": "On",
				"SmartSound": "News"
			},
			{
				"AudioOutDestination": "Bluetooth",
				"Volume": volume,
				"AudioMute": "On",
				"SmartSound": "News"
			},
			{
				"AudioOutDestination": "Headphone",
				"Volume": volume,
				"AudioMute": "Off",
				"SmartSound": "Game"
			}
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

// USERINPUT
function AllKeyForward() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 475;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "AllVirtualKeyForward"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function NoKeyForward() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 476;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "DontForwardAnyVirtualKey"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function SelectiveKeyForward() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 476;
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
	/*
	JAPITObjForWIXPSvc.CommandDetails = {	
		"VirtualKeyForwardMode" : "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded" : [
			//{"Vkkey" : "HBBTV_VK_OPTIONS"}, 
			//{"vkkey" : "HBBTV_VK_TELETEXT"}, 
			{"vkkey" : "HBBTV_VK_POWER"}, 
			{"vkkey" : "HBBTV_VK_BACK"},
			{"vkkey" : "HBBTV_VK_MENU"},
			{"vkkey" : "HBBTV_VK_HOME"},
			//{"Vkkey" : "HBBTV_VK_7"}, 
			//{"Vkkey" : "HBBTV_VK_9"}
		]
	};
	*/
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function SelectiveKeyForward2() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 476;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded": [
			{ "Vkkey": "HBBTV_VK_OPTIONS" },
			{ "vkkey": "HBBTV_VK_TELETEXT" },
			{ "vkkey": "HBBTV_VK_POWER" },
			{ "vkkey": "HBBTV_VK_BACK" },
			{ "Vkkey": "HBBTV_VK_HOME" },
			//{"Vkkey" : "HBBTV_VK_9"}
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function SelectiveKeyForward_TakTik() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 476;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded":
			[
				// { "vkkey" : "HBBTV_VK_POWER" }, // not existing
				// { "vkkey" : "HBBTV_VK_MYCHOICE" },
				{ "vkkey": "HBBTV_VK_CLOCK" },
				// { "vkkey" : "HBBTV_VK_SMARTTV" },
				// { "vkkey" : "HBBTV_VK_CHANNELGRID" },
				// { "vkkey" : "HBBTV_VK_ALARM" },
				{ "vkkey": "HBBTV_VK_SMARTINFO" },
				// { "vkkey": "SmartAudio_custom"}, //not working...
				{ "vkkey": "HBBTV_VK_SOURCE" },
				{ "vkkey": "HBBTV_VK_TV" },
				// { "vkkey" : "HBBTV_VK_FORMAT" },
				// { "vkkey" : "HBBTV_VK_HOME" }, // not existing
				{ "vkkey": "HBBTV_VK_PLAY_PAUSE" }, // previously was VK_OSRC
				{ "vkkey": "HBBTV_VK_OSRC" }, // PLAY_PAUSE not working no current android philips tV previously was VK_OSRC
				{ "vkkey": "HBBTV_VK_GUIDE" },
				{ "vkkey": "HBBTV_VK_ACCEPT" },
				{ "vkkey": "HBBTV_VK_INFO" },
				{ "vkkey": "HBBTV_VK_LEFT" },
				{ "vkkey": "HBBTV_VK_RIGHT" },
				{ "vkkey": "HBBTV_VK_UP" },
				{ "vkkey": "HBBTV_VK_DOWN" },
				// { "vkkey" : "HBBTV_VK_ADJUST" },
				// { "vkkey" : "HBBTV_VK_OPTIONS" }, // options button ---> crash the app at second press. and was supposed to be menu an considered as double click on old version
				{ "vkkey": "HBBTV_VK_BACK_SPACE" }, // not existing
				{ "vkkey": "HBBTV_VK_MENU" },
				{ "vkkey": "HBBTV_VK_CHANNEL_UP" },
				{ "vkkey": "HBBTV_VK_CHANNEL_DOWN" },
				{ "vkkey": "HBBTV_VK_VOLUME_DOWN" },
				{ "vkkey": "HBBTV_VK_VOLUME_UP" },
				{ "vkkey": "HBBTV_VK_MUTE" },
				{ "vkkey": "HBBTV_VK_RED" },
				{ "vkkey": "HBBTV_VK_GREEN" },
				{ "vkkey": "HBBTV_VK_BLUE" },
				{ "vkkey": "HBBTV_VK_YELLOW" },
				{ "vkkey": "HBBTV_VK_SUBTITLE" },
				//{ "vkkey" : "HBBTV_VK_TEXT" }, // not existing
				{ "vkkey": "HBBTV_VK_TELETEXT" },
				{ "vkkey": "HBBTV_VK_1" },
				{ "vkkey": "HBBTV_VK_2" },
				{ "vkkey": "HBBTV_VK_3" },
				{ "vkkey": "HBBTV_VK_4" },
				{ "vkkey": "HBBTV_VK_5" },
				{ "vkkey": "HBBTV_VK_6" },
				{ "vkkey": "HBBTV_VK_7" },
				{ "vkkey": "HBBTV_VK_8" },
				{ "vkkey": "HBBTV_VK_9" },
				{ "vkkey": "HBBTV_VK_0" },
				// {"Vkkey" : "HBBTV_VK_OPTIONS"}, 
				{ "Vkkey": "HBBTV_VK_EXTERNAL_3" },
				{ "Vkkey": "HBBTV_VK_EXTERNAL_4" },
				{ "Vkkey": "HBBTV_VK_EXTERNAL_5" },
				{ "Vkkey": "HBBTV_VK_EXTERNAL_6" },
			],
		"VirtualKeyMapDetails": [
			{
				"RCProtocol": "RC6",
				"RCCode": 142, // TELEVIC_PLAY
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_EXTERNAL_3"
			},
			{
				"RCProtocol": "RC6",
				"RCCode": 49, // TELEVIC_STOP
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_EXTERNAL_4"
			},
			{
				"RCProtocol": "RC6",
				"RCCode": 43, // TELEVIC_REWIND
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_EXTERNAL_5"
			},
			{
				"RCCode": 40,	// TELEVIC FORWARD
				"RCProtocol": "RC6",
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_EXTERNAL_6"
			}
		]
		// }
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function UserInputRequest() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 478;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function CustomKeysForward() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 478;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";

	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded": [
			{ "Vkkey": "HBBTV_VK_OPTIONS" },
			{ "vkkey": "HBBTV_VK_GREEN" },
			{ "Vkkey": "HBBTV_VK_EXTERNAL_4" },
			{ "Vkkey": "HBBTV_VK_EXTERNAL_5" },
			{ "Vkkey": "HBBTV_VK_EXTERNAL_6" },
			{ "Vkkey": "HBBTV_VK_SMARTINFO" },
			{ "Vkkey": "HBBTV_VK_9" }
		],
		"VirtualKeyMapDetails": [
			{
				"RCProtocol": "RC6",
				"RCCode": 49, // TELEVIC_STOP
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_EXTERNAL_4"
			},
			{
				"RCProtocol": "RC6",
				"RCCode": 43, // TELEVIC_REWIND
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_EXTERNAL_5"
			},
			{
				"RCCode": 40,	// TELEVIC FORWARD
				"RCProtocol": "RC6",
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_EXTERNAL_6"
			}
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function keyDownHandler(e) {
	Logout("Enter keyDownHandler keydown handler - key received " + e.keyCode + "  \n");
	PrintLogsWIXPToTV("keydown");
	keyHandler(e.keyCode);
	Logout("Exit keyDownHandler \n");
}

function OnKeyReceivedHandler(event) {
	// alert("Enter onKeyReceived - key received " + event + " ******************************** \n");
	PrintLogsWIXPToTV("OnKeyReceived");
	var eventDetail = event.detail; //It contains key code and window ID                       
	var eventval = eventDetail.split(',');
	var keyStatus = parseInt(eventval[1]);
	var keyCode = -1;

	Logout("Enter OnKeyReceivedHandler keystatus : " + keyStatus + "  keycode : " + keyCode + "\n");

	if (keyStatus == 2) {	// change to 0 for MSAF
		//if(keyStatus == 0){
		keyCode = parseInt(eventval[0]);
		Logout("OnKeyReceivedHandler Camehere1 \n");
		//var str = JSON.stringify(event); //JSON.stringify(event, null, 4);
		Logout("keystatus : " + keyStatus + "  keycode : " + keyCode + "\n");
		Logout(" eventval : " + event + " \n");
		keyHandler(keyCode);
		Logout("OnKeyReceivedHandler Camehere2 \n");
	}
	else {
		Logout("OnKeyReceivedHandler Camehere3 \n");
		Logout("keystatus : " + keyStatus + "  keycode : " + keyCode + "\n");
		Logout(" eventval : " + event + " \n");
		Logout("OnKeyReceivedHandler Camehere4 \n");
	}

	// keyHandler(event);
	Logout("Exit OnKeyReceivedHandler \n");
}


function keyHandler(keyCode) {
	Logout("Enter keyHandler - key received " + keyCode + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	Logout("KeyCode of VK_GREEN: " + VK_GREEN);
	PrintLogsWIXPToTV("key:" + keyCode);
	try {
		switch (keyCode) {
			case VK_LEFT:
				PrintLogsWIXPToTV("arrow left pressed - HELLO");
				window.location.reload(true);
				NoKeyForward();
				//KeyChange();
				break;

			case VK_RIGHT:
				PrintLogsWIXPToTV("arrow right pressed- ARUN");
				RequestSource();
				RequestApplicationControl();
				break;

			case VK_POWER:
				PrintLogsWIXPToTV("VK_POWER");
				break;

			case VK_ENTER:
				PrintLogsWIXPToTV("VK_ENTER");
				break;

			case VK_ACCEPT:
				PrintLogsWIXPToTV("VK_ACCEPT");
				break;

			case 210:
				PrintLogsWIXPToTV("SmartAudio_custom");
				break;

			case VK_MYCHOICE:
				PrintLogsWIXPToTV("VK_MYCHOICE2");
				break;

			case VK_CLOCK:
				PrintLogsWIXPToTV("VK_CLOCK");
				break;

			/*		case VK_PLAY:
						PrintLogsWIXPToTV("VK_PLAY");
						break;
						
					case VK_PAUSE:
						PrintLogsWIXPToTV("VK_PAUSE");
						break;	
						
					case VK_PLAYPAUSE:
						PrintLogsWIXPToTV("VK_PLAYPAUSE");
						break;
						
					case VK_A:
						PrintLogsWIXPToTV("VK_STOP_A");
						break;*/

			case VK_SMARTTV:
				PrintLogsWIXPToTV("VK_SMARTTV");
				break;

			case VK_TV:
				PrintLogsWIXPToTV("VK_TV");
				break;

			case VK_ALARM:
				PrintLogsWIXPToTV("VK_ALARM");
				break;

			case VK_CHANNELGRID:
				PrintLogsWIXPToTV("VK_CHANNELGRID");
				break;

			case VK_FORMAT:
				PrintLogsWIXPToTV("VK_FORMAT");
				break;

			case VK_INFO:
				PrintLogsWIXPToTV("VK_INFO");
				break;

			case VK_BACK:
				PrintLogsWIXPToTV("VK_BACK");
				break;

			case VK_OPTIONS:
				PrintLogsWIXPToTV("VK_OPTIONS");
				break;

			case VK_SMARTINFO:
				PrintLogsWIXPToTV("VK_SMARTINFO");
				break;

			/*case VK_CHANNELS:
				PrintLogsWIXPToTV("VK_CHANNELS");
				break;	*/

			case VK_RED:
				PrintLogsWIXPToTV("VK_RED");
				break;

			case VK_MUTE:
				PrintLogsWIXPToTV("VK_MUTE");
				break;

			case VK_SOURCE:
				PrintLogsWIXPToTV("VK_SOURCE");
				break;

			case VK_2:
				PrintLogsWIXPToTV("VK_2 - new");
				Logout("VK_2");
				//ToQuickClock();
				break;

			case VK_4:
				PrintLogsWIXPToTV("digit 4 pressed - CDB OFF");
				state = "Deactivate";
				changeCDBstate(state);
				break;

			case VK_6:
				PrintLogsWIXPToTV("digit 6 pressed - CDB ON");
				state = "Activate";
				changeCDBstate(state);
				break;

			case VK_7:
				Logout("digit 7 pressed");	//- TXT OFF");
				//state = "Deactivate";
				//DeActivateTeletext(state);
				DirectTune4();
				break;

			case VK_9:
				Logout("digit 9 pressed - TXT ON");
				//RequestBrightness();
				state = "Activate";
				ActivateTeletext(state);
				break;

			case VK_SUBTITLE:
				PrintLogsWIXPToTV("VK_SUBTITLE");
				break;

			case VK_MENU:
				PrintLogsWIXPToTV("Home pressed - Tune To CH2");
				TuneToCh2();
				break;

			case VK_CHANNEL_UP:
				PrintLogsWIXPToTV("CH UP");
				break;

			case VK_CHANNEL_DOWN:
				PrintLogsWIXPToTV("CH DOWN");
				break;

			case VK_TELETEXT:
				PrintLogsWIXPToTV("TELETEXT");
				SelectiveKeyForward();
				state = "Activate";
				ActivateTeletext(state);
				break;

			case VK_WEATHER:
				PrintLogsWIXPToTV("Weather");
				break;

			case VK_EXTERNAL_4:
				PrintLogsWIXPToTV("TELEVIC STOP");
				break;

			case VK_YOUTUBE:
				PrintLogsWIXPToTV("YouTube");
				break;

			case VK_HOME:
				PrintLogsWIXPToTV("VK_Home");
				break;

			case 462:
				PrintLogsWIXPToTV("VK_Menu_NEW");
				break;

			case VK_GREEN:
				// enable/disable Excercise
				toggleDebugScreen();
				break;

			default:
				Logout("Nothing to handle");
				Logout("KeyCode of VK_GREEN: " + VK_GREEN);
				//PrintLogsWIXPToTV("Key Not FOUND");
				break;
		}
	}
	catch (e) {
		alert(e);
	}

	Logout("Exit keyHandler");
}
