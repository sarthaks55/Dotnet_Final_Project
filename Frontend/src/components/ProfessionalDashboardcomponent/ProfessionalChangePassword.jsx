import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

const ProfessionalChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('danger');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setAlertMessage('Please fill in all fields');
      setAlertType('danger');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlertMessage('New passwords do not match');
      setAlertType('danger');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setAlertMessage('New password must be at least 6 characters long');
      setAlertType('danger');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    const currentProfessional = JSON.parse(localStorage.getItem('professional') || '{}');
    const registeredProfessionals = JSON.parse(localStorage.getItem('registeredProfessionals') || '[]');
    
    const professionalIndex = registeredProfessionals.findIndex(prof => prof.email === currentProfessional.email);
    
    if (professionalIndex === -1 || registeredProfessionals[professionalIndex].password !== passwordData.currentPassword) {
      setAlertMessage('Current password is incorrect');
      setAlertType('danger');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    registeredProfessionals[professionalIndex].password = passwordData.newPassword;
    localStorage.setItem('registeredProfessionals', JSON.stringify(registeredProfessionals));

    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setAlertMessage('Password changed successfully!');
    setAlertType('success');
    setShowAlert(true);
    setIsLoading(false);
    
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Change Password</h5>
      </Card.Header>
      <Card.Body>
        {showAlert && (
          <Alert variant={alertType} className="mb-3">
            {alertMessage}
          </Alert>
        )}

        <Form onSubmit={handleChangePassword}>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter your current password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password (min 6 characters)"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              required
            />
          </Form.Group>

          <Button 
            type="submit" 
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfessionalChangePassword;