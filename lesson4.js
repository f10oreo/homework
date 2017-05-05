// CHANGE IMAGE SOURCE
function updateImage (imageName, inputNum) {    
    if (inputNum == 1) {
        document.getElementById(imageName).src = "one.gif";
        } else if (inputNum == 2) {
            document.getElementById(imageName).src = "two.gif";
            } else if (inputNum == 3) {
                document.getElementById(imageName).src = "three.gif";
                } else if (inputNum == 4) {
                    document.getElementById(imageName).src = "four.gif";
                    } else {
                        document.getElementById(imageName).src = "five.gif";
                    }
} // end function updateImage

// VALIDATE FIRST/LEFT IMAGE NUMBER 
function processNum1 () {   
    var inputNum1 = document.getElementById("inputnum1").value;
    
    if (inputNum1 == "") {
        alert("Please enter a number from 1 to 5.");  
        } else if (isNaN(inputNum1)) {
            alert ("You did not enter a number."); 
            } else if (inputNum1 > 5) {
                alert ("Your number is too large.");
                } else if (inputNum1 < 1) {
                    alert ("Your number is too small.");
                    } else {
                        updateImage ("imageID1", inputNum1);
                        }  
} //end function processNum1

// VALIDATE SECOND/RIGHT IMAGE NUMBER
function processNum2 () {   
    var inputNum2 = document.getElementById("inputnum2").value;
    
    switch (true) {    
        case (inputNum2 == ""):
            alert ("Please enter a number from 1 to 5.");
            break;
        case (isNaN(inputNum2)):
            alert ("You did not enter a number.");
            break;
        case (inputNum2 > 5):
            alert ("Your number is too large.");
            break;
        case (inputNum2 < 1):
            alert ("Your number is too small.");
            break;
        default:    
            updateImage ("imageID2", inputNum2);                   
            break;
        }    
} //end function processNum2
