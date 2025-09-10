// Productos
const productos = [
  { id: 1, nombre: "Caja Familiar", precio: 95000, imagen: "img/caja-familiar.png", cantidad: 1 },
  { id: 2, nombre: "Caja Fit", precio: 89000, imagen: "img/caja-fit.png", cantidad: 1 },
  { id: 3, nombre: "Caja Parejas", precio: 75000, imagen: "img/caja-parejas.png", cantidad: 1 },
];

let cart = [];

// Renderizar productos
const lista = document.getElementById("productos-lista");
productos.forEach(p => {
  const card = document.createElement("div");
  card.className = "bg-gray-100 rounded-lg p-4 shadow text-center";
  card.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}" class="rounded mb-2 h-48 object-contain w-full" />
    <h3 class="font-bold text-xl">${p.nombre}</h3>
    <p class="mb-2">Precio: ${p.precio.toLocaleString("es-CO",{style:"currency",currency:"COP"})}</p>
    <button class="agregar bg-orange-500 text-white px-4 py-2 rounded">Agregar</button>
  `;
  card.querySelector(".agregar").addEventListener("click", () => agregarAlCarrito(p));
  lista.appendChild(card);
});

// Carrito
const carrito = document.getElementById("carrito");
const btnCarrito = document.getElementById("btn-carrito");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

btnCarrito.addEventListener("click", () => carrito.classList.toggle("hidden"));

function renderCarrito() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.precio * item.cantidad;
    const row = document.createElement("div");
    row.className = "flex justify-between items-center mb-2";
    row.innerHTML = `
      <span>${item.nombre}</span>
      <div>
        <input type="number" min="1" value="${item.cantidad}" class="w-12 border rounded text-center"/>
        <button class="ml-2 text-red-500">✖</button>
      </div>
    `;
    row.querySelector("input").addEventListener("change", e => {
      item.cantidad = parseInt(e.target.value);
      renderCarrito();
    });
    row.querySelector("button").addEventListener("click", () => {
      cart.splice(i, 1);
      renderCarrito();
    });
    cartItems.appendChild(row);
  });
  cartTotal.textContent = total.toLocaleString("es-CO",{style:"currency",currency:"COP"});
  cartCount.textContent = cart.length;
}

function agregarAlCarrito(p) {
  const existe = cart.find(x => x.id === p.id);
  if (existe) existe.cantidad++;
  else cart.push({ ...p });
  renderCarrito();
}

// Checkout
const checkout = document.getElementById("checkout");
const btnCheckout = document.getElementById("btn-checkout");
const checkoutForm = document.getElementById("checkout-form");
const pedidoConfirmado = document.getElementById("pedido-confirmado");
const numeroPedido = document.getElementById("numero-pedido");
const btnCerrarPedido = document.getElementById("btn-cerrar-pedido");

btnCheckout.addEventListener("click", () => {
  carrito.classList.add("hidden");
  checkout.classList.remove("hidden");
});

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();
  numeroPedido.textContent = "FOOD" + Math.floor(Math.random() * 9000 + 1000);
  pedidoConfirmado.classList.remove("hidden");
});

btnCerrarPedido.addEventListener("click", () => {
  pedidoConfirmado.classList.add("hidden");
  checkout.classList.add("hidden");
  cart = [];
  renderCarrito();
  checkoutForm.reset();
});

// Contacto
const contactoForm = document.getElementById("contacto-form");
const contactoConfirmacion = document.getElementById("contacto-confirmacion");

contactoForm.addEventListener("submit", e => {
  e.preventDefault();
  contactoConfirmacion.classList.remove("hidden");
  contactoForm.reset();
  setTimeout(() => contactoConfirmacion.classList.add("hidden"), 4000);
});




