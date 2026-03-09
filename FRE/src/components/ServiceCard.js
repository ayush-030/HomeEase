function ServiceCard({ service }) {

  return (
    <div className="service-card">

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <button className="book-btn">
        Book Service
      </button>

    </div>
  );
}

export default ServiceCard;