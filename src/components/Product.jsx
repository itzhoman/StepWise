import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { ProductsData } from "../index";

gsap.registerPlugin(ScrollTrigger);

const Product = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const items = sectionRef.current.querySelectorAll(".product-card");

        gsap.fromTo(
            items,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", 
                    end: "bottom 20%", 
                    toggleActions: "play none none none", 
                },
            }
        );
    }, []);

    const handleOrderPopup = () => {};

    return (
        <div className="flex flex-col justify-center items-center mb-6" ref={sectionRef}>
            <div>
                <h2 className="text-4xl font-extrabold text-gray-900">
                    Explore Our Innovative 3D Shoe Designs - Elevate
                </h2>
            </div>
            <div className="container mt-36">
                {/* Swiper Container */}
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {ProductsData.map((data) => (
                        <SwiperSlide key={data.id}>
                            <div
                                className="product-card rounded-2xl bg-secondary hover:bg-primary/10 hover:bg-[#369cc4]
                                hover:text-black relative shadow-xl duration-300 group max-w-[400px] md:ml-12"
                            >
                                {/* Image section */}
                                <div className="h-[230px] w-[400px]">
                                    <img
                                        src={data.img}
                                        alt=""
                                        className="max-w-[300px] h-[350px] block mx-auto transform -translate-y-20
                                        group-hover:scale-105 duration-300 drop-shadow-md"
                                    />
                                </div>
                                {/* Details section */}
                                <div className="p-4 text-center -mt-8">
                                    {/* Star rating */}
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        {[...Array(4)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-500" />
                                        ))}
                                    </div>
                                    <h1 className="text-xl font-bold">{data.title}</h1>
                                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                                        {data.description}
                                    </p>
                                    <button
                                        className="bg-[#0791b1] hover:scale-105 duration-300 text-white py-1 px-4
                                         rounded-full mt-4 group-hover:bg-secondary hover:bg-secondary 
                                         group-hover:text-black"
                                        onClick={handleOrderPopup}
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Product;
