
import React from "react";
import { Link } from "react-router-dom";
import geminiImg from "../assets/gemini.png";
const images = [
  "/front-1.png",
  "/front-2.png"
];

const TechFront = () => {
  const [modalImg, setModalImg] = React.useState(null);
  const handleOpen = (img) => setModalImg(img);
  const handleClose = () => setModalImg(null);
  return (
    <div style={{ minHeight: '100vh', background: 'var(--tmh-cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
            <img src={geminiImg} alt="Google Gemini" style={{ maxWidth: 180, borderRadius: 12, boxShadow: '0 2px 8px rgba(212,175,55,0.10)', marginBottom: 24 }} />
            <h1 style={{ color: 'var(--tmh-ocean)', fontSize: 36, marginBottom: 24 }}>TechFront Event</h1>
            <div style={{ marginBottom: 32, width: '100%' }}>
              <div className="ts-gallery-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 28,
                justifyContent: 'center',
                alignItems: 'stretch',
                padding: '0 8px',
                minHeight: 140,
                maxWidth: 600,
                margin: '0 auto'
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
                      alt={`TechFront event photo ${i+1}`}
                      style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, display: 'block', transition: 'transform 0.2s', cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ color: 'var(--tmh-ink)', fontSize: 18, textAlign: 'left', maxWidth: 700, background: '#111111', borderRadius: 16, padding: '28px 28px', boxShadow: '0 2px 8px rgba(212,175,55,0.08)', marginBottom: 32 }}>
              <p style={{ marginBottom: 18 }}>
                <b>The TechMNHub AI & Innovation Event</b> was organized to introduce students to the latest advancements in artificial intelligence, including Google Gemini and modern AI tools. The session highlighted the vision and mission of TechMNHub, an AI-powered platform designed to connect students, institutions, and startups to promote innovation, skill development, and collaboration. Google Student Ambassadors <b>Nikhil Tomar</b> and <b>Madhav Katyayan</b> conducted interactive sessions, demonstrating practical AI applications and engaging students in hands-on learning.
              </p>
              <p style={{ marginBottom: 18 }}>
                The event also featured collaborating startups such as <b>PortfolioNest</b> and <b>Youth x Tech</b>, providing guidance on resume building, career development, and learning opportunities. Students received information about internships, team opportunities, and upcoming national tech events. The session concluded with engaging activities, feedback collection, digital certificate distribution, and group interaction, making it an informative and inspiring experience for all participants.
              </p>
            </div>
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
                  style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 18, boxShadow: '0 8px 32px rgba(212,175,55,0.14)', background: '#111111', border: '4px solid #FFFFFF' }}
                />
              </div>
            )}
          </div>
        );
      };

      export default TechFront;
