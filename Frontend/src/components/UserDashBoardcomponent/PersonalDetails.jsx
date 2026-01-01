import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const PersonalDetails = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Load user details from localStorage or API
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUserDetails(prev => ({
      ...prev,
      ...userData
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage and API
    localStorage.setItem('user', JSON.stringify(userDetails));
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="success">
          Personal details updated successfully!
        </Alert>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Personal Information</h4>
        <Button 
          variant={isEditing ? "success" : "primary"}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
        </Row>

        {isEditing && (
          <div className="mt-3">
            <Button variant="secondary" onClick={() => setIsEditing(false)} className="me-2">
              Cancel
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default PersonalDetails;