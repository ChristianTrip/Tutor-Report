// ListUser.tsx
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { createGetRequestWithToken } from './CreateRequest'; // Adjust the import path

interface User {
    email: string;
    firstName: string;
    lastName: string;
}

function ListUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newUserData, setNewUserData] = useState<User>({
        email: '',
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestUsers = createGetRequestWithToken();
                const url: string = "http://localhost:8080/users";

                const response = await fetch(url, requestUsers);
                if (response.ok) {
                    const data: User[] | undefined = await response.json();
                    console.log(data);
                    if (data) {
                        setUsers(data);
                    }
                } else {
                    console.error('Getting users failed');
                }
            } catch (error) {
                console.error('Error fetching users:');
            }
        };

        fetchData();
    }, []); // Dependency array is empty to ensure the effect runs once when the component mounts

    const handleAddUser = () => {
        console.log('Adding user:', newUserData);

        setUsers((prevUsers) => [...prevUsers, newUserData]);

        setNewUserData({
            email: '',
            firstName: '',
            lastName: '',
        });

        setShowAddUserModal(false);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setShowEditUserModal(true);
    };

    const handleEditUserSave = () => {
        console.log('Editing user:', selectedUser);

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.email === selectedUser?.email ? { ...user, ...selectedUser } : user
            )
        );

        setSelectedUser(null);

        setShowEditUserModal(false);
    };

    const handleDeleteUser = (userEmail: string) => {
        console.log('Deleting user with email:', userEmail);

        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== userEmail));
    };

    return (
        <>
            <h2>Brugere</h2>
            <Button variant="primary" onClick={() => setShowAddUserModal(true)}>
                Opret bruger
            </Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Fornavn</th>
                    <th>Efternavn</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                            <Button variant="info" onClick={() => handleEditUser(user)}>
                                Rediger
                            </Button>{' '}
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteUser(user.email)}
                            >
                                Slet
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Add User Modal */}
            <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Opret bruger</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={newUserData.email}
                                onChange={(e) =>
                                    setNewUserData({ ...newUserData, email: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>Fornavn</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Skriv fornavn"
                                value={newUserData.firstName}
                                onChange={(e) =>
                                    setNewUserData({ ...newUserData, firstName: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Efternavn</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Skriv efternavn"
                                value={newUserData.lastName}
                                onChange={(e) =>
                                    setNewUserData({ ...newUserData, lastName: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddUserModal(false)}>
                        Annuller
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>
                        Gem bruger
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit User Modal */}
            <Modal show={showEditUserModal} onHide={() => setShowEditUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Rediger bruger</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={selectedUser?.email || ''} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>Fornavn</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedUser?.firstName || ''}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser!,
                                        firstName: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Efternavn</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedUser?.lastName || ''}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser!,
                                        lastName: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditUserModal(false)}>
                        Annuller
                    </Button>
                    <Button variant="primary" onClick={handleEditUserSave}>
                        Gem ændringer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ListUser;
