
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            Home<span>Ease</span>
          </h2>
          <p>
            Your trusted platform for booking verified home service
            professionals quickly and securely.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#benefits">Benefits</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@homeease.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 HomeEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;