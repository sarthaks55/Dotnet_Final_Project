import { Container, Row, Col } from 'react-bootstrap'

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Choose your professional",
      description: "Browse verified therapists and psychiatrists based on your needs"
    },
    {
      step: "2", 
      title: "Book appointment",
      description: "Select your preferred date and time for the consultation"
    },
    {
      step: "3",
      title: "Join video session",
      description: "Connect through our secure video platform"
    },
    {
      step: "4",
      title: "Get ongoing support",
      description: "Receive personalized care and follow-up sessions"
    }
  ]

  return (
    <section className="section-padding bg-accent">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h1 fw-bold text-dark mb-3">How SafeMind works</h2>
          <p className="lead text-muted-custom">
            Getting mental health support is simple with our streamlined process
          </p>
        </div>
        
        <Row className="g-4">
          {steps.map((step, index) => (
            <Col key={index} md={6} lg={3}>
              <div className="text-center">
                <div className="step-number mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="h5 fw-semibold text-dark mb-3">{step.title}</h3>
                <p className="text-muted-custom">{step.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default HowItWorks