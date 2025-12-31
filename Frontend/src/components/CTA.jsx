import { Container, Row, Col, Button } from 'react-bootstrap'

const CTA = () => {
  return (
    <section className="section-padding" style={{background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'}}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h2 className="display-5 fw-bold text-white mb-4">
              Ready to start your mental health journey?
            </h2>
            <p className="lead text-white mb-5" style={{opacity: 0.9}}>
              Join thousands who have found support and healing through SafeMind. Book your first consultation today.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Button className="btn-primary-custom" style={{background: 'white', color: '#6366f1', border: 'none'}}>
                Book free consultation
              </Button>
              <Button className="btn-outline-custom border-white text-white">
                Browse professionals
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CTA