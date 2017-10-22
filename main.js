
// CONSTRUCTOR FOR BED PILLOW OBJECTS
function bedPillow (price, shape, description, customMessage, image, quantity){
    this.name = "Bed Pillow",
    this.price = price,
    this.shape = shape,
    this.description = description,
    this.customMessage = customMessage,
    this.image = image,
    this.quantity = quantity
}

// CONSTRUCTOR FOR COUCH PILLOW OBJECTS
function couchPillow (price, shape, description, customMessage, image, quantity){
    this.name = "Couch Pillow",
    this.price = price,
    this.shape = shape,
    this.description = description,
    this.customMessage = customMessage,
    this.image = image,
    this.quantity = quantity
}

// CONSTRUCTOR FOR FLOOR POUF OBJECTS
function floorPouf (price, shape, description, customMessage, image, quantity){
    this.name = "Floor Pouf",
    this.price = price,
    this.shape = shape,
    this.description = description,
    this.customMessage = customMessage,
    this.image = image,
    this.quantity = quantity
}


// CREATES A NEW OBJECT BASED ON WHICH VALUE USER CHOOSES ON THE DROP DOWN MENU (USES CONDITIONALS)
function generatePillowShape(pillowValue){
    value = pillowValue;
    if (value === "Pouf-Square") {
        return new floorPouf(299,"Square","Sqaure poufs for sqaure dancing!","","https://i.imgur.com/5Y9kRrW.jpg");
    }else if (pillowValue ==="Pouf-Round") {
        return new floorPouf(149,"Round","Round poufs, for those who aren't square.","","https://i.imgur.com/Gy57xJ3.jpg");
    } else if (pillowValue === "Pouf-Dog") {
        return new floorPouf(129,"Dog","The Original Woof Woof Pouf!","","https://i.imgur.com/iny14J2.jpg");
    } else if (pillowValue === "Pouf-Bear") {
        return new floorPouf(389,"Bear","Roar!!! Bear Poufs for the grizzly folk.","","https://i.imgur.com/vYdXiaT.jpg");
    } else if (pillowValue === "Pouf-Bunny") {
        return new floorPouf(429,"Bunny","Made of the softest rabbit fur.","","https://i.imgur.com/o6G5mkR.jpg");
    }else if (pillowValue === "Pouf-Cat") {
        return new floorPouf(1299,"Cat","Meow!! These poufs are purrrrfect.","","https://i.imgur.com/XZkYUiA.jpg");
    }else if (pillowValue === "Pouf-Custom") {
        return new floorPouf(9999,"Custom","A CUSTOM Pouf??? For $9999, we'll make anything.","","https://i.imgur.com/QQsSLd0.jpg");
    }else if (pillowValue === "Original") {
        return new floorPouf(0,"Original","Please select a Pillow Shape below.","","https://i.imgur.com/Gy57xJ3.jpg");
    }
}

// UPON SELECTION, WILL UPDATE FLOOR POUF SITE WITH NEW DATA ABOUT THE CHOSEN TYPE
function updatePillowShape(){
    var pillowType = document.getElementById("shape");
    var pillowValue = pillowType.value;
    var pillowProduct = generatePillowShape(pillowValue);
    console.log(pillowProduct);
    $(".pouf-title").text(pillowProduct.shape + " Floor Pouf"); //shape + floor pouf
    $(".pouf-price").text("$"+pillowProduct.price); //shape + floor pouf
    $(".pouf-description").text(pillowProduct.description); //shape + floor pouf
    $("#photoReplace").attr("src", pillowProduct.image); //shape + floor pouf
    $("shape").val();
    return pillowProduct;
};

// REMOVES THE OBJECT FROM LOCALSTORAGE
function removeItem() {
    var deleteProduct = document.getElementsByClassName("delete-item");
    var productId =deleteProduct.value;
    var allItems = JSON.parse(localStorage.getItem("itemsArray"))||[]; //grabs everthing currently in itemsArray in localStorage
    allItems.splice(productId,1);
    localStorage.setItem("itemsArray", JSON.stringify(allItems)); //sets the itemsArray back into the localStorage
    location.reload();
}

// CREATES CAROUSEL FUNCTION
 var angle = 0;
function galleryspin(sign) {
spinner = document.querySelector("#spinner");
if (!sign) { angle = angle + 120; } else { angle = angle - 120; }
spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
}


$(document).ready(function() {
    var sumPrice = 0; //USED FOR TOTAL PRICE CALCULATION

//IF NOTHING IS IN LOCALSTORAGE, SKIP THIS STEP
if (localStorage.length === 0) {
} else {
    var allPurchases = JSON.parse(localStorage.getItem("itemsArray"));
    console.log(allPurchases.length)
    for (i=0; i<allPurchases.length; i++) {
        $(".productItems").append(
            "<div>" +
            "<h1>" + "<div class=right-div>" +
            "<img src="+ allPurchases[i].image
            +" width=8%/> " +
            allPurchases[i].shape +" Floor Pouf"  + "</div>" + "<div class=left-div>" +
            " $"+ allPurchases[i].price +
            "   <button onclick=removeItem() "+
            "value=" + [i] +
            " class=delete-item"+
            " id=remove" + [i]
            +">Remove Item</button>" + "</h1>" + "</div></div>");

         // SHOPPING CARD ITEM NOTIFIER
         $("#itemCount").text("View Cart (" + allPurchases.length+ ")");
     }
    // SUBTOTAL PRICE CALCULATOR
    for (i=0; i<allPurchases.length; i++) {
        sumPrice += allPurchases[i].price;
        $(".subTotal").text("Subtotal: $" + sumPrice);
    }
}

// POPULATES THE PRODUCT PAGES CORRECTLY, SPECIFICALLY FLOOR POUF
    $(".pouf-title").text(" Floor Pouf"); //shape + floor pouf
    $(".pouf-price").text("---");  //pouf.shape
    $(".pouf-description").text("Please select a Pillow Shape below.");  //pouf.description
    $(".pouf-image").text();  //pouf.image

//ADDS PRODUCT TO SHOPPING CART
$(".addProduct").click(function(){
        var pillowProduct = updatePillowShape(); //saves a variable with the most recent pillow object for the user session
        pillowProduct.quantity =
        localStorage.setItem("savedProduct", JSON.stringify(pillowProduct)); //saves to localStorage the key-value pair, savedProduct:current pillow object

        //The below creates a temporary variable that adds an extra array value, and saves it to localStorage
        var allItems = JSON.parse(localStorage.getItem("itemsArray"))||[]; //grabs everthing currently in itemsArray in localStorage
        allItems.push(pillowProduct); //adds newest product to the oldItems array
        console.log("Things in allItems: " + allItems.length); //making sure console works
        localStorage.setItem("itemsArray", JSON.stringify(allItems)); //sets the itemsArray back into the localStorage
    });
});