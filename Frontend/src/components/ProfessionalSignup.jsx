import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfessionalSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    qualification: '',
    experienceYears: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('danger');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.qualification) {
      setAlertMessage('Please fill in all required fields');
      setAlertType('danger');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlertMessage('Passwords do not match');
      setAlertType('danger');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setAlertMessage('Password must be at least 6 characters long');
      setAlertType('danger');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    try {
      const existingProfessionals = JSON.parse(localStorage.getItem('registeredProfessionals') || '[]');
      const professionalExists = existingProfessionals.find(prof => prof.email === formData.email);

      if (professionalExists) {
        setAlertMessage('Professional with this email already exists');
        setAlertType('danger');
        setShowAlert(true);
        setIsLoading(false);
        return;
      }

      const newProfessional = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: '',
        gender: '',
        experienceYears: formData.experienceYears,
        qualification: formData.qualification,
        bio: '',
        consultationFee: ''
      };

      existingProfessionals.push(newProfessional);
      localStorage.setItem('registeredProfessionals', JSON.stringify(existingProfessionals));

      const { password, ...professionalDataWithoutPassword } = newProfessional;
      localStorage.setItem('professional', JSON.stringify(professionalDataWithoutPassword));
      localStorage.setItem('token', `prof-token-${newProfessional.id}`);

      setAlertMessage('Professional account created successfully! Redirecting...');
      setAlertType('success');
      setShowAlert(true);

      setTimeout(() => {
        navigate('/professional-dashboard');
      }, 1500);

    } catch (error) {
      setAlertMessage('Registration failed. Please try again.');
      setAlertType('danger');
      setShowAlert(true);
    }

    setIsLoading(false);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="professional-signup-page" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', 
      paddingTop: '80px' 
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <i className="fas fa-user-md fa-3x text-success mb-3"></i>
                  <h2 className="fw-bold text-success">Join as Professional</h2>
                  <p className="text-muted">Create your professional account</p>
                </div>

                {showAlert && (
                  <Alert variant={alertType} className="mb-3">
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSignup}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. John Smith"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Professional Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="doctor@example.com"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password *</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Min 6 characters"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password *</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm password"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label>Qualification *</Form.Label>
                        <Form.Control
                          type="text"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleInputChange}
                          placeholder="Ph.D. in Clinical Psychology"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Experience (Years)</Form.Label>
                        <Form.Control
                          type="number"
                          name="experienceYears"
                          value={formData.experienceYears}
                          onChange={handleInputChange}
                          placeholder="5"
                          min="0"
                          max="50"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button 
                    type="submit" 
                    className="w-100 mb-3"
                    variant="success"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Professional Account'}
                  </Button>
                </Form>

                <div className="text-center mb-3">
                  <small className="text-muted">
                    Already have a professional account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none"
                      onClick={() => navigate('/professional-login')}
                    >
                      Sign in here
                    </Button>
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

export default ProfessionalSignup;