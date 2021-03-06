/* 
*
* This can be reused in as is or even modified freely.
*
*/

/* a function to initialize our module */
function init(){
	
	SetupUserAgent();
	Logout("Enter init");
	Exercise01ModelInit();
	Exercise01ViewInit();
	UtilityInit();
	
	// Below function is added for UserInputs
	setTimeout(function() {
		try {
			document.addEventListener("keydown", keyDownHandler, true);
			document.addEventListener("OnKeyReceived", OnKeyReceivedHandler, false);
		} catch(e) {
			alert("exception in init \n");
			alert("exception " + e + " \n");
		}
	}, 5000);
	Logout("Exit init");
}
