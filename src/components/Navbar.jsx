import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // HashLink import karein

const Navbar = () => {
    const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
        
        {/* LOGO: Link to Home Page */}
        <Link to="/" className="flex items-center group cursor-pointer" onClick={handleScrollToTop}>
          <img 
            src="/TechMNHub-Logo.png" 
            alt="Logo" 
            className="h-12 w-12 rounded-full border shadow-sm transition-transform duration-300 group-hover:rotate-12" 
          />
          <h2 className='text-2xl font-bold ml-3 text-gray-900'>TechMNHub</h2>
        </Link>

        <div className="flex items-center space-x-8">
          <ul className="hidden md:flex space-x-8">
            {/* Direct Page Link */}
            <li>
              <Link to="/" className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110" onClick={handleScrollToTop}>
                Home
              </Link>
            </li>

            {/* Scroll to Section Links (Using HashLink) */}
            <li>
              <Link smooth to="/about" className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110">
                About
              </Link>
            </li>
            <li>
              <HashLink smooth to="/#events" className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110">
                Events
              </HashLink>
            </li>
            
            {/* Another Direct Page Link */}
            <li>
              <Link to="/contact" className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110">
                Contact
              </Link>
            </li>
          </ul>

          {/* Join Us Page Link */}
          <Link to="/join">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
              Join Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


















































































// import React from 'react';
// import { Link } from 'react-router-dom'; // 1. Link import karein

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md fixed top-0 w-full z-50">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
        
//         {/* Left Side: Logo (Click karne par home par le jayega) */}
//         <Link to="/" className="flex items-center group cursor-pointer">
//           <img 
//             src="/TechMNHub-Logo.png" 
//             alt="Logo" 
//             className="h-12 w-12 rounded-full object-cover transition-transform duration-300 group-hover:rotate-12" 
//           />
//           <h2 className='text-2xl font-bold ml-3 text-gray-900'>TechMNHub</h2>
//         </Link>

//         {/* Right Side: Links */}
//         <div className="flex items-center space-x-8">
//           <ul className="hidden md:flex space-x-8">
//             <li>
//               <Link to="/" className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/events" className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110">
//                 Events
//               </Link>
//             </li>
//             <li>
//               <Link to="/media" className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110">
//                 Media
//               </Link>
//             </li>
//           </ul>

//           {/* Join Us Button (Redirect to a signup/contact page) */}
//           <Link to="/join">
//             <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
//               Join Us
//             </button>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




































// import React from 'react';

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md fixed top-0 w-full z-50">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
//         {/* Left Side: Logo and Brand */}
//         <div className="flex items-center group cursor-pointer">
//           <img 
//             src="/TechMNHub-Logo.png" // Replace with your actual logo URL
//             alt="Logo" 
//             className="h-12 w-12 rounded-full object-cover border border-gray-100 shadow-sm transition-transform duration-300 group-hover:rotate-12" 
//           />
//           <h2 className='text-2xl flex items-center font-bold ml-3 text-gray-900 tracking-tight'>
//             TechMNHub
//           </h2>
//         </div>

//         {/* Right Side: Links and Button */}
//         <div className="flex items-center space-x-8">
//           {/* Navigation Links */}
//           <ul className="hidden md:flex space-x-8">
//             {['Home', 'About', 'Events', 'Media'].map((item) => (
//               <li key={item}>
//                 <a 
//                   href={`#${item.toLowerCase()}`} 
//                   className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95"
//                 >
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Join Us Button */}
//           <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
//             Join Us
//           </button>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden">
//             <button className="text-gray-700 focus:outline-none p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




































// import React from 'react';


// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md fixed top-0 w-full z-50">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
//         {/* Left Side: Logo */}
//         <div className="flex items-center">
//           <img 
//             src="/TechMNHub-Logo.png" // Replace with your actual logo URL
//             alt="Logo" 
//             className="h-10 w-auto" // Adjust height as needed
//           />
//           {/* Or use text logo: <span className="text-xl font-bold text-gray-900">Your Logo</span> */}
//           <h2 className='text-3xl flex items-center font-bold leading-tight mb-2 ml-1 text-gray-900'>TechMNHub</h2>
//         </div>

//         {/* Right Side: Links and Button */}
//         <div className="flex items-center space-x-6">
//           {/* Navigation Links */}
//           <ul className="hidden md:flex space-x-6">
//             <li>
//               <a 
//                 href="#home" 
//                 className="text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 font-medium"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="#about" 
//                 className="text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 font-medium"
//               >
//                 About
//               </a>
//             </li>
            
            
//             <li>
//               <a 
//                 href="#events" 
//                 className="text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 font-medium"
//               >
//                 Events
//               </a>
//             </li>
            
//             <li>
//               <a 
//                 href="#media" 
//                 className="text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 font-medium"
//               >
//                 Media
//               </a>
//             </li>
//           </ul>

//           {/* Join Us Button with Glass Hover Effect */}
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 hover:backdrop-blur-sm hover:bg-white/20 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-600">
//             Join Us
//           </button>

//           {/* Mobile Menu Toggle (Optional, for responsiveness) */}
//           <div className="md:hidden">
//             <button className="text-gray-700 focus:outline-none">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;