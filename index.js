const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true });

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

app.use(express.static('public')); // serve files located in 'public' folder

// GET:
app.get('/', function (req, res) {
    res.send('Welcome to the Movie API!')
});
app.get('/movies', function (req, res) {
    Movies.find()
        .then(movies => res.json(movies))
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });;
});
app.get('/movies/:title', function (req, res) {
    Movies.findOne({ Title: req.params.title })
        .then(movie => res.json(movie))
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });;
});
app.get('/genre/:genre', function (req, res) {
    Movies.findOne({ 'Genre.Name': req.params.genre })
        .then(movie => res.json(movie.Genre))
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});
app.get('/directors/:name', function (req, res) {
    Movies.findOne({ 'Director.Name': req.params.name })
        .then(movie => res.json(movie.Director))
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// POST
app.post('/users', function (req, res) { // this is for "allowing users to register"
    Users.findOne({ Username: req.body.Username })
        .then(function (user) {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthdate: req.body.Birthdate
                    })
                    .then(function (user) { res.status(201).json(user) })
                    .catch(function (error) {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        }).catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});
app.post('/users/:username/movies/:movieID', function (req, res) {
    Users.findOneAndUpdate({ Username: req.params.username }, {
        $push: { FavoriteMovies: req.params.movieID }
    },
        { new: true },
        function (err, updatedUser) {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser)
            }
        })
});

// PUT
app.put('/users/:username', function (req, res) { // "allowing users to update their user info"
    Users.findOneAndUpdate({ Username: req.params.username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true },
        function (err, updatedUser) {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser)
            }
        })
});

// DELETE
app.delete('/users/:username', function (req, res) {
    Users.findOneAndRemove({ Username: req.params.username })
        .then(function (user) {
            if (!user) {
                res.status(400).send(req.params.username + ' was not found');
            } else {
                res.status(200).send(req.params.username + ' was deleted.');
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});
app.delete('/users/:username/movies/:movieId', function (req, res) {
    Users.findOneAndUpdate({ Username: req.params.username }, {
        $pull: { FavoriteMovies: req.params.movieId }
    },
        { new: true },
        function (err, updatedUser) {
            if (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            } else {
                res.json(updatedUser);
            }
        }
    );
});

// ERROR HANDLER
app.use(function (err, req, res, next) { // this only runs when there's an error because the signature takes 4 arguments (includes err as the first)
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// LISTEN FOR REQUESTS
app.listen(8080, () => {
    console.log('Listening on 8080.');
}); 