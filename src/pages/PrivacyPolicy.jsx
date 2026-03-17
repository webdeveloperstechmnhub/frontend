import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => (
  <>
    <Navbar />
    <section className="tmh-section tmh-font-body" style={{ background: 'var(--tmh-cream)', minHeight: '100vh', padding: 0, paddingTop: 0 }}>
      <div style={{ maxWidth: 800, margin: '48px auto', padding: '32px 24px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,64,175,0.10)' }}>
        <h1 style={{ color: 'var(--tmh-ocean)', fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Privacy Policy</h1>
        <div style={{ fontSize: 17, color: 'var(--tmh-ink)', marginBottom: 18, lineHeight: 1.7 }}>
          <strong>Effective Date:</strong> 01 February 2026<br />
          <strong>Platform:</strong> TechMNHub (<a href="https://www.techmnhub.com" target="_blank" rel="noopener noreferrer">www.techmnhub.com</a>)<br /><br />
          TechMNHub is a skill development and opportunity platform designed to connect students, institutions, vendors, and professionals.<br />
          We are committed to protecting user privacy and personal data.
          <br /><br />
          <strong>1. Information We Collect</strong><br />
          TechMNHub may collect the following information:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li><b>Personal Information</b>
              <ul>
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Institution / Organization Name</li>
                <li>Profile details</li>
              </ul>
            </li>
            <li><b>Platform Usage Information</b>
              <ul>
                <li>Login activity</li>
                <li>Event participation</li>
                <li>Skill profile</li>
                <li>Certificates and achievements</li>
              </ul>
            </li>
            <li><b>Payment Information</b><br />
              Payments are securely processed through third-party gateways (Razorpay, UPI, etc.)<br />
              TechMNHub does <b>NOT</b> store:
              <ul>
                <li>Card numbers</li>
                <li>CVV</li>
                <li>Banking passwords</li>
              </ul>
            </li>
          </ul>
          <strong>2. Purpose of Data Collection</strong><br />
          We collect data to:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Provide platform services</li>
            <li>Enable event registration</li>
            <li>Issue certificates and IDs</li>
            <li>Provide internship and opportunity access</li>
            <li>Manage TechMNHub Cells</li>
            <li>Improve platform functionality</li>
            <li>Provide user support</li>
          </ul>
          <strong>3. Data Protection</strong><br />
          TechMNHub uses secure systems to protect data from:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Unauthorized access</li>
            <li>Data misuse</li>
            <li>Data theft</li>
          </ul>
          <strong>4. Data Sharing</strong><br />
          TechMNHub does <b>NOT</b> sell user data.<br />
          Data may be shared only with:
          <ul style={{ marginTop: 8, marginBottom: 8 }}>
            <li>Educational institutions (when required)</li>
            <li>Event partners (limited use)</li>
            <li>Legal authorities (if required by law)</li>
          </ul>
          <strong>5. User Consent</strong><br />
          By using TechMNHub platform, you consent to this Privacy Policy.
          <br /><br />
          <strong>6. Contact</strong><br />
          techmnhub.team@gmail.com<br />
          +91 9259586175
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default PrivacyPolicy;
