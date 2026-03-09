function Services() {
  const services = [
    {
      title: "Plumbing",
      description: "Leak repairs, pipe installation and bathroom fittings."
    },
    {
      title: "Electrical",
      description: "Fan installation, wiring, lighting and repairs."
    },
    {
      title: "Carpentry",
      description: "Furniture repair, woodwork and modular fittings."
    },
    {
      title: "Cleaning",
      description: "Deep cleaning for homes and offices."
    },
    {
      title: "Painting",
      description: "Interior & exterior professional painting services."
    },
    {
      title: "AC Repair",
      description: "AC installation, servicing and maintenance."
    }
  ];

  return (
    <section className="services" id="services">
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">
        Professional home services delivered by verified experts.
      </p>

      <div className="service-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;