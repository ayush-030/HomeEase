function PlatformBenefits() {
  return (
    <section className="benefits-section" id="benefits">
      <h2 className="section-title">Platform Benefits</h2>
      <p className="section-subtitle">
        Empowering both customers and service professionals with a reliable ecosystem.
      </p>

      <div className="benefits-container">

        {/* Customer Benefits */}
        <div className="benefit-box">
          <h3>For Customers</h3>
          <ul>
            <li>✔ Easy and quick service booking</li>
            <li>✔ Verified & background-checked professionals</li>
            <li>✔ Transparent pricing</li>
            <li>✔ Secure online payments</li>
            <li>✔ 24/7 customer support</li>
          </ul>
        </div>

        {/* Provider Benefits */}
        <div className="benefit-box">
          <h3>For Service Providers</h3>
          <ul>
            <li>✔ Access to more job opportunities</li>
            <li>✔ Flexible working schedule</li>
            <li>✔ Secure and timely payments</li>
            <li>✔ Rating & feedback system</li>
            <li>✔ Increased visibility in local market</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default PlatformBenefits;