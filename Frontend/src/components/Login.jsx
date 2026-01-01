import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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

    // Basic validation
    if (!formData.email || !formData.password) {
      setAlertMessage('Please fill in all fields');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    try {
      // Check registered users first
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        // Login with registered user
        const { password, ...userDataWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userDataWithoutPassword));
        localStorage.setItem('token', `token-${user.id}`);
        navigate('/dashboard');
      } else if (formData.email === 'user@example.com' && formData.password === 'password') {
        // Demo user fallback
        const userData = {
          id: 1,
          name: 'John Doe',
          email: formData.email,
          phone: '+1234567890',
          dateOfBirth: '1990-01-01',
          gender: 'male'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'mock-jwt-token');
        navigate('/dashboard');
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
    <div className="login-page" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '80px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {showAlert && (
                  <Alert variant="danger" className="mb-3">
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>
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
                      placeholder="Enter your password"
                      required
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="w-100 mb-3"
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form>

                <div className="text-center mb-3">
                  <small className="text-muted">
                    Don't have an account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none"
                      onClick={() => navigate('/signup')}
                    >
                      Sign up here
                    </Button>
                  </small>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    Demo credentials: user@example.com / password
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

export default Login;