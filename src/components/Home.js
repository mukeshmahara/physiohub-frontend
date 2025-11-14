import React from 'react';
import Hero from './Hero';
import Features from './Features';
import DemoForm from './DemoForm';
import Contact from './Contact';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <DemoForm />
      <Contact />
    </div>
  );
}

export default Home;