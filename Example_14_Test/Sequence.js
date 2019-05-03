var urlTV1="multicast://227.0.14.9:11022/0/0/0";

Sequence : [
    {"delay": "0",
     "text": "Sequence #1: tune to " + urlTV1,
     "WIXP": {   "Svc": "WIXP",
		    "SvcVer": "4.0",
		    "Cookie": "201",
		    "CmdType": "Change",
		    "Fun": "ChannelSelection",
		    "CommandDetails": {
			    "ChannelTuningDetails": {
				    "URL": urlTV1,
				    "TrickMode": "Stop"
			    }
		    }
        }
    },
    {"delay": "4",
     "text" : "Trickmode stop " + urlTV1, 
     "WIXP" : 	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "202",
		"CmdType": "Change",
		"Fun": "ChannelSelection",
		"CommandDetails": {
			"ChannelTuningDetails": {
				"URL": urlTV1,
				"TrickMode": "Stop"
			}
		}
	}],
	[6, "Trickmode stop again " + urlTV1, "WIXP" 
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "203",
		"CmdType": "Change",
		"Fun": "ChannelSelection",
		"CommandDetails": {
			"ChannelTuningDetails": {
				"URL": urlTV1,
				"TrickMode": "Stop"
			}
		}
    }],
    [7, "SetPictureSize", "Function", "setPictureSize(600, 655, 720, 405)"],
],
    [8, "SetPictureSize", "Function", "WIXP",
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "82",
		"CmdType": "Change",
		"Fun": "ChannelSelection",
		"CommandDetails": {
			"ChannelTuningDetails": {
				"URL": "multicast://228.0.1.10:11022/0/0/0"
			}
		}
	}],
	[9,
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "83",
		"CmdType": "Change",
		"Fun": "ChannelSelection",
		"CommandDetails": {
			"ChannelTuningDetails": {
				"URL": "multicast://228.0.1.10:11022/0/0/0",
				"TrickMode": "Stop"
			}
		}
	}],
	[21,
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "84",
		"CmdType": "Change",
		"Fun": "ClockControl",
		"CommandDetails": {
			"ClockTime": "17:09:00",
			"CurrentDate": "30/03/2019"
		}
	}],
	[21,
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "85",
		"CmdType": "Request",
		"Fun": "ApplicationControl"
	}],
	[47,
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "86",
		"CmdType": "Change",
		"Fun": "ChannelSelection",
		"CommandDetails": {
			"ChannelTuningDetails": {
				"URL": "multicast://228.0.1.4:11022/0/0/0"
			}
		}
	}],
	[47,
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "87",
		"CmdType": "Change",
		"Fun": "UserInputControl",
		"CommandDetails": {
			"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
			"VirtualKeyToBeForwarded": [{
				"Vkkey": "HBBTV_VK_0"
			},
			{
				"Vkkey": "HBBTV_VK_1"
			},
			{
				"Vkkey": "HBBTV_VK_2"
			},
			{
				"Vkkey": "HBBTV_VK_3"
			},
			{
				"Vkkey": "HBBTV_VK_4"
			},
			{
				"Vkkey": "HBBTV_VK_5"
			},
			{
				"Vkkey": "HBBTV_VK_6"
			},
			{
				"Vkkey": "HBBTV_VK_7"
			},
			{
				"Vkkey": "HBBTV_VK_8"
			},
			{
				"Vkkey": "HBBTV_VK_9"
			},
			{
				"V47	kkey": "HBBTV_VK_UP"
			},
			{
				"Vkkey": "HBBTV_VK_DOWN"
			},
			{
				"Vkkey": "HBBTV_VK_LEFT"
			},
			{
				"Vkkey": "HBBTV_VK_RIGHT"
			},
			{
				"Vkkey": "HBBTV_VK_ACCEPT"
			},
			{
				"Vkkey": "HBBTV_VK_RED"
			},
			{
				"Vkkey": "HBBTV_VK_GREEN"
			},
			{
				"Vkkey": "HBBTV_VK_YELLOW"
			},
			{
				"Vkkey": "HBBTV_VK_BLUE"
			},
			{
				"Vkkey": "HBBTV_VK_MENU"
			},
			{
				"Vkkey": "HBBTV_VK_CHANNEL_UP"
			},
			{
				"Vkkey": "HBBTV_VK_CHANNEL_DOWN"
			},
			{
				"Vkkey": "HBBTV_VK_CHANNEL_MENU"
			},
			{
				"Vkkey": "HBBTV_VK_CHANNEL_TV"
			},
			{
				"Vkkey": "HBBTV_VK_POWER"
			},
			{
				"Vkkey": "HBBTV_VK_GUIDE"
			},
			{
				"Vkkey": "HBBTV_VK_BACK"
			},
			{
				"Vkkey": "HBBTV_VK_ALARM"
			},
			{
				"Vkkey": "HBBTV_VK_MYCHOICE"
			},
			{
				"Vkkey": "HBBTV_VK_SMARTINFO"
			},
			{
				"Vkkey": "HBBTV_VK_TV"
			},
			{
				"Vkkey": "HBBTV_VK_OPTIONS"
			},
			{
				"Vkkey": "HBBTV_VK_FORMAT"
			}],
			"VirtualKeyMapDetails": [{
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
				"RCProto   	col": "RC5",
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
				"RCProtocol": "RC5",
				"RCCode": 35,
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_SMARTINFO"
			},
			{
				"RCProtocol": "RC5",
				"RCCode": 126,
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_FORMAT"
			},
			{
				"RCProtocol": "R  	C5",
				"RCCode": 100,
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_OPTIONS"
			},
			{
				"RCProtocol": "RC5",
				"RCCode": 58,
				"RCSystem": 0,
				"MapToVirtualKey": "HBBTV_VK_TV"
			},
			{
				"RCProtocol": "RC5",
				"RCCode": 10,
				"RCSystem": 3,
				"MapToVirtualKey": "HBBTV_VK_PICTURESTYLE"
			}]
		}
	}],
	[52,
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "88",
		"CmdType": "Change",
		"Fun": "ClockControl",
		"CommandDetails": {
			"ClockTime": "17:09:26",
			"CurrentDate": "30/03/2019"
		}
	}],
	[52,
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "89",
		"CmdType": "Request",
		"Fun": "ApplicationControl"
	}],
	[81,
	{
		"CmdType": "Change",
		"Fun": "ChannelSelection",
		"CommandDetails": {
			"ChannelTuningDetails": {
				"URL": "multicast://227.0.11.1:11022/0/0/0"
			}
		},
		"Cookie": "90",
		"Svc": "WIXP",
		"SvcVer": "4.0"
	}],
	[87,
	{
		"CmdType": "Change",
		"Fun": "ChannelSelection",
		"CommandDetails": {
			"ChannelTuningDetails": {
				"URL": "multicast://228.0.1.4:11022/0/0/0"
			}
		},
		"Cookie": "91",
		"Svc": "WIXP",
		"SvcVer": "4.0"
	}],
	[113,
	{
		"Svc": "WIXP",
		"SvcVer": "4.0",
		"Cookie": "92",
		"CmdType": "Request",
		"Fun": "ClockControl",
		"CommandDetails": {
			"ClockControlParameters": ["ClockTime",
			"CurrentDate"]
		}
	}]

];