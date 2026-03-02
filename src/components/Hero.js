function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>
          Book <span>Trusted Home Services</span> <br />
          In Just One Click
        </h1>

        <p>
          HomeEase connects you with verified professionals for plumbing,
          electrical, carpentry, cleaning, and more — fast, secure and reliable.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Book a Service</button>
          <button className="secondary-btn">Explore Services</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;