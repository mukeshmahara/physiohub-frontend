import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle section scrolling when location.state has scrollTo
  useEffect(() => {
    if (isHomePage && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const timer = setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isHomePage, location]);

  const handleLogoClick = () => {
    if (!isHomePage) {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    if (!isHomePage) {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const handleDemoClick = () => {
    scrollToSection("demo-section");
  };

  const navLinks = [
    { name: "Features", action: () => scrollToSection("features-section") },
    { name: "Demo", action: () => scrollToSection("demo-section") },
    { name: "Contact", action: () => scrollToSection("contact-section") },
  ];

  const isSolid = isScrolled || !isHomePage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? "bg-white shadow-lg backdrop-blur-lg bg-opacity-95"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <img
                  src="/3dlogo.jpeg"
                  alt="PhysioHub Logo"
                  className="w-6 h-6 border rounded-full object-contain"
                />
              </div>
              <span
                className={`text-2xl font-bold transition-colors ${
                  isSolid ? "text-gray-900" : "text-white"
                }`}
              >
                Physio
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                  Hub
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={link.action}
                className={`font-semibold transition-colors hover:text-accent-500 ${
                  isSolid ? "text-gray-700" : "text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLoginClick}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                  location.pathname === "/login"
                    ? "bg-accent-500 text-white"
                    : isSolid
                    ? "text-gray-700 border border-gray-300 hover:border-accent-500 hover:text-accent-600 bg-white"
                    : "text-white border border-white/40 hover:border-white hover:bg-white/10"
                }`}
              >
                Login
              </button>

              <button
                onClick={handleDemoClick}
                className="px-6 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Book Demo
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isSolid
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white shadow-lg border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={link.action}
                className="block w-full text-left px-4 py-2 text-gray-700 font-semibold hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLoginClick}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 font-semibold text-gray-700 bg-white hover:border-accent-500 transition text-center"
                >
                  Login
                </button>

                <button
                  onClick={handleDemoClick}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg shadow-lg text-center"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
