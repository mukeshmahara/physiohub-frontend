import React, { useState } from 'react';

function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const logo = '/logo512.png'; // Path to the logo image

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-accent-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-accent-300 rounded-full opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-fadeInUp">
            <div className="inline-block">
              <span className="px-4 py-2 bg-accent-500 bg-opacity-20 backdrop-blur-sm text-accent-200 text-sm font-semibold rounded-full border border-accent-400 border-opacity-30">
                ⚡ Modern Practice Management
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
              Transform Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
                Physiotherapy
              </span>{' '}
              Practice
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
              Streamline patient care, automate scheduling, and grow your practice with our all-in-one management platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToDemo}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Request a Demo
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-white font-semibold rounded-xl border-2 border-white border-opacity-30 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Video
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-300">500+</div>
                <div className="text-sm text-gray-300">Active Clinics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-300">50K+</div>
                <div className="text-sm text-gray-300">Patients Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-300">4.9★</div>
                <div className="text-sm text-gray-300">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration/Image Placeholder */}
          <div className="hidden lg:block relative animate-fadeInRight">
            <div className="relative">
              {/* Decorative Card Stack */}
              <div className="absolute inset-0 transform rotate-3 bg-gradient-to-br from-accent-400 to-accent-600 rounded-3xl opacity-20"></div>
              <div className="absolute inset-0 transform -rotate-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl opacity-20"></div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                <img
                  src={logo}
                  alt="Logo"
                  className="object-contain rounded-2xl h-full w-full mx-auto p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
