import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import geminiLogo from '../assets/gemini.png';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const tiles = document.querySelectorAll(".about-tile");
    tiles.forEach((tile) => observer.observe(tile));

    return () => {
      tiles.forEach((tile) => observer.unobserve(tile));
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#f0f7ff] via-[#e6f0ff] to-[#d4e4ff] py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#1f6feb] opacity-5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1f6feb] opacity-5 rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <img
              src={assets.logo}
              alt="TechMNHub Logo"
              className="w-28 h-28 rounded-full object-cover shadow-xl border-4 border-white mx-auto mb-8 hover:scale-105 transition-transform duration-300"
            />

            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1f6feb] mb-6 tracking-tight">
              About TechMNHub
            </h1>

            <div className="w-24 h-1 bg-[#1f6feb] mx-auto mb-8 rounded-full"></div>

            <p className="text-xl md:text-2xl text-[#1e293b] leading-relaxed max-w-3xl mx-auto font-light">
              TechMNHub is a startup-driven technology community and ecosystem
              platform dedicated to empowering students, young professionals,
              developers, and innovators through opportunities, collaboration,
              guidance, and skill development.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section className="bg-gradient-to-b from-white to-[#f8faff] py-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Mission & Vision */}
          <div className="about-tile opacity-0 translate-y-10 transition-all duration-700 ease-out">
            <div className="bg-white rounded-3xl shadow-xl border border-[#e6f0ff] p-10 md:p-12 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#1f6feb] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1f6feb] tracking-tight">
                  Mission & Vision
                </h2>
              </div>

              <div className="space-y-6 text-lg text-[#334155] leading-relaxed">
                <p className="bg-[#f8faff] p-6 rounded-2xl border-l-4 border-[#1f6feb]">
                  <span className="font-bold text-[#1f6feb] text-xl block mb-2">Mission</span>
                  TechMNHub aims to empower the tech community — especially youth, learners, and early-stage
                  professionals — by providing access to knowledge, mentorship, events, communities, and career pathways.
                </p>

                <p className="bg-[#f8faff] p-6 rounded-2xl border-l-4 border-[#1f6feb]">
                  <span className="font-bold text-[#1f6feb] text-xl block mb-2">Vision</span>
                  To build an impactful technology ecosystem where learners and innovators can grow, collaborate, build real
                  projects, and achieve their professional goals.
                </p>
              </div>
            </div>
          </div>

          {/* Core Focus Areas */}
          <div className="about-tile opacity-0 translate-y-10 transition-all duration-700 ease-out delay-100">
            <div className="bg-white rounded-3xl shadow-xl border border-[#e6f0ff] p-10 md:p-12 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-[#1f6feb] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1f6feb] tracking-tight">
                  Core Focus Areas
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Community Collaboration",
                    desc: "Partnering with other technology communities and initiatives.",
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  },
                  {
                    title: "Skill Development",
                    desc: "Workshops, events and knowledge sharing sessions.",
                    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  },
                  {
                    title: "Innovation & Problem Solving",
                    desc: "Hackathons and innovation challenges for real-world impact.",
                    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  },
                  {
                    title: "Networking & Mentorship",
                    desc: "Connecting members with mentors and industry experts.",
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  }
                ].map((item, index) => (
                  <div key={index} className="group bg-[#f8faff] p-6 rounded-2xl border border-[#e6f0ff] hover:border-[#1f6feb] transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#1f6feb] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1f6feb] text-xl mb-2">{item.title}</h3>
                        <p className="text-[#334155] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="about-tile opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200">
            <div className="bg-white rounded-3xl shadow-xl border border-[#e6f0ff] p-10 md:p-12 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-[#1f6feb] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1f6feb] tracking-tight">
                  Activities & Initiatives
                </h2>
              </div>

												<div className="about-tile">
													<div className="about-row reverse">
														<div className="about-row-content">
															<h2 className="tmh-title" style={{ fontSize: 28, color: 'var(--tmh-ocean)' }}>Activities & Initiatives</h2>
															{/* Gemini Branding and Description */}
															<div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '0 0 18px 0' }}>
																<img src={geminiLogo} alt="Gemini Logo" style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover', background: '#fff', border: '1px solid #eee', boxShadow: '0 1px 4px rgba(30,64,175,0.07)' }} />
																<span style={{ fontWeight: 600, color: 'var(--tmh-ocean)', fontSize: 18 }}>Gemini-powered events conducted</span>
															</div>
															<p className="tmh-subtitle" style={{ marginBottom: 18, color: '#234', fontSize: 16.5 }}>
																TechMNHub has organized flagship events in partnership with Gemini, bringing together students, professionals, and innovators to explore the latest in AI and technology. These events foster hands-on learning, collaboration, and real-world impact.
															</p>
															<div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', marginTop: 8 }}>
																{/* TechStars Event Tile */}
																<div style={{ background: 'var(--tmh-cream)', border: '1.5px solid var(--tmh-ocean)', borderRadius: 16, boxShadow: '0 2px 8px rgba(30,64,175,0.08)', padding: '32px 24px', minWidth: 260, maxWidth: 340, flex: '1 1 260px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
																	  <img src="/tech-stars.jpg" alt="TechStars" style={{ width: '100%', maxWidth: 180, height: 135, borderRadius: 10, objectFit: 'contain', boxShadow: '0 2px 8px rgba(30,64,175,0.10)', marginBottom: 16, background: '#fff' }} />
                                    <h3 style={{ color: 'var(--tmh-ocean)', fontSize: 22, marginBottom: 12, textAlign: 'center' }}>TechStars</h3>
																	<p style={{ color: 'var(--tmh-ink)', fontSize: 16, textAlign: 'center', marginBottom: 20 }}>A flagship event by TechMNHub focused on inspiring and connecting student innovators, featuring workshops, competitions, and networking opportunities—all powered by Gemini AI.</p>
																		<Link to="/techstars" style={{ background: 'var(--tmh-ocean)', color: '#fff', border: 'none', borderRadius: 24, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 'auto', boxShadow: '0 2px 8px rgba(30,64,175,0.10)', textDecoration: 'none', display: 'inline-block' }}>Know More</Link>
																</div>
																{/* TechFront Event Tile */}
																<div style={{ background: 'var(--tmh-cream)', border: '1.5px solid var(--tmh-ocean)', borderRadius: 16, boxShadow: '0 2px 8px rgba(30,64,175,0.08)', padding: '32px 24px', minWidth: 260, maxWidth: 340, flex: '1 1 260px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
																	  <img src="/tech-front.gif" alt="TechFront" style={{ width: '100%', maxWidth: 180, height: 135, borderRadius: 10, objectFit: 'contain', boxShadow: '0 2px 8px rgba(30,64,175,0.10)', marginBottom: 16, background: '#fff' }} />
																	<h3 style={{ color: 'var(--tmh-ocean)', fontSize: 22, marginBottom: 12, textAlign: 'center' }}>TechFront</h3>
																	<p style={{ color: 'var(--tmh-ink)', fontSize: 16, textAlign: 'center', marginBottom: 20 }}>A major technology summit organized by TechMNHub and powered by Gemini, bringing together industry leaders, students, and professionals for talks, panels, and hands-on AI sessions.</p>
																		<Link to="/techfront" style={{ background: 'var(--tmh-ocean)', color: '#fff', border: 'none', borderRadius: 24, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 'auto', boxShadow: '0 2px 8px rgba(30,64,175,0.10)', textDecoration: 'none', display: 'inline-block' }}>Know More</Link>
																</div>
															</div>
															<ul className="tmh-subtitle" style={{ marginTop: 32 }}>
									<li><strong>Community Advocacy for Apertre 3.0:</strong> TechMNHub partnered as a community advocate for Apertre 3.0 — a nationwide initiative aimed at bringing students and innovators together in competitions, learning platforms, and collaborative environments.</li>
									<li><strong>Tech Events & Hackathons:</strong> Regularly hosting and supporting events that encourage learning, innovation, and collaboration among tech enthusiasts.</li>
								</ul>
							</div>
						</div>
					</div>
            </div>
          </div>

          {/* Leadership */}
          <div className="about-tile opacity-0 translate-y-10 transition-all duration-700 ease-out delay-300">
            <div className="bg-white rounded-3xl shadow-xl border border-[#e6f0ff] p-10 md:p-12 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="w-12 h-12 bg-[#1f6feb] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1f6feb] tracking-tight text-center">
                  Leadership
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-16">
                {/* Founder */}
                <div className="group flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#1f6feb] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <img
                      src={assets.nikhil_tomar}
                      alt="Nikhil Tomar"
                      className="w-36 h-36 rounded-full object-cover shadow-xl border-4 border-white relative z-10 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1f6feb] mb-2">Nikhil Tomar</h3>
                  <p className="text-[#475569] mb-3 font-medium">Founder & CEO</p>
                  <a
                    href="https://www.linkedin.com/in/nikhil-tomar-b6a119334"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#1f6feb] font-semibold hover:text-[#0a4bb8] transition-colors duration-300 group/link"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">LinkedIn</span>
                  </a>
                </div>

                {/* Co-Founder */}
                <div className="group flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#1f6feb] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <img
                      src={assets.madhav_katyayan}
                      alt="Madhav Katyayan"
                      className="w-36 h-36 rounded-full object-cover shadow-xl border-4 border-white relative z-10 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1f6feb] mb-2">Madhav Katyayan</h3>
                  <p className="text-[#475569] mb-3 font-medium">Co-Founder & COO</p>
                  <a
                    href="https://www.linkedin.com/in/madhav-katyayan-813213338/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#1f6feb] font-semibold hover:text-[#0a4bb8] transition-colors duration-300 group/link"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default About;