// VALIDATE USER INPUT
function processText () {
    var textInput = document.getElementById("textinput").value;
    var textString = String(textInput);
    var textLength= textString.length;
    var hasSpaces = textString.indexOf(" ");
    var textMatch = " ";

    if (textLength == "") {
        alert("You didn't enter anything.");    
    } else if (textLength < 3) {
        alert("Your entry is shorter than 3 characters. \nPlease use more characters.");
    } else if (textLength > 10) {
        alert("Your entry is longer than 10 characters. \nPlease use less characters.");
    } else if (hasSpaces != -1) {
        alert("Please don't include spaces.");
    } else if (textLength %2  ==  0) { 
        textMatch += "not a palindrome";
    } else {
        findPalindrome ();
    }  
    
    document.getElementById("printresults").innerHTML = textMatch;
} //end function processText

// COMPARE FIRST AND LAST OBJECTS IN USER INPUT
function findPalindrome () {
    var textInput = document.getElementById("textinput").value;
    var textString = String(textInput);
    var textLength= textString.length;
    var compareLength = (textLength / 2) + 0.5;
    var textMatch = " ";
    var flag = true;
    var i = 1;
    
    flag = true; 
    i = 1; 
    compareLength = (textLength / 2) + 0.5;
    
    while ((flag == true) && (i <= compareLength)) {
        if (textString[i - 1] == textString[textLength - i]) {
            flag = true;
        } else {
            flat = false;
            break;
        }
        i++;
    }
    
    if (flag == true) {
        textMatch += "FINALLY";
    } else {
        textMatch += "TRY AGAIN SCRUBLORD";
    }
    
    document.getElementById("printresults").innerHTML = textMatch;
} // end function findPalindrome
