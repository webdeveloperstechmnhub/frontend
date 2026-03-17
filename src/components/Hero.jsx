import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section className="py-20 relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          // Replace this URL with your specific background image
          backgroundImage: 'url("/hero-img.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/82 to-transparent" />
      </div>

      <div className="container relative z-10 mt-2.5 mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          {/* Badge / Small Heading */}
          <div className="inline-block px-4 py-1.5 mt-1.5  mb-1.5 text-sm font-semibold tracking-wide text-blue-700 uppercase bg-blue-100 rounded-full">
            Empowering the next generation
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-900">
            {/* India’s First Unified <br /> */}
            TechMNHub <br />
            {/* <span className="text-blue-600">Student Skill & Opportunity</span> Platform */}
            <span className="text-blue-600">We Don’t Just Plan Events, We Create Experiences</span> 
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700 max-w-2xl">
            To craft unforgettable moments, We strive to be the invisible hand behind every perfect detail, ensuring our clients can be guests at their own extraordinary events
            {/* Connect students, schools, colleges, institutes, and events in one 
            seamless ecosystem to unlock skills, opportunities, and growth. */}
          </p>



          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary Button with Scale and Shadow Lift */}
            <Link to="/join" className="bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-300 text-white text-lg font-bold py-4 px-10 rounded-xl transition-all duration-300 active:scale-95 shadow-xl shadow-blue-200">
              Join as Student
            </Link>
            
            {/* Secondary Button with Background Fill and Scale */}
            <Link to="/contact" className="bg-white hover:bg-blue-600 hover:text-white hover:-translate-y-1 border-2 border-blue-600 text-blue-600 text-lg font-bold py-4 px-10 rounded-xl transition-all duration-300 active:scale-95 shadow-sm hover:shadow-lg">
              Partner with Us
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;













