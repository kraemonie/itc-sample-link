// --- 1. SETUP VARIABLES ---
let cart = JSON.parse(localStorage.getItem('blushBabeCart')) || [];

// --- 2. ADD TO CART FUNCTION ---
function addToCart(productName, price, shadeGroupName, modalId) {
    const radios = document.getElementsByName(shadeGroupName);
    let selectedShade = null;
    let selectedId = null;

    // For items with shades, find which one is checked
    for (const radio of radios) {
        if (radio.checked) {
            selectedId = radio.id;
            break;
        }
    }

    // If there are shades but none selected
    if (radios.length > 0 && !selectedId) {
        alert("Please select a shade first!");
        return;
    }

    // If selected, get label text
    if (selectedId) {
        const labelSpan = document.querySelector(`label[for="${selectedId}"] span`);
        selectedShade = labelSpan.innerText;
    } else {
        selectedShade = "Classic"; // Fallback for items without shades (like Mascara if set to single option)
    }

    // Image Name Logic
    let imageName = selectedShade.replace(/\s+/g, '') + ".jpg";
    let imagePath = `images/${imageName}`;

    // Add to Cart
    cart.push({
        name: productName,
        shade: selectedShade,
        price: price,
        image: imagePath
    });

    saveCart();
    renderCart();
    
    // Open Cart & Close Modal
    document.getElementById('cart-switch').checked = true;
    if(modalId) document.getElementById(modalId).checked = false;
}

// --- 3. REMOVE FUNCTION ---
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// --- 4. CHECKOUT ---
function checkout() {
    if (cart.length === 0) {
        alert("Your bag is empty!");
        return;
    }
    // Close Drawer
    document.getElementById('cart-switch').checked = false;
    // Show Popup
    document.getElementById('order-success').style.display = 'flex';
    // Clear Data
    cart = [];
    saveCart();
    renderCart();
}

function closeOrderPopup() {
    document.getElementById('order-success').style.display = 'none';
}

// --- 5. RENDER UI ---
function renderCart() {
    const cartContainer = document.getElementById('js-cart-items');
    const countLabel = document.getElementById('js-cart-count');
    const totalLabel = document.getElementById('js-cart-total');
    
    if(countLabel) countLabel.innerText = cart.length;

    let total = 0;
    if(cartContainer) {
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = '<div class="empty-msg">Your bag is empty.</div>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                cartContainer.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='images/logo.png'"> 
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p style="color:#666; font-size:0.8rem;">${item.shade}</p>
                            <p>₱${item.price}.00</p>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
            });
        }
    }

    if(totalLabel) totalLabel.innerText = '₱' + total.toFixed(2);
}

function saveCart() {
    localStorage.setItem('blushBabeCart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
