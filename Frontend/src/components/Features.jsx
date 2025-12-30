import { Container, Row, Col } from 'react-bootstrap'

const Features = () => {
  const features = [
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "End-to-end encrypted sessions with complete privacy protection"
    },
    {
      icon: "👥",
      title: "Licensed Professionals",
      description: "Connect with verified therapists and mental health experts"
    },
    {
      icon: "📱",
      title: "24/7 Availability",
      description: "Access support whenever you need it, from anywhere"
    },
    {
      icon: "💬",
      title: "Multiple Formats",
      description: "Video calls, chat, or phone sessions based on your preference"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Monitor your mental health journey with detailed insights"
    },
    {
      icon: "🎯",
      title: "Personalized Care",
      description: "Tailored treatment plans designed for your specific needs"
    }
  ]

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h1 fw-bold text-dark mb-3">Why choose SafeMind?</h2>
          <p className="lead text-muted-custom">
            We provide comprehensive mental health support with cutting-edge technology
          </p>
        </div>
        
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={4}>
              <div className="card-clean h-100 p-4">
                <div className="feature-icon mb-3">
                  {feature.icon}
                </div>
                <h3 className="h5 fw-semibold text-dark mb-3">{feature.title}</h3>
                <p className="text-muted-custom mb-0">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Features