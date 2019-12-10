import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movie, movieClicked } = this.props;

        return (
            <div onClick={() => movieClicked(movie)} className="movie-card">{movie.Title}</div>
        );
    }
}