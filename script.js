const productContainer = document.getElementById("product-container");
const saleContainer = document.getElementById("sale-container");
const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

const cart = {};

// 🔥 Полный список товаров по категориям
const products = [
    // --- ОВОЩИ ---
    {name:"Помидор", price:12, stock:20, img:"./img/1.jpg", cat:"Овощи"},
    {name:"Огурец", price:10, stock:18, img:"./img/2.jpg", cat:"Овощи"},
    {name:"Морковь", price:8, stock:25, img:"./img/3.webp", cat:"Овощи"},
    {name:"Картофель", price:7, stock:30, img:"./img/4.jpg", cat:"Овощи"},
    {name:"Лук", price:6, stock:22, img:"./img/5.jpg", cat:"Овощи"},
    {name:"Чеснок", price:11, stock:15, img:"./img/6.jpg", cat:"Овощи"},
    {name:"Перец", price:15, stock:10, img:"./img/7.jpg", cat:"Овощи"},
    {name:"Баклажан", price:13, stock:12, img:"./img/9.jpg", cat:"Овощи"},
    {name:"Капуста", price:5, stock:20, img:"./img/10.jpg", cat:"Овощи"},
    {name:"Тыква", price:18, stock:7, img:"./img/4.jpg", cat:"Овощи"},

    // --- ФРУКТЫ ---
    {name:"Яблоко Red", price:9, stock:25, img:"./img/1.jpg", cat:"Фрукты"},
    {name:"Груша", price:11, stock:20, img:"./img/2.jpg", cat:"Фрукты"},
    {name:"Банан", price:12, stock:30, img:"./img/3.webp", cat:"Фрукты"},
    {name:"Апельсин", price:13, stock:18, img:"./img/4.jpg", cat:"Фрукты"},
    {name:"Мандарин", price:14, stock:22, img:"./img/5.jpg", cat:"Фрукты"},
    {name:"Лимон", price:8, stock:15, img:"./img/6.jpg", cat:"Фрукты"},
    {name:"Манго", price:25, stock:10, img:"./img/8.jpg", cat:"Фрукты"},
    {name:"Ананас", price:28, stock:8, img:"./img/9.jpg", cat:"Фрукты"},

    // --- ЯГОДЫ ---
    {name:"Клубника", price:35, stock:15, img:"./img/1.jpg", cat:"Ягоды"},
    {name:"Малина", price:40, stock:10, img:"./img/2.jpg", cat:"Ягоды"},
    {name:"Ежевика", price:45, stock:8, img:"./img/3.webp", cat:"Ягоды"},
    {name:"Голубика", price:50, stock:12, img:"./img/4.jpg", cat:"Ягоды"},
    {name:"Вишня", price:22, stock:20, img:"./img/5.jpg", cat:"Ягоды"},
    {name:"Черешня", price:30, stock:15, img:"./img/6.jpg", cat:"Ягоды"},
    {name:"Арбуз", price:15, stock:40, img:"./img/7.jpg", cat:"Ягоды"},
    {name:"Дыня", price:20, stock:20, img:"./img/8.jpg", cat:"Ягоды"},

    // --- МОРЕПРОДУКТЫ ---
    {name:"Семга филе", price:150, stock:5, img:"./img/1.jpg", cat:"Морепродукты"},
    {name:"Форель", price:130, stock:7, img:"./img/2.jpg", cat:"Морепродукты"},
    {name:"Креветки Королевские", price:90, stock:15, img:"./img/3.webp", cat:"Морепродукты"},
    {name:"Мидии", price:70, stock:20, img:"./img/4.jpg", cat:"Морепродукты"},
    {name:"Осьминог", price:200, stock:4, img:"./img/5.jpg", cat:"Морепродукты"},
    {name:"Кальмары", price:60, stock:12, img:"./img/6.jpg", cat:"Морепродукты"},
    {name:"Краб", price:350, stock:3, img:"./img/7.jpg", cat:"Морепродукты"},
    {name:"Икра", price:400, stock:10, img:"./img/8.jpg", cat:"Морепродукты"},

    // --- МОЛОЧНЫЕ ПРОДУКТЫ ---
    {name:"Молоко 3.2%", price:8, stock:20, img:"./img/1.jpg", cat:"Молочка"},
    {name:"Кефир", price:7, stock:18, img:"./img/2.jpg", cat:"Молочка"},
    {name:"Сыр Гауда", price:85, stock:10, img:"./img/4.jpg", cat:"Молочка"},
    {name:"Творог", price:15, stock:15, img:"./img/7.jpg", cat:"Молочка"},
    {name:"Масло сливочное", price:20, stock:25, img:"./img/5.jpg", cat:"Молочка"},

    // --- МЯСО ---
    {name:"Говядина (вырезка)", price:75, stock:10, img:"./img/1.jpg", cat:"Мясо"},
    {name:"Курица (грудка)", price:38, stock:20, img:"./img/2.jpg", cat:"Мясо"},
    {name:"Баранина", price:80, stock:8, img:"./img/3.webp", cat:"Мясо"},
    {name:"Индейка", price:55, stock:12, img:"./img/4.jpg", cat:"Мясо"},

    // --- НАПИТКИ ---
    {name:"Сок J7", price:15, stock:30, img:"./img/1.jpg", cat:"Напитки"},
    {name:"Кола 1.5л", price:12, stock:50, img:"./img/2.jpg", cat:"Напитки"},
    {name:"Вода 0.5л", price:3, stock:100, img:"./img/3.webp", cat:"Напитки"},
    {name:"Чай черный", price:25, stock:40, img:"./img/4.jpg", cat:"Напитки"},
    {name:"Кофе Egoiste", price:90, stock:15, img:"./img/5.jpg", cat:"Напитки"}
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