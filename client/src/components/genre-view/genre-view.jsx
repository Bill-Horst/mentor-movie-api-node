import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export class GenreView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { genre } = this.props;

        if (!genre) return null;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>Name: {genre.Name}</Card.Title>
                    <Card.Text>Description: {genre.Description}</Card.Text>
                    <Link to={`/`}>
                        <Button variant="link">Back to movies</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired
};