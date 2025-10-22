import React, { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";

const Navbar = ({ onExplore, onOrder, onHome, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", onClick: () => handleHomeClick() },
    { id: "models", label: "Models", onClick: () => scrollToSection("models") },
    { id: "features", label: "Features", onClick: () => scrollToSection("features") },
    { id: "about", label: "About", onClick: () => scrollToSection("about") },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeClick = () => {
    onHome();
    setTimeout(() => scrollToTop(), 100);
  };

  const scrollToSection = (id) => {
    if (currentPage === "home") {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const offset = 80;
          const position = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: position, behavior: "smooth" });
        }
      }, 50);
    } else {
      onHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const offset = 80;
          const position = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: position, behavior: "smooth" });
        }
      }, 500);
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && setIsMobileMenuOpen(false);
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [currentPage]);

  const isActive = (page) => currentPage === page;

  return (
    <>
      {/* === NAVBAR === */}
      <nav
        className={`w-full fixed top-0 z-50 flex justify-between items-center px-6 lg:px-16 py-3 transition-all duration-500 backdrop-blur-xl border-b ${
          isScrolled
            ? "bg-white/90 shadow-lg border-gray-200"
            : "bg-white/60 shadow-sm border-gray-100"
        }`}
      >
        {/* === Logo === */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={handleHomeClick}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-md hover:shadow-blue-400/50 transition-all">
            C
          </div>
          <div>
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-wide">
              CarListing
            </h1>
            <p className="text-xs text-gray-500">Drive the Future</p>
          </div>
        </div>

        {/* === Desktop Nav === */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                isActive(item.id)
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              {item.label}
              {isActive(item.id) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* === CTA + Mobile Button === */}
        <div className="flex items-center gap-3">
          <PrimaryButton
            label="Explore Cars"
            onClick={onExplore}
            type="primary"
            className="hidden sm:flex px-6 py-2.5"
          />
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span
              className={`w-6 h-0.5 bg-gray-800 transition-all ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-800 transition-all ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-800 transition-all ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* === Mobile Menu Overlay === */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}

      {/* === Mobile Drawer === */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/90 backdrop-blur-xl shadow-2xl border-l border-gray-200 transform transition-transform duration-500 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm">
              C
            </div>
            <span className="font-bold text-gray-900">CarListing</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Links */}
        <div className="p-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center justify-between transition-all ${
                isActive(item.id)
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{item.label}</span>
              {isActive(item.id) && (
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50/80">
          <PrimaryButton
            label="Browse Cars"
            onClick={() => {
              onExplore();
              setIsMobileMenuOpen(false);
            }}
            type="primary"
            className="w-full justify-center py-3"
          />
          <p className="mt-4 text-center text-sm text-gray-600">
            Need help?{" "}
            <a
              href="tel:+15551234567"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              (555) 123-4567
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
