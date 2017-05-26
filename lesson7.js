// VALIDATE INPUT FIELDS + PRINT ERROR MESSAGES
function processInput(field) {
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var phone = document.getElementById("phone");
    var quantity = document.getElementById("quantity");
    
    var firstValid = /^[a-zA-Z\s]{2,15}$/;
    var lastValid = /^[a-zA-Z\s]{2,25}$/;
    var phoneValid = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    var quantityValid = /^[1-9][0-9]?$/;
        
    switch (true) {
        case ((field === firstname) && (firstValid.test(firstname.value) === true)):
            errorfirst.innerHTML = "";
            return true;
        case ((field === firstname) && (firstValid.test(firstname.value) !== true)):
            errorfirst.innerHTML = "Please enter a name between 2 to 15 characters.";
            return false;
        
        case ((field === lastname) && (lastValid.test(lastname.value) === true)):
            errorlast.innerHTML = "";
            return true;
        case ((field === lastname) && (lastValid.test(lastname.value) !== true)):
            errorlast.innerHTML = "Please enter a name between 2 to 25 characters.";
            return false;
        
        case ((field === phone) && (phoneValid.test(phone.value) === true)):
            errorphone.innerHTML = "";
            return true;
        case ((field === phone) && (phoneValid.test(phone.value) !== true)):
            errorphone.innerHTML = "Please enter your phone number as (xxx) xxx-xxxx.";
            return false;
        
        case ((field === quantity) && (quantityValid.test(quantity.value) === true)):
            errorquantity.innerHTML = "";
            return true;
        case ((field === quantity) && (quantityValid.test(quantity.value) !== true)):
            errorquantity.innerHTML = "Please enter a quantity between 1 to 99.";
            return false;
    }
} // end gatherInput     
    
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
    
// VALIDATE ORDER FORM
function processOrder() {
    var firstValid = processInput(document.getElementById("firstname")); 
    var lastValid = processInput(document.getElementById("lastname"));
    var phoneValid = processInput(document.getElementById("phone"));
    var quantityValid = processInput(document.getElementById("quantity"));
    
    if (firstValid && lastValid && phoneValid && quantityValid) {
        calcOrder();   
    } else {
        errorfirst.style.color = "Red";
        errorlast.style.color = "Red";
        errorphone.style.color = "Red";
        errorquantity.style.color = "Red";
        printOrder(" ");
        return false;
    }    
} //end processOrder 

// CALCULATE DISCOUNT 
function bulkDiscount(quantity, priceTotal){    
    var discount = " ";

    if ((quantity >= 10) && (quantity <= 19)) {
        discount = ((10 / 100) * priceTotal);
        return discount;
    } else if ((quantity >= 20) && (quantity <= 29)) {
        discount = ((20 / 100) * priceTotal);
        return discount;
    } else if ((quantity >= 30) && (quantity <= 39)) {
        discount = ((30 / 100) * priceTotal);
        return discount;
    } else if ((quantity >= 40) && (quantity <= 49)) {
        discount = ((40 / 100) * priceTotal);
        return discount;
    } else {
        discount = 0;
        return discount;
    }
} // end bulkDiscount

// CALCULATE SUBTOTAL, DISCOUNTS, TAX, TOTAL
function calcOrder() {
    const TAXRATE = 0.085;
    
    // gather data
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var phone = document.getElementById("phone").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("singleprice").value;
    var priceTotal = (quantity * price);
    var discount = bulkDiscount(quantity, priceTotal);
    var subTotal = priceTotal - discount;
    var taxAmount = subTotal * TAXRATE;
    var orderTotal = subTotal + taxAmount;
    var outputOrder = " ";
    
    var fullname = firstname + " " + lastname;
    
    printOrder("printOrder", "<h3>Order Confirmation</h3>", "outputOrder", " ");
    printOrder("printName", "Customer Name", "outputName", fullname);
    printOrder("printPhone", "Phone Number", "outputPhone", phone);
    printOrder("printQuantity", quantity + " sticker(s)", "outputPrice", "$" + priceTotal.toFixed(2));
    printOrder("printDiscount", "Quantity Discount (20-49 stickers)", "outputDiscount", "-$" + discount.toFixed(2));
    printOrder("printSubtotal", "Subtotal", "outputSubtotal", "$" + subTotal.toFixed(2));
    printOrder("printTax", "Sales Tax (8.5%)", "outputTax", "+$" + taxAmount.toFixed(2));
    printOrder("printTotal", "Order Total", "outputTotal", "$" + orderTotal.toFixed(2));
  
} //end calcOrder

// PRINT USER-ENTERED INFORMATION + ORDER CALCULATION RESULTS
function printOrder(printID, header, outputID, output) {     
    document.getElementById(printID).innerHTML = header; 
    document.getElementById(outputID).innerHTML = output; 
    
    document.getElementById("outputDiscount").style.fontStyle = "italic";
    document.getElementById("outputTax").style.fontStyle = "italic";
    document.getElementById("orderTotal").style.color = "Green";
    document.getElementById("orderTotal").style.fontWeight = "600";
}// end printOrder
