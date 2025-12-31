import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import ProfessionalPersonalDetails from './ProfessionalPersonalDetails';
import ProfessionalChangePassword from './ProfessionalChangePassword';
import ProfessionalMyAppointment from './ProfessionalMyAppointment';
import ProfessionalMyDiary from './ProfessionalMyDiary';
import ProfessionalMyMood from './ProfessionalMyMood';
import './ProfessionalDashboard.css';

const ProfessionalDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal-details');
  const [professional, setProfessional] = useState(null);

  useEffect(() => {
    const professionalData = JSON.parse(localStorage.getItem('professional') || '{}');
    setProfessional(professionalData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('professional');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="professional-dashboard">
      <Container fluid>
        <Row>
          <Col md={3} className="sidebar">
            <div className="user-profile-section">
              <div className="profile-avatar">
                <i className="fas fa-user-md fa-3x"></i>
              </div>
              <h5 className="mt-2">{professional?.name || 'Professional'}</h5>
              <p className="text-muted">{professional?.email}</p>
            </div>
            
            <Nav variant="pills" className="flex-column dashboard-nav">
              <Nav.Item>
                <Nav.Link 
                  eventKey="personal-details"
                  active={activeTab === 'personal-details'}
                  onClick={() => setActiveTab('personal-details')}
                >
                  <i className="fas fa-user me-2"></i>
                  Personal Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  eventKey="change-password"
                  active={activeTab === 'change-password'}
                  onClick={() => setActiveTab('change-password')}
                >
                  <i className="fas fa-lock me-2"></i>
                  Change Password
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  eventKey="my-appointment"
                  active={activeTab === 'my-appointment'}
                  onClick={() => setActiveTab('my-appointment')}
                >
                  <i className="fas fa-calendar-plus me-2"></i>
                  My Appointment
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  eventKey="my-diary"
                  active={activeTab === 'my-diary'}
                  onClick={() => setActiveTab('my-diary')}
                >
                  <i className="fas fa-book me-2"></i>
                  My Diary
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  eventKey="my-mood"
                  active={activeTab === 'my-mood'}
                  onClick={() => setActiveTab('my-mood')}
                >
                  <i className="fas fa-smile me-2"></i>
                  My Mood
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mt-4">
                <Button 
                  variant="outline-danger" 
                  className="w-100"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </Button>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9} className="main-content">
            <div className="content-header">
              <h2 className="page-title">
                {activeTab === 'personal-details' && 'Personal Details'}
                {activeTab === 'change-password' && 'Change Password'}
                {activeTab === 'my-appointment' && 'My Appointment'}
                {activeTab === 'my-diary' && 'My Diary'}
                {activeTab === 'my-mood' && 'My Mood'}
              </h2>
            </div>

            <div className="content-body">
              {activeTab === 'personal-details' && <ProfessionalPersonalDetails />}
              {activeTab === 'change-password' && <ProfessionalChangePassword />}
              {activeTab === 'my-appointment' && <ProfessionalMyAppointment />}
              {activeTab === 'my-diary' && <ProfessionalMyDiary />}
              {activeTab === 'my-mood' && <ProfessionalMyMood />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfessionalDashboard;