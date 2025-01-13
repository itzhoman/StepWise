import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroSliderImg } from '../index';
import gsap from 'gsap';
import Button from '../design/Button';

const Hero = () => {
  const bgRef = useRef(null); 

  useEffect(() => {
    gsap.fromTo(
      bgRef.current,
      { y: '-100%' }, 
      {
        y: '0%',
        duration: 1.5,
        ease: 'power2.out', 
      }
    );
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="relative w-full h-[1050px] bg-primary overflow-hidden">
      {/* Curved Decorations */}
      <div
        ref={bgRef} 
        className="absolute top-0 right-0 w-full h-[1000px] bg-secondary"
        style={{
          clipPath: "polygon(10% 12%, 100% 0%, 100% 80%, 0% 100%)",
          borderBottomLeftRadius: "150px",
        }}
      >
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center w-full h-full 
        px-8 lg:px-72 gap-8 lg:gap-0">
          {/* Text Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 ml-0 lg:ml-28 
          leading-6 text-gray-600 xs:w-[250px] lg:w-[450px] ">
            <h1 className="text-2xl sm:text-3xl">Discover the perfect</h1>
            <p className="w-full sm:w-[350px] lg:w-[450px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt consequatur
              sint rem sunt culpa explicabo officiis asperiores doloremque enim accusamus,
              atque optio in exercitationem repudiandae aliquid, amet at iste earum?
            </p>
            <Button
            label='order now'
            />
          </div>

          {/* Slider Section */}
          <div className="w-full sm:w-[450px] lg:w-[600px]">
            <Slider {...settings}>
              {HeroSliderImg.map((data, index) => (
                <div key={index}>
                  <img
                    src={data.img}
                    alt=""
                    className="w-full h-[500px] -mt-40  sm:h-[550px] xs:h-[400px] object-contain mx-auto"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
