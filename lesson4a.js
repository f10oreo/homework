// VALIDATE FIRST/LEFT IMAGE NUMBER 
function processNum1 () {   
    var inputNum1 = document.getElementById("inputnum1").value;
    
    if (inputNum == 1) {
        document.getElementById(imageName).src = "one.gif";
        } else if (inputNum == 2) {
            document.getElementById(imageName).src = "two.gif";
            } else if (inputNum == 3) {
                document.getElementById(imageName).src = "three.gif";
                } else if (inputNum == 4) {
                    document.getElementById(imageName).src = "four.gif";
                    } else if {
                        document.getElementById(imageName).src = "five.gif";
                        } else if (isNaN(inputNum1)) {
                            alert ("You did not enter a number."); 
                            } else if (inputNum1 > 5) {
                                alert ("Your number is too large.");
                                } else if (inputNum1 < 1) {
                                    alert ("Your number is too small.");
                                    } else {
                                        alert("Please enter a number from 1 to 5."); 
                                        }  
} //end function processNum1
