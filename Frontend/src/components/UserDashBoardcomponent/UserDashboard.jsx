import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Button, Table, Form, Card, Alert } from 'react-bootstrap';
import PersonalDetails from './PersonalDetails';
import ChangePassword from './ChangePassword';
import MyAppointment from './MyAppointment';
import MyDiary from './MyDiary';
import MyMood from './MyMood';
import './UserDashboard.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal-details');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="user-dashboard">
      <Container fluid>
        <Row>
          {/* Sidebar Navigation */}
          <Col md={3} className="sidebar">
            <div className="user-profile-section">
              <div className="profile-avatar">
                <i className="fas fa-user-circle fa-3x"></i>
              </div>
              <h5 className="mt-2">{user?.name || 'User'}</h5>
              <p className="text-muted">{user?.email}</p>
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

          {/* Main Content */}
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
              {activeTab === 'personal-details' && <PersonalDetails />}
              {activeTab === 'change-password' && <ChangePassword />}
              {activeTab === 'my-appointment' && <MyAppointment />}
              {activeTab === 'my-diary' && <MyDiary />}
              {activeTab === 'my-mood' && <MyMood />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;