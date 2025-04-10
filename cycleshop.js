console.log('Cycleshop JS file is loaded');

let cartTotal = 0;
let cartItems = [];  // Array to track items added to the cart

// Function to update the cart display
function updateCart() {
    const cartElement = document.querySelector('.cart');
    cartElement.textContent = `$${cartTotal.toFixed(2)}`;
    displayCartItems();
}

// Function to display cart items with remove option
function displayCartItems() {
    const cartItemsContainer = document.getElementById('order-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="remove-btn" data-name="${item.name}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners to "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-name');
            removeFromCart(itemName);
        });
    });

    // Update the order total
    document.getElementById('order-total').textContent = `$${cartTotal.toFixed(2)}`;
}

// Function to add an item to the cart
function addToCart(price, name) {
    cartItems.push({ name, price });
    cartTotal += price;
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        cartTotal -= cartItems[itemIndex].price;
        cartItems.splice(itemIndex, 1);  // Remove the item from the cart
        updateCart();  // Update the cart display
    }
}

// Add event listeners to all "Add to Cart" buttons for bicycles and accessories
const addToCartButtons = document.querySelectorAll('.product button, .accessory button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Get the product name and price from the button's closest product div
        const productDiv = event.target.closest('.product, .accessory');
        const itemName = productDiv.querySelector('h2, p strong').textContent.trim();
        const priceText = productDiv.querySelector('p:last-of-type').textContent.trim();
        const price = parseFloat(priceText.replace('$', '').trim());

        addToCart(price, itemName);
    });
});

// Submit Order functionality
document.getElementById('submit-order')?.addEventListener('click', function () {
    if (cartItems.length === 0) {
        alert('Your cart is empty! Please add items to the cart.');
        return;
    }

    // Simulate submitting the order (e.g., sending data to the server)
    alert('Your order has been submitted!');
    cartItems = []; // Clear cart after submission
    updateCart(); // Update cart UI
});


// Price filter functionality for both pages
const priceRange = document.querySelector('input[type="range"]');
const priceRangeText = document.querySelector('.price-range span');

if (priceRange) {
    priceRange.addEventListener('input', () => {
        priceRangeText.textContent = `$${priceRange.value}`;
    });

    // Apply button functionality for price range filter
    const applyBtn = document.querySelector('.apply-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            alert(`Filter applied: Price range $${priceRange.value}`);
        });
    }
}

// Sidebar search functionality
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

// Function to filter the accessories list based on search query
function filterAccessories(query) {
    const accessories = document.querySelectorAll('.accessory');
    accessories.forEach(accessory => {
        const title = accessory.querySelector('p strong').textContent.toLowerCase();
        if (title.includes(query.toLowerCase())) {
            accessory.style.display = 'block';  // Show the product
        } else {
            accessory.style.display = 'none';  // Hide the product
        }
    });
}

// Event listener for search button click
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            filterAccessories(query);
        } else {
            // If the search query is empty, show all accessories
            const accessories = document.querySelectorAll('.accessory');
            accessories.forEach(accessory => {
                accessory.style.display = 'block';
            });
        }
    });
}

// Optionally, add the ability to search as the user types (live search)
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query) {
            filterAccessories(query);
        } else {
            // If the search query is empty, show all accessories
            const accessories = document.querySelectorAll('.accessory');
            accessories.forEach(accessory => {
                accessory.style.display = 'block';
            });
        }
    });
}

// Contact form submission handling
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page refresh

            // Get input values
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;

            // Simple validation
            if (name === "" || email === "" || message === "") {
                alert("Please fill out all fields.");
                return;
            }

            // Simulate sending message
            alert("Message sent! Thank you, " + name + ".");

            // Optionally reset form
            form.reset();
        });
    }
});
