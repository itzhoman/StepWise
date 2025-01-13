import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroSliderImg } from '../index';
import Button from '../design/Button';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = () => {
    const bgRef = useRef(null);
    const contentRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        // Timeline for animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: bgRef.current, 
                start: "top 75%",
                once: true,
            },
        });

        tl.fromTo(
            bgRef.current,
            { opacity: 0, y: -100 },
            { opacity: 1, y: 0, duration: 1 }
        );

        tl.fromTo(
            contentRef.current.children,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2 }, 
            "<" 
        );

        gsap.fromTo(
            sliderRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, delay: 0.5 }
        );
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
    };

    return (
        <div
            ref={bgRef}
            className="relative mx-auto h-auto bg-secondary w-full lg:w-3/4 mt-24 lg:mt-28 px-4 "
        >
            {/* Flexbox layout for slider and text */}
            <div
                className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16 w-full h-full lg:px-16"
            >
                {/* Slider Section */}
                <div ref={sliderRef} className="w-full lg:w-[600px]">
                    <Slider {...settings}>
                        {HeroSliderImg.map((data, index) => (
                            <div key={index}>
                                <img
                                    src={data.img}
                                    alt=""
                                    className="w-full h-[350px] sm:h-[300px] lg:h-[400px] object-contain mx-auto pt-4"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Text Section */}
                <div
                    ref={contentRef}
                    className="flex flex-col items-center lg:items-start gap-5 text-white"
                >
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-8xl break-keep tracking-wide font-extrabold leading-tight text-center lg:text-left">
                        Save up to
                        <span className="text-red-500"> 80% </span> 
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-center lg:text-left">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus consequatur aspernatur
                        voluptatem aliquid, sequi delectus est, non magnam nihil incidunt nobis fugit mollitia ea hic ratione fuga? Iste, pariatur commodi?
                    </p>
                    <Button
                        label='view more...'
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
