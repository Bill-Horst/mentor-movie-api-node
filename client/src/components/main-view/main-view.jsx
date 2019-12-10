import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: null,
            selectedMovie: null
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
        const { movies, selectedMovie } = this.state;

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