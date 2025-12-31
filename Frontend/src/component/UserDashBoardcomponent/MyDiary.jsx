import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Modal, Alert } from 'react-bootstrap';

const MyDiary = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [newEntry, setNewEntry] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    loadDiaryEntries();
  }, []);

  const loadDiaryEntries = () => {
    // Mock data - replace with API call
    const mockEntries = [
      {
        id: 1,
        text: "Today was a challenging day at work, but I managed to complete all my tasks. Feeling grateful for the support from my colleagues.",
        createdAt: '2026-01-15T10:30:00'
      },
      {
        id: 2,
        text: "Had a wonderful session with my therapist today. We discussed coping strategies for anxiety, and I feel more hopeful about managing my stress levels.",
        createdAt: '2026-01-12T14:20:00'
      },
      {
        id: 3,
        text: "Practiced mindfulness meditation for 15 minutes this morning. It really helped me start the day with a clear mind and positive attitude.",
        createdAt: '2026-01-10T08:15:00'
      }
    ];
    setDiaryEntries(mockEntries);
  };

  const handleAddEntry = () => {
    if (!newEntry.trim()) {
      return;
    }

    const entry = {
      id: diaryEntries.length + 1,
      text: newEntry,
      createdAt: new Date().toISOString()
    };

    setDiaryEntries(prev => [entry, ...prev]);
    setNewEntry('');
    setShowModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setNewEntry(entry.text);
    setShowModal(true);
  };

  const handleUpdateEntry = () => {
    if (!newEntry.trim()) {
      return;
    }

    setDiaryEntries(prev => 
      prev.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, text: newEntry }
          : entry
      )
    );

    setNewEntry('');
    setEditingEntry(null);
    setShowModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this diary entry?')) {
      setDiaryEntries(prev => prev.filter(entry => entry.id !== entryId));
    }
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
    setNewEntry('');
    setEditingEntry(null);
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="success">
          Diary entry {editingEntry ? 'updated' : 'added'} successfully!
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Diary</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i>
          Add New Entry
        </Button>
      </div>

      <div className="diary-entries">
        {diaryEntries.map(entry => (
          <Card key={entry.id} className="diary-entry mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="entry-date">
                  <i className="fas fa-calendar me-2"></i>
                  {formatDate(entry.createdAt)}
                </div>
                <div>
                  <Button 
                    size="sm" 
                    variant="outline-primary" 
                    className="me-2"
                    onClick={() => handleEditEntry(entry)}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline-danger"
                    onClick={() => handleDeleteEntry(entry.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </div>
              <p className="mb-0">{entry.text}</p>
            </Card.Body>
          </Card>
        ))}
      </div>

      {diaryEntries.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-book fa-3x text-muted mb-3"></i>
          <p className="text-muted">No diary entries yet. Start writing your thoughts!</p>
        </div>
      )}

      {/* Add/Edit Entry Modal */}
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingEntry ? 'Edit Diary Entry' : 'Add New Diary Entry'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your thoughts and feelings</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Write about your day, thoughts, feelings, or anything that's on your mind..."
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
            onClick={editingEntry ? handleUpdateEntry : handleAddEntry}
            disabled={!newEntry.trim()}
          >
            {editingEntry ? 'Update Entry' : 'Add Entry'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyDiary;