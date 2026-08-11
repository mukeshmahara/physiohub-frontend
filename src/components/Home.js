import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import DemoForm from "./DemoForm";
import Contact from "./Contact";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <DemoForm />
      <Contact />
    </div>
  );
}

export default Home;
