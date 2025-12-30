import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="py-5" style={{background: '#1f2937', color: 'white'}}>
      <Container>
        <Row className="g-4">
          <Col md={6}>
            <h3 className="h4 fw-bold mb-4">SafeMind</h3>
            <p className="text-white-50 mb-4">
              Providing accessible, professional mental health support to help you live your best life.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-white-50">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </Col>
          
          <Col md={3}>
            <h4 className="h6 fw-semibold mb-4">Services</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Individual Therapy</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Couple Therapy</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Group Sessions</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Crisis Support</a></li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h4 className="h6 fw-semibold mb-4">Support</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a></li>
              <li className="mb-2"><a href="/about" className="text-white-50 text-decoration-none">About Us</a></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4 border-secondary" />
        <div className="text-center text-white-50">
          <p className="mb-0">&copy; 2025 SafeMind. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer