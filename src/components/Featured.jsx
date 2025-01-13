import React, { useEffect, useRef } from 'react';
import { FeaturedData } from '../index';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Featured = () => {
    const featuredRef = useRef(null);

    useEffect(() => {
        const cards = featuredRef.current.querySelectorAll('.featured-card');

        gsap.fromTo(
            cards,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.2, 
                scrollTrigger: {
                    trigger: featuredRef.current, 
                    start: 'top 80%', 
                    end: 'bottom 20%',
                    once: true, 
                },
            }
        );
    }, []);

    return (
        <div
            ref={featuredRef}
            className="w-full md:w-4/5 lg:w-3/5 md:h-auto mt-10 md:mt-32 flex items-center justify-center
             bg-secondary mx-auto py-10"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16 place-items-center">
                {FeaturedData.map((data) => (
                    <div
                        key={data.id}
                        className="featured-card bg-third duration-300 w-full sm:w-[300px]  flex flex-col items-center 
                        justify-between rounded-lg shadow-lg overflow-hidden hover:bg-primary/90 "
                    >
                        <div className="w-full h-auto flex items-center justify-center">
                            <img
                                src={data.img}
                                alt={data.title}
                                className="w-3/4 h-[200px] mt-4 sm:h-[250px] object-cover"
                            />
                        </div>
                        <div className="text-center p-4">
                            <h1 className="text-lg sm:text-xl text-white hover:text-black font-bold">{data.title}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Featured;
