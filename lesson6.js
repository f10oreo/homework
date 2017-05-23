// VALIDATE USER INPUT
function processText () {
    var textInput = document.getElementById("textinput").value;
    var textString = String(textInput);
    var hasSpaces = textString.indexOf(" ");

    if (textInput.length == "") {
        alert("You didn't enter anything.");    
    } else if (textInput.length < 3) {
        alert("Your entry is shorter than 3 characters. \nPlease use more characters.");
    } else if (textInput.length > 10) {
        alert("Your entry is longer than 10 characters. \nPlease use less characters.");
    } else if (hasSpaces != -1) {
        alert("Please don't include spaces.");
    } else {
        findPalindrome ();
    }    
} //end function processText


// COMPARE FIRST AND LAST OBJECTS IN USER INPUT
function findPalindrome () {
    var textInput = document.getElementById("textinput").value;
    var textString = String(textInput);
    var x = textString.length;
    var y = textString.slice(0,x); // ?????
    var textMatch = " ";
    
    alert ("I'm looking for a palindrome");
    
    x = 10;
    while (x > 2) {
        if (textString[0] == textString[x-1]) { 
            textMatch = "Wow we match";
        } else {
            textMatch = "Wow we don't match";
        }
        x--;
    }

    
    document.getElementById("printresults").innerHTML = textMatch;
    
} //end function findPalindrome
