import { Container, Row, Col } from 'react-bootstrap'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sara Desai",
      role: "Marketing Manager",
      content: "SafeMind helped me through a difficult period. The therapists are professional and caring.",
      rating: 5
    },
    {
      name: "Raj Patel",
      role: "Software Developer", 
      content: "The convenience of online sessions made it easy to get help. Highly recommend SafeMind.",
      rating: 5
    },
    {
      name: "Fatima Khan",
      role: "Teacher",
      content: "Professional, confidential, and effective. SafeMind changed my life for the better.",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h1 fw-bold text-dark mb-3">What our clients say</h2>
          <p className="lead text-muted-custom">
            Real stories from people who found healing and support through SafeMind
          </p>
        </div>
        
        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col key={index} md={4}>
              <div className="card-clean h-100 p-4">
                <div className="mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-warning">★</span>
                  ))}
                </div>
                <p className="text-muted-custom mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="fw-semibold text-dark">{testimonial.name}</div>
                  <small className="text-muted-custom">{testimonial.role}</small>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Testimonials