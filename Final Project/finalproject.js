// GLOBAL VARIABLES
var modeStopwatch;
var modeDebug;
var timerStopwatch;
var initial;
var timerCountdown;
var inputArray;
var current;
var inputMinutes;
var inputSeconds;
var inputHundreds;
var onResume;
var resumeTime;
var duration;

// DEFAULT STATES
window.onload = function() {
	"use strict";
	modeStopwatch = true;
	modeDebug = false;

	document.getElementById("stopwatch").className = "enabled";
	document.getElementById("countdown").className = "disabled";
	document.getElementById("mode_state").innerHTML = "Stopwatch";
	document.getElementById("current_time").innerHTML = "00:00:00";

	document.getElementById("start").className = "disabled";
	document.getElementById("start").innerHTML = "Start";
	document.getElementById("stop").className = "enabled";
	document.getElementById("countdown_console").style.visibility = "hidden";
	document.getElementById("time_expired").style.visibility = "hidden";
	document.getElementById("input_time").value = "";

	document.getElementById("debug_enable").className = "disabled";
	document.getElementById("debug_disable").className = "enabled";
	document.getElementById("prompt_log").style.display = "inline-block";
	document.getElementById("prompt_print").style.display = "inline-block";
	document.getElementById("debug_log").style.display = "none";
	document.getElementById("debug_print").style.display = "none";

	// click stopwatch or countdown buttons
	document.getElementById("countdown").addEventListener("click", enableCountdown);

	// enter key : prevent submit input, instead start countdown timer
	window.addEventListener("keydown", enterDown);
	window.addEventListener("keyup", enterUp);
	
	// click start, stop/pause, reset buttons
	document.getElementById("start").addEventListener("mousedown", clickStart);
	document.getElementById("start").addEventListener("mouseup", releaseStart);

	document.getElementById("reset").addEventListener("mousedown", clickReset);
	document.getElementById("reset").addEventListener("mouseup", releaseReset);

	//click enable/diable debug buttons
	document.getElementById("debug_enable").addEventListener("click", enableDebug);
	
	/*/ enabled by default
	document.getElementById("stopwatch").addEventListener("click", enableStopwatch);   
    document.getElementById("stop").addEventListener("mousedown", clickStop);
	document.getElementById("stop").addEventListener("mouseup", releaseStop);
    document.getElementById("debug_disable").addEventListener("click", disableDebug);
    /*/  
}; //end window.onload

// DEFAULT STOPWATCH VALUES
function stopwatchMode() {
	document.getElementById("stopwatch").className = "enabled";
	document.getElementById("countdown").className = "disabled";

	document.getElementById("mode_state").innerHTML = "Stopwatch";

	document.getElementById("start").className = "disabled";    
	document.getElementById("start").innerHTML = "Start";
	document.getElementById("stop").className = "enabled";
	document.getElementById("stop").innerHTML = "Stop";

	document.getElementById("current_time").innerHTML = "00:00:00";
	document.getElementById("countdown_console").style.visibility = "hidden";

	// disable multi-click
	document.getElementById("stopwatch").removeEventListener("click", enableStopwatch);
	document.getElementById("countdown").addEventListener("click", enableCountdown);

	// account for switching mid-timer
	document.getElementById("start").addEventListener("mousedown", clickStart);
	document.getElementById("start").addEventListener("mouseup", releaseStart);
	document.getElementById("stop").removeEventListener("mousedown", clickStop);
	document.getElementById("stop").removeEventListener("mouseup", releaseStop);
} //end stopwatchMode

// BUTTON : STOPWATCH MODE
function enableStopwatch() {
	"use strict";
	// DEBUG
	printDebug("action", "'stopwatch' button clicked.");

	if (document.getElementById("start").className === "enabled") {
		if (confirm("The stopwatch is running. Clicking will end the stopwatch and switch the timer to countdown mode.") === true) {
			modeStopwatch = true;
			clearInterval(timerCountdown);
			stopwatchMode();
			
			// DEBUG
			printDebug("action", "enableStopwatch() executed.");
		} else {
			document.getElementById("countdown").className = "enabled";
			document.getElementById("stopwatch").className = "disabled";

			document.getElementById("mode_state").innerHTML = "Countdown";

			document.getElementById("start").className = "enabled";
			document.getElementById("stop").className = "disabled";
			document.getElementById("stop").innerHTML = "Pause";
			
			// DEBUG
			printDebug("action", "enableStopwatch() canceled.");
		}
	} else {
		modeStopwatch = true;
		clearInterval(timerCountdown);
		stopwatchMode();
		
		// DEBUG
		printDebug("action", "enableStopwatch() executed.");
	}

	return modeStopwatch;
} //end modeStopwatch

// DEFAULT COUNTDOWN VALUES
function countdownMode() {
	document.getElementById("countdown").className = "enabled";
	document.getElementById("stopwatch").className = "disabled";

	document.getElementById("mode_state").innerHTML = "Countdown";

	document.getElementById("start").className = "disabled";
	document.getElementById("start").innerHTML = "Start";
	document.getElementById("stop").className = "enabled";
	document.getElementById("stop").innerHTML = "Pause";

	document.getElementById("current_time").innerHTML = "00:00:00";
	document.getElementById("countdown_console").style.visibility = "visible";

	// disable multi-click
	document.getElementById("countdown").removeEventListener("click", enableCountdown);
	document.getElementById("stopwatch").addEventListener("click", enableStopwatch);

	// account for switching mid-timer
	document.getElementById("start").addEventListener("mousedown", clickStart);
	document.getElementById("start").addEventListener("mouseup", releaseStart);
	document.getElementById("stop").removeEventListener("mousedown", clickStop);
	document.getElementById("stop").removeEventListener("mouseup", releaseStop);
} //end countdownMode

// BUTTON : COUNTDOWN MODE
function enableCountdown() {
	"use strict";
	//DEBUG
	printDebug("action", "'countdown' button clicked.");

	if (document.getElementById("start").className === "enabled") {
		if (confirm("The countdown is running. Clicking will end the countdown and switch the timer to stopwatch mode.") === true) {
			modeStopwatch = false;
			clearInterval(timerStopwatch);
			countdownMode();
			
			// DEBUG
			printDebug("action", "enableCountdown() executed.");
		} else {
			document.getElementById("stopwatch").className = "enabled";
			document.getElementById("countdown").className = "disabled";

			document.getElementById("mode_state").innerHTML = "Stopwatch";

			document.getElementById("start").className = "enabled";
			document.getElementById("stop").className = "disabled";
			document.getElementById("stop").innerHTML = "Stop";
			
			// DEBUG
			printDebug("action", "enableCountdown() canceled.");
		}
	} else {
		modeStopwatch = false;
		clearInterval(timerStopwatch);
		countdownMode();
		
		// DEBUG
		printDebug("action", "enableCountdown() executed.");
	}

	return modeStopwatch;
} //end moreCountdown

// BUTTON : PREVENT ENTER KEY FROM SUBMITTING
function preventDefaultSubmit() {
	"use strict";
	if (event.keyIdentifier == 'U+000A' || event.keyIdentifier == 'Enter' || event.keyCode == 13) {
		if (event.target.nodeName == 'INPUT' && event.target.type == 'text') {
			event.preventDefault();
		}
	}
} //end preventDefaultSubmit

// BUTTON : ENTER KEY DOWN
function enterDown() {
	"use strict";
	if (event.keyIdentifier === "U+000A" || event.keyIdentifier === "Enter" || event.keyCode === 13) {
		if (event.target.nodeName === "INPUT" && event.target.type === "text") {
			event.preventDefault();
			document.getElementById("start").className = "disabled";
			document.getElementById("stop").className = "enabled";
			document.getElementById("time_expired").style.visibility = "hidden";
			clearInterval(timerCountdown);
			
			// DEBUG
			printDebug("action", "ENTER key pressed.");

			// prevent additional firing if key is held down
			window.removeEventListener('keydown', enterDown);
			window.addEventListener('keydown', preventDefaultSubmit);
			
			// re-enable enter up
			window.addEventListener('keyup', enterUp);
			
			// disables start click when enter is used to start timer
		    document.getElementById("start").removeEventListener("mousedown", clickStart);
		    document.getElementById("start").removeEventListener("mouseup", releaseStart);

			// re-enables stop click
			document.getElementById("stop").addEventListener("mousedown", clickStop);
			document.getElementById("stop").addEventListener("mouseup", releaseStop);
			return false;
		}
	}
} //end enterDown

// BUTTON : ENTER KEY UP
function enterUp() {
	"use strict";
	if (event.keyIdentifier === "U+000A" || event.keyIdentifier === "Enter" || event.keyCode === 13) {
		if (event.target.nodeName === "INPUT" && event.target.type === "text") {
			document.getElementById("start").className = "enabled";
			document.getElementById("stop").className = "disabled";
			document.getElementById("time_expired").style.visibility = "hidden";
			startCountdown();
			
			// prevent additional firing if key is held down
			window.removeEventListener('keyup', enterUp);
			
			// DEBUG
			//console.log("ENTER key released");
		}
	}
} //end enterUp

// STORE TIME AT STOP/PAUSE
function storeTime() {
    var calcMM;
	var calcSS;
	var calcHH;
	
    if (modeStopwatch === true) { // stopwatch
        onResume = stopStopwatch();
        
        calcMM = Math.floor(onResume[0] * 1000 * 60); //minutes
        calcSS = Math.floor(onResume[1] * 1000); //seconds
        calcHH = Math.floor(onResume[2] * 10); //hundreds
        
        resumeTime = calcMM + calcSS + calcHH;
        
        // DEBUG
        //console.log("resumeTime = " + resumeTime);
        
        return resumeTime; // returns time duration in milliseconds
	} else { // countdown
		var currentTime = document.getElementById("current_time").innerHTML;
        onResume = currentTime.split(":");
    
        // DEBUG
        //console.log("currentTime = " + currentTime);
        //console.log("onResume = " + onResume);
        
        return onResume; // returns an array
	} 
} //end storeTime

// BUTTON : START TIMER CLICKED
function clickStart() {
	"use strict";
	document.getElementById("start").className = "enabled";
	document.getElementById("stop").className = "disabled";

	// DEBUG                
	printDebug("action", "'start' button clicked.");

	if (modeStopwatch === true) {
		// disable multi-click
		document.getElementById("start").removeEventListener("mousedown", clickStart);
	} else {
		clearInterval(timerCountdown);
		// disable multi-click
		document.getElementById("start").removeEventListener("mousedown", clickStart);
	}

	// re-enable stop/reset click
	document.getElementById("stop").addEventListener("mousedown", clickStop);
	document.getElementById("stop").addEventListener("mouseup", releaseStop);
	document.getElementById("reset").addEventListener("mousedown", clickReset);
	document.getElementById("reset").addEventListener("mouseup", releaseReset);
} //end clickStart

// BUTTON : START TIMER RELEASED
function releaseStart() {
	"use strict";
	if (modeStopwatch === true) {
        onResume = storeTime();
        
        // DEBUG
        //console.log("onResume = " + onResume);
    
        if (onResume === undefined || onResume === 0) {
            initial = Date.now();
            
            //DEBUG
            //console.log("used Date.now()");
        } else {
            initial = Date.now() - onResume;
            
            // DEBUG
            //console.log("used onResume");
        }

		startStopwatch();

		// disable multi-click
		document.getElementById("start").removeEventListener("mouseup", releaseStart);
	} else {
	    startCountdown();
		// disable multi-click
		document.getElementById("start").removeEventListener("mouseup", releaseStart);
	}
} //end releaseStart

// BUTTON : STOP TIMER CLICKED
function clickStop() {
	"use strict";
	document.getElementById("stop").className = "enabled";
	document.getElementById("start").className = "disabled";
    
	document.getElementById("start").innerHTML = "Resume";
    
	if (modeStopwatch === true) {
		// DEBUG
		printDebug("action", "'stop' button clicked.");
	} else {
		// DEBUG
		printDebug("action", "'pause' button clicked.");
	}

	// disable multi-click
	document.getElementById("stop").removeEventListener("mousedown", clickStop);
	
	// re-enable start/reset click  
	document.getElementById("start").addEventListener("mousedown", clickStart);
	document.getElementById("start").addEventListener("mouseup", releaseStart);
	document.getElementById("reset").addEventListener("mousedown", clickReset);
	document.getElementById("reset").addEventListener("mouseup", releaseReset);
} //end clickStop

// BUTTON : STOP TIMER RELEASED
function releaseStop() {
	"use strict";

	if (modeStopwatch === true) {
		stopStopwatch();

		// disable multi-click
		document.getElementById("stop").removeEventListener("mouseup", releaseStop);
	} else {
		stopCountdown();

		// disable multi-click
		document.getElementById("stop").removeEventListener("mouseup", releaseStop);
	}
} //end releaseStop

// BUTTON : RESET TIMER CLICKED
function clickReset() {
	"use strict";
	document.getElementById("reset").className = "enabled";
	
	// DEBUG
	printDebug("action", "'reset' button clicked.");

	if (modeStopwatch === true) {
		clearInterval(timerStopwatch);

		// disable multi-click   
		document.getElementById("reset").removeEventListener("mousedown", clickReset);
		document.getElementById("stop").removeEventListener("mousedown", clickStop);
		document.getElementById("stop").removeEventListener("mouseup", releaseStop);
	} else {
		clearInterval(timerCountdown);

		// disable multi-click   
		document.getElementById("reset").removeEventListener("mousedown", clickReset);
		document.getElementById("stop").removeEventListener("mousedown", clickStop);
		document.getElementById("stop").removeEventListener("mouseup", releaseStop);
	}
    
    // re-enables enter key submit
	window.addEventListener('keydown', enterDown);
	window.addEventListener('keyup', enterUp);
	
	// re-enable start click
	document.getElementById("start").addEventListener("mousedown", clickStart);
	document.getElementById("start").addEventListener("mouseup", releaseStart);
} //end clickReset

// BUTTON : RESET TIMER RELEASED
function releaseReset() {
	"use strict";
	document.getElementById("start").innerHTML = "Start";
	document.getElementById("start").className = "disabled";
	document.getElementById("stop").className = "enabled";
	document.getElementById("reset").className = "disabled";

	document.getElementById("current_time").innerHTML = "00:00:00";
	document.getElementById("time_expired").style.visibility = "hidden";
	document.getElementById("input_time").value = "";

	// re-enable reset click
	document.getElementById("reset").addEventListener("mousedown", clickReset);
} //end releaseReset

// BUTTON : ENABLE DEBUG
function enableDebug() {
	"use strict";
	modeDebug = true;

	document.getElementById("debug_enable").className = "enabled";
	document.getElementById("debug_disable").className = "disabled";

	document.getElementById("prompt_log").style.display = "none";
	document.getElementById("prompt_print").style.display = "none";

	document.getElementById("debug_log").style.display = "inline-block";
	document.getElementById("debug_print").style.display = "inline-block";
	
	// disable multi-click
	document.getElementById("debug_enable").removeEventListener("click", enableDebug);
	document.getElementById("debug_disable").addEventListener("click", disableDebug);
	
	// DEBUG
	//console.log("debug mode = " + modeDebug);

	return modeDebug;
} //end enableDebug

// BUTTON : ENABLE DEBUG
function disableDebug() {
	"use strict";
	modeDebug = false;

	document.getElementById("debug_disable").className = "enabled";
	document.getElementById("debug_enable").className = "disabled";

	document.getElementById("prompt_log").style.display = "inline-block";
	document.getElementById("prompt_print").style.display = "inline-block";

	document.getElementById("debug_log").style.display = "none";
	document.getElementById("debug_print").style.display = "none";

	// disable multi-click
	document.getElementById("debug_disable").removeEventListener("click", disableDebug);
	document.getElementById("debug_enable").addEventListener("click", enableDebug);

    // DEBUG
	//console.log("debug mode = " + modeDebug);

	return modeDebug;
} //end disableDebug

// START STOPWATCH
function startStopwatch() {
	"use strict";
	timerStopwatch = setInterval(countingUp, 10); // update every hundredth of a second 
	
	// DEBUG
	printDebug("action", "startStopwatch() executed.");
	printDebug("action", "countingUp() executed.");
} //end startStopwatch

// STOPWATCH CALCULATIONS
function countingUp() {
	"use strict";
	var duration = Date.now() - initial; //milliseconds

	var minutes = Math.floor((duration / (1000 * 60)) % 60); //minutes
	var seconds = Math.floor((duration / 1000) % 60); //seconds
	var hundreds = Math.floor((duration / 10) % 100); //hundreds

	// pad with leading zeroes
	var mm = (minutes < 10) ? ("0" + minutes) : minutes;
	var ss = (seconds < 10) ? ("0" + seconds) : seconds;
	var hh = (hundreds < 10) ? ("0" + hundreds) : hundreds;

	// update currenttime
	var currentTime = document.getElementById("current_time");
	currentTime.innerHTML = mm + ":" + ss + ":" + hh;
} //end countingUp

// STOP STOPWATCH
function stopStopwatch() {
	"use strict";
	clearInterval(timerStopwatch);
	
	var currentTime = document.getElementById("current_time").innerHTML;
	inputArray = currentTime.split(":");
	
	// DEBUG
	//console.log("currentTime = " + currentTime);
	//console.log("inputArray = " + inputArray);
	printDebug("action", "stopStopwatch() executed.");
	
	return inputArray;
} //end stopStopwatch

// VALIDATE USER INPUT FOR COUNTDOWN    
function validateCountdown() {
	"use strict";
	// DEBUG
	printDebug("action", "validateCountdown() executed.");

	var inputTime = document.getElementById("input_time").value;
	var currentTime = document.getElementById("current_time");

	// input to array
	var stringTime = inputTime.split(":");
	var inputMM = stringTime[0];
	var inputSS = stringTime[1];
	var inputHH = stringTime[2];
	
	// DEBUG
	//console.log("inputTime = " + inputTime);
	//console.log("inputMM = " + inputMM);
	//console.log("inputSS = " + inputSS);
	//console.log("inputHH = " + inputHH);

	// match input
	var matchMM = /[0][0-9]/;
	var matchSS = /[0-5][0-9]/;
	var matchHH = /[0-9][0-9]/;
	var matchMax = /10:00:00/;

	// match errors
	var matchAlpha = /[^:\d]/;
	var matchSmall = /^00:00/;
	var matchLarge = /^[1-9][0-9]/;

	// validate input
	var validMM = matchMM.test(inputMM);
	var validSS = matchSS.test(inputSS);
	var validHH = matchHH.test(inputHH);
	var validMax = matchMax.test(inputTime);
	var valid = validMM && validSS && validHH;
	var validAlpha = matchAlpha.test(inputTime);
	var validSmall = matchSmall.test(inputTime);
	var validLarge = matchLarge.test(inputTime);
	var validOver = validLarge && validSS && validHH;
	
	// DEBUG
	//console.log("valid = " + valid);
	//console.log("validMM = " + validMM);
	//console.log("validSS = " + validSS);
	//console.log("validHH = " + validHH);
	//console.log("validMax = " + validMax);
	//console.log("validAlpha = " + validAlpha);
	//console.log("validSmall = " + validSmall);
	//console.log("validLarge = " + validLarge);
	//console.log("validOver = " + validOver);

	// adjust input for currenttime
	var minutes = inputMM;
	var seconds = inputSS;
	var hundreds = inputHH;

	if (inputMM === "00") {
		minutes = 0;
	} else if (inputMM < 10) {
		minutes = inputMM.slice(1);
	}

	if (inputSS === "00") {
		seconds = 59;
		minutes = (inputMM - 1);
	} else if (inputSS < 10) {
		seconds = inputSS.slice(1);
	}

	if (inputHH === "00" && inputSS > 0) {
		seconds = (inputSS - 1);
		hundreds = 100;
	} else if (inputHH === "00") {
		hundreds = 100;
	} else if (inputHH < 10) {
		hundreds = inputHH.slice(1);
	}
	
	// retrieve time stored when start was clicked
	onResume = storeTime();
	
	// DEBUG
	//console.log("onResume = " + onResume);
	//console.log("onResume[0] is 00= " + (onResume[0] === "00"));
	//console.log("onResume[1] is 00= " + (onResume[1] === "00"));
	//console.log("onResume[2] is 00= " + (onResume[2] === "00"));

	// print actions/errors for debug log
	if (onResume[0] !== "00" || onResume[1] !== "00" || onResume[2] !== "00") {  
	    inputArray = onResume;
	    resumeTime = inputArray[0] + ":" + inputArray[1] + ":" + inputArray[2];
		currentTime.innerHTML = resumeTime;

	    // DEBUG
		//console.log("inputArray = " + inputArray);
		//console.log("onResume = " + onResume);
		//console.log("new currentTime = " + currentTime.innerHTML);
		
	    return resumeTime;
	} else if (onResume[0] !== "00" || onResume[1] !== "00" || onResume[2] !== "00") {  
	    inputArray = onResume;
	    resumeTime = inputArray[0] + ":" + inputArray[1] + ":" + inputArray[2];
		currentTime.innerHTML = resumeTime;

	    // DEBUG
		//console.log("inputArray = " + inputArray);
		//console.log("onResume = " + onResume);
		//console.log("new currentTime = " + currentTime.innerHTML);
		
	    return resumeTime;
	} else if ((valid && validSmall !== true) || (validMax && validOver)) { // valid
		var adjusted = minutes + ":" + seconds + ":" + hundreds;
		currentTime.innerHTML = inputTime;
		
		// DEBUG
		//console.log("adjusted = " + adjusted);
		//console.log("new currentTime = " + currentTime.innerHTML);
		printDebug("action", "'input_time' = " + inputTime);
		printDebug("action", "Input is a valid time.");
		
		return adjusted;
	} else if (inputTime === "") { // time is empty
        document.getElementById("stop").className = "enabled";
		document.getElementById("start").className = "disabled";
		
		// DEBUG
		printDebug("error", "'input_time' = empty");
		printDebug("error", "There is no input to validate.");
	} else if (validMax !== true && validOver) { // time is more than 10:00:00
		document.getElementById("stop").className = "enabled";
		document.getElementById("start").className = "disabled";
		
		// DEBUG
		printDebug("error", "'input_time' = " + inputTime);
		printDebug("error", "Input is too large.");
	} else if (valid && validSmall) { // time is less than 00:01:00
		document.getElementById("stop").className = "enabled";
		document.getElementById("start").className = "disabled";
		
		// DEBUG
		printDebug("error", "'input_time' = " + inputTime);
		printDebug("error", "Input is too small.");	
	} else if (inputTime !== "" && validAlpha) { // input has letters or invalid special characters
		document.getElementById("stop").className = "enabled";
		document.getElementById("start").className = "disabled";
		
		// DEBUG
		printDebug("error", "'input_time' = " + inputTime);
		printDebug("error", "Input is not a number.");
	} else if (inputTime.length < 8) { // input has some other error		
		document.getElementById("stop").className = "enabled";
		document.getElementById("start").className = "disabled";
		
		// DEBUG
		printDebug("error", "'input_time' = " + inputTime);
		printDebug("error", "Input is not in mm:hh:ss format.");
	}
} //end validateCountdown

// START COUNTDOWN
function startCountdown() {
	"use strict";
	var input = validateCountdown();
	
	// DEBUG
	//console.log("startCountdown() started");
	    
    // determine if resuming, if not, validate and continue
    if (input === undefined && onResume[0] === "00" && onResume[1] === "00" && onResume[2] === "00") {  
	    // re-enables enter key submit
        window.addEventListener("keydown", enterDown);
        window.addEventListener("keyup", enterUp);
        
        // DEBUG
	    //console.log("no valid input");
	    
	    return;
	} else {
	    // validate input 
	    inputArray = input.split(":");
	    
	    // DEBUG
	    //console.log("validated input = " + input);
	    //console.log("used input");
	} 

	inputMinutes = inputArray[0];
	inputSeconds = inputArray[1];
	inputHundreds = inputArray[2];
	
	// DEBUG
	//console.log("inputArray = " + inputArray);
	//console.log("minutes = " + inputMinutes);
	//console.log("seconds = " + inputSeconds);
	//console.log("hundreds = " + inputHundreds);
	
	//start timer  
	initial = Date.now(); 
	timerCountdown = setInterval(countingDown, 10); // update every hundredth of a second        
	
	// DEBUG
	//console.log("initial = " + initial);
	printDebug("action", "startCountdown() executed.");
	printDebug("action", "countingDown() executed.");
} //end startCountdown

// COUNTDOWN CALCULATIONS
function countingDown() {
	"use strict";
	current = Date.now();
	var calcMM = Math.floor(inputMinutes * 1000 * 60); //minutes
	var calcSS = Math.floor(inputSeconds * 1000); //seconds
	var calcHH = Math.floor(inputHundreds * 10); //hundreds

	duration = calcMM + calcSS + calcHH;
	var newInitial = initial + duration;
	var timeLeft = newInitial - current; // milliseconds
	
	/*/ DEBUG - disabled to prevent excessive console logs
	//console.log("current = " + current);
	//console.log("duration = " + duration);
	//console.log("initial = " + (initial + duration));
	//console.log("timeLeft = " + timeLeft);
	/*/

	var minutes = Math.floor((timeLeft / (1000 * 60)) % 60); //minutes
	var seconds = Math.floor((timeLeft / 1000) % 60); //seconds
	var hundreds = Math.floor((timeLeft / 10) % 100); //hundreds
	
	/*/ DEBUG - disabled to prevent excessive console logs
	//console.log("minutes = " + minutes);
	//console.log("seconds = " + seconds);
	//console.log("hundreds = " + hundreds);
	/*/

	// concatenate time w/ leading 0s
	var mm = (minutes < 10) ? ("0" + minutes) : minutes;
	var ss = (seconds < 10) ? ("0" + seconds) : seconds;
	var hh = (hundreds < 10) ? ("0" + hundreds) : hundreds;
	
	/*/ DEBUG - disabled to prevent excessive console logs
	//console.log("mm = " + mm);
	//console.log("ss = " + ss);
	//console.log("hh = " + hh);
	/*/

	// update currenttime
	var currentTime = document.getElementById("current_time");
	currentTime.innerHTML = mm + ":" + ss + ":" + hh;

	if (minutes === 0 && seconds === 0 && hundreds === 0) {
		stopCountdown();
		document.getElementById("start").className = "disabled";
		document.getElementById("stop").className = "enabled";
		document.getElementById("time_expired").style.visibility = "visible";
		alert("Your time has expired!");

		// disable stop click
		document.getElementById("stop").removeEventListener("mousedown", clickStop);
		document.getElementById("stop").removeEventListener("mouseup", releaseStop);
	}

	//DEBUG - for checking one execution
	//stopCountdown();
} // end countingDown

// STOP COUNTDOWN TIMER
function stopCountdown() {
    "use strict";
	clearInterval(timerCountdown);
	
	// DEBUG
	printDebug("action", "stopCountdown() executed.");
} // end stopCountdown

// PRINT DEBUG MESSAGE
function printDebug(printClass, result) {
	"use strict";
	var node = document.getElementById("debug_print"); // parent element
	var pChildNode = document.createElement("p"); // new child element  
	var pClass = printClass; // child element class

	// create new paragraph with class
	node.appendChild(pChildNode);
	pChildNode.className = pClass;

	// find child number
	var children = node.getElementsByTagName("P").length;
	var message = "";

	if (children < 10) {
		message = "0" + children + ". " + result;
	} else {
		message = children + ". " + result;
	}

	// add paragraph text 
	pChildNode.appendChild(document.createTextNode(message));

	// DEBUG
	//console.log("result = " + result);
	
	// auto-scroll to bottom
	node.scrollTop = node.scrollHeight;
} //end printDebug