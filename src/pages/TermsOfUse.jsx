import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfUse = () => (
  <>
    <Navbar />
    <section className="tmh-section tmh-font-body" style={{ background: 'var(--tmh-cream)', minHeight: '100vh', padding: 0, paddingTop: 0 }}>
      <div style={{ maxWidth: 800, margin: '48px auto', padding: '32px 24px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,64,175,0.10)' }}>
        <h1 style={{ color: 'var(--tmh-ocean)', fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Terms of Use</h1>
        <div style={{ fontSize: 17, color: 'var(--tmh-ink)', marginBottom: 18, lineHeight: 1.7 }}>
          By accessing TechMNHub platform, you agree to the following terms.<br /><br />
          <strong>1. Platform Purpose</strong><br />
          TechMNHub provides services including:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Skill development programs</li>
            <li>Event management</li>
            <li>Student opportunities</li>
            <li>Internship programs</li>
            <li>TechMNHub Cell operations</li>
            <li>Vendor and institutional collaboration</li>
          </ul>
          <strong>2. User Eligibility</strong><br />
          Users must:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Provide accurate information</li>
            <li>Use platform legally</li>
            <li>Follow platform rules</li>
          </ul>
          <strong>3. Account Responsibility</strong><br />
          Users are responsible for:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Maintaining account security</li>
            <li>Protecting login credentials</li>
          </ul>
          TechMNHub is not responsible for user negligence.<br /><br />
          <strong>4. Payments</strong><br />
          Platform may include paid services such as:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Event registrations</li>
            <li>Certifications</li>
            <li>Training programs</li>
          </ul>
          Payments are processed securely.<br />
          Fees are non-refundable unless specified.<br /><br />
          <strong>5. Intellectual Property</strong><br />
          All TechMNHub content including:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Logo</li>
            <li>Website</li>
            <li>Platform</li>
            <li>Certificates</li>
          </ul>
          are property of TechMNHub.<br />
          Unauthorized use is prohibited.<br /><br />
          <strong>6. Platform Authority</strong><br />
          TechMNHub reserves right to:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Suspend accounts</li>
            <li>Remove users violating rules</li>
            <li>Modify platform features</li>
          </ul>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default TermsOfUse;
