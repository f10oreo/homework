// MATCH INPUT FIELD WITH VALIDATION CONDITIONS
function gatherInput(field) {
    switch (true) {    
        case (field == firstname):
            processInput("firstname", /^[a-zA-Z]{2,15}$/, "errorfirst", "Please enter a name between 2 to 15 characters.");
            break;
        case (field == lastname):
            processInput("lastname", /^[a-zA-Z\s]{2,25}$/, "errorlast", "Please enter a name between 2 to 25 characters.");
            break;
        case (field == phone):
            processInput("phone", /^\(\d{3}\)\s\d{3}-\d{4}$/, "errorphone", "Please enter your phone number as (xxx) xxx-xxxx.");
            break;
        case (field == quantity):
            processInput("quantity", /^[1-9][0-9]?$/, "errorquantity", "Please enter a quantity between 1 to 99.");
            break;
    }
} // end gatherInput     

// VALIDATE INPUT FIELD + PRINT ERROR MESSAGE    
function processInput(inputID, validTest, errorID, errorMSG) { 
    var isValid = validTest.test(document.getElementById(inputID).value);
    var result = "true";
      
    if (isValid == true) {
        document.getElementById(errorID).innerHTML = " ";
        result = "true"; 
        return true;  
    } else {
        document.getElementById(errorID).innerHTML = errorMSG;
        result = "false";
        return false;
    }
} // end processFirst
    
// VALIDATE ORDER FORM
function processOrder() {
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var phone = document.getElementById("phone");
    var quantity = document.getElementById("quantity");
    
/* PROBLEM: trying to call gatherInput(firstname) and get the result of it being passed 
    through processInput. have tried return result and return true/false but 
    console.log(firstValid) etc. provides undefined
*/ 

    var firstValid = gatherInput(firstname); 
    var lastValid = gatherInput(document.getElementById("lastname"));
    var phoneValid = gatherInput(document.getElementById("phone"));
    var quantityValid = gatherInput(document.getElementById("quantity"));

    console.log(firstValid);


    if ((firstValid == true) && (lastValid == true) && (phoneValid == true) && (quantityValid == true)) {
        printOrder("you got it!");
        
        
        
    } else {
        errorfirst.style.color = "Red";
        errorlast.style.color = "Red";
        errorphone.style.color = "Red";
        errorquantity.style.color = "Red";
        printOrder(" ");
        return false;
    }    
} //end processOrder 

// RESET FORM + ERROR NOTICES
function resetErrors() {
    errorfirst.innerHTML = "";
    errorlast.innerHTML = "";
    errorphone.innerHTML = "";
    errorquantity.innerHTML = "";
    
    errorfirst.style.color = "Black";
    errorlast.style.color = "Black";
    errorphone.style.color = "Black";
    errorquantity.style.color = "Black";
    
    printOrder(" ");
} //end resetErrors
    
// CALCULATE SUBTOTAL, DISCOUNTS, TAX, TOTAL
function calcOrder() {
    alert("You did it!");
    printOrder();
} //end calcOrder

// PRINT USER-ENTERED INFORMATION + ORDER CALCULATION RESULTS
function printOrder(result) {
    document.getElementById("printresults").innerHTML = result;
}// end printOrder
