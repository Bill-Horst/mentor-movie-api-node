import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://mentor-movie-api-node.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedIn(user) {
        this.setState({
            user
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
            <div className="main-view">
                {selectedMovie
                    ? <MovieView
                        movie={selectedMovie}
                        returnButtonClicked={() => this.onReturnToMainClick()} />
                    : movies.map(movie => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            movieClicked={movie => this.onMovieClick(movie)} />
                    ))
                }
            </div>
        );
    }
}