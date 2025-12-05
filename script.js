
let cart = JSON.parse(localStorage.getItem('blushBabeCart')) || [];


function addToCart(productName, price, shadeGroupName) {
    
    const radios = document.getElementsByName(shadeGroupName);
    let selectedShade = null;
    let selectedId = null;

    for (const radio of radios) {
        if (radio.checked) {
            selectedId = radio.id;
            break;
        }
    }

    
    if (!selectedId) {
        alert("Please select a shade first!");
        return;
    }

    
    
    const labelSpan = document.querySelector(`label[for="${selectedId}"] span`);
    selectedShade = labelSpan.innerText;

    
    
    let imageName = selectedShade.replace(/\s+/g, '') + ".jpg";
    let imagePath = `images/${imageName}`;

    
    cart.push({
        name: productName,
        shade: selectedShade,
        price: price,
        image: imagePath
    });

    
    saveCart();
    renderCart();
    
    
    document.getElementById('cart-switch').checked = true;
    
    
    
    const modalTriggerId = document.querySelector(`input[name="${shadeGroupName}"]`).closest('.modal-content').previousElementSibling.id;
    
    
    const modals = document.querySelectorAll('.modal-trigger');
    modals.forEach(m => m.checked = false);
}


function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}


function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    const counter = document.querySelector('.counter-target');
    const totalDisplay = document.querySelector('.total-price-display'); 

    
    counter.innerText = cart.length;

    
    cartContainer.innerHTML = '';
    
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-msg">Your bag is empty.</div>';
    } else {
        cart.forEach((item, index) => {
            totalPrice += item.price;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/logo.jpg'"> 
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

    
    if(document.getElementById('cart-total')) {
        document.getElementById('cart-total').innerText = '₱' + totalPrice.toFixed(2);
    }
}


function saveCart() {
    localStorage.setItem('blushBabeCart', JSON.stringify(cart));
}



document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});