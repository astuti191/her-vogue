// =================================
// CUSTOMER STATUS
// =================================

let cart = [];

let isRegistered = false;


// =================================
// ADD PRODUCT TO CART
// =================================

function addProduct(button) {

    let product = button.closest(".product");

    let name = product.querySelector("h3").innerText;

    let priceText = product.querySelector(".price").innerText;

    let price = Number(
        priceText.replace("₹", "").replace(",", "")
    );

    let size = product.querySelector(".size").value;


    if (size === "") {

        alert("Please select a size first.");

        return;
    }


    cart.push({
        name: name,
        price: price,
        size: size
    });


    updateCart();

    alert(name + " has been added to your cart.");
}



// =================================
// UPDATE CART
// =================================

function updateCart() {

    document.getElementById("cartCount").innerText =
        cart.length;


    let cartItems =
        document.getElementById("cartItems");


    cartItems.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    cart.forEach(function(item, index) {

        total += item.price;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    Size: ${item.size}

                    <br>

                    ₹${item.price}

                </div>


                <button
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    document.getElementById("cartTotal").innerText =
        total;
}



// =================================
// REMOVE ITEM
// =================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}



// =================================
// OPEN CART
// =================================

function openCart() {

    updateCart();

    document.getElementById("cartModal").style.display =
        "flex";
}


function closeCart() {

    document.getElementById("cartModal").style.display =
        "none";
}



// =================================
// REGISTER
// =================================

function openRegister() {

    document.getElementById("registerModal").style.display =
        "flex";
}


function closeRegister() {

    document.getElementById("registerModal").style.display =
        "none";
}


function registerUser(event) {

    event.preventDefault();


    let name =
        document.getElementById("regName").value;

    let contact =
        document.getElementById("regContact").value;

    let address =
        document.getElementById("regAddress").value;


    // Customer is now registered
    isRegistered = true;


    alert(
        "Registration Successful!\n\n" +
        "Welcome " + name +
        "\nContact: " + contact +
        "\nAddress: " + address
    );


    event.target.reset();

    closeRegister();
}



// =================================
// LOGIN
// =================================

function openLogin() {

    document.getElementById("loginModal").style.display =
        "flex";
}


function closeLogin() {

    document.getElementById("loginModal").style.display =
        "none";
}


function loginUser(event) {

    event.preventDefault();


    // Login also means customer is registered
    isRegistered = true;


    alert("Login successful!");


    event.target.reset();

    closeLogin();
}



// =================================
// FILTER PRODUCTS
// =================================

function filterProducts(category) {

    let products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}



// =================================
// SHOP NOW
// =================================

function scrollToProducts() {

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}



// =================================
// CONTACT
// =================================

function sendMessage(event) {

    event.preventDefault();

    alert(
        "Thank you for contacting HER VOGUE!"
    );

    event.target.reset();

}



// =================================
// CHECKOUT
// =================================

function checkout() {

    // First check cart
    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    // Then check registration
    if (isRegistered === false) {

        alert(
            "Please register first before checkout."
        );

        closeCart();

        openRegister();

        return;
    }


    // If registered, show payment options
    closeCart();

    document.getElementById("paymentModal").style.display =
        "flex";
}



// =================================
// CLOSE PAYMENT
// =================================

function closePayment() {

    document.getElementById("paymentModal").style.display =
        "none";
}



// =================================
// PLACE ORDER
// =================================

function placeOrder() {

    let payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!payment) {

        alert(
            "Please select a payment option first."
        );

        return;
    }


    let paymentName =
        payment.value;


    alert(
        "Your order has been placed successfully!\n\n" +
        "Payment Method: " +
        paymentName +
        "\n\nThank you for shopping with HER VOGUE!"
    );


    // Empty cart after order
    cart = [];

    updateCart();

    closePayment();
}



// =================================
// CLOSE POPUPS
// =================================

window.onclick = function(event) {

    let register =
        document.getElementById("registerModal");

    let login =
        document.getElementById("loginModal");

    let cartModal =
        document.getElementById("cartModal");

    let paymentModal =
        document.getElementById("paymentModal");


    if (event.target === register) {

        closeRegister();

    }


    if (event.target === login) {

        closeLogin();

    }


    if (event.target === cartModal) {

        closeCart();

    }


    if (event.target === paymentModal) {

        closePayment();

    }

};