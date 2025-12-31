import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const NavigationBar = () => {
  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3 text-primary-custom">
          SafeMind
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="fw-medium">Home</Nav.Link>
            <Nav.Link href="#features" className="fw-medium">Features</Nav.Link>
            <Nav.Link href="#services" className="fw-medium">Services</Nav.Link>
            <Nav.Link href="#testimonials" className="fw-medium">Testimonials</Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            <Button className="btn-outline-custom">Login</Button>
            <Button className="btn-primary-custom">Get started</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar