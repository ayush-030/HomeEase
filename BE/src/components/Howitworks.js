function HowItWorks() {
  const steps = [
    {
      title: "Choose a Service",
      description: "Browse and select from a wide range of trusted home services."
    },
    {
      title: "Book a Time Slot",
      description: "Select your preferred date and time for the service."
    },
    {
      title: "Professional Arrives",
      description: "A verified expert reaches your doorstep to complete the job."
    }
  ];

  return (
    <section className="how" id="how">
      <h2 className="section-title">How It Works</h2>

      <div className="timeline">
        {steps.map((step, index) => (
          <div key={index} className="timeline-step">
            
            <div className="circle">{index + 1}</div>
            
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;