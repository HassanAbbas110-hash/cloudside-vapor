/* Cloudside Vapor — shared header, footer, cart, favourites, age check. Every page loads this. */
const CONFIG = {
  name: "Cloudside Vapor",
  phone: "+27 84 943 7805",
  whatsapp: "27849437805",
  email: "cloudsidevapor@gmail.com",
  address: ["0A Edel Road", "Atlas Junction (Atlas Road)", "Boksburg, 1523"],
  mapsQuery: "Cloudside Vapor, 0A Edel Road, Atlas Junction, Boksburg 1523",
  hoursNote: "Open 7 days a week", // TODO: confirm exact trading hours with the shop
  onlineStore: "https://cloudsidevapor.co.za",
  instagram: "",  // TODO: paste the shop's Instagram profile link
  facebook: "",   // TODO: paste the shop's Facebook page link
  sevenWaves: ""  // TODO: paste Cloudside's store link on 7Waves
};
const DETAIL_SHARDS = 40; // must match SHARDS in tools/snapshot.py

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const R = (n) => "R" + Math.round(n).toLocaleString("en-ZA").replace(/ /g, " ");
const wa = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const findLink = (what) => "https://www.google.com/search?q=" + encodeURIComponent(what);
const igLink = () => CONFIG.instagram || findLink("Cloudside Vapor Boksburg Instagram");
const fbLink = () => CONFIG.facebook || findLink("Cloudside Vapor Boksburg Facebook");
const waveLink = () => CONFIG.sevenWaves || findLink("7Waves delivery Cloudside Vapor");
const reviewLink = findLink("Cloudside Vapor Atlas Junction Boksburg reviews");
const mapsLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.mapsQuery);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

const I = {
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-9.2-9.3C1.7 7.5 3.9 4.5 7 4.5c2 0 3.3 1 5 3 1.7-2 3-3 5-3 3.1 0 5.3 3 4.2 6.2C19.5 15.4 12 20 12 20Z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h11"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
};

/* ---------- product data ---------- */
let productsPromise;
const byId = new Map();
function loadProducts() {
  productsPromise ??= fetch("assets/products.json").then((r) => r.json()).then((list) => { list.forEach((p) => byId.set(p.id, p)); return list; });
  return productsPromise;
}
async function loadDetail(id) {
  try { const shard = await fetch(`assets/details/${id % DETAIL_SHARDS}.json`).then((r) => r.json()); return shard[id] || {}; }
  catch { return {}; }
}
// flavour families matched against product names (shop filter + home flavour finder)
const FLAVOURS = {
  ice: { label: "Icy & minty", re: /\b(ice|iced|icy|menthol|mint|cool|frost|freeze|frozen|chill|polar|arctic)/i },
  fruit: { label: "Fruity", re: /(apple|berry|berries|mango|grape|melon|peach|lemon|lime|kiwi|pineapple|strawberr|cherry|banana|guava|orange|lychee|passion|citrus|tropical|fruit|pear|plum|papaya|dragon|blackcurrant|raspberr|blueberr)/i },
  sweet: { label: "Sweet & dessert", re: /(vanilla|custard|cream|cake|candy|gum|cola|milkshake|caramel|cookie|donut|bubble|sweet|honey|cereal|pudding|toffee|chocolate|soda|lemonade|energy|rainbow)/i },
  tobacco: { label: "Tobacco & classic", re: /(tobacco|cuban|virginia|classic|rich tob|double apple)/i }
};
const productUrl = (p) => `product.html?id=${p.id}`;
const buyOnlineUrl = (p, q = 1) => `${CONFIG.onlineStore}/?add-to-cart=${p.id}&quantity=${q}`;
const priceHtml = (p) => p.p ? `<span class="price"><small>${p.var ? "from" : ""}</small>${R(p.p)}</span>` : `<span class="price ask">Ask for price</span>`;
const imgHtml = (p, big) => {
  const src = big ? (p.i || p.t) : p.t;
  return src
    ? `<img src="${esc(src)}" alt="${esc(p.n)}" loading="${big ? "eager" : "lazy"}" decoding="async" width="300" height="300" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'noimg',innerHTML:'<img src=&quot;assets/img/logo-sm.webp&quot; alt=&quot;&quot;><span>Photo coming soon</span>'}))">`
    : `<div class="noimg"><img src="assets/img/logo-sm.webp" alt=""><span>Photo coming soon</span></div>`;
};
function cardHtml(p) {
  const fav = isFav(p.id);
  return `<article class="card">
    <div class="ph">${imgHtml(p)}<div class="flags">${p.new ? '<span class="flag">New in</span>' : ""}</div>
      <button class="fav${fav ? " on" : ""}" data-fav="${p.id}" aria-pressed="${fav}" aria-label="Save ${esc(p.n)}">${I.heart}</button></div>
    <div class="bd"><span class="br">${esc(p.b || p.s)}</span><p class="nm"><a href="${productUrl(p)}">${esc(p.n)}</a></p>
      <div class="ft">${priceHtml(p)}${p.p ? `<button class="add" data-add="${p.id}" aria-label="Add ${esc(p.n)} to bag">${I.plus}</button>` : ""}</div></div></article>`;
}
const slim = (p) => ({ id: p.id, n: p.n, p: p.p, t: p.t, u: p.u, b: p.b, s: p.s, var: p.var });

/* ---------- cart + favourites ---------- */
let cart = store.get("cv_cart", []);
let favs = store.get("cv_favs", []);
const isFav = (id) => favs.some((f) => f.id === id);
function saveCart() { store.set("cv_cart", cart); renderCounts(); if ($("#drawer")?.classList.contains("on") && drawerMode === "cart") renderDrawer(); }
function addToCart(p, q = 1) {
  const line = cart.find((l) => l.id === p.id);
  line ? (line.q += q) : cart.push({ ...slim(p), q });
  saveCart();
  toast(`Added to your bag: ${p.n}`, "View bag", () => openDrawer("cart"));
  const b = $("#bag-btn"); b?.classList.remove("bump"); void b?.offsetWidth; b?.classList.add("bump");
}
function toggleFav(p) {
  favs = isFav(p.id) ? favs.filter((f) => f.id !== p.id) : [slim(p), ...favs];
  store.set("cv_favs", favs); renderCounts();
  $$(`[data-fav="${p.id}"]`).forEach((b) => { b.classList.toggle("on", isFav(p.id)); b.setAttribute("aria-pressed", isFav(p.id)); });
  if (drawerMode === "favs" && $("#drawer").classList.contains("on")) renderDrawer();
  toast(isFav(p.id) ? "Saved to your favourites" : "Removed from favourites");
}
function renderCounts() {
  const n = cart.reduce((s, l) => s + l.q, 0);
  const c = $("#bag-n"); if (c) { c.textContent = n; c.hidden = !n; }
  const f = $("#fav-n"); if (f) { f.textContent = favs.length; f.hidden = !favs.length; }
}
function rememberSeen(p) {
  const seen = store.get("cv_seen", []).filter((s) => s.id !== p.id);
  store.set("cv_seen", [slim(p), ...seen].slice(0, 12));
}

/* ---------- drawer ---------- */
let drawerMode = "cart", fulfil = store.get("cv_fulfil", "collect");
function openDrawer(mode) { drawerMode = mode; renderDrawer(); $("#drawer").classList.add("on"); $("#scrim").classList.add("on"); document.body.classList.add("lock"); $("#drawer .x").focus(); }
function closeDrawer() { $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); document.body.classList.remove("lock"); }
function lineHtml(l, fav) {
  const th = l.t ? `<img src="${esc(l.t)}" alt="" loading="lazy">` : `<div class="noimg"><img src="assets/img/logo-sm.webp" alt=""></div>`;
  return `<div class="li"><a class="th" href="product.html?id=${l.id}">${th}</a>
    <div><b><a href="product.html?id=${l.id}">${esc(l.n)}</a></b><span class="sub">${l.p ? R(l.p) + (fav ? "" : " each") : "Ask for price"}</span>
    ${fav ? `<div><button class="btn btn-sm btn-white" data-add="${l.id}" style="margin-top:8px">Add to bag</button><button class="rm" data-unfav="${l.id}">Remove</button></div>`
      : `<div><span class="qty"><button data-dec="${l.id}" aria-label="One less">−</button><span>${l.q}</span><button data-inc="${l.id}" aria-label="One more">+</button></span><button class="rm" data-rm="${l.id}">Remove</button></div>`}</div>
    ${fav ? "" : `<span class="lt">${R(l.p * l.q)}</span>`}</div>`;
}
function renderDrawer() {
  const d = $("#drawer");
  if (drawerMode === "favs") {
    $(".dh h3", d).textContent = "Favourites";
    $(".db", d).innerHTML = favs.length ? favs.map((f) => lineHtml(f, true)).join("")
      : `<div class="empty">${I.heart.replace("<svg", '<svg width="48" height="48"')}<b>Nothing saved yet</b><span>Tap the heart on any product to keep it here.</span></div>`;
    $(".df", d).hidden = true; return;
  }
  $(".dh h3", d).textContent = "Your bag";
  const total = cart.reduce((s, l) => s + l.p * l.q, 0);
  $(".db", d).innerHTML = cart.length ? cart.map((l) => lineHtml(l)).join("")
    : `<div class="empty">${I.bag.replace("<svg", '<svg width="48" height="48"')}<b>Your bag is empty</b><span>Over 2,000 products in stock. Have a look around.</span><a class="btn btn-red btn-sm" href="shop.html">Browse the shop</a></div>`;
  $(".df", d).hidden = !cart.length;
  $("#d-total").textContent = R(total);
  $$("#d-mode button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.m === fulfil));
  $("#d-addr-wrap").hidden = fulfil !== "deliver";
  $(".df", d).classList.toggle("waves", fulfil === "waves");
  $("#d-wave").hidden = fulfil !== "waves";
}
function sendOrder() {
  const name = $("#d-name"), addr = $("#d-addr");
  if (!name.value.trim()) { name.classList.add("bad"); name.focus(); toast("Add your name so we know whose order it is"); return; }
  if (fulfil === "deliver" && !addr.value.trim()) { addr.classList.add("bad"); addr.focus(); toast("Add a delivery address (suburb and city is fine)"); return; }
  const total = cart.reduce((s, l) => s + l.p * l.q, 0);
  const lines = cart.map((l) => `• ${l.q} x ${l.n} (${R(l.p * l.q)})`).join("\n");
  const msg = `Hi Cloudside, I'd like to order:\n\n${lines}\n\nTotal: ${R(total)}\n${fulfil === "deliver" ? `Courier to: ${addr.value.trim()}` : "I'll collect at Atlas Junction"}\nName: ${name.value.trim()}${$("#d-note").value.trim() ? "\nNote: " + $("#d-note").value.trim() : ""}`;
  store.set("cv_name", name.value.trim());
  window.open(wa(msg), "_blank", "noopener");
}

/* ---------- toast ---------- */
let toastTimer;
function toast(text, action, fn) {
  const t = $("#toast");
  t.innerHTML = `<span>${esc(text)}</span>${action ? `<a href="#">${esc(action)}</a>` : ""}`;
  if (action) $("a", t).onclick = (e) => { e.preventDefault(); t.classList.remove("on"); fn(); };
  t.classList.add("on"); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("on"), 3200);
}

/* ---------- chrome (strip, header, footer, drawer, gate) ---------- */
// top runs while the page is still parsing (script sits at the start of <body>), so nothing shifts
function chromeTop() {
  const page = document.body.dataset.page;
  const nav = [["shop.html", "Shop", "shop"], ["shop.html?c=vape", "Vape", ""], ["shop.html?c=hookah", "Hookah", ""], ["about.html", "About us", "about"], ["visit.html", "Visit the shop", "visit"], ["help.html", "Delivery & help", "help"]];
  const navLinks = nav.map(([h, t, k]) => `<a href="${h}"${k && k === page ? ' aria-current="page"' : ""}>${t}</a>`).join("");
  document.body.insertAdjacentHTML("afterbegin", `
  <a class="sr" href="#main">Skip to content</a>
  <div class="strip"><div class="wrap"><span>Courier anywhere in SA &middot; Fast local delivery with 7Waves</span><span>Shop at Atlas Junction, Boksburg · ${CONFIG.hoursNote}</span><span>Strictly 18+</span></div></div>
  <header class="hdr"><div class="wrap hdr-in">
    <a class="logo" href="index.html" aria-label="Cloudside Vapor home"><img src="assets/img/logo-sm.webp" alt="Cloudside Vapor" width="180" height="121"></a>
    <nav class="nav" aria-label="Main">${navLinks}</nav>
    <form class="hsearch" action="shop.html" role="search">${I.search}<label class="sr" for="hq">Search products</label><input id="hq" name="q" type="search" placeholder="Search 2,000+ products"></form>
    <div class="icons">
      <button class="ibtn" id="fav-btn" aria-label="Favourites">${I.heart}<span class="n" id="fav-n" hidden>0</span></button>
      <button class="ibtn" id="bag-btn" aria-label="Your bag">${I.bag}<span class="n" id="bag-n" hidden>0</span></button>
      <button class="ibtn burger" id="burger" aria-label="Menu">${I.menu}</button>
    </div></div></header>
  <div class="mnav" id="mnav" aria-label="Menu"><button class="x" id="mnav-x" aria-label="Close menu">${I.x}</button>
    <form class="hsearch" action="shop.html" role="search" style="display:flex;max-width:none;margin:0 0 14px">${I.search}<label class="sr" for="mq">Search products</label><input id="mq" name="q" type="search" placeholder="Search products"></form>
    ${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}
    <div class="mfoot"><span>${CONFIG.address.join(", ")}</span><a href="tel:${CONFIG.phone.replace(/\s/g, "")}">${CONFIG.phone}</a></div></div>`);
  renderCounts();
}

function chromeBottom() {
  document.body.insertAdjacentHTML("beforeend", `
  <footer class="ftr"><div class="wrap">
    <div class="ftr-grid">
      <div><a class="logo" href="index.html"><img src="assets/img/logo-sm.webp" alt="Cloudside Vapor" width="180" height="121" loading="lazy"></a>
        <p>Vape, hookah and snus at Atlas Junction in Boksburg, with delivery anywhere in South Africa.</p></div>
      <div><h4>Shop</h4><ul><li><a href="shop.html?s=Disposables">Disposables</a></li><li><a href="shop.html?s=Devices">Devices &amp; pod kits</a></li><li><a href="shop.html?s=E+Liquids">E-liquids</a></li><li><a href="shop.html?s=Nic+Salts">Nic salts</a></li><li><a href="shop.html?c=hookah">Hookah</a></li><li><a href="shop.html?c=snus">Snus</a></li></ul></div>
      <div><h4>Cloudside</h4><ul><li><a href="about.html">About us</a></li><li><a href="visit.html">Visit the shop</a></li><li><a href="help.html">Delivery &amp; help</a></li><li><a href="help.html#faq">FAQs</a></li></ul></div>
      <div><h4>Talk to us</h4><ul><li><a href="tel:${CONFIG.phone.replace(/\s/g, "")}">${CONFIG.phone}</a></li><li><a href="${wa("Hi Cloudside!")}" target="_blank" rel="noopener">WhatsApp us</a></li><li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li><li><a href="${mapsLink}" target="_blank" rel="noopener">${CONFIG.address[0]}, ${CONFIG.address[2]}</a></li></ul></div>
    </div>
    <p class="warn">WARNING: This product contains nicotine. Nicotine is an addictive chemical. Not for sale to persons under the age of 18.</p>
    <div class="copy"><span>© ${new Date().getFullYear()} Cloudside Vapor, Boksburg</span><span>Prices and stock change daily. Confirmed when you order.</span></div>
  </div></footer>
  <a class="wa-float" href="${wa("Hi Cloudside!")}" target="_blank" rel="noopener" aria-label="Chat to us on WhatsApp">${I.wa}</a>
  <div class="scrim" id="scrim"></div>
  <div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Your bag">
    <div class="dh"><h3>Your bag</h3><button class="x" data-close aria-label="Close">${I.x}</button></div>
    <div class="db"></div>
    <div class="df">
      <div class="seg three" id="d-mode" role="group" aria-label="How do you want it?"><button data-m="collect">Collect</button><button data-m="deliver">Courier (SA)</button><button data-m="waves">7Waves</button></div>
      <div class="wavebox" id="d-wave" hidden><b>Want it fast? Order through 7Waves</b><span>7Waves is our delivery partner. Same prices as the shop, brought to your door. Copy your bag, open 7Waves and order the same items there.</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-sm btn-line" id="d-copy">Copy my list</button><a class="btn btn-sm btn-wave" id="d-wave-go" target="_blank" rel="noopener">Open 7Waves ${I.out}</a></div></div>
      <div class="field pickup"><label for="d-name">Your name</label><input id="d-name" autocomplete="name" placeholder="Name and surname"></div>
      <div class="field" id="d-addr-wrap" hidden><label for="d-addr">Delivery address</label><input id="d-addr" autocomplete="street-address" placeholder="Street, suburb, city"></div>
      <div class="field pickup"><label for="d-note">Anything else? (optional)</label><textarea id="d-note" rows="2" placeholder="Flavour swaps, best time to collect…"></textarea></div>
      <div class="tot"><span class="muted">Total</span><strong id="d-total">R0</strong></div>
      <button class="btn btn-wa pickup" id="d-send">${I.wa} Send order on WhatsApp</button>
      <p class="fine pickup">We check stock and confirm delivery costs and payment with you on WhatsApp before anything is charged. ID required on collection and delivery.</p>
    </div></div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <div class="gate" id="gate" hidden role="dialog" aria-modal="true" aria-labelledby="gate-h"><div class="gate-in" id="gate-in"></div></div>`);

  $("#d-name").value = store.get("cv_name", "");
  $("#d-wave-go").href = waveLink();
  renderCounts();
}

function gate() {
  const g = $("#gate"), box = $("#gate-in"), answer = store.get("cv_age", "");
  if (answer === "yes") return;
  const ask = () => {
    box.innerHTML = `<img src="assets/img/logo.webp" alt="Cloudside Vapor" width="240" height="161"><h2 id="gate-h">Are you 18 or older?</h2>
      <p>We sell nicotine products, so this site is for adults only. We'll check ID when you collect or receive your order.</p>
      <div class="row"><button class="btn btn-red" id="g-yes">Yes, I'm 18 or older</button><button class="btn btn-line" id="g-no">No</button></div>`;
    $("#g-yes").onclick = () => { store.set("cv_age", "yes"); g.hidden = true; document.body.classList.remove("lock"); };
    $("#g-no").onclick = () => { store.set("cv_age", "no"); refused(); };
    $("#g-yes").focus();
  };
  const refused = () => {
    box.innerHTML = `<img src="assets/img/logo.webp" alt="Cloudside Vapor" width="240" height="161"><h2 id="gate-h">Sorry, adults only</h2>
      <p>You need to be 18 or older to visit this site.</p><button class="btn btn-line btn-sm" id="g-oops">I tapped "No" by mistake</button>`;
    $("#g-oops").onclick = ask;
  };
  g.hidden = false; document.body.classList.add("lock");
  answer === "no" ? refused() : ask();
}

/* ---------- global events ---------- */
document.addEventListener("click", async (e) => {
  const t = e.target.closest("[data-add],[data-fav],[data-unfav],[data-inc],[data-dec],[data-rm],[data-close],#bag-btn,#fav-btn,#burger,#mnav-x,#d-send,#d-copy,#d-mode button,#scrim,.stars button");
  if (!t) return;
  if (t.dataset.add) {
    e.preventDefault();
    const id = +t.dataset.add, p = byId.get(id) || favs.find((f) => f.id === id) || (await loadProducts(), byId.get(id));
    if (!p) return;
    const qtyEl = t.dataset.qty ? $(t.dataset.qty) : null;
    addToCart(p, qtyEl ? Math.max(1, +qtyEl.value || 1) : 1);
    if (t.classList.contains("add")) { t.classList.add("ok"); t.innerHTML = I.check; setTimeout(() => { t.classList.remove("ok"); t.innerHTML = I.plus; }, 1200); }
  } else if (t.dataset.fav) { e.preventDefault(); const id = +t.dataset.fav; toggleFav(byId.get(id) || favs.find((f) => f.id === id)); }
  else if (t.dataset.unfav) toggleFav(favs.find((f) => f.id === +t.dataset.unfav));
  else if (t.dataset.inc) { cart.find((l) => l.id === +t.dataset.inc).q++; saveCart(); }
  else if (t.dataset.dec) { const l = cart.find((l) => l.id === +t.dataset.dec); if (--l.q <= 0) cart = cart.filter((x) => x !== l); saveCart(); }
  else if (t.dataset.rm) { cart = cart.filter((l) => l.id !== +t.dataset.rm); saveCart(); }
  else if (t.id === "bag-btn") openDrawer("cart");
  else if (t.id === "fav-btn") openDrawer("favs");
  else if (t.id === "burger") $("#mnav").classList.add("on");
  else if (t.id === "mnav-x") $("#mnav").classList.remove("on");
  else if (t.id === "d-send") sendOrder();
  else if (t.id === "d-copy") {
    const txt = cart.map((l) => `${l.q} x ${l.n}`).join("\n");
    try { await navigator.clipboard.writeText(txt); toast("Your list is copied. Paste it into 7Waves."); } catch { toast("Couldn't copy. Long-press the items to copy them instead."); }
  }
  else if (t.dataset.s) rate(t);
  else if (t.dataset.m) { fulfil = t.dataset.m; store.set("cv_fulfil", fulfil); renderDrawer(); }
  else if (t.id === "scrim" || t.hasAttribute("data-close")) closeDrawer();
});
document.addEventListener("input", (e) => e.target.classList?.remove("bad"));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeDrawer(); $("#mnav")?.classList.remove("on"); } });

/* ---------- review card, socials, marquee (shared blocks) ---------- */
function communityHtml() {
  return `<div class="comm">
    <div class="rev rv"><span class="tag">Been in to see us?</span>
      <h3>Tell Boksburg <span class="script">how it went</span></h3>
      <div class="stars" role="radiogroup" aria-label="Rate your visit">${[1, 2, 3, 4, 5].map((n) => `<button data-s="${n}" role="radio" aria-checked="false" aria-label="${n} star${n > 1 ? "s" : ""}">★</button>`).join("")}</div>
      <p class="rev-msg">Tap a star. Happy visits go to Google, where a quick review helps the next person find us. Anything less comes straight to us, so we can fix it.</p>
      <a class="btn rev-go" href="${reviewLink}" target="_blank" rel="noopener">Write a Google review ${I.out}</a>
      <div class="q" aria-hidden="true">"</div></div>
    <div class="socials">
      <a class="soc ig rv" href="${igLink()}" target="_blank" rel="noopener"><svg class="logo-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        <div><h4>Instagram</h4><span>New drops, restocks, clouds</span></div><div class="go">${I.out}</div></a>
      <a class="soc fb rv" href="${fbLink()}" target="_blank" rel="noopener"><svg class="logo-i" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.5c0-.8.5-1 1-1h2V2h-3c-3 0-4 2-4 4.2V8H8v3.5h2V22h4V11.5h2.8l.4-3.5H14Z"/></svg>
        <div><h4>Facebook</h4><span>Specials and shop news</span></div><div class="go">${I.out}</div></a>
    </div></div>
  <div class="club rv"><div><h3>The Cloud <span class="script">Club</span></h3><p>First word on new flavours, restocks and weekend specials, straight to your WhatsApp. Leave any time.</p></div>
    <a class="btn btn-red" href="${wa("Hi Cloudside! Please add me to the Cloud Club for new drops and specials.")}" target="_blank" rel="noopener">${I.wa} Join on WhatsApp</a></div>`;
}
function rate(b) {
  const box = b.closest(".rev"), n = +b.dataset.s, go = $(".rev-go", box);
  $$(".stars button", box).forEach((x) => { x.classList.toggle("on", +x.dataset.s <= n); x.setAttribute("aria-checked", x === b); });
  if (n >= 4) {
    $(".rev-msg", box).textContent = "Thank you! It would mean a lot if you said that on Google too.";
    go.href = reviewLink; go.innerHTML = `Write a Google review ${I.out}`;
  } else {
    $(".rev-msg", box).textContent = "Sorry it wasn't great. Tell us what happened and we'll make it right.";
    go.href = wa(`Hi Cloudside, I rated my visit ${n}/5. Here's what happened: `); go.innerHTML = `${I.wa} Tell us privately`;
  }
}
function mountShared() {
  $$("[data-community]").forEach((el) => (el.innerHTML = communityHtml()));
  $$("[data-marquee]").forEach((el) => { const h = el.dataset.marquee.split("|").map((w) => `<span>${esc(w)}</span>`).join(""); el.innerHTML = `<div class="mq">${h.repeat(4)}</div>`; });
}

/* reveal on scroll: content stays visible if this never runs */
function reveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("rv-on");
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$(".rv").forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); io.observe(el); });
}

chromeTop();
document.addEventListener("DOMContentLoaded", () => { chromeBottom(); mountShared(); gate(); reveal(); });
