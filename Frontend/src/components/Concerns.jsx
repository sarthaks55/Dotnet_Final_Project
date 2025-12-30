import { Container, Row, Col, Button } from 'react-bootstrap'

const Concerns = () => {
  const concerns = [
    { 
      name: "Depression", 
      icon: "🧠",
      description: "Professional support for managing depression and improving your mental wellbeing",
      color: "#E8F4FD"
    },
    { 
      name: "Anxiety", 
      icon: "💭",
      description: "Expert care for anxiety disorders, panic attacks, and stress management",
      color: "#FFF4E6"
    },
    { 
      name: "Stress Management", 
      icon: "🌱",
      description: "Learn healthy coping mechanisms and build resilience for daily challenges",
      color: "#F0F9FF"
    },
    { 
      name: "Relationship Issues", 
      icon: "💝",
      description: "Improve communication and strengthen your personal relationships",
      color: "#FDF2F8"
    },
    { 
      name: "Work-Life Balance", 
      icon: "⚖️",
      description: "Navigate workplace challenges and achieve better work-life harmony",
      color: "#F7FEE7"
    },
    { 
      name: "Self-Esteem", 
      icon: "✨",
      description: "Build confidence and develop a positive, healthy self-image",
      color: "#FEF3F2"
    },
    { 
      name: "Life Transitions", 
      icon: "🚀",
      description: "Support during major life changes, career shifts, and personal growth",
      color: "#F3F4F6"
    },
    { 
      name: "Family Therapy", 
      icon: "👨‍👩‍👧‍👦",
      description: "Resolve family conflicts and improve family dynamics and communication",
      color: "#EDF2F7"
    }
  ]

  return (
    <section className="py-5" style={{backgroundColor: '#FAFBFC'}}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{fontSize: '2.5rem', color: '#1A202C', letterSpacing: '-0.025em'}}>Mental health concerns we care for</h2>
          <p className="text-muted mx-auto" style={{maxWidth: '600px', fontSize: '1.125rem', lineHeight: '1.6'}}>
            Our experienced therapists provide specialized, evidence-based care for a wide range of mental health conditions
          </p>
        </div>
        
        <Row className="g-4">
          {concerns.map((concern, index) => (
            <Col key={index} md={6} lg={3}>
              <div 
                className="h-100 p-4 rounded-3 border-0 position-relative overflow-hidden"
                style={{
                  backgroundColor: concern.color,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)'
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      fontSize: '1.5rem'
                    }}
                  >
                    {concern.icon}
                  </div>
                  <h3 className="h6 fw-semibold mb-0" style={{color: '#2D3748', fontSize: '1.1rem'}}>{concern.name}</h3>
                </div>
                <p className="mb-0" style={{color: '#4A5568', fontSize: '0.9rem', lineHeight: '1.5'}}>
                  {concern.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <Button 
            className="px-4 py-2 fw-medium rounded-pill border-0"
            style={{
              backgroundColor: '#4C51BF',
              fontSize: '1rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#434190'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4C51BF'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            View all concerns
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default Concerns