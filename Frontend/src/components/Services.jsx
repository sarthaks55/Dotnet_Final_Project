import { Container, Row, Col, Button } from 'react-bootstrap'

const Services = () => {
  const services = [
    {
      title: "Individual Therapy",
      description: "One-on-one sessions with licensed therapists for personalized mental health support",
      price: "₹800",
      period: "per session",
      features: ["50-minute sessions", "Flexible scheduling", "Various specializations"]
    },
    {
      title: "Couple Therapy",
      description: "Professional guidance for relationship challenges and communication improvement",
      price: "₹1,200",
      period: "per session",
      features: ["Joint sessions", "Relationship tools", "Conflict resolution"]
    },
    {
      title: "Group Sessions",
      description: "Connect with others facing similar challenges in a supportive group environment",
      price: "₹600",
      period: "per session",
      features: ["Peer support", "Shared experiences", "Cost-effective"]
    }
  ]

  return (
    <section id="services" className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h1 fw-bold text-dark mb-3">Our services</h2>
          <p className="lead text-muted-custom">
            Choose from our range of mental health services designed to meet your unique needs
          </p>
        </div>
        
        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} md={4}>
              <div className="card-clean h-100 p-4">
                <h3 className="h4 fw-semibold text-dark mb-3">{service.title}</h3>
                <p className="text-muted-custom mb-4">{service.description}</p>
                <div className="mb-4">
                  <span className="h3 fw-bold text-primary-custom">{service.price}</span>
                  <span className="text-muted-custom"> {service.period}</span>
                </div>
                <ul className="list-unstyled mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="d-flex align-items-center mb-2 text-muted-custom">
                      <svg className="me-2 text-success" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="btn-primary-custom w-100">Book now</Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services