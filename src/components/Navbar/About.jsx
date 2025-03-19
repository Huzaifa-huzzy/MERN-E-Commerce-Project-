import React from "react";
import img1 from "../assets/clothe1.avif";
import img2 from "../assets/clothe2.avif";
function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
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

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            At My-Garments, our mission is to redefine fashion by offering
            sustainable, high-quality clothing that blends timeless design with
            modern comfort. We aim to empower every individual to express their
            unique style while prioritizing ethical production and customer
            satisfaction.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
              <h3 className="text-xl font-medium text-indigo-600 mb-2">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We use eco-friendly materials and processes to minimize our
                environmental impact.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
              <h3 className="text-xl font-medium text-indigo-600 mb-2">
                Quality
              </h3>
              <p className="text-gray-600">
                Every piece is crafted with precision to ensure durability and
                comfort.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
              <h3 className="text-xl font-medium text-indigo-600 mb-2">
                Style
              </h3>
              <p className="text-gray-600">
                Our designs are inspired by the latest trends and timeless
                classics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Priya Sharma"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-900">
                  Priya Sharma
                </h3>
                <p className="text-indigo-600">Founder & CEO</p>
                <p className="text-gray-600 mt-2">
                  Priya leads with a vision to make fashion sustainable and
                  accessible.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cadff1a22b87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Rahul Verma"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-900">
                  Rahul Verma
                </h3>
                <p className="text-indigo-600">Head of Design</p>
                <p className="text-gray-600 mt-2">
                  Rahul brings creativity and innovation to every collection.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Anita Patel"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-900">
                  Anita Patel
                </h3>
                <p className="text-indigo-600">Marketing Lead</p>
                <p className="text-gray-600 mt-2">
                  Anita connects our brand with customers worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white" style={{ height: "600px" }}>
        <div className="absolute inset-0">
          <img
            src={img2}
            alt="Clothing CTA"
            className="w-full h-full object-cover"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/1350x400?text=CTA+Image+Failed")
            }
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Be a part of our community and explore fashion that speaks to you.
          </p>
          <a
            href="/shop"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
