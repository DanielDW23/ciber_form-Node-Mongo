import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Home from "./Home.jsx";


import { Table, Button, Modal, Form } from 'react-bootstrap';

function AdminDashboard() {
  const { jwt } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({ name: '', surname: '', nick: '', email: '', password: '' });
  const [originalForm, setOriginalForm] = useState({ name: '', surname: '', nick: '', email: '', password: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/users', { method: 'GET', headers: { 'Authorization': `Bearer ${jwt}` } });
        if (!response.ok) throw new Error('Error fetching users');
        const data = await response.json();
      // Aquí es donde filtras los usuarios antes de establecer el estado.
      const filteredUsers = data.filter(user => user.role === 'user');
      setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleShowModal = (user) => {
    if (user) {
      setForm(user);
      setOriginalForm(user);
    }
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setForm({ name: '', surname: '', nick: '', email: '', password: '' });
    setCurrentUser(null);
    setShowModal(false);
  };

  const getDifferences = () => {
    let differences = {};
    for (const key in form) {
      if (form[key] !== originalForm[key]) differences[key] = form[key];
    }
    return differences;
  };

  const handleSubmit = async () => {
    try {
      const url = currentUser ? `http://localhost:8000/users/${currentUser._id}` : 'http://localhost:8000/users';
      const method = currentUser ? 'PATCH' : 'POST';
      const differences = getDifferences();

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        body: JSON.stringify(differences)
      });
      if (!response.ok) throw new Error('Error saving user');
      const updatedUser = await response.json();
      if (currentUser) {
        setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
      } else {
        setUsers([...users, updatedUser]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${jwt}` } });
      if (!response.ok) throw new Error('Error deleting user');
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Home/>
      <h1 style={{textAlign:'center'}}>ADMIN PANEL</h1>
      <Button onClick={() => handleShowModal(null)} style={{marginBottom:'6px'}}>Create User</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="info" onClick={() => handleShowModal(user)} style={{marginRight:'10px'}}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? 'Edit User' : 'Create User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter surname" value={form.surname} onChange={e => setForm({ ...form, surname: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formNick">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter nick" value={form.nick} onChange={e => setForm({ ...form, nick: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>{currentUser ? 'Save Changes' : 'Create'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
