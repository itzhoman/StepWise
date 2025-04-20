import { useState, useEffect, useRef } from "react";
import { navigation } from "../index";
import Button from "../assets/svg/Button";
import MenuSvg from "../assets/svg/MenuSvg";
import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
    const [openNavigation, setOpenNavigation] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef(null);

    const toggleNavigation = () => {
        setOpenNavigation((prev) => !prev);
    };

    const handleCloseNavigation = () => {
        setOpenNavigation(false);
    };

    const toggleSearch = () => {
        setSearchOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };

        if (searchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchOpen]);

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 ${
                openNavigation ? "bg-n-8" : "lg:bg-n-8/90 lg:backdrop-blur-sm"
            }`}
        >
            <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 xs:px-2 ">
                {/* Logo */}
                <a className="block w-[12rem] xl:mr-8" href="#hero">
                    <img src={logo} width={50} alt="STEPWISE" />
                </a>

                {/* Navigation */}
                <nav
                    className={`${
                        openNavigation ? "flex bg-third/95" : "hidden"
                    } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
                >
                    <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                onClick={handleCloseNavigation}
                                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors 
                                    hover:text-color-1 ${
                                        item.onlyMobile ? "lg:hidden" : ""
                                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 
                                lg:hover:text-n-1 xl:px-12`}
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* Search Icon and Input */}
                <div className="relative ml-0 mr-4 lg:mr-8 xs:mt-2 xs:mr-0 xs:ml-20" ref={searchRef}>
                    <button
                        className="text-n-1 w-11 "
                        onClick={toggleSearch}
                    >
                        <IoIosSearch 
                        className="text-black text-2xl" 
                        />
                    </button>
                    {searchOpen && (
                        <input
                            type="text"
                            className="absolute duration-500 rounded-full top-0 right-0 w-[200px] h-8 xs:w-[150px] 
                            xs:-mt-1
                            lg:w-[200px] text-white pl-3
                            bg-third text-n-8 border border-n-6  shadow-md"
                            placeholder="Search..."
                        />
                    )}
                </div>

                {/* Sign Up and Sign In Buttons */}
                <a
                    href="#signup"
                    className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
                >
                    New account
                </a>
                <Button
                    className="hidden lg:flex bg-primary hover:bg-secondary border-2 rounded-full"
                    href="#login"
                >
                    Sign in
                </Button>

                {/* Hamburger Menu Button */}
                <Button
                    className="lg:hidden"
                    px="px-3"
                    type="close"
                    onClick={toggleNavigation}
                >
                    <MenuSvg openNavigation={openNavigation} />
                </Button>
            </div>

            {/* Hamburger Menu Overlay */}
            {openNavigation && <HamburgerMenu onClose={handleCloseNavigation} />}
        </div>
    );
};

export const HamburgerMenu = ({ onClose }) => {
    return (
        <div
            className="absolute inset-0 bg-n-8 bg-opacity-50 z-40 pointer-events-auto lg:hidden"
            onClick={onClose}
        >
            <div className="absolute inset-0 opacity-70"></div>
        </div>
    );
};

export default Header;
