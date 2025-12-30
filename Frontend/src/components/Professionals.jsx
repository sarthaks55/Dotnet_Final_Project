import { Container, Row, Col, Badge } from 'react-bootstrap'

const Professionals = () => {
  const professionals = [
    {
      type: "Therapist",
      description: "Licensed therapists for individual counseling and mental health support",
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Depression", "Anxiety", "Stress"]
    },
    {
      type: "Psychiatrist", 
      description: "Medical doctors specializing in mental health diagnosis and treatment",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Medication", "Bipolar", "ADHD"]
    },
    {
      type: "Child Specialist",
      description: "Experts in child and adolescent mental health and development",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400", 
      specialties: ["Child Psychology", "Behavioral", "Learning"]
    },
    {
      type: "Couple Therapist",
      description: "Relationship counselors helping couples improve communication",
      image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Relationships", "Marriage", "Communication"]
    }
  ]

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h1 fw-bold text-dark mb-3">Meet our professionals</h2>
          <p className="lead text-muted-custom">
            Connect with verified mental health experts across different specializations
          </p>
        </div>
        
        <Row className="g-4">
          {professionals.map((prof, index) => (
            <Col key={index} md={6} lg={3}>
              <div className="professional-card">
                <img 
                  src={prof.image} 
                  alt={prof.type}
                  className="w-100"
                  style={{height: '200px', objectFit: 'cover'}}
                />
                <div className="p-4">
                  <h3 className="h5 fw-semibold text-dark mb-2">{prof.type}</h3>
                  <p className="text-muted-custom small mb-3">{prof.description}</p>
                  <div className="d-flex flex-wrap gap-1">
                    {prof.specialties.map((specialty, idx) => (
                      <Badge key={idx} bg="light" text="dark" className="fw-normal small">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Professionals