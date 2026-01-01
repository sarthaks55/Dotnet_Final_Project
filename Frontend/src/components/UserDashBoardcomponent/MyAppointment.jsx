import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Row, Col, Alert, Badge } from 'react-bootstrap';

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    professionalId: '',
    notes: ''
  });

  const professionals = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Clinical Psychologist' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Psychiatrist' },
    { id: 3, name: 'Dr. Emily Davis', specialization: 'Therapist' },
    { id: 4, name: 'Dr. Robert Wilson', specialization: 'Counselor' }
  ];

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const mockAppointments = [
      {
        id: 1,
        date: '2026-01-15',
        time: '10:00 AM',
        status: 'Confirmed',
        roomId: 'ROOM-001',
        createdAt: '2026-01-10',
        professionalName: 'Dr. Sarah Johnson'
      },
      {
        id: 2,
        date: '2026-01-20',
        time: '2:00 PM',
        status: 'Pending',
        roomId: 'ROOM-002',
        createdAt: '2026-01-12',
        professionalName: 'Dr. Michael Chen'
      }
    ];
    setAppointments(mockAppointments);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookAppointment = () => {
    if (!newAppointment.date || !newAppointment.time || !newAppointment.professionalId) {
      setAlertMessage('Please fill in all required fields');
      setShowAlert(true);
      return;
    }

    const professional = professionals.find(p => p.id === parseInt(newAppointment.professionalId));
    const appointment = {
      id: appointments.length + 1,
      date: newAppointment.date,
      time: newAppointment.time,
      status: 'Pending',
      roomId: `ROOM-${String(appointments.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
      professionalName: professional.name
    };

    setAppointments(prev => [...prev, appointment]);
    setNewAppointment({ date: '', time: '', professionalId: '', notes: '' });
    setShowModal(false);
    setAlertMessage('Appointment booked successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'Confirmed': 'info',
      'Completed': 'success',
      'Cancelled': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleJoinSession = (appointment) => {
    alert(`Joining session in ${appointment.roomId} with ${appointment.professionalName}`);
  };

  const handleEditAppointment = (appointment) => {
    alert(`Edit appointment ${appointment.id}`);
  };

  return (
    <div>
      {showAlert && (
        <Alert variant={alertMessage.includes('successfully') ? 'success' : 'danger'}>
          {alertMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Appointments</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i>
          Book New Appointment
        </Button>
      </div>

      <Table responsive className="appointment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Room ID</th>
            <th>Created At</th>
            <th>Professional Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{getStatusBadge(appointment.status)}</td>
              <td>{appointment.roomId}</td>
              <td>{appointment.createdAt}</td>
              <td>{appointment.professionalName}</td>
              <td>
                <Button 
                  size="sm" 
                  variant="outline-primary" 
                  className="btn-action"
                  onClick={() => handleEditAppointment(appointment)}
                >
                  Edit
                </Button>
                {appointment.status === 'Confirmed' && (
                  <Button 
                    size="sm" 
                    variant="success"
                    onClick={() => handleJoinSession(appointment)}
                  >
                    Join
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {appointments.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No appointments found. Book your first appointment!</p>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book New Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time *</Form.Label>
                  <Form.Select
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Professional *</Form.Label>
              <Form.Select
                name="professionalId"
                value={newAppointment.professionalId}
                onChange={handleInputChange}
              >
                <option value="">Select Professional</option>
                {professionals.map(prof => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name} - {prof.specialization}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={newAppointment.notes}
                onChange={handleInputChange}
                placeholder="Any specific concerns or notes for the professional..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyAppointment;