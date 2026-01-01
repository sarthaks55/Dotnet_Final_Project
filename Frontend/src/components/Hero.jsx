import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section" style={{paddingTop: '80px'}}>
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <h1 className="display-4 fw-bold text-dark mb-4" style={{lineHeight: '1.2'}}>
              Your mental health matters.
              <span className="text-primary-custom d-block">We're here to help.</span>
            </h1>
            <p className="lead text-muted-custom mb-4 fs-5">
              Connect with licensed therapists and mental health professionals. Get personalized support when you need it most.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
              <Button 
                className="btn-primary-custom"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button 
                className="btn-outline-custom"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="btn-outline-custom"
                onClick={() => navigate('/professional-login')}
              >
                <i className="fas fa-user-md me-2"></i>
                Professional Login
              </Button>
            </div>
            <div className="d-flex align-items-center gap-4 text-muted-custom">
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-2" style={{width: '6px', height: '6px'}}></div>
                <small>500+ verified professionals</small>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-2" style={{width: '6px', height: '6px'}}></div>
                <small>Available 24/7</small>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Mental health support" 
                className="img-fluid rounded-3"
                style={{maxHeight: '400px', width: '100%', objectFit: 'cover'}}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero