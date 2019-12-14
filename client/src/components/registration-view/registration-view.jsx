import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('https://mentor-movie-api-node.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
          })
          .then(response => {
            // const data = response.data;
            // console.log(data);
            window.open('/', '_self');
          })
          .catch(e => {
            console.log('error registering the user')
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
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthdate</Form.Label>
                <Form.Control type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </Form.Group>
            <Button type="button" onClick={handleRegister}>Submit</Button>
        </Form>
    );
}