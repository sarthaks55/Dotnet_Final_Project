import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const ProfessionalPersonalDetails = () => {
  const [professionalDetails, setProfessionalDetails] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    experienceYears: '',
    qualification: '',
    bio: '',
    consultationFee: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const professionalData = JSON.parse(localStorage.getItem('professional') || '{}');
    setProfessionalDetails(prev => ({
      ...prev,
      ...professionalData
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfessionalDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('professional', JSON.stringify(professionalDetails));
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="success">
          Professional details updated successfully!
        </Alert>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Professional Information</h4>
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
                value={professionalDetails.name}
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
                value={professionalDetails.email}
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
                value={professionalDetails.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={professionalDetails.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Experience Years</Form.Label>
              <Form.Control
                type="number"
                name="experienceYears"
                value={professionalDetails.experienceYears}
                onChange={handleInputChange}
                disabled={!isEditing}
                min="0"
                max="50"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Consultation Fee ($)</Form.Label>
              <Form.Control
                type="number"
                name="consultationFee"
                value={professionalDetails.consultationFee}
                onChange={handleInputChange}
                disabled={!isEditing}
                min="0"
                step="0.01"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                value={professionalDetails.qualification}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., Ph.D. in Clinical Psychology, Licensed Therapist"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="bio"
                value={professionalDetails.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Tell us about your professional background, specializations, and approach to therapy..."
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

export default ProfessionalPersonalDetails;