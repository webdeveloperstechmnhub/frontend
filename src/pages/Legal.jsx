import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Legal = () => (
  <>
    <Navbar />
    <section className="tmh-section tmh-font-body" style={{ background: 'var(--tmh-cream)', minHeight: '100vh', padding: 0, paddingTop: 0 }}>
      <div style={{ maxWidth: 800, margin: '48px auto', padding: '32px 24px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,64,175,0.10)' }}>
        <h1 style={{ color: 'var(--tmh-ocean)', fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Legal Information</h1>
        {/* Accessibility Section */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: 'var(--tmh-ocean)', fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Accessibility</h2>
          <div style={{ fontSize: 17, color: 'var(--tmh-ink)', lineHeight: 1.7 }}>
            TechMNHub is committed to equal access.<br />
            We aim to ensure:
            <ul style={{ marginTop: 8, marginBottom: 8 }}>
              <li>Platform usability for all users</li>
              <li>Equal participation opportunities</li>
              <li>Non-discrimination</li>
            </ul>
            Support available via official contact.
          </div>
        </div>
        {/* Refund Policy Section */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: 'var(--tmh-ocean)', fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Refund Policy</h2>
          <div style={{ fontSize: 17, color: 'var(--tmh-ink)', lineHeight: 1.7 }}>
            Payments made for:
            <ul style={{ marginTop: 8, marginBottom: 8 }}>
              <li>Events</li>
              <li>Programs</li>
              <li>Services</li>
            </ul>
            are generally non-refundable.<br />
            Refund may be provided if:
            <ul style={{ marginTop: 8, marginBottom: 8 }}>
              <li>Event cancelled by TechMNHub</li>
              <li>Service unavailable</li>
            </ul>
          </div>
        </div>
        {/* Platform Disclaimer Section */}
        <div>
          <h2 style={{ color: 'var(--tmh-ocean)', fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Platform Disclaimer – Important</h2>
          <div style={{ fontSize: 17, color: 'var(--tmh-ink)', lineHeight: 1.7 }}>
            TechMNHub is an independent skill development and opportunity platform.<br />
            TechMNHub provides:
            <ul style={{ marginTop: 8, marginBottom: 8 }}>
              <li>Platform access</li>
              <li>Opportunities</li>
              <li>Skill ecosystem</li>
            </ul>
            TechMNHub does <b>NOT</b> guarantee:
            <ul style={{ marginTop: 8, marginBottom: 8 }}>
              <li>Job placement</li>
              <li>Internship selection</li>
            </ul>
            Selection depends on user performance.
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default Legal;
