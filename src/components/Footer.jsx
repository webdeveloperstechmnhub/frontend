import linkedinLogo from '../assets/linkedin.svg';
import instagramLogo from '../assets/instagram.svg';
import youtubeLogo from '../assets/youtube.svg';

const Footer = () => {
  return (
    <footer className="tmh-section tmh-font-body tmh-footer">
      <div className="tmh-container tmh-footer-grid">
        <div>
          <div className="tmh-footer-brand">TechMNHub</div>
          <p className="tmh-footer-copy">
            A student-led skill ecosystem connecting campuses, districts, and real-world
            opportunities.
          </p>
          <div className="tmh-socials">
            <a className="tmh-social" href="https://linkedin.com/company/techmnhub" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" width="24" height="24" />
            </a>
            <a className="tmh-social" href="https://www.instagram.com/techmnhub?igsh=MWpkcmt5c3VwOTlvNw%3D%3D" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <img src={instagramLogo} alt="Instagram" width="24" height="24" />
            </a>
            <a className="tmh-social" href="https://www.youtube.com/@TechMNHub" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <img src={youtubeLogo} alt="YouTube" width="24" height="24" />
            </a>
          </div>
        </div>

        <div className="tmh-footer-column">
          <div className="tmh-footer-title">Links</div>
          <a href="/about">About</a>
          <a href="#events">Events</a>
          <a href="/join">Partner with us</a>
        </div>

        <div className="tmh-footer-column">
          <div className="tmh-footer-title">Contact</div>
          <span>techmnhub.team@gmail.com</span>
          <span>+91 92595 86175</span>
          <span>Muzaffarnagar,Uttar Pradesh,India</span>
        </div>

        <div className="tmh-footer-column">
          <div className="tmh-footer-title">Policies</div>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/code-of-conduct">Code of Conduct</a>
          <a href="/accessibility">Accessibility</a>
        </div>
      </div>
      <div className="tmh-footer-bottom">
        <span>© 2026 TechMNHub. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer