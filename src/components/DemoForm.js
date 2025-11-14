import React, { useState } from 'react';

function DemoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          clinicName: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="demo-section" className="py-20 px-4 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-accent-100 text-accent-700 text-sm font-semibold rounded-full mb-4">
                🚀 Get Started Today
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                See Physio Hub{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  in Action
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Schedule a personalized demo and discover how Physio Hub can transform your practice.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: '⚡', title: 'Quick Setup', desc: '15-minute personalized walkthrough' },
                { icon: '🎯', title: 'Custom Demo', desc: 'Tailored to your practice needs' },
                { icon: '💬', title: 'Expert Support', desc: 'Get all your questions answered' },
                { icon: '🎁', title: 'Special Offer', desc: '30-day free trial included' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl">{benefit.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by leading practices</p>
              <div className="flex items-center gap-6 opacity-50">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            {/* Background Decoration */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-accent-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>

            <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-semibold mb-2 transition-colors ${
                        focusedField === 'name' ? 'text-accent-600' : 'text-gray-700'
                      }`}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-4 focus:ring-accent-100 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-semibold mb-2 transition-colors ${
                        focusedField === 'email' ? 'text-accent-600' : 'text-gray-700'
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-4 focus:ring-accent-100 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="phone" 
                        className={`block text-sm font-semibold mb-2 transition-colors ${
                          focusedField === 'phone' ? 'text-accent-600' : 'text-gray-700'
                        }`}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-4 focus:ring-accent-100 outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="clinicName" 
                        className={`block text-sm font-semibold mb-2 transition-colors ${
                          focusedField === 'clinicName' ? 'text-accent-600' : 'text-gray-700'
                        }`}
                      >
                        Clinic Name
                      </label>
                      <input
                        type="text"
                        id="clinicName"
                        name="clinicName"
                        value={formData.clinicName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('clinicName')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-4 focus:ring-accent-100 outline-none transition-all"
                        placeholder="Your Clinic"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-semibold mb-2 transition-colors ${
                        focusedField === 'message' ? 'text-accent-600' : 'text-gray-700'
                      }`}
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-4 focus:ring-accent-100 outline-none transition-all resize-none"
                      placeholder="Tell us about your practice..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Demo
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              ) : (
                <div className="text-center py-12 animate-fadeInUp">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">We'll be in touch soon to schedule your demo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoForm;
