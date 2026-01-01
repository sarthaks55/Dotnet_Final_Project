import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Modal, Alert, Row, Col, Badge } from 'react-bootstrap';

const MyMood = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [newMood, setNewMood] = useState({
    mood: '',
    intensity: 5,
    notes: ''
  });
  const [editingMood, setEditingMood] = useState(null);

  const moodOptions = [
    { value: 'happy', label: 'Happy', emoji: '😊', color: '#28a745' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: '#6c757d' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: '#ffc107' },
    { value: 'angry', label: 'Angry', emoji: '😠', color: '#dc3545' },
    { value: 'excited', label: 'Excited', emoji: '🤩', color: '#17a2b8' },
    { value: 'calm', label: 'Calm', emoji: '😌', color: '#20c997' },
    { value: 'stressed', label: 'Stressed', emoji: '😫', color: '#fd7e14' },
    { value: 'grateful', label: 'Grateful', emoji: '🙏', color: '#6f42c1' }
  ];

  useEffect(() => {
    loadMoodEntries();
  }, []);

  const loadMoodEntries = () => {
    // Mock data - replace with API call
    const mockEntries = [
      {
        id: 1,
        mood: 'happy',
        intensity: 8,
        notes: "Had a great day at work and received positive feedback from my manager.",
        createdAt: '2026-01-15T16:30:00'
      },
      {
        id: 2,
        mood: 'anxious',
        intensity: 6,
        notes: "Feeling nervous about the upcoming presentation tomorrow.",
        createdAt: '2026-01-14T20:15:00'
      },
      {
        id: 3,
        mood: 'calm',
        intensity: 7,
        notes: "Meditation session helped me feel more centered and peaceful.",
        createdAt: '2026-01-13T08:45:00'
      }
    ];
    setMoodEntries(mockEntries);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMood(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMood = () => {
    if (!newMood.mood) {
      return;
    }

    const entry = {
      id: moodEntries.length + 1,
      mood: newMood.mood,
      intensity: parseInt(newMood.intensity),
      notes: newMood.notes,
      createdAt: new Date().toISOString()
    };

    setMoodEntries(prev => [entry, ...prev]);
    setNewMood({ mood: '', intensity: 5, notes: '' });
    setShowModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEditMood = (entry) => {
    setEditingMood(entry);
    setNewMood({
      mood: entry.mood,
      intensity: entry.intensity,
      notes: entry.notes
    });
    setShowModal(true);
  };

  const handleUpdateMood = () => {
    if (!newMood.mood) {
      return;
    }

    setMoodEntries(prev => 
      prev.map(entry => 
        entry.id === editingMood.id 
          ? { 
              ...entry, 
              mood: newMood.mood,
              intensity: parseInt(newMood.intensity),
              notes: newMood.notes
            }
          : entry
      )
    );

    setNewMood({ mood: '', intensity: 5, notes: '' });
    setEditingMood(null);
    setShowModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDeleteMood = (entryId) => {
    if (window.confirm('Are you sure you want to delete this mood entry?')) {
      setMoodEntries(prev => prev.filter(entry => entry.id !== entryId));
    }
  };

  const getMoodOption = (moodValue) => {
    return moodOptions.find(option => option.value === moodValue);
  };

  const getIntensityColor = (intensity) => {
    if (intensity <= 3) return '#dc3545';
    if (intensity <= 6) return '#ffc107';
    return '#28a745';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setNewMood({ mood: '', intensity: 5, notes: '' });
    setEditingMood(null);
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="success">
          Mood entry {editingMood ? 'updated' : 'added'} successfully!
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Mood Tracker</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i>
          Log Mood
        </Button>
      </div>

      <div className="mood-entries">
        {moodEntries.map(entry => {
          const moodOption = getMoodOption(entry.mood);
          return (
            <Card key={entry.id} className="mood-entry mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center">
                    <span className="fs-2 me-3">{moodOption?.emoji}</span>
                    <div>
                      <h6 className="mb-1" style={{ color: moodOption?.color }}>
                        {moodOption?.label}
                      </h6>
                      <Badge 
                        bg="light" 
                        text="dark"
                        style={{ 
                          backgroundColor: getIntensityColor(entry.intensity),
                          color: 'white'
                        }}
                      >
                        Intensity: {entry.intensity}/10
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Button 
                      size="sm" 
                      variant="outline-primary" 
                      className="me-2"
                      onClick={() => handleEditMood(entry)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline-danger"
                      onClick={() => handleDeleteMood(entry.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </div>
                
                <div className="entry-date mb-2">
                  <i className="fas fa-calendar me-2"></i>
                  {formatDate(entry.createdAt)}
                </div>
                
                {entry.notes && (
                  <p className="mb-0 text-muted">{entry.notes}</p>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {moodEntries.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-smile fa-3x text-muted mb-3"></i>
          <p className="text-muted">No mood entries yet. Start tracking your mood!</p>
        </div>
      )}

      {/* Add/Edit Mood Modal */}
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingMood ? 'Edit Mood Entry' : 'Log Your Mood'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>How are you feeling?</Form.Label>
              <Row>
                {moodOptions.map(option => (
                  <Col key={option.value} md={3} className="mb-2">
                    <div 
                      className={`mood-option p-3 text-center border rounded cursor-pointer ${
                        newMood.mood === option.value ? 'border-primary bg-light' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setNewMood(prev => ({ ...prev, mood: option.value }))}
                    >
                      <div className="fs-2 mb-1">{option.emoji}</div>
                      <small>{option.label}</small>
                    </div>
                  </Col>
                ))}
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Intensity Level: {newMood.intensity}/10</Form.Label>
              <Form.Range
                name="intensity"
                min="1"
                max="10"
                value={newMood.intensity}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small className="text-muted">Low</small>
                <small className="text-muted">High</small>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={newMood.notes}
                onChange={handleInputChange}
                placeholder="What's contributing to this mood? Any specific thoughts or events?"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={editingMood ? handleUpdateMood : handleAddMood}
            disabled={!newMood.mood}
          >
            {editingMood ? 'Update Mood' : 'Log Mood'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyMood;