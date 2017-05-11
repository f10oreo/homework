// VALIDATE USER INPUT
function processNum () {   
    var numInput = document.getElementById("numinput").value;
    
    switch (true) {    
        case (isNaN(numInput)):
        case (numInput == ""):
            alert ("Please enter a number from 1 to 999.");
            break;
        case (numInput > 999):
            alert ("Your number is too large.");
            break;
        case (numInput < 1):
            alert ("Your number is too small.");
            break;
        default:    
            showResults (numInput);                  
            break;
        }    
} //end function processNum

// PRINT AND COMPARE GUESSES
function showResults () {   
    var numInput = document.getElementById("numinput").value;  
    var numOutput = "";
    var attempts = 0;
    
    attempts = 0;
    while (attempts < 10){
        var guess = Math.floor(Math.random() * 999) + 1;  
              
        if (guess == numInput) {
            numOutput += "<p><b>Guess #" + (attempts + 1) + ":</b> Is your number " + guess + "?<br /> Yes, your number is " + guess + "!</p><p>I guessed your number! I win! </p>";
            break;            
        } else if (guess < numInput) {
            if (attempts == 9) {
                numOutput += "<p><b>Guess #" + (attempts + 1) + ":</b> Is your number " + guess + "?<br /> No, your number is larger than that.</p><p>I couldn't guess your number! You win!</p>";
            } else {
                numOutput += "<p><b>Guess #" + (attempts + 1) + ":</b> Is your number " + guess + "?<br /> No, your number is larger than that.</p>";
            }
        } else if (guess > numInput) {
            if (attempts == 9) {
                numOutput += "<p><b>Guess #" + (attempts + 1) + ":</b> Is your number " + guess + "?<br /> No, your number is smaller than that.</p><p>I couldn't guess your number! You win!</p>";
            } else {
                numOutput += "<p><b>Guess #" + (attempts + 1) + ":</b> Is your number " + guess + "?<br /> No, your number is smaller than that.</p>";
            }
        }
        attempts++;
    }
        
    document.getElementById("printresults").innerHTML = numOutput;
} //end function showResults*/