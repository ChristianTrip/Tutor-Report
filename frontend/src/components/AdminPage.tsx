// AdminPage.tsx
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import UserList from './UserList';



const AdminPage: React.FC = () => {


    return (
        <Container>
            <Row>
                <Col>
                    <UserList />
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPage;
