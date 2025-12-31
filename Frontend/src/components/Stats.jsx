import { Container, Row, Col } from 'react-bootstrap'

const Stats = () => {
  const stats = [
    { number: "500+", label: "Verified professionals" },
    { number: "10,000+", label: "Sessions completed" },
    { number: "95%", label: "Client satisfaction" },
    { number: "24/7", label: "Support available" }
  ]

  return (
    <section className="stats-section py-5">
      <Container>
        <Row className="text-center g-4">
          {stats.map((stat, index) => (
            <Col key={index} xs={6} md={3}>
              <div>
                <div className="h2 fw-bold text-primary-custom mb-1">{stat.number}</div>
                <div className="text-muted-custom">{stat.label}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Stats