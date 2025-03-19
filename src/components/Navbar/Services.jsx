import React from "react";
import img1 from "../assets/service1.jpg";
import img2 from "../assets/service2.webp";
import img3 from "../assets/service3.jpg";
function Services() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white" style={{ height: "800px" }}>
        <div className="absolute inset-0">
          <img
            src={img1}
            alt="Clothing Hero"
            className="w-full h-full object-cover"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/1350x400?text=Hero+Image+Failed")
            }
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center flex flex-col justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About My-Garments
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We’re passionate about bringing you the finest clothing, crafted
            with love and care to make you feel confident and stylish.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-green-500 text-4xl mb-4">🖥️</div>
            <h3 className="text-2xl font-bold mb-4">Web Development</h3>
            <p className="text-gray-700">
              We build responsive and user-friendly websites tailored to your
              business needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-green-500 text-4xl mb-4">📱</div>
            <h3 className="text-2xl font-bold mb-4">Mobile Apps</h3>
            <p className="text-gray-700">
              We develop cross-platform mobile applications that deliver
              seamless user experiences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-green-500 text-4xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-4">SEO Optimization</h3>
            <p className="text-gray-700">
              We optimize your website to rank higher on search engines and
              drive more traffic.
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
          backgroundImage: `url(${img2})`, // Use the imported image
          filter: 'blur(4px)', // Apply blur effect to the background only
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 z-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-green-500 text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-4">Fast Delivery</h3>
            <p className="text-gray-700">We deliver projects on time without compromising quality.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-green-500 text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold mb-4">Innovative Solutions</h3>
            <p className="text-gray-700">We use the latest technologies to create cutting-edge solutions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-green-500 text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-4">Dedicated Team</h3>
            <p className="text-gray-700">Our team is committed to providing the best service.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-green-500 text-4xl mb-4">💼</div>
            <h3 className="text-xl font-bold mb-4">Customizable Plans</h3>
            <p className="text-gray-700">We offer flexible plans to suit your business needs.</p>
          </div>
        </div>
      </div>
    </div>

      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">
              "The team delivered an outstanding website that exceeded our
              expectations. Highly recommended!"
            </p>
            <p className="text-gray-900 font-semibold">- John Doe</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">
              "Their mobile app development service is top-notch. The app is
              fast, reliable, and user-friendly."
            </p>
            <p className="text-gray-900 font-semibold">- Jane Smith</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div 
      className="relative py-20 bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url(${img3})`, // Use the imported image
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

export default Services;
