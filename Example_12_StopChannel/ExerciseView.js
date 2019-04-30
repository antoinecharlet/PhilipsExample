/* 
*
*	Example_12_StopChannel
*
*/

var IdCurrentPowerStateText;
var IdPowerTransitionText;

CurrentPowerState = "Current Power State: ";
PowerTransition = "Power Transition In Progress: ";

function ExerciseViewInit()
{
	//CreateHTMLElements();
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
