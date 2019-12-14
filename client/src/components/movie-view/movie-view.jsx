import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { movie, onAddToFavoritesClick } = this.props;

        if (!movie) return null;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Card.Text>{movie.Genre.Name}</Card.Text>
                    <Card.Text>{movie.Director.Name}</Card.Text>
                    <Link to={`/`}>
                        <Button variant="link">Return</Button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                    </Link>
                    <Link to={`/genre/${movie.Genre.Name}`}>
                        <Button variant="link">Genre</Button>
                    </Link>
                    <Button onClick={(ev) => onAddToFavoritesClick(movie)}>Add to favorites</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string.isRequired
        })
    }).isRequired
};