import React from "react";
import { Link } from "react-router-dom";
import img from "./thread.jpg"; // Ensure this path is correct

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Background Image - Fixed */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed" // Added bg-fixed
        style={{
          backgroundImage: `url(${img})`, // Correctly formatted URL
          filter: "brightness(50%)", // Dark overlay effect
        }}
      ></div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-down">
          Discover Your Style
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-2xl max-w-2xl mb-8 animate-fade-in-up">
          Explore our latest collection of trendy, comfortable, and timeless clothing designed just for you.
        </p>

        {/* CTA Button */}
        <Link
          to="/shop"
          className="inline-block bg-white text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 animate-fade-in"
        >
          Shop Now
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
};

export default Hero;