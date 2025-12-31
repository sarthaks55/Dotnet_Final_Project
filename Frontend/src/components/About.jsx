import { Container, Row, Col, Button } from 'react-bootstrap'

const About = () => {
  const stats = [
    { number: "10,000+", label: "Lives Transformed" },
    { number: "500+", label: "Licensed Professionals" },
    { number: "50+", label: "Cities Covered" },
    { number: "4.8/5", label: "Average Rating" }
  ]

  const team = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Chief Clinical Officer",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "15+ years in clinical psychology and mental health research"
    },
    {
      name: "Dr. Sneha Mehta", 
      role: "Head of Psychiatry",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Specialist in mood disorders and therapeutic interventions"
    },
    {
      name: "Dr. Anita Desai",
      role: "Director of Operations", 
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Expert in healthcare management and patient care systems"
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: '80vh', paddingTop: '200px'}}>
        <Container>
          <Row>
            <Col lg={10} className="mx-auto text-center">
              <h1 className="fw-bold mb-4" style={{color: '#1A202C', fontSize: '3.5rem', lineHeight: '1.1', marginTop: '50px'}}>
                Making mental healthcare accessible for everyone
              </h1>
              <p className="mb-4" style={{color: '#4A5568', fontSize: '1.4rem', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto'}}>
                SafeMind is on a mission to democratize mental health support through technology, 
                compassion, and evidence-based care.
              </p>
              <Button 
                className="px-5 py-3 fw-medium rounded-pill border-0 mt-3"
                style={{backgroundColor: '#4C51BF', fontSize: '1.1rem'}}
              >
                Join Our Mission
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{backgroundColor: '#FAFBFC'}}>
        <Container>
          <Row className="text-center">
            {stats.map((stat, index) => (
              <Col key={index} md={3} className="mb-4">
                <div className="p-4">
                  <h3 className="display-6 fw-bold mb-2" style={{color: '#4C51BF'}}>{stat.number}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="fw-bold mb-4" style={{fontSize: '2.5rem', color: '#1A202C'}}>Our Story</h2>
              <p className="mb-4" style={{color: '#4A5568', lineHeight: '1.7'}}>
                SafeMind was founded with a simple belief: everyone deserves access to quality mental healthcare. 
                We recognized the barriers that prevent people from seeking help - stigma, cost, accessibility, 
                and long waiting times.
              </p>
              <p className="mb-4" style={{color: '#4A5568', lineHeight: '1.7'}}>
                Our platform connects you with licensed mental health professionals through secure, 
                convenient online sessions. We've built a community where healing happens, 
                one conversation at a time.
              </p>
              <p style={{color: '#4A5568', lineHeight: '1.7'}}>
                Today, we're proud to serve thousands of individuals across the country, 
                providing them with the support they need to live healthier, happier lives.
              </p>
            </Col>
            <Col lg={6}>
              <img 
                src="https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Mental health support"
                className="img-fluid rounded-3"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-5" style={{backgroundColor: '#FAFBFC'}}>
        <Container>
          <Row>
            <Col md={6} className="mb-4">
              <div className="p-4 h-100">
                <div className="mb-3">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{width: '60px', height: '60px', backgroundColor: '#E8F4FD'}}
                  >
                    <span style={{fontSize: '1.5rem'}}>🎯</span>
                  </div>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{color: '#1A202C'}}>Our Mission</h3>
                <p style={{color: '#4A5568', lineHeight: '1.6'}}>
                  To make mental healthcare accessible, affordable, and stigma-free for everyone. 
                  We believe that seeking help should be as normal as visiting a doctor for physical health.
                </p>
              </div>
            </Col>
            <Col md={6} className="mb-4">
              <div className="p-4 h-100">
                <div className="mb-3">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{width: '60px', height: '60px', backgroundColor: '#FFF4E6'}}
                  >
                    <span style={{fontSize: '1.5rem'}}>👁️</span>
                  </div>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{color: '#1A202C'}}>Our Vision</h3>
                <p style={{color: '#4A5568', lineHeight: '1.6'}}>
                  A world where mental health support is available to everyone, everywhere. 
                  We envision communities where people feel safe to share, heal, and grow together.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{fontSize: '2.5rem', color: '#1A202C'}}>Meet Our Leadership</h2>
            <p className="text-muted mx-auto" style={{maxWidth: '600px'}}>
              Our team of experienced professionals is dedicated to providing the highest quality mental healthcare
            </p>
          </div>
          <Row>
            {team.map((member, index) => (
              <Col key={index} md={4} className="mb-4">
                <div className="text-center p-4">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle mb-3"
                    style={{width: '120px', height: '120px', objectFit: 'cover'}}
                  />
                  <h4 className="h5 fw-bold mb-1" style={{color: '#1A202C'}}>{member.name}</h4>
                  <p className="text-primary mb-2" style={{color: '#4C51BF'}}>{member.role}</p>
                  <p className="text-muted small">{member.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{backgroundColor: '#4C51BF'}}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center text-white">
              <h2 className="fw-bold mb-4">Ready to start your journey?</h2>
              <p className="lead mb-4">
                Join thousands of people who have found support and healing through SafeMind
              </p>
              <Button 
                variant="light"
                className="px-4 py-2 fw-medium rounded-pill"
                style={{color: '#4C51BF'}}
              >
                Get Started Today
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default About