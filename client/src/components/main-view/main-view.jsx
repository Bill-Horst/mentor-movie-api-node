import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = { // sets up state properties
            // movies: [],
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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('movies');
        this.setState({
            user: null
        })
        window.open('/', '_self');
    }

    getMovies(token) {
        axios.get('https://mentor-movie-api-node.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
                // this.setState({
                //     movies: response.data
                // });
                // console.log(this.state)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addToFavorites(mov) {
        const token = localStorage.getItem('token');
        const username = this.state.user;
        axios.post(`https://mentor-movie-api-node.herokuapp.com/users/${username}/movies/${mov._id}`, null, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const data = response.data;
                alert('movie added')
            })
            .catch(e => {
                console.log(e)
            });
    }

    render() {
        const { movies } = this.props;
        const { user } = this.state;

        if (!movies) return <div className="main-view"></div>;

        return (
            <Router>
                <div>
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return <MoviesList movies={movies}/>;
                    }} />
                    <Route path="/register" render={() => <RegistrationView />} />
                    <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} onAddToFavoritesClick={m => this.addToFavorites(m)} />} />
                    <Route path="/directors/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                    }} />
                    <Route path="/users/:Username" render={() => <ProfileView movies={movies} />} />
                    <Route path="/genre/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                    }} />

                    <Button onClick={() => this.onLoggedOut()} style={{ position: 'absolute', right: '0', top: '0' }}>Sign out</Button>
                    <Link to={`/users/${user}`} style={{ position: 'absolute', right: '100px', top: '0' }}>User Profile</Link>
                </div>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
