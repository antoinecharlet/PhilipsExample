/* 
*	Example_11_PIP
*/

/* a function to initialize our module */
function init(){

	SetupUserAgent();
	Logout("Enter init \n");
	ExerciseModelInit();
	ExerciseViewInit();
	UtilityInit();
	setTimeout(function() {
		try {
			Logout("Add Event Listener");
			document.addEventListener("keydown", keyDownHandler, true);
			document.addEventListener("OnKeyReceived", OnKeyReceivedHandler, false);
		} catch(e) {
			Logout("exception in init. " + e );
		}
	}, 5000);
	Logout("Exit init \n");
}

