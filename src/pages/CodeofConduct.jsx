import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CodeofConduct = () => (
	<>
		<Navbar />
		<section className="tmh-section tmh-font-body" style={{ background: 'var(--tmh-cream)', minHeight: '100vh', padding: 0, paddingTop: 0 }}>
			<div style={{ maxWidth: 800, margin: '48px auto', padding: '32px 24px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,64,175,0.10)' }}>
				<h1 style={{ color: 'var(--tmh-ocean)', fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Code of Conduct</h1>
				<div style={{ fontSize: 17, color: 'var(--tmh-ink)', marginBottom: 18, lineHeight: 1.7 }}>
					TechMNHub is committed to a professional and respectful environment.<br /><br />
					<strong>Users must:</strong>
					<ul style={{ marginTop: 8, marginBottom: 8 }}>
						<li>Respect other users</li>
						<li>Follow platform rules</li>
						<li>Maintain ethical conduct</li>
					</ul>
					<strong>Prohibited behavior:</strong>
					<ul style={{ marginTop: 8, marginBottom: 8 }}>
						<li>Harassment</li>
						<li>Fraud</li>
						<li>Cheating</li>
						<li>Misuse of platform</li>
					</ul>
					<strong>Violation may result in:</strong>
					<ul style={{ marginTop: 8, marginBottom: 8 }}>
						<li>Account suspension</li>
						<li>Removal from TechMNHub</li>
						<li>Permanent ban</li>
					</ul>
				</div>
			</div>
		</section>
		<Footer />
	</>
);

export default CodeofConduct;
