import React from "react";
import img1 from "../assets/contact1.jpg";
import img2 from "../assets/contact2.jpg";
import img3 from "../assets/contact3.jpg";

function Contact() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white" style={{ height: "600px" }}>
        <div className="absolute inset-0">
          <img
            src={img1}
            alt="Contact Hero"
            className="w-full h-full object-cover"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/1350x400?text=Hero+Image+Failed")
            }
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center flex flex-col justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We’re here to help! Reach out to us for any inquiries or support.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg my-16">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold">How can I track my order?</h3>
            <p className="text-gray-700 mt-2">
              You can track your order using the tracking number provided in your confirmation email.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold">What is your return policy?</h3>
            <p className="text-gray-700 mt-2">
              We offer a 30-day return policy for unused items. Please contact us for more details.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold">Do you offer international shipping?</h3>
            <p className="text-gray-700 mt-2">
              Yes, we ship worldwide. Shipping costs and delivery times vary by location.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${img2})`,
            filter: "blur(4px)",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 z-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-green-500 text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-4">Email</h3>
              <p className="text-gray-700">info@my-garments.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-green-500 text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-4">Phone</h3>
              <p className="text-gray-700">+1 (123) 456-7890</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-green-500 text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-4">Address</h3>
              <p className="text-gray-700">123 Main St, City, Country</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-green-500 text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-4">Live Chat</h3>
              <p className="text-gray-700">
                Chat with us 24/7 for instant support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg my-16">
        <h2 className="text-3xl font-bold text-center mb-6">Our Location</h2>
        <div className="overflow-hidden rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.95373531531615!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a5a9f4c0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633039291413!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${img3})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-8">
            Contact us today to discuss your project and take your business to
            the next level.
          </p>
          <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;