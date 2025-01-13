import React, { useEffect, useRef } from 'react';
import { FaEnvelope, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const quickLinks = [
    { key: 'home', label: 'Home', url: '#' },
    { key: 'about', label: 'About Us', url: '#' },
    { key: 'shop', label: 'Shop', url: '#' },
    { key: 'sale', label: 'Sale', url: '#' },
];

export const exploreMore = [
    { key: 'contact', label: 'Contact Us', url: '#' },
    { key: 'returns', label: 'Returns', url: '#' },
    { key: 'policy', label: 'Privacy Policy', url: '#' },
    { key: 'faq', label: 'FAQs', url: '#' },
];

export const socialLinks = [
    { key: 'linkedin', label: 'LinkedIn', url: '#', icon: <FaLinkedin className="text-2xl" /> },
    { key: 'twitter', label: 'Twitter', url: '#', icon: <FaTwitter className="text-2xl" /> },
    { key: 'instagram', label: 'Instagram', url: '#', icon: <FaInstagram className="text-2xl" /> },
    { key: 'email', label: 'Email', url: '#', icon: <FaEnvelope className="text-2xl" /> },
];

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;

        gsap.fromTo(
            footer,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 90%',
                    end: 'top 70%',
                    once: true,
                },
            }
        );
    }, []);

    return (
        <div
            ref={footerRef}
            className="bg-secondary text-black-300 py-10 mt-20"
        >
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-10">
                <div className="sm:col-span-1 flex flex-col items-center sm:items-start">
                    <div className="mb-4">
                        <a href="#">CodeLens</a>
                    </div>
                    <p className="font-bold text-lg">© 2025 Step Wise, Inc.</p>
                    <p className="font-bold text-lg">ALL rights reserved.</p>
                </div>

                <div className="sm:col-span-1 text-center sm:text-left">
                    <h3 className="font-extrabold text-xl mb-4">Quick Links</h3>
                    <ul>
                        {quickLinks.map((link) => (
                            <li key={link.key} className="mb-2">
                                <a href={link.url} className="hover:text-white font-bold text-lg">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sm:col-span-1 text-center sm:text-left">
                    <h3 className="font-extrabold text-xl mb-4">Explore More</h3>
                    <ul>
                        {exploreMore.map((link) => (
                            <li key={link.key} className="mb-2">
                                <a href={link.url} className="hover:text-white font-bold text-lg">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sm:col-span-1 text-center sm:text-left">
                    <h3 className="font-extrabold text-xl mb-4">Connect With Us</h3>
                    <ul className="flex flex-col items-center sm:items-start gap-3">
                        {socialLinks.map((link) => (
                            <li key={link.key}>
                                <a
                                    href={link.url}
                                    className="flex items-center gap-3 hover:text-white font-bold text-lg"
                                >
                                    {link.icon} {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
