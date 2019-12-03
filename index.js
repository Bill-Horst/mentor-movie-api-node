const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

const topTenMovies = [
    {
        title: 'Movie 1',
        description: 'A great movie',
        genre: 'horror',
        director: 'Director 1',
        imageUrl: 'https://m.media-amazon.com/images/I/41sfz8dKX1L._SR500,500_.jpg',
        id: 'movie_1'
    },
    {
        title: 'Movie 2',
        director: 'Director 2',
        id: 'movie_2'
    },
    {
        title: 'Movie 3',
        director: 'Director 3',
        id: 'movie_3'
    },
    {
        title: 'Movie 4',
        director: 'Director 4',
        id: 'movie_4'
    },
    {
        title: 'Movie 5',
        director: 'Director 5',
        id: 'movie_5'
    },
    {
        title: 'Movie 6',
        director: 'Director 6',
        id: 'movie_6'
    },
    {
        title: 'Movie 7',
        director: 'Director 7',
        id: 'movie_7'
    },
    {
        title: 'Movie 8',
        director: 'Director 8',
        id: 'movie_8'
    },
    {
        title: 'Movie 9',
        director: 'Director 9',
        id: 'movie_9'
    },
    {
        title: 'Movie 10',
        director: 'Director 10',
        id: 'movie_10'
    }
];

app.use(express.static('public')); // serve files located in 'public' folder

// GET:
app.get('/', function (req, res) {
    res.send('Welcome to the Movie API!')
});
app.get('/movies', function (req, res) {
    res.json(topTenMovies)
});
app.get('/movies/:title', function (req, res) {
    res.json(topTenMovies.find( (movie) => {
        return movie.title === req.params.title
    }));
});
app.get('/genre/:genre', function (req, res) {
    res.send('returning info about a certain genre')
});
app.get('/directors/:name', function (req, res) {
    res.send(`returning info about director "${req.params.name}"`);
});

// POST
app.post('/users', function (req, res) {
    let newUser = req.body;
    if (!newUser.email) {
        const message = 'user is missing email';
        res.status(400).send(message)
    } else {
        newUser.id = uuid.v4();
        res.status(201).send(newUser);
    }
});
app.post('/users/:username/favorite/:movie_id', function (req, res) {
    res.send(`adding movie with movie id '${req.params.movie_id}' to the favorite list of user with username: ${req.params.username}`);
});

// PUT
app.put('/users/:username', function (req, res) {
    let newUser = req.body;
    console.log(newUser)
    if (!newUser.email) {
        const message = 'user is missing email';
        res.status(400).send(message)
    } else {
        newUser.id = uuid.v4();
        res.status(201).send(newUser);
    }
});

// DELETE
app.delete('/users/:username', function (req, res) {
    res.send(`deregistering (deleting) user with username ${req.params.username}`);
});
app.delete('/users/:username/favorite/:movie_id', function (req, res) {
    res.send(`deleting movie with movie id '${req.params.movie_id}' from the favorite list of username ${req.params.username}`);
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