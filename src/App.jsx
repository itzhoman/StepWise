import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiCheck, FiChevronDown, FiMenu, FiMinus, FiPlus, FiRotateCw, FiSearch, FiShoppingBag, FiStar, FiTruck, FiX } from "react-icons/fi";
import { ProductsData } from "./index";
import logo from "./assets/logo.png";
import heroShoe from "./assets/img1.png";
import featureShoe from "./assets/img3.png";

const names = ["Aero Street 01", "Velocity Pro", "Terra Runner", "Pulse Knit", "Court Vision", "Cloud Shift"];
const categories = ["Lifestyle", "Running", "Trail", "Running", "Lifestyle", "Training"];
const prices = [4890000, 6350000, 5720000, 4190000, 5250000, 6980000];
const oldPrices = [5490000, null, 6290000, null, 5890000, 7450000];
const colorSets = [
  [{ name: "شرابی", hex: "#6f3139", filter: "none" }, { name: "سبز", hex: "#7d8f65", filter: "hue-rotate(75deg) saturate(.7)" }, { name: "مشکی", hex: "#171717", filter: "grayscale(1) brightness(.42)" }],
  [{ name: "آبی", hex: "#385d78", filter: "none" }, { name: "کرم", hex: "#d7c6ad", filter: "sepia(.55) saturate(.45) brightness(1.12)" }, { name: "مشکی", hex: "#171717", filter: "grayscale(1) brightness(.5)" }],
  [{ name: "ذغالی", hex: "#3e4545", filter: "none" }, { name: "نارنجی", hex: "#e06f38", filter: "sepia(1) saturate(2) hue-rotate(330deg)" }],
  [{ name: "سفید", hex: "#e9e9e4", filter: "none" }, { name: "لیمویی", hex: "#c9f558", filter: "sepia(.4) saturate(1.7) hue-rotate(25deg)" }],
  [{ name: "سرمه‌ای", hex: "#28384d", filter: "none" }, { name: "قرمز", hex: "#a83232", filter: "hue-rotate(130deg) saturate(1.4)" }],
  [{ name: "طوسی", hex: "#9ca3a5", filter: "none" }, { name: "مشکی", hex: "#151515", filter: "grayscale(1) brightness(.4)" }],
];
const products = ProductsData.map((p, i) => ({ ...p, title: names[i], category: categories[i], price: prices[i], oldPrice: oldPrices[i], rating: [4.9, 4.8, 4.7, 4.9, 4.8, 5][i], colors: colorSets[i] }));
const formatPrice = (price) => new Intl.NumberFormat("fa-IR").format(price);

function Header({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="StepWise home"><img src={logo} alt="" /><span>STEPWISE</span></a>
    <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
      <a href="#new" onClick={() => setMenuOpen(false)}>جدیدترین‌ها</a><a href="#shop" onClick={() => setMenuOpen(false)}>فروشگاه</a><a href="#story" onClick={() => setMenuOpen(false)}>داستان ما</a><a href="#club" onClick={() => setMenuOpen(false)}>کلاب استپ‌وایز</a>
    </nav>
    <div className="header-actions"><button className="icon-button search-button" aria-label="جستجو"><FiSearch /></button><button className="cart-button" onClick={onCartOpen} aria-label={`سبد خرید، ${cartCount} کالا`}><FiShoppingBag /><span>سبد خرید</span><b>{cartCount.toLocaleString("fa-IR")}</b></button><button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="منو">{menuOpen ? <FiX /> : <FiMenu />}</button></div>
  </header>;
}

function Hero() {
  const shoeRef = useRef(null);
  const onMove = (e) => { const b = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width - .5; const y = (e.clientY - b.top) / b.height - .5; shoeRef.current.style.transform = `rotateY(${x * 24}deg) rotateX(${y * -16}deg) translateZ(35px)`; };
  const reset = () => { if (shoeRef.current) shoeRef.current.style.transform = "rotateY(-8deg) rotateX(5deg)"; };
  return <main className="hero" id="top">
    <div className="hero-copy"><div className="eyebrow"><span /> کالکشن تابستان ۲۰۲۶</div><h1>برای قدم‌هایی که<br /><em>عادی نیستند.</em></h1><p>کفش‌هایی برای حرکت، ساخته‌شده با جزئیات دقیق؛ سبک، جسور و آماده‌ی هر مسیری که انتخاب می‌کنی.</p><div className="hero-cta"><a className="primary-button" href="#shop">مشاهده کالکشن <FiArrowRight /></a><button className="play-link" onClick={() => document.querySelector("#spotlight")?.scrollIntoView({ behavior: "smooth" })}><span><FiRotateCw /></span> تجربه نمای ۳۶۰°</button></div><div className="hero-stats"><div><strong>+۲۴K</strong><span>عضو فعال</span></div><div><strong>۴.۹/۵</strong><span>رضایت مشتریان</span></div><div><strong>۳۰ روز</strong><span>ضمانت بازگشت</span></div></div></div>
    <div className="hero-visual" onPointerMove={onMove} onPointerLeave={reset}><span className="outline-word">MOVE</span><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-badge"><b>۰۱</b><span>نسخه<br />محدود</span></div><img ref={shoeRef} src={heroShoe} alt="کفش Aero Street 01" /><div className="shoe-shadow" /><div className="drag-hint"><FiRotateCw /> برای چرخش حرکت بده</div></div>
    <div className="ticker" aria-hidden="true"><span>FREE SHIPPING</span><i>✦</i><span>۳۰ روز ضمانت بازگشت</span><i>✦</i><span>ORIGINAL QUALITY</span><i>✦</i><span>ارسال سریع سراسر ایران</span></div>
  </main>;
}

function ProductCard({ product, onAdd, onQuickView }) {
  const [color, setColor] = useState(0); const [size, setSize] = useState(42); const [added, setAdded] = useState(false); const cardRef = useRef(null); const visualRef = useRef(null);
  const tilt = (e) => { if (window.matchMedia("(pointer: coarse)").matches) return; const b = cardRef.current.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width - .5; const y = (e.clientY - b.top) / b.height - .5; visualRef.current.style.transform = `rotateY(${x * 18}deg) rotateX(${y * -12}deg) translateZ(18px)`; };
  const add = () => { onAdd({ ...product, selectedColor: product.colors[color], size }); setAdded(true); window.setTimeout(() => setAdded(false), 1400); };
  return <article className="product-card" ref={cardRef} onPointerMove={tilt} onPointerLeave={() => { if (visualRef.current) visualRef.current.style.transform = "rotateY(0) rotateX(0)"; }}>
    <div className="product-topline"><span>{product.category}</span><span className="rating"><FiStar /> {product.rating}</span></div>
    <button className="product-visual" ref={visualRef} onClick={() => onQuickView(product, color)} aria-label={`نمای سه‌بعدی ${product.title}`}>{product.oldPrice && <span className="sale-pill">٪۱۲-</span>}<img src={product.img} alt={product.title} style={{ filter: product.colors[color].filter }} /><span className="view-360"><FiRotateCw /> ۳۶۰°</span></button>
    <div className="product-info"><h3>{product.title}</h3><div className="price-row"><strong>{formatPrice(product.price)} <small>تومان</small></strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div><div className="option-row"><span>رنگ</span><div className="swatches">{product.colors.map((item, i) => <button key={item.name} className={color === i ? "active" : ""} style={{ "--swatch": item.hex }} onClick={() => setColor(i)} aria-label={`رنگ ${item.name}`} title={item.name}>{color === i && <FiCheck />}</button>)}</div><label className="size-select">سایز<select value={size} onChange={(e) => setSize(Number(e.target.value))} aria-label="انتخاب سایز">{[39,40,41,42,43,44].map((n) => <option key={n}>{n}</option>)}</select><FiChevronDown /></label></div><button className={added ? "add-button added" : "add-button"} onClick={add}>{added ? <><FiCheck /> اضافه شد</> : <><FiShoppingBag /> افزودن به سبد</>}</button></div>
  </article>;
}

function Shop({ onAdd, onQuickView }) {
  const [filter, setFilter] = useState("همه"); const filters = ["همه", "Lifestyle", "Running", "Training", "Trail"]; const visible = filter === "همه" ? products : products.filter((p) => p.category === filter);
  return <section className="shop-section" id="shop"><div className="section-heading"><div><span className="section-kicker">انتخاب این هفته</span><h2>کفشی برای ریتم تو.</h2></div><p>از خیابان تا باشگاه؛ مدلی را انتخاب کن که با حرکت تو هماهنگ است.</p></div><div className="filter-tabs" role="group" aria-label="فیلتر محصولات">{filters.map((f) => <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>)}</div><div className="product-grid">{visible.map((p) => <ProductCard key={p.id} product={p} onAdd={onAdd} onQuickView={onQuickView} />)}</div></section>;
}

function Spotlight({ onQuickView }) {
  return <section className="spotlight" id="spotlight"><div className="spotlight-copy"><span className="section-kicker light">مهندسی‌شده برای حرکت</span><h2>سبک‌تر از چیزی که فکر می‌کنی.</h2><p>فوم AeroCore انرژی هر قدم را برمی‌گرداند و بافت تنفس‌پذیر، پا را در طول روز خنک نگه می‌دارد.</p><ul><li><span>۰۱</span><div><b>فوم AeroCore</b><small>بازگشت انرژی تا ۲۸٪ بیشتر</small></div></li><li><span>۰۲</span><div><b>رویه FlexKnit</b><small>سبک، منعطف و تنفس‌پذیر</small></div></li><li><span>۰۳</span><div><b>زیره Grip-X</b><small>چسبندگی مطمئن روی سطح خیس</small></div></li></ul></div><div className="spotlight-visual"><span className="giant-number">01</span><img src={featureShoe} alt="نمای کفش Velocity Pro" /><button onClick={() => onQuickView(products[1], 0)}><FiRotateCw /> باز کردن نمای ۳۶۰°</button><div className="callout callout-one"><i /> فوم واکنش‌گرا</div><div className="callout callout-two"><i /> رویه تنفس‌پذیر</div></div></section>;
}

function QuickView({ state, onClose, onAdd }) {
  const [rotation, setRotation] = useState(-12); const [dragging, setDragging] = useState(false); const startX = useRef(0); if (!state) return null; const { product, colorIndex } = state;
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()} role="presentation"><section className="quick-modal" role="dialog" aria-modal="true" aria-label={`نمای سه‌بعدی ${product.title}`}><button className="modal-close" onClick={onClose} aria-label="بستن"><FiX /></button><div className="modal-stage" onPointerDown={(e) => { setDragging(true); startX.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={(e) => { if (dragging) { setRotation((r) => r + (e.clientX - startX.current) * .45); startX.current = e.clientX; } }} onPointerUp={() => setDragging(false)}><span>۳۶۰°</span><div className="modal-orbit" /><img src={product.img} alt="" style={{ transform: `rotateY(${rotation}deg) rotateX(7deg)`, filter: product.colors[colorIndex].filter }} /><p><FiRotateCw /> برای چرخش کفش را بکشید</p></div><div className="modal-info"><span className="section-kicker">{product.category}</span><h2>{product.title}</h2><p>طراحی ارگونومیک با زیره‌ی منعطف و ساختار سبک برای استفاده‌ی طولانی‌مدت.</p><strong>{formatPrice(product.price)} <small>تومان</small></strong><button className="primary-button" onClick={() => { onAdd({ ...product, selectedColor: product.colors[colorIndex], size: 42 }); onClose(); }}><FiShoppingBag /> افزودن به سبد</button></div></section></div>;
}

function CartDrawer({ open, onClose, items, setItems }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0); const changeQty = (index, delta) => setItems((current) => current.map((item, i) => i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  return <><div className={open ? "drawer-overlay open" : "drawer-overlay"} onClick={onClose} /><aside className={open ? "cart-drawer open" : "cart-drawer"} aria-hidden={!open}><div className="drawer-header"><div><span>سبد خرید</span><small>{items.length.toLocaleString("fa-IR")} محصول</small></div><button onClick={onClose} aria-label="بستن"><FiX /></button></div><div className="cart-items">{items.length === 0 ? <div className="empty-cart"><FiShoppingBag /><h3>سبدت هنوز خالیه</h3><p>مدل مورد علاقه‌ات را پیدا کن و اولین قدم را بردار.</p><button onClick={onClose}>شروع خرید</button></div> : items.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><div className="cart-thumb"><img src={item.img} alt="" style={{ filter: item.selectedColor.filter }} /></div><div className="cart-detail"><b>{item.title}</b><small>سایز {item.size} · {item.selectedColor.name}</small><strong>{formatPrice(item.price)} تومان</strong></div><div className="quantity"><button onClick={() => changeQty(index, -1)}><FiMinus /></button><span>{item.quantity.toLocaleString("fa-IR")}</span><button onClick={() => changeQty(index, 1)}><FiPlus /></button></div></div>)}</div>{items.length > 0 && <div className="drawer-footer"><div><span>مجموع سفارش</span><strong>{formatPrice(total)} تومان</strong></div><p><FiTruck /> ارسال رایگان برای سفارش‌های بالای ۳ میلیون</p><button>ادامه و پرداخت <FiArrowRight /></button></div>}</aside></>;
}

function Footer() { return <footer id="story"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#top"><img src={logo} alt="" /><span>STEPWISE</span></a><p>هر قدم، شروع یک داستان تازه است.</p></div><div><b>فروشگاه</b><a href="#shop">مردانه</a><a href="#shop">زنانه</a><a href="#shop">جدیدترین‌ها</a></div><div><b>راهنما</b><a href="#">پیگیری سفارش</a><a href="#">راهنمای سایز</a><a href="#">تعویض و مرجوعی</a></div><div className="newsletter" id="club"><b>یک قدم جلوتر باش</b><p>از دراپ‌های جدید و تخفیف‌ها زودتر باخبر شو.</p><form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="ایمیل شما" aria-label="ایمیل" /><button aria-label="عضویت"><FiArrowRight /></button></form></div></div><div className="footer-bottom"><span>© ۲۰۲۶ STEPWISE. تمام حقوق محفوظ است.</span><span>Designed for the next step.</span></div></footer>; }

export default function App() {
  const [cart, setCart] = useState([]); const [cartOpen, setCartOpen] = useState(false); const [quickView, setQuickView] = useState(null); const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => { document.body.style.overflow = cartOpen || quickView ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [cartOpen, quickView]);
  const addToCart = (item) => setCart((current) => { const index = current.findIndex((entry) => entry.id === item.id && entry.size === item.size && entry.selectedColor.name === item.selectedColor.name); if (index < 0) return [...current, { ...item, quantity: 1 }]; return current.map((entry, i) => i === index ? { ...entry, quantity: entry.quantity + 1 } : entry); });
  return <div className="app-shell" dir="rtl"><Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} /><Hero /><Shop onAdd={addToCart} onQuickView={(product, colorIndex) => setQuickView({ product, colorIndex })} /><Spotlight onQuickView={(product, colorIndex) => setQuickView({ product, colorIndex })} /><Footer /><QuickView state={quickView} onClose={() => setQuickView(null)} onAdd={addToCart} /><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} setItems={setCart} /></div>;
}
