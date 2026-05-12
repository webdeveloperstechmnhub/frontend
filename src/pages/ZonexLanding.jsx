import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, MapPin, Clock, Users, Award, Trophy, Star,
  ChevronRight, Gift, Shield, Facebook, Twitter, Instagram,
  Youtube, Mail, Phone, CheckCircle, Zap, Target, Sparkles,
  Rocket, Gamepad2, Music, Camera, Code, Mic, Dumbbell,
  Film, Brush, Coins, Ticket, CreditCard, Smartphone,
  Wallet, TrendingUp, Heart, Share2, Download, Copy
} from 'lucide-react';
import UpcomingEvents from './UpcomingEvents';
import RegistrationForm from '../pages/RegistrationForm';

const ZonexLanding = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedZone, setSelectedZone] = useState(null);
  const [showZoneModal, setShowZoneModal] = useState(false);

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date("March 7, 2026 09:00:00").getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Skill Zones Data (from RegistrationForm.jsx)
  const skillZones = [
    {
      id: 1,
      name: "Participation",
      icon: Trophy,
      color: "from-[#D4AF37] to-[#D4AF37]",
      description: "Participate in a wide range of competitions and activities. Show your talent and win prizes!",
      subcategories: [
        "Dance",
        "Singing",
        "Modelling in Pair",
        "Ramp Walk",
        "Standup Comedy",
        "Poetry",
        "Speech",
        "Debate",
        "Drawing Competition",
        "Sketch Making",
        "Decoration",
        "Hackathon",
        "Startup Idea Pitching",
        "Marketing Idea Challenge",
        "Problem Solving Questions",
        "Case Based Questions",
        "Presentation",
        "Chess",
        "Arm Wrestling",
        "Push-up Competition",
        "Quiz Competition",
        "Word-Draw Games",
        "Ring Toss",
        "Flip Cup",
        "Magnetic Dart",
        "POP the Balloon"
      ],
      prize: "Exciting Prizes",
      participants: "800+"
    },
    {
      id: 2,
      name: "Visitor",
      icon: Users,
      color: "from-[#D4AF37] to-[#D4AF37]",
      description: "General access to the event. Enjoy all performances, exhibitions, and the food carnival!",
      subcategories: ["General Access"],
      prize: "Goodies",
      participants: "500+"
    }
  ];

  // Pricing Plans (from RegistrationForm.jsx)
  const pricingPlans = [
    {
      name: "Pro Participation",
      price: "₹150",
      features: [
        "Hard Copy Certificate",
        "Physical Event ID Card",
        "Entry to 1 Skill Zone"
      ],
      color: "lime",
      popular: true,
      buttonText: "Get Pro Pass"
    },
    {
      name: "Visitor Pass",
      price: "₹150",
      features: [
        "Full Venue Access",
        "Watch All Performances",
        "Food Carnival Access"
      ],
      color: "purple",
      popular: false,
      buttonText: "Buy Visitor Pass"
    }
  ];

  // Sponsors
  const sponsors = [
    { name: "TechCorp", logo: "https://via.placeholder.com/150x80?text=TechCorp" },
    { name: "InnovateX", logo: "https://via.placeholder.com/150x80?text=InnovateX" },
    { name: "SkillUp", logo: "https://via.placeholder.com/150x80?text=SkillUp" },
    { name: "FutureLabs", logo: "https://via.placeholder.com/150x80?text=FutureLabs" },
    { name: "CodeBase", logo: "https://via.placeholder.com/150x80?text=CodeBase" },
    { name: "NextGen", logo: "https://via.placeholder.com/150x80?text=NextGen" }
  ];

  // FAQ Data
  const faqs = [
    {
      question: "Is Zonex open for all?",
      answer: "Yes! Zonex is open for students from all colleges, schools, and even working professionals. Everyone is welcome!"
    },
    {
      question: "What is the refund policy?",
      answer: "No refund after confirmation. However, you can transfer your registration to someone else by contacting support."
    },
    {
      question: "What should I bring to the event?",
      answer: "Bring your registration confirmation email, QR code, college ID card, and your energy! Laptops for hackathon participants."
    },
    {
      question: "Can school students join?",
      answer: "Absolutely! We have special categories for school students. Parent/guardian consent is required."
    },
    {
      question: "Is food included in the pass?",
      answer: "Food carnival access is included in all passes. Food coupons can be purchased separately at the venue."
    },
    {
      question: "How do I participate in multiple zones?",
      answer: "You can register for multiple zones by completing separate registrations. Pro pass gives you additional benefits."
    }
  ];

  return (
    <div className="bg-[#0D0D0D] text-white font-sans">
      {/* 🔥 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#111111] to-[#0D0D0D]"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#111111] backdrop-blur-sm border border-[#D4AF37]/20 px-4 py-2 rounded-full mb-8">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm font-medium">TechMNHub Presents</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            ZONEX
            <span className="text-[#D4AF37] block">
              2026
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#A0A0A0] mb-4 max-w-3xl mx-auto">
            Where Talent Takes Shape
          </p>
          
          <p className="text-lg md:text-xl text-[#A0A0A0] mb-8 max-w-2xl mx-auto">
            A District-Level Multi-Skill & Talent Festival
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 md:gap-8 mb-12">
            <div className="bg-[#111111] backdrop-blur-sm border border-[#D4AF37]/10 rounded-2xl p-4 w-24 md:w-32">
              <span className="text-3xl md:text-4xl font-bold text-[#D4AF37]">{timeLeft.days || 0}</span>
              <span className="block text-xs md:text-sm text-[#A0A0A0] mt-1">Days</span>
            </div>
            <div className="bg-[#111111] backdrop-blur-sm border border-[#D4AF37]/10 rounded-2xl p-4 w-24 md:w-32">
              <span className="text-3xl md:text-4xl font-bold text-[#D4AF37]">{timeLeft.hours || 0}</span>
              <span className="block text-xs md:text-sm text-[#A0A0A0] mt-1">Hours</span>
            </div>
            <div className="bg-[#111111] backdrop-blur-sm border border-[#D4AF37]/10 rounded-2xl p-4 w-24 md:w-32">
              <span className="text-3xl md:text-4xl font-bold text-[#D4AF37]">{timeLeft.minutes || 0}</span>
              <span className="block text-xs md:text-sm text-[#A0A0A0] mt-1">Minutes</span>
            </div>
            <div className="bg-[#111111] backdrop-blur-sm border border-[#D4AF37]/10 rounded-2xl p-4 w-24 md:w-32">
              <span className="text-3xl md:text-4xl font-bold text-[#D4AF37]">{timeLeft.seconds || 0}</span>
              <span className="block text-xs md:text-sm text-[#A0A0A0] mt-1">Seconds</span>
            </div>
          </div>

          {/* Event Details */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-[#A0A0A0]">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-[#D4AF37]" />
              <span>7 March 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#D4AF37]" />
              <span>Muzaffarnagar</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[#D4AF37]" />
              <span>9:00 AM – 5:00 PM</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/RegistrationForm">
              <button className="group bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-[rgba(212,175,55,0.22)] hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Zap size={20} className="group-hover:rotate-12 transition-transform" />
                Register Now
              </button>
            </Link>
            <button 
              onClick={() => document.getElementById('skillZones').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#111111] backdrop-blur-sm border border-[#D4AF37]/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#111111] transition-all duration-300 flex items-center gap-2"
            >
              <Target size={20} />
              Explore Skill Zones
            </button>
            <Link to="/RegistrationForm?type=visitor">
              <button className="bg-[#D4AF37]/80 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#D4AF37] transition-all duration-300 flex items-center gap-2">
                <Users size={20} />
                Become Visitor
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-bold text-white">800+</span>
              <span className="text-sm md:text-base text-[#A0A0A0]">Participants</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-bold text-white">10+</span>
              <span className="text-sm md:text-base text-[#A0A0A0]">Skill Zones</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-bold text-white">₹50K+</span>
              <span className="text-sm md:text-base text-[#A0A0A0]">Prize Pool</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37]/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#111111]/90 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* 🎯 ABOUT SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#111111] to-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                About Zonex
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-6 mb-6">
                Where{" "}
                <span className="text-[#D4AF37]">
                  Talent
                </span>{" "}
                Meets Opportunity
              </h2>
              <p className="text-lg text-[#A0A0A0] mb-6 leading-relaxed">
                ZONEX is a one-day skill discovery and opportunity festival bringing together students from multiple colleges and schools to showcase talent in technology, creativity, leadership, performance, and innovation.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[#A0A0A0]"><span className="font-bold text-white">800+ Expected Participants</span> from across the district</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[#A0A0A0]"><span className="font-bold text-white">10+ Skill Zones</span> covering diverse domains</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[#A0A0A0]"><span className="font-bold text-white">Hackathon with ₹50,000+ Prize Pool</span></p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[#A0A0A0]"><span className="font-bold text-white">Influencer Meetup & Food Carnival</span></p>
                </div>
              </div>

              <Link to="/RegistrationForm">
                <button className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[rgba(212,175,55,0.22)] transition-all">
                  Register Now – Limited Slots!
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/20 p-6 rounded-2xl backdrop-blur-sm border border-[#D4AF37]/10">
                <Users size={32} className="text-[#D4AF37] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">800+</h3>
                <p className="text-[#A0A0A0]">Participants</p>
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/20 p-6 rounded-2xl backdrop-blur-sm border border-[#D4AF37]/10">
                <Award size={32} className="text-[#D4AF37] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">10+</h3>
                <p className="text-[#A0A0A0]">Skill Zones</p>
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/20 p-6 rounded-2xl backdrop-blur-sm border border-[#D4AF37]/10">
                <Trophy size={32} className="text-[#D4AF37] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">₹50K+</h3>
                <p className="text-[#A0A0A0]">Prize Pool</p>
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/20 p-6 rounded-2xl backdrop-blur-sm border border-[#D4AF37]/10">
                <Calendar size={32} className="text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">28 Feb</h3>
                <p className="text-[#A0A0A0]">Event Day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 SKILL ZONES SECTION */}
      <section id="skillZones" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Explore Your Passion
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4">
              <span className="text-[#D4AF37]">
                Skill Zones
              </span>
            </h2>
            <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto">
              Choose from 10+ exciting zones and showcase your talent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillZones.map((zone) => (
              <div
                key={zone.id}
                className="group relative bg-gradient-to-br from-[#111111] to-[#0D0D0D] border border-[#D4AF37]/10 rounded-2xl p-6 hover:border-[#D4AF37]/20 hover:shadow-xl hover:shadow-[rgba(212,175,55,0.10)] transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedZone(zone);
                  setShowZoneModal(true);
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${zone.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${zone.color} rounded-xl flex items-center justify-center mb-4`}>
                    <zone.icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-all">
                    {zone.name}
                  </h3>
                  
                  <p className="text-[#A0A0A0] text-sm mb-4 line-clamp-2">
                    {zone.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {zone.subcategories.slice(0, 3).map((sub, idx) => (
                      <span key={idx} className="bg-[#111111] text-[#A0A0A0] px-2 py-1 rounded-md text-xs">
                        {sub}
                      </span>
                    ))}
                    {zone.subcategories.length > 3 && (
                      <span className="bg-[#111111] text-[#A0A0A0] px-2 py-1 rounded-md text-xs">
                        +{zone.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-xs text-[#A0A0A0]">Prize Pool</span>
                      <span className="text-lg font-bold text-white">{zone.prize}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-[#A0A0A0]">Participants</span>
                      <span className="text-sm text-[#A0A0A0]">{zone.participants}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-end text-[#D4AF37] group-hover:text-[#D4AF37] transition-colors">
                    <span className="text-sm font-medium mr-1">View Details</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💰 PRICING SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#111111] to-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Simple & Transparent
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4 text-white">
              Choose Your{" "}
              <span className="text-[#D4AF37]">
                Pass
              </span>
            </h2>
            <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto">
              Select the perfect pass that matches your interest
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br from-[#111111] to-[#0D0D0D] border ${
                  plan.popular
                    ? 'border-[#D4AF37]/50 shadow-xl shadow-[rgba(212,175,55,0.16)]'
                    : 'border-[#D4AF37]/10'
                } rounded-2xl p-6 hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-4 py-1 rounded-full text-xs font-bold">
                    🔥 BEST SELLER
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-[#A0A0A0] text-sm ml-1">/ person</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className={`text-${plan.color}-400 flex-shrink-0 mt-0.5`} />
                      <span className="text-[#A0A0A0]">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/RegistrationForm">
                  <button
                    className={`w-full bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-${plan.color}-500/30 transition-all`}
                  >
                    {plan.buttonText}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[#A0A0A0] text-sm mt-8">
            ⚠️ No refund after confirmation. Limited slots available – Zone caps apply.
          </p>
        </div>
      </section>

      {/* 🎟️ UPCOMING EVENTS SECTION - WITH VIEW DETAILS BUTTON */}
      <UpcomingEvents />

      {/* 🏆 GALLERY SECTION */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Memories
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4 text-white">
              Event{" "}
              <span className="text-[#D4AF37]">
                Gallery
              </span>
            </h2>
            <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto">
              Glimpses from our previous editions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="relative aspect-square bg-gradient-to-br from-[#111111] to-[#111111] rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera size={32} className="text-[#A0A0A0] group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🤝 SPONSORS SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#111111] to-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Our Partners
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4 text-white">
              <span className="text-[#D4AF37]">
                Sponsors
              </span>
            </h2>
            <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto">
              Supported by leading brands and organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="bg-[#111111] backdrop-blur-sm border border-[#D4AF37]/10 rounded-xl p-6 flex items-center justify-center hover:border-[#D4AF37]/20 transition-all"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#111111] to-[#111111] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Award size={32} className="text-[#A0A0A0]" />
                  </div>
                  <span className="text-sm font-medium text-[#A0A0A0]">{sponsor.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4 text-white">
              Frequently Asked{" "}
              <span className="text-[#D4AF37]">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] border border-[#D4AF37]/10 rounded-xl p-6 hover:border-[#D4AF37]/20 transition-all"
              >
                <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-[#A0A0A0]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📞 CONTACT SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#111111] to-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-6 mb-6 text-white">
                Ready to{" "}
                <span className="text-[#D4AF37]">
                  Join?
                </span>
              </h2>
              <p className="text-lg text-[#A0A0A0] mb-8">
                Have questions? We're here to help you with registrations, partnerships, or any queries.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                    <Mail size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="block text-sm text-[#A0A0A0]">Email</span>
                    <span className="text-white">zonex@techmnhub.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                    <Phone size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="block text-sm text-[#A0A0A0]">Phone</span>
                    <span className="text-white">+91 98765 43210</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#111111] rounded-lg flex items-center justify-center hover:bg-[#111111] transition-colors">
                  <Facebook size={20} className="text-[#A0A0A0]" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#111111] rounded-lg flex items-center justify-center hover:bg-[#111111] transition-colors">
                  <Twitter size={20} className="text-[#A0A0A0]" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#111111] rounded-lg flex items-center justify-center hover:bg-[#111111] transition-colors">
                  <Instagram size={20} className="text-[#A0A0A0]" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#111111] rounded-lg flex items-center justify-center hover:bg-[#111111] transition-colors">
                  <Youtube size={20} className="text-[#A0A0A0]" />
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] border border-[#D4AF37]/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#111111] border border-[#D4AF37]/10 rounded-xl px-4 py-3 text-white placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-[#111111] border border-[#D4AF37]/10 rounded-xl px-4 py-3 text-white placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]"
                />
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full bg-[#111111] border border-[#D4AF37]/10 rounded-xl px-4 py-3 text-white placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]"
                ></textarea>
                <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[rgba(212,175,55,0.22)] transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 FOOTER */}
      <footer className="bg-[#0D0D0D] border-t border-[#D4AF37]/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award size={24} className="text-[#D4AF37]" />
                <span className="text-xl font-bold text-white">ZONEX 2026</span>
              </div>
              <p className="text-sm text-[#A0A0A0]">
                A District-Level Multi-Skill & Talent Festival organized by TechMNHub.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Skill Zones</a></li>
                <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Registration</a></li>
                <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Security</h4>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-[#D4AF37]" />
                <span className="text-sm text-[#A0A0A0]">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-[#D4AF37]" />
                <span className="text-sm text-[#A0A0A0]">Secure Payments</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#D4AF37]/10 pt-8 text-center">
            <p className="text-sm text-[#A0A0A0]">
              © 2026 TechMNHub. All rights reserved. | Made with ❤️ for creators
            </p>
          </div>
        </div>
      </footer>

      {/* 🎯 SKILL ZONE DETAILS MODAL */}
      {showZoneModal && selectedZone && (
        <div
          className="fixed inset-0 bg-[#0D0D0D]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowZoneModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] border border-[#D4AF37]/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-r ${selectedZone.color} p-8 rounded-t-3xl`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#111111] backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <selectedZone.icon size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedZone.name}</h2>
                  <p className="text-[#A0A0A0]">{selectedZone.prize} Prize Pool</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-[#A0A0A0] text-lg mb-6">{selectedZone.description}</p>
              
              <h3 className="text-xl font-bold text-white mb-4">Available Subcategories</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {selectedZone.subcategories.map((sub, idx) => (
                  <div key={idx} className="bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-3 text-center">
                    <span className="text-white">{sub}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center p-4 bg-[#111111] rounded-xl mb-6">
                <div>
                  <span className="block text-sm text-[#A0A0A0]">Expected Participants</span>
                  <span className="text-2xl font-bold text-white">{selectedZone.participants}</span>
                </div>
                <div>
                  <span className="block text-sm text-[#A0A0A0]">Prize Pool</span>
                  <span className="text-2xl font-bold text-[#D4AF37]">
                    {selectedZone.prize}
                  </span>
                </div>
              </div>
              
              <Link to="/registration-form">
                <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                  Register for {selectedZone.name}
                </button>
              </Link>
              
              <button
                onClick={() => setShowZoneModal(false)}
                className="w-full mt-3 bg-[#111111] border border-[#D4AF37]/10 text-white py-3 rounded-xl font-medium hover:bg-[#111111] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZonexLanding;