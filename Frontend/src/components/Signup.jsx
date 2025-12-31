import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setAlertMessage('Please fill in all fields');
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
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.find(user => user.email === formData.email);

      if (userExists) {
        setAlertMessage('User with this email already exists');
        setAlertType('danger');
        setShowAlert(true);
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: ''
      };

      // Save to registered users
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Auto login after signup
      const { password, ...userDataWithoutPassword } = newUser;
      localStorage.setItem('user', JSON.stringify(userDataWithoutPassword));
      localStorage.setItem('token', `token-${newUser.id}`);

      setAlertMessage('Account created successfully! Redirecting...');
      setAlertType('success');
      setShowAlert(true);

      setTimeout(() => {
        navigate('/dashboard');
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
    <div className="signup-page" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '80px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">Create Account</h2>
                  <p className="text-muted">Join SafeMind today</p>
                </div>

                {showAlert && (
                  <Alert variant={alertType} className="mb-3">
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSignup}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
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
                      placeholder="Create a password (min 6 characters)"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="w-100 mb-3"
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Form>

                <div className="text-center mb-3">
                  <small className="text-muted">
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none"
                      onClick={() => navigate('/login')}
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

export default Signup;