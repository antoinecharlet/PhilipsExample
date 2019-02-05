/* 
*
* This can be reused in as is or even modified freely.
*
*/

/* a function to initialize our module */
function init(){
	alert("Enter init \n");
	Exercise01ModelInit();
	Exercise01ViewInit();
	UtilityInit();
	setTimeout(function() {
		try {
			document.addEventListener("keydown", keyDownHandler, true);
			document.addEventListener("OnKeyReceived", OnKeyReceivedHandler, false);
		} catch(e) {
			alert("exception in init \n");
			alert("exception " + e + " \n");
		}
	}, 5000);
	alert("Exit init \n");
}
