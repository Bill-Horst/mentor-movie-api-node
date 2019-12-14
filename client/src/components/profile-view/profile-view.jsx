import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
            editing: false,
            favoriteMovieTitles: []
        };
    }

    getMovies(token) {
        axios.get('https://mentor-movie-api-node.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
                let favMovTitles = [];
                this.state.favoriteMovies.forEach(favMovID => {
                    favMovTitles.push(
                        this.state.movies.find(mov => {
                            return mov._id === favMovID;
                        })
                    )
                });
                this.setState({
                    favoriteMovieTitles: favMovTitles
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    getUser(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://mentor-movie-api-node.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // console.log('response: ', response)
                this.setState({
                    username: response.data.Username,
                    password: '',
                    email: response.data.Email,
                    birthday: response.data.Birthdate,
                    favoriteMovies: response.data.FavoriteMovies
                });
                this.getMovies(token);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    toggleEdit() {
        this.setState({
            editing: !this.state.editing
        });
        if (this.state.editing) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('movies');
            this.setState({
                user: null
            })
            window.open('/', '_self');
        }
    }

    setUsername(val) {
        this.setState({
            username: val
        });
    }

    setPassword(val) {
        this.setState({
            password: val
        });
    }

    setEmail(val) {
        this.setState({
            email: val
        });
    }

    deregisterUser(username) {
        axios.delete(`https://mentor-movie-api-node.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                window.open('/', '_self');
            })
            .catch(event => {
                alert('something went wrong');
            });
    }

    removeMovie(e, movieId) {
        let user = this.state.username;
        axios.delete(`https://mentor-movie-api-node.herokuapp.com/users/${user}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                this.getUser(localStorage.getItem('token'));
            })
            .catch(event => {
                alert('something went wrong');
            });
    }

    saveProfile() {
        if (this.state.password !== '') {
            axios.put(`https://mentor-movie-api-node.herokuapp.com/users/${this.state.username}`, {
                Username: this.state.username,
                Password: this.state.password,
                Email: this.state.email,
                Birthday: this.state.birthdate
            },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                })
                .then(response => {
                    const data = response.data;
                    // console.log(data);
                    window.open('/', '_self');
                })
                .catch(e => {
                    console.log('error registering the user')
                });
        }

    }

    render() {
        const { username, email, birthday, favoriteMovies, editing, password, movies, favoriteMovieTitles } = this.state;

        if (!editing) {
            return (
                <div>
                    <Card className="profile-view" style={{ width: '24rem' }}>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item>Username: {username}</ListGroup.Item>
                                <ListGroup.Item>Email: {email}</ListGroup.Item>
                                <ListGroup.Item>Birthday: {birthday && birthday.slice(0, 10)}</ListGroup.Item>
                            </ListGroup>
                            <Link to={`/`}>
                                <Button>Back to movies</Button>
                            </Link>
                            <Button className="button-update" variant="outline-secondary" onClick={() => this.toggleEdit()}>Edit profile</Button>
                            <Button className="button-update" variant="outline-danger" onClick={() => this.deregisterUser(username)}>Deregister</Button>
                        </Card.Body>
                    </Card>
                    <h1>Favorite Movies:</h1>
                    <h5>Click on a title to remove it from your list</h5>
                    <ul>
                        {favoriteMovieTitles.map(m => <li key={m._id} onClick={event => this.removeMovie(event, m._id)}>{m.Title}</li>)}
                    </ul>
                </div>
            );
        } else {
            return (
                <Card className="profile-view" style={{ width: '24rem' }}>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Username<input type="text" value={username} onChange={e => this.setUsername(e.target.value)} /></ListGroup.Item>
                            <ListGroup.Item>You must enter a new password: <input type="text" onChange={e => this.setPassword(e.target.value)} /></ListGroup.Item>
                            <ListGroup.Item>Email<input type="text" value={email} onChange={e => this.setEmail(e.target.value)} /></ListGroup.Item>
                            <ListGroup.Item>Your birthday didn't change, did it?</ListGroup.Item>
                        </ListGroup>
                        <Button className="button-update" variant="danger" onClick={() => this.saveProfile()}>Save</Button>
                        <Button className="button-update" variant="outline-secondary" onClick={() => this.toggleEdit()}>Cancel</Button>
                    </Card.Body>
                </Card>
            );
        }

    }
}