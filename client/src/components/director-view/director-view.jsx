import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { director } = this.props;

        if (!director) return null;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>Name: {director.Name}</Card.Title>
                    <Card.Text>Bio: {director.Bio}</Card.Text>
                    <Card.Text>Birth: {director.Birth}</Card.Text>
                    <Card.Text>Death: {director.Death}</Card.Text>
                    <Link to={`/`}>
                        <Button variant="link">Back to movies</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired
    }).isRequired
};