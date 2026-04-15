const productContainer = document.getElementById("product-container");
const saleContainer = document.getElementById("sale-container");
const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

const cart = {};

// 🔥 Полный список товаров по категориям
// 🔥 Обновленный список товаров с качественными фото из интернета
const products = [
    // --- ОВОЩИ ---
    {name:"Помидор", price:12, stock:20, img:"http://googleusercontent.com/image_collection/image_retrieval/15946831848265199063_0", cat:"Овощи"},
    {name:"Огурец", price:10, stock:18, img:"http://googleusercontent.com/image_collection/image_retrieval/18359108607327713746_0", cat:"Овощи"},
    {name:"Морковь", price:8, stock:25, img:"http://googleusercontent.com/image_collection/image_retrieval/1275692424643410352_0", cat:"Овощи"},
    {name:"Картофель", price:7, stock:30, img:"http://googleusercontent.com/image_collection/image_retrieval/1116937562472983926_0", cat:"Овощи"},
    {name:"Лук", price:6, stock:22, img:"https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=400&auto=format&fit=crop", cat:"Овощи"},
    {name:"Перец", price:15, stock:10, img:"https://images.unsplash.com/photo-1563513307168-a400c43827ec?q=80&w=400&auto=format&fit=crop", cat:"Овощи"},

    // --- ФРУКТЫ ---
    {name:"Яблоко Red", price:9, stock:25, img:"http://googleusercontent.com/image_collection/image_retrieval/9288331823627810977_0", cat:"Фрукты"},
    {name:"Банан", price:12, stock:30, img:"http://googleusercontent.com/image_collection/image_retrieval/2466455153918789342_0", cat:"Фрукты"},
    {name:"Апельсин", price:13, stock:18, img:"https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=400&auto=format&fit=crop", cat:"Фрукты"},
    {name:"Манго", price:25, stock:10, img:"https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=400&auto=format&fit=crop", cat:"Фрукты"},

    // --- ЯГОДЫ ---
    {name:"Клубника", price:35, stock:15, img:"http://googleusercontent.com/image_collection/image_retrieval/4337737812771956264_0", cat:"Ягоды"},
    {name:"Черника", price:50, stock:12, img:"https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=400&auto=format&fit=crop", cat:"Ягоды"},
    {name:"Арбуз", price:15, stock:40, img:"https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=400&auto=format&fit=crop", cat:"Ягоды"},

    // --- МОРЕПРОДУКТЫ ---
    {name:"Семга филе", price:150, stock:5, img:"http://googleusercontent.com/image_collection/image_retrieval/11664620031791674342_0", cat:"Морепродукты"},
    {name:"Креветки", price:90, stock:15, img:"https://images.unsplash.com/photo-1559737558-2f5a35f4520b?q=80&w=400&auto=format&fit=crop", cat:"Морепродукты"},

    // --- МОЛОЧНЫЕ ПРОДУКТЫ ---
    {name:"Молоко", price:8, stock:20, img:"http://googleusercontent.com/image_collection/image_retrieval/17046947658895528975_0", cat:"Молочка"},
    {name:"Сыр Гауда", price:85, stock:10, img:"https://images.unsplash.com/photo-1486297678162-ad2a19b058f1?q=80&w=400&auto=format&fit=crop", cat:"Молочка"},

    // --- МЯСО ---
    {name:"Говядина", price:75, stock:10, img:"http://googleusercontent.com/image_collection/image_retrieval/11032179667572750869_0", cat:"Мясо"},
    {name:"Курица", price:38, stock:20, img:"https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=400&auto=format&fit=crop", cat:"Мясо"},

    // --- НАПИТКИ ---
    {name:"Апельсиновый сок", price:15, stock:30, img:"http://googleusercontent.com/image_collection/image_retrieval/1023588933287466787_0", cat:"Напитки"},
    {name:"Кофе в зернах", price:90, stock:15, img:"https://images.unsplash.com/photo-1559056191-7239f1f0a20e?q=80&w=400&auto=format&fit=crop", cat:"Напитки"}
];

// Функция для получения иконок категорий
function getCatIcon(cat) {
    const icons = {
        "Овощи": "🥦",
        "Фрукты": "🍎",
        "Ягоды": "🍓",
        "Морепродукты": "🐟",
        "Молочка": "🥛",
        "Напитки": "🥤",
        "Мясо": "🥩"
    };
    return icons[cat] || "📦";
}

// --- 1. ПЕРЕКЛЮЧЕНИЕ ОКОН ---
document.querySelectorAll('[data-win]').forEach(button => {
    button.onclick = () => {
        const targetId = button.getAttribute('data-win');
        document.querySelectorAll('.window').forEach(win => win.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        
        if(targetId === 'main') render();
    };
});

// --- 2. МОДАЛЬНЫЕ ОКНА ---
function initModal(openBtnId, modalId, closeBtnId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);

    if (openBtn) openBtn.onclick = () => modal.style.display = "block";
    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

initModal("order-btn", "order-modal", "close-order");
initModal("register-btn", "register-modal", "close-register");
initModal("cart-icon", "cart-modal", "close-cart");

// --- 3. РЕНДЕР ТОВАРОВ С АНИМАЦИЕЙ ---
function render(filterCat = "Все") {
    productContainer.innerHTML = "";
    saleContainer.innerHTML = "";

    const filtered = products.filter(p => filterCat === "Все" || p.cat === filterCat);

    filtered.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * 0.03}s`; // Плавное появление по очереди

        card.innerHTML = `
            <div class="category-tag">${getCatIcon(p.cat)} ${p.cat}</div>
            <img src="${p.img}" onerror="this.src='https://via.placeholder.com/150'">
            <h3>${p.name}</h3>
            <div class="price-tag">${p.price} сомони</div>
            <div class="stock-info">Запас: ${p.stock}</div>
            <button class="add-btn" ${p.stock <= 0 ? "disabled" : ""} onclick="addToCart('${p.name}')">
                ${p.stock <= 0 ? "Пусто" : "В корзину"}
            </button>
        `;

        productContainer.appendChild(card);

        // Условие для раздела АКЦИИ
        if (p.price < 10 || p.cat === "Морепродукты") {
            const saleCard = card.cloneNode(true);
            saleCard.querySelector('button').onclick = () => addToCart(p.name);
            saleContainer.appendChild(saleCard);
        }
    });
}

// --- 4. РАБОТА С КОРЗИНОЙ ---
window.addToCart = (name) => {
    const p = products.find(x => x.name === name);
    if (p.stock <= 0) return;

    p.stock--;
    if (!cart[name]) {
        cart[name] = { price: p.price, qty: 0 };
    }
    cart[name].qty++;

    updateCart();
    render();
};

window.changeQty = (name, delta) => {
    const p = products.find(x => x.name === name);
    if (delta > 0) {
        if (p.stock > 0) {
            cart[name].qty++;
            p.stock--;
        }
    } else {
        cart[name].qty--;
        p.stock++;
        if (cart[name].qty <= 0) delete cart[name];
    }
    updateCart();
    render();
};

window.removeItem = (name) => {
    const p = products.find(x => x.name === name);
    p.stock += cart[name].qty;
    delete cart[name];
    updateCart();
    render();
};

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    for (const name in cart) {
        const item = cart[name];
        const li = document.createElement("li");
        li.className = "cart-item-row";
        li.innerHTML = `
            <span>${name}</span>
            <div class="cart-controls">
                <button onclick="changeQty('${name}', -1)">-</button>
                <b>${item.qty}</b>
                <button onclick="changeQty('${name}', 1)">+</button>
                <button onclick="removeItem('${name}')" class="del-btn">×</button>
            </div>
        `;
        cartItems.appendChild(li);
        total += item.price * item.qty;
    }
    totalPriceEl.textContent = total;
}

// --- 5. ЯРКОСТЬ ---
const range = document.getElementById('rating');
if(range) {
    range.oninput = () => {
        document.body.style.filter = `brightness(${range.value * 10}%)`;
    };
}

// --- 6. ОБРАБОТКА ФОРМ ---
document.getElementById('order-form').onsubmit = (e) => {
    e.preventDefault();
    alert("Заказ принят! Спасибо за покупку в ORFNUR.");
    document.getElementById('close-order').click();
};

// Запуск
render();
