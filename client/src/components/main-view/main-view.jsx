import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = { // sets up state properties
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        this.setState({
            user: null
        });
    }

    getMovies(token) {
        axios.get('https://mentor-movie-api-node.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onReturnToMainClick() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!movies) return <div className="main-view"></div>;

        return (
            <div>
                <Button onClick={() => this.onLoggedOut()} style={{ position: 'absolute', right: '0', top: '0' }}>Sign out</Button>
                <div className="main-view" style={{ marginTop: '50px' }}>
                    {selectedMovie
                        ? <MovieView
                            movie={selectedMovie}
                            returnButtonClicked={() => this.onReturnToMainClick()} />
                        : movies.map(movie => (
                            <MovieCard
                                key={movie._id}
                                movie={movie}
                                movieClicked={thePassedMovie => this.onMovieClick(thePassedMovie)} />
                        ))
                    }
                </div>
            </div>
        );
    }
}