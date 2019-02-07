/* 
*
* This can be reused in as is or even modified freely.
*
*/

/* a function to initialize our module */
function init() {
	alert("Enter init \n");
	Exercise01ModelInit();
	Exercise01ViewInit();
	UtilityInit();
	
	try {
		var viewport = document.querySelector("meta[name=viewport]");
		var content = viewport.getAttribute("content");
	} catch (e) {
		alert(e.message);
	}

	try {
		var res= `${screen.width} × ${screen.height}`;
		var theX= document.getElementById("theX");
		theX.innerHTML= res;
	} catch (e) {
		alert(e.message);
	}

	alert("Exit init \n");

	

}
