import React from 'react';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Student Skill Profiles',
      description: 'Track and showcase student skills, achievements, and progress in a comprehensive profile.',
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: 'School & College Activities',
      description: 'Manage and display extracurricular activities, clubs, and academic involvements.',
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Events & Certifications',
      description: 'Highlight participation in events, workshops, and earned certifications.',
      icon: (
        <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'AI Career Guidance (Future-ready)',
      description: 'Receive personalized career advice powered by AI for future opportunities.',
      icon: (
        <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    /* 1. Added id="about" so the link finds it.
       2. Added scroll-mt-24 to stop the section from hiding under your fixed Navbar.
       3. Changed py-16 to pt-24 pb-12 to fix that "extra bottom space" you mentioned.
    */
    // Is line ko FeaturesPage.jsx mein replace karein
    <section 
        id="about" 
        style={{ scrollMarginTop: '60px' }} // Yahan 60px ko kam ya zyada karke set karein
        className="bg-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
            Why Choose Us
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Our Key Features
          </h1>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Discover the tools that empower students and educators in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:bg-blue-50/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-3"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-gray-50 rounded-2xl group-hover:bg-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 text-center mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 text-center leading-relaxed text-sm group-hover:text-gray-700">
                {feature.description}
              </p>

              {/* Bottom decorative bar that grows on hover */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-200 group-hover:w-24 group-hover:bg-blue-600 transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;




































