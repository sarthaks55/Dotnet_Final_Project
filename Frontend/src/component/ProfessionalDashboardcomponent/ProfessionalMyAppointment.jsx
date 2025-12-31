import React, { useState, useEffect } from 'react';
import { Button, Table, Alert, Badge } from 'react-bootstrap';

const ProfessionalMyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
        patientName: 'John Doe'
      },
      {
        id: 2,
        date: '2026-01-20',
        time: '2:00 PM',
        status: 'Pending',
        roomId: 'ROOM-002',
        createdAt: '2026-01-12',
        patientName: 'Jane Smith'
      }
    ];
    setAppointments(mockAppointments);
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
    alert(`Joining session in ${appointment.roomId} with ${appointment.patientName}`);
  };

  const handleConfirmAppointment = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'Confirmed' }
          : apt
      )
    );
    setAlertMessage('Appointment confirmed successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="success">
          {alertMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Appointments</h4>
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
            <th>Patient Name</th>
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
              <td>{appointment.patientName}</td>
              <td>
                {appointment.status === 'Pending' && (
                  <Button 
                    size="sm" 
                    variant="outline-success" 
                    className="btn-action"
                    onClick={() => handleConfirmAppointment(appointment.id)}
                  >
                    Confirm
                  </Button>
                )}
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
          <p className="text-muted">No appointments found.</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalMyAppointment;