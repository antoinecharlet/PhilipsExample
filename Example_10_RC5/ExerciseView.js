/* 
*
* This can be reused in as is or even modified freely.
*
*/

var IdCurrentPowerStateText;
var IdPowerTransitionText;

const CurrentPowerState = "Current Power State: ";
const PowerTransition = "Power Transition In Progress: ";

function ExerciseViewInit()
{
	CreateHTMLElements();
}

function CreateHTMLElements()
{
	IdCurrentPowerStateText = document.getElementById("IdCurrentPowerStateText");
	IdPowerTransitionText = document.getElementById("IdPowerTransitionText");
}

function DisplayCurrentPowerState(WIXPJsonResponse)
{
	IdCurrentPowerStateText.innerHTML = CurrentPowerState + WIXPJsonResponse.CommandDetails.CurrentPowerState;
	IdPowerTransitionText.innerHTML = PowerTransition + WIXPJsonResponse.CommandDetails.Transition;
}
