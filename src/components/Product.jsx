import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCheck, FaShoppingCart, FaStar } from "react-icons/fa";
import { FiRotateCw, FiX } from "react-icons/fi";
import { ProductsData } from "../index";

gsap.registerPlugin(ScrollTrigger);

const productDetails = [
    { price: 4890000, oldPrice: 5390000, colors: [{ name: "آبی", hex: "#0791b1", filter: "none" }, { name: "مشکی", hex: "#24282b", filter: "grayscale(1) brightness(.55)" }, { name: "قرمز", hex: "#c95454", filter: "hue-rotate(135deg) saturate(1.2)" }] },
    { price: 6250000, colors: [{ name: "سرمه‌ای", hex: "#354e6b", filter: "none" }, { name: "سفید", hex: "#f5f5f2", filter: "grayscale(.6) brightness(1.25)" }] },
    { price: 5720000, oldPrice: 6100000, colors: [{ name: "طوسی", hex: "#778087", filter: "none" }, { name: "سبز", hex: "#708761", filter: "hue-rotate(60deg)" }] },
    { price: 4190000, colors: [{ name: "سفید", hex: "#eeeeeb", filter: "none" }, { name: "آبی", hex: "#369cc4", filter: "hue-rotate(165deg) saturate(1.1)" }] },
    { price: 5250000, oldPrice: 5890000, colors: [{ name: "مشکی", hex: "#252525", filter: "none" }, { name: "قرمز", hex: "#b84949", filter: "hue-rotate(115deg) saturate(1.4)" }] },
    { price: 6980000, colors: [{ name: "آبی", hex: "#49728b", filter: "none" }, { name: "کرم", hex: "#d8c9ad", filter: "sepia(.5) saturate(.6) brightness(1.1)" }] },
];

const money = (value) => new Intl.NumberFormat("fa-IR").format(value);

function ShoeCard({ data, detail, onAdd, onPreview }) {
    const [color, setColor] = useState(0);
    const [size, setSize] = useState(42);
    const [added, setAdded] = useState(false);
    const imageRef = useRef(null);

    const handleMove = (event) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        imageRef.current.style.transform = `translateY(-5rem) rotateY(${x * 24}deg) rotateX(${y * -16}deg) scale(1.06)`;
    };

    const addToCart = () => {
        onAdd({ ...data, price: detail.price, color: detail.colors[color], size });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1300);
    };

    return (
        <article
            className="product-card rounded-2xl bg-secondary hover:bg-[#369cc4] relative shadow-xl duration-300 group max-w-[400px] mx-auto overflow-visible"
            onPointerMove={handleMove}
            onPointerLeave={() => { if (imageRef.current) imageRef.current.style.transform = "translateY(-5rem) rotateY(0) rotateX(0)"; }}
        >
            {detail.oldPrice && <span className="absolute z-20 top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">SALE</span>}
            <button
                className="relative h-[230px] w-full bg-transparent border-0 [perspective:900px]"
                onClick={() => onPreview({ ...data, ...detail, colorIndex: color })}
                aria-label={`Open 3D view for ${data.title}`}
            >
                <img
                    ref={imageRef}
                    src={data.img}
                    alt={data.title}
                    style={{ filter: detail.colors[color].filter }}
                    className="max-w-[300px] w-full h-[350px] object-contain block mx-auto -translate-y-20 duration-200 drop-shadow-xl [transform-style:preserve-3d]"
                />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/80 text-[#0791b1] text-[11px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 duration-300 whitespace-nowrap">
                    <FiRotateCw /> 360° View
                </span>
            </button>

            <div className="p-5 text-center -mt-7 bg-white/10 rounded-b-2xl">
                <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className={i === 4 ? "text-yellow-500/50" : "text-yellow-500"} />)}
                    <span className="text-xs text-gray-600 group-hover:text-white mr-1">4.8</span>
                </div>
                <h3 className="text-xl font-bold">{data.title}</h3>
                <div className="flex justify-center items-baseline gap-2 mt-2" dir="rtl">
                    <strong className="text-lg text-[#075d72] group-hover:text-white">{money(detail.price)} <small className="text-xs">تومان</small></strong>
                    {detail.oldPrice && <del className="text-xs text-gray-500 group-hover:text-white/70">{money(detail.oldPrice)}</del>}
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-black/10">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 group-hover:text-white">Color</span>
                        {detail.colors.map((item, index) => (
                            <button
                                key={item.name}
                                onClick={() => setColor(index)}
                                className={`w-6 h-6 rounded-full border-2 grid place-items-center duration-200 ${color === index ? "border-white ring-2 ring-[#0791b1] scale-110" : "border-white/60"}`}
                                style={{ backgroundColor: item.hex }}
                                aria-label={item.name}
                                title={item.name}
                            >{color === index && <FaCheck className="text-white text-[9px]" />}</button>
                        ))}
                    </div>
                    <label className="flex items-center gap-1 text-xs text-gray-600 group-hover:text-white">Size
                        <select value={size} onChange={(event) => setSize(Number(event.target.value))} className="bg-white/70 text-gray-800 rounded-lg px-2 py-1 outline-none">
                            {[39, 40, 41, 42, 43, 44].map((item) => <option key={item}>{item}</option>)}
                        </select>
                    </label>
                </div>

                <button
                    className={`w-full flex justify-center items-center gap-2 duration-300 text-white py-2.5 px-4 rounded-full mt-4 font-bold ${added ? "bg-green-500" : "bg-[#0791b1] hover:scale-[1.02] group-hover:bg-[#075d72]"}`}
                    onClick={addToCart}
                >
                    {added ? <><FaCheck /> Added to cart</> : <><FaShoppingCart /> Add to cart</>}
                </button>
            </div>
        </article>
    );
}

function PreviewModal({ product, onClose, onAdd }) {
    const [rotation, setRotation] = useState(-8);
    const [dragging, setDragging] = useState(false);
    const startX = useRef(0);
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-[#172b33]/80 backdrop-blur-md grid place-items-center p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <div className="relative bg-[#cbe2e7] rounded-3xl shadow-2xl w-full max-w-4xl min-h-[500px] grid md:grid-cols-[1.35fr_.65fr] overflow-hidden">
                <button onClick={onClose} className="absolute z-20 top-4 right-4 w-10 h-10 bg-white/70 rounded-full grid place-items-center" aria-label="Close"><FiX /></button>
                <div
                    className="relative min-h-[360px] grid place-items-center bg-gradient-to-br from-[#92c4d1] to-[#cbe2e7] cursor-grab active:cursor-grabbing [perspective:1000px] overflow-hidden"
                    onPointerDown={(event) => { setDragging(true); startX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
                    onPointerMove={(event) => { if (dragging) { setRotation((current) => current + (event.clientX - startX.current) * 0.5); startX.current = event.clientX; } }}
                    onPointerUp={() => setDragging(false)}
                >
                    <span className="absolute text-[9rem] font-black text-white/20">360°</span>
                    <div className="absolute w-[75%] h-[45%] rounded-[50%] border border-white/60 rotate-[-8deg]" />
                    <img src={product.img} alt="" style={{ transform: `rotateY(${rotation}deg) rotateX(6deg)`, filter: product.colors[product.colorIndex].filter }} className="relative z-10 w-[90%] max-h-[430px] object-contain drop-shadow-2xl [transform-style:preserve-3d]" />
                    <span className="absolute bottom-5 flex items-center gap-2 text-xs text-[#075d72] font-bold"><FiRotateCw /> Drag the shoe to rotate</span>
                </div>
                <div className="p-8 flex flex-col justify-center text-left" dir="ltr"><span className="text-xs font-bold text-[#0791b1] uppercase">Interactive preview</span><h3 className="text-3xl font-extrabold mt-2">{product.title}</h3><p className="text-sm text-gray-600 leading-7 mt-4">Premium comfort, flexible support and a lightweight feel designed for every step.</p><strong className="text-2xl text-[#075d72] mt-5" dir="rtl">{money(product.price)} <small className="text-xs">تومان</small></strong><button onClick={() => { onAdd({ ...product, color: product.colors[product.colorIndex], size: 42 }); onClose(); }} className="bg-[#0791b1] text-white rounded-full py-3 mt-6 flex items-center justify-center gap-2 font-bold"><FaShoppingCart /> Add to cart</button></div>
            </div>
        </div>
    );
}

const Product = () => {
    const sectionRef = useRef(null);
    const [cart, setCart] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const section = sectionRef.current;
        const items = section.querySelectorAll(".product-card");
        const tween = gsap.fromTo(items, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 20%", toggleActions: "play none none none" } });
        return () => tween.kill();
    }, []);

    const addToCart = (item) => setCart((current) => [...current, item]);

    return (
        <section id="shop" className="flex flex-col justify-center items-center mb-6 px-4" ref={sectionRef}>
            <div className="text-center max-w-2xl">
                <span className="text-[#0791b1] font-bold uppercase tracking-[.25em] text-xs">New collection</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">Explore Our Innovative 3D Shoe Designs</h2>
                <p className="text-gray-600 mt-3 text-sm">Choose your color and size, then move the cursor over each shoe for an interactive 3D experience.</p>
            </div>
            <div className="container mt-32">
                <Swiper modules={[Navigation, Pagination]} spaceBetween={30} slidesPerView={1} navigation breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="!pb-14">
                    {ProductsData.map((data, index) => <SwiperSlide key={data.id} className="!h-auto pt-20"><ShoeCard data={data} detail={productDetails[index]} onAdd={addToCart} onPreview={setPreview} /></SwiperSlide>)}
                </Swiper>
            </div>
            {cart.length > 0 && <button className="fixed z-40 bottom-6 right-6 bg-[#0791b1] text-white shadow-2xl rounded-full px-5 py-3 flex items-center gap-3 font-bold"><FaShoppingCart /><span>Cart</span><b className="bg-white text-[#0791b1] w-7 h-7 rounded-full grid place-items-center">{cart.length}</b></button>}
            <PreviewModal product={preview} onClose={() => setPreview(null)} onAdd={addToCart} />
        </section>
    );
};

export default Product;
