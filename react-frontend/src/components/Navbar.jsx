import React, { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';

const Navbar = ({ onExplore, onOrder, onHome, currentPage }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', onClick: () => handleHomeClick() },
        { id: 'models', label: 'Models', onClick: () => scrollToSection('models') },
        { id: 'features', label: 'Features', onClick: () => scrollToSection('features') },
        { id: 'about', label: 'About', onClick: () => scrollToSection('about') }
    ];

    // Function to scroll to top of page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Handle home click - go to home page AND scroll to top
    const handleHomeClick = () => {
        onHome();
        // Scroll to top after a brief delay to ensure page is loaded
        setTimeout(() => {
            scrollToTop();
        }, 100);
    };

    // Function to scroll to sections on the landing page
    const scrollToSection = (sectionId) => {
        if (currentPage === 'home') {
            // If we're on the home page, scroll to the section
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const offset = 80; // Account for navbar height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 50);
        } else {
            // If we're on another page, go to home and then scroll
            onHome();
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const offset = 80; // Account for navbar height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
        setIsMobileMenuOpen(false);
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when pressing Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [currentPage]);

    const isActive = (page) => currentPage === page;

    return (
        <>
            <nav className={`w-full flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-3 transition-all duration-300 sticky top-0 z-50 ${isScrolled
                ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200'
                : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
                }`}>
                {/* Logo Section */}
                <div
                    className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
                    onClick={handleHomeClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleHomeClick()}
                >
                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg shadow-md">
                        C
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-green-700 bg-clip-text text-transparent leading-tight">
                            AutoListing
                        </h1>
                        <span className="text-xs text-gray-500 hidden sm:block">Elite Motors</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={item.onClick}
                            className={`px-5 py-2.5 rounded-xl transition-all duration-200 font-medium relative group ${isActive(item.id)
                                ? 'text-red-600 font-semibold'
                                : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            {/* Active indicator */}
                            {isActive(item.id) && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-red-600 rounded-full"></div>
                            )}
                            {/* Hover effect */}
                            <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${isActive(item.id)
                                ? 'bg-blue-50 border border-blue-100'
                                : 'group-hover:bg-gray-50'
                                }`}></div>
                            <span className="relative z-10">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* CTA Button & Mobile Menu */}
                <div className="flex items-center space-x-3">
                    {/* Desktop CTA - Goes to Car Listing */}
                    <PrimaryButton
                        label="Explore Cars"
                        onClick={onExplore}
                        type="primary"
                        className="hidden sm:flex px-6 py-2.5"
                    />

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                            }`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            C
                        </div>
                        <span className="font-bold text-gray-900">AutoListing</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="p-6 space-y-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={item.onClick}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-between ${isActive(item.id)
                                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                        >
                            <span>{item.label}</span>
                            {isActive(item.id) && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Mobile CTA Section */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
                    <PrimaryButton
                        label="Browse Cars"
                        onClick={() => {
                            onExplore();
                            setIsMobileMenuOpen(false);
                        }}
                        type="primary"
                        className="w-full justify-center py-3"
                    />
                    <div className="mt-4 text-center text-sm text-gray-600">
                        <p>Need help? Call us</p>
                        <a href="tel:+15551234567" className="text-blue-600 font-semibold hover:text-blue-700">
                            (555) 123-4567
                        </a>
                    </div>
                </div>
            </div>

            {/* Prevent body scroll when mobile menu is open */}
            <style jsx>{`
                body {
                    overflow: ${isMobileMenuOpen ? 'hidden' : 'auto'};
                }
            `}</style>
        </>
    );
};

export default Navbar;