import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfessionalLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setAlertMessage('Please fill in all fields');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    try {
      const registeredProfessionals = JSON.parse(localStorage.getItem('registeredProfessionals') || '[]');
      const professional = registeredProfessionals.find(p => p.email === formData.email && p.password === formData.password);
      
      if (professional) {
        const { password, ...professionalDataWithoutPassword } = professional;
        localStorage.setItem('professional', JSON.stringify(professionalDataWithoutPassword));
        localStorage.setItem('token', `prof-token-${professional.id}`);
        navigate('/professional-dashboard');
      } else if (formData.email === 'doctor@example.com' && formData.password === 'password') {
        const professionalData = {
          id: 1,
          name: 'Dr. Sarah Johnson',
          email: formData.email,
          phone: '+1234567890',
          gender: 'female',
          experienceYears: '10',
          qualification: 'Ph.D. in Clinical Psychology',
          bio: 'Experienced clinical psychologist specializing in anxiety and depression treatment.',
          consultationFee: '150'
        };
        localStorage.setItem('professional', JSON.stringify(professionalData));
        localStorage.setItem('token', 'demo-prof-token');
        navigate('/professional-dashboard');
      } else {
        setAlertMessage('Invalid email or password');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Login failed. Please try again.');
      setShowAlert(true);
    }

    setIsLoading(false);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="professional-login-page" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', 
      paddingTop: '80px' 
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <i className="fas fa-user-md fa-3x text-success mb-3"></i>
                  <h2 className="fw-bold text-success">Professional Portal</h2>
                  <p className="text-muted">Sign in to your professional account</p>
                </div>

                {showAlert && (
                  <Alert variant="danger" className="mb-3">
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Professional Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your professional email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="w-100 mb-3"
                    variant="success"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form>

                <div className="text-center mb-3">
                  <small className="text-muted">
                    Don't have a professional account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none"
                      onClick={() => navigate('/professional-signup')}
                    >
                      Register here
                    </Button>
                  </small>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    Demo: doctor@example.com / password
                  </small>
                </div>

                <hr />
                
                <div className="text-center">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/')}
                    className="w-100"
                  >
                    Back to Home
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfessionalLogin;