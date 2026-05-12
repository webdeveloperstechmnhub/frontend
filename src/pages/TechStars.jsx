
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import geminiImg from "../assets/gemini.png";
import stars1 from "../assets/stars-1.jpg";
import stars2 from "../assets/stars-2.jpg";
import stars3 from "../assets/stars-3.jpg";
import stars4 from "../assets/stars-4.jpg";
import GlowCard from "../components/ui/GlowCard";
const images = [stars1, stars2];

const topThree = [
  { rank: 1, name: 'Aarav Sharma', points: 980 },
  { rank: 2, name: 'Neha Verma', points: 930 },
  { rank: 3, name: 'Ishan Mehta', points: 890 },
]

const TechStars = () => {
  const [modalImg, setModalImg] = useState(null);
  const handleOpen = (img) => setModalImg(img);
  const handleClose = () => setModalImg(null);
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, var(--tmh-sky) 0%, var(--tmh-cream) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', width: '100vw' }}>
    <div style={{ width: '100%', maxWidth: 800, margin: '32px auto 0 auto', display: 'flex', justifyContent: 'flex-start' }}>
      <Link to="/about" style={{
        background: 'var(--tmh-ocean)',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: 24,
        padding: '8px 22px',
        fontWeight: 600,
        fontSize: 16,
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(212,175,55,0.10)',
        display: 'inline-block',
        marginBottom: 12
      }}>← Back to About</Link>
    </div>
    <style>{`
      .ts-fadein { animation: ts-fadein 1.2s cubic-bezier(.4,1,.4,1); }
      @keyframes ts-fadein { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
      .ts-card { transition: box-shadow 0.3s; }
      .ts-card:hover { box-shadow: 0 8px 32px rgba(212,175,55,0.14); }
      .ts-photo-placeholder { background: #111111; border: 2px dashed var(--tmh-ocean); border-radius: 18px; width: 100%; min-height: 180px; display: flex; align-items: center; justify-content: center; color: #A0A0A0; font-size: 1.2rem; margin-bottom: 24px; }
      @media (max-width: 700px) {
        .ts-maincard { padding: 18px 4vw !important; }
        .ts-photo-placeholder { min-height: 120px; font-size: 1rem; }
      }
    `}</style>
      <div className="ts-fadein" style={{ width: '100%', maxWidth: 800, margin: '48px auto 0 auto', background: '#111111', borderRadius: 18, boxShadow: '0 4px 24px rgba(212,175,55,0.10)', border: '2px solid var(--tmh-ocean)', padding: '32px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <img src={geminiImg} alt="Google Gemini" style={{ maxWidth: 180, borderRadius: 12, boxShadow: '0 2px 8px rgba(212,175,55,0.10)' }} />
        </div>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontWeight: 700, color: 'var(--tmh-ocean)', fontSize: 22, marginBottom: 18, textAlign: 'center', letterSpacing: 0.5 }}>Event Gallery</div>
        <div className="ts-gallery-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 28,
          justifyContent: 'center',
          alignItems: 'stretch',
          padding: '0 8px',
          minHeight: 140
        }}>
          {images.map((img, i) => (
            <div
              key={i}
              style={{
                background: '#111111',
                border: '1.5px solid #D4AF37',
                borderRadius: 14,
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(212,175,55,0.08)',
                overflow: 'hidden',
                padding: 0,
                cursor: 'pointer'
              }}
              onClick={() => handleOpen(img)}
              title="Click to enlarge"
            >
              <img
                src={img}
                alt={`TechStars event photo ${i+1}`}
                style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, display: 'block', transition: 'transform 0.2s', cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
      <h1 style={{ color: 'var(--tmh-ocean)', fontSize: 38, marginBottom: 10, textAlign: 'center', fontWeight: 800, letterSpacing: 1 }}>TechStars 2025</h1>
      <div style={{ color: 'var(--tmh-ink)', fontSize: 20, textAlign: 'center', marginBottom: 18, fontWeight: 500 }}>
        Hosted on 18th September 2025 at S.D. College of Engineering &amp; Technology.
      </div>
      <div className="ts-card ts-fadein" style={{ background: 'var(--tmh-cream)', borderRadius: 14, border: '1.5px solid var(--tmh-sky)', margin: '24px 0', padding: '24px 18px', boxShadow: '0 2px 8px rgba(212,175,55,0.08)' }}>
        <div style={{ fontSize: 18, color: 'var(--tmh-ocean)', fontWeight: 700, marginBottom: 10 }}>A high-energy event focused on Artificial Intelligence and Google Gemini tools.</div>
        <div style={{ fontSize: 16, marginBottom: 18 }}>Designed to make AI learning fun, interactive, and practical.</div>
        <div style={{ fontWeight: 700, color: 'var(--tmh-ocean)', marginBottom: 8 }}>Key activities &amp; features:</div>
        <ul style={{ textAlign: 'left', fontSize: 16, margin: '0 0 18px 0', paddingLeft: 24, color: 'var(--tmh-ink)' }}>
          <li>Hands-on Google Gemini demonstrations</li>
          <li>Real vs AI image quiz</li>
          <li>Live leaderboard quiz with medals</li>
          <li>Faculty &amp; student speeches</li>
          <li>Random games &amp; prizes</li>
        </ul>

        <div style={{ margin: '18px 0 24px 0' }}>
          <div style={{ fontWeight: 700, color: 'var(--tmh-ocean)', marginBottom: 12 }}>Top 3 Leaderboard</div>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
            {topThree.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <GlowCard
                  pulse
                  floating
                  className={`${entry.rank === 1 ? 'p-4 scale-[1.03]' : 'p-3'} text-center`}
                >
                  <div style={{ fontSize: 12, color: '#D4AF37', fontWeight: 700 }}>Rank #{entry.rank}</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>{entry.name}</div>
                  <div style={{ fontSize: 13, color: '#A0A0A0', marginTop: 2 }}>{entry.points} pts</div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ fontWeight: 700, color: 'var(--tmh-ocean)', marginBottom: 8 }}>Participation details:</div>
        <div style={{ fontSize: 16, marginBottom: 18 }}>Over 82+ active participants from 1st &amp; 2nd year B.Tech students.</div>
        <div style={{ fontWeight: 700, color: 'var(--tmh-ocean)', marginBottom: 8 }}>Acknowledgments &amp; contributors:</div>
        <ul style={{ textAlign: 'left', fontSize: 16, margin: '0 0 18px 0', paddingLeft: 24, color: 'var(--tmh-ink)' }}>
          <li>Co-Founders &amp; Hosts: Nikhil Tomar &amp; Madhav Katyayan</li>
          <li>Event Coordinator: Shikha Sharma</li>
          <li>Faculty Speakers: Shubhi Verma, Yashi Singh, Dr. Pragati Sharma, Parul Gupta</li>
          <li>Chief Guest: Vinod Kumar Gupta (Chief Engineer, UP Power Corporation, Muzaffarnagar)</li>
          <li>Anchoring: Shreya Parashar</li>
          <li>Volunteers: Abhishek Pundir, Mahima, Ayesha Anwar, Himanshu Dhiman, Vishesh, Saksham, Shagun, Swasti</li>
          <li>Graphic Design: Aakash Gautam</li>
        </ul>
        <div style={{ fontSize: 16, color: 'var(--tmh-ocean)', fontWeight: 500, marginTop: 12 }}>
          As a Google Student Ambassador, the host expressed gratitude to Google for platforms like Google Gemini that enhance learning and innovation.
        </div>
      </div>
    </div>

    {/* Modal for enlarged image */}
    {modalImg && (
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30,40,60,0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'zoom-out',
        }}
      >
        <img
          src={modalImg}
          alt="Enlarged event"
          style={{
            maxWidth: '90vw',
            maxHeight: '85vh',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(212,175,55,0.14)',
            background: '#111111',
            border: '4px solid #FFFFFF',
          }}
        />
      </div>
    )}
  </div>
  );
};

export default TechStars;
