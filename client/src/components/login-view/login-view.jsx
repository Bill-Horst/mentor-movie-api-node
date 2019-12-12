import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://mentor-movie-api-node.herokuapp.com/login', null, {
            params: { // sending username / password in url (not in the body) to match what back end expects
                Username: username,
                Password: password
            }})
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    return (
        <Form style={{ width: '80%', margin: 'auto', marginTop: '30px' }}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="button" onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}