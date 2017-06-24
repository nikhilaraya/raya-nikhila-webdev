/**
 * Created by user on 15-06-2017.
 */
var app = require('../../express');
var movieModel = require('../models/movie/movie.model.server');

app.get('/api/project/movieCheck/:tmdbId',findMovieById);
app.put('/api/project/removeReview',removeReview);
app.get('/api/project/findAllMovies',findAllMovies);
app.post('/api/project/movie',createMovie);
app.put('/api/project/:tmdbId/updateMovie',updateMovie);
app.put('/api/project/:tmdbId/ratingsAndRevies',updateRatingAndReview);
app.put('/api/project/reportReview',reportReview);
app.put('/api/project/doNotRemoveReview',doNotRemoveReview);
app.delete("/api/project/movie/:tmdbId/remove/:userId",deleteMovie);

function findMovieById(req,res) {
    var tmdbId = req.params.tmdbId;
    movieModel
        .findMovieById(tmdbId)
        .then(function (movie) {
                var retrieveMovie = movie[0];
                res.send(retrieveMovie);
            },
             function (error) {
                res.sendStatus(404);
             });
}

function findAllMovies(req,res) {
    movieModel
        .findAllMovies()
        .then(
            function (movies) {
                res.json(movies);
            },
            function (error) {
                res.sendStatus(404);
            }
        );
}

function updateRatingAndReview(req,res) {
    var tmdbId = req.params.tmdbId;
    var ratingsAndReviews = req.body;
    movieModel
        .updateRatingAndReview(tmdbId,ratingsAndReviews)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            }
        );
}

function createMovie(req,res) {
    var movie = req.body;
    movieModel
        .createMovie(movie)
        .then(function (movie) {
            res.json(movie);
        },
        function (error) {
            res.sendStatus(404)
        }
    );
}

function reportReview(req,res) {
    var tmdbId = req.body.tmdbId;
    var reviewId = req.body.reviewId;
    movieModel
        .findMovieById(tmdbId)
        .then(function (movie) {
            var retrieveMovie = movie[0];
            var reviews = retrieveMovie.reviews;
            for(var i in reviews){
                if(reviews[i]._id == reviewId){
                    reviews[i].flagged = "true";
                }
            }
            movie[0].save();
            res.send(200);
        },
        function (error) {
            res.sendStatus(404);
        });
}

function removeReview(req,res) {
    var tmdbId = req.body.tmdbId;
    var reviewId = req.body.reviewId;
    movieModel
        .findMovieById(tmdbId)
        .then(function (movie) {
            var retrieveMovie = movie[0];
            var reviews = foundMovie.reviews;

            for(var i in reviews){
                if(reviews[i]._id == reviewId){
                    reviews[i].visible = "false";
                }
            }

            movie[0].save();
            res.sendStatus(200);
        });
}

function doNotRemoveReview(req,res) {
    var tmdbId = req.body.tmdbId;
    var reviewId = req.body.reviewId;
    movieModel
        .findMovieById(tmdbId)
        .then(function (movie) {
            var retrieveMovie = movie[0];
            var reviews = retrieveMovie.reviews;

            for(var i in reviews){
                if(reviews[i]._id == reviewId){
                    reviews[i].flagged = "false";
                }
            }

            movie[0].save();
            res.sendStatus(200);
        },
        function (error) {
            res.sendStatus(404);
        });
}

function updateMovie(req,res) {
    var tmdbId = req.params.tmdbId;
    var reviews = req.body;
    var userId = reviews.userId;
    var text = reviews.text;
    var visible = reviews.flagged;
    movieModel
        .findMovieById(tmdbId)
        .then(function (movie) {
            var retrieveMovie = movie[0];
            var reviews = retrieveMovie.reviews;

            for(var i in reviews){
                if(reviews[i].userId == userId){
                    reviews[i].visible = visible;
                    reviews[i].text = text;
                    reviews[i].flagged = flagged;
                }
            }
        movie[0].save();
        res.sendStatus(200);
        },
        function (error) {
            res.sendStatus(404);
        });
}

function deleteMovie(req,res) {
    var tmdbId = req.params.tmdbId;
    var userId = req.params.userId;
    movieModel
        .findMovieById(tmdbId)
        .then(function (movie) {
            var retrieveMovie = movie[0];
            for(var i in retrieveMovie.reviews){
                if(retrieveMovie.reviews[i].userId == userId){
                    retrieveMovie.reviews.splice(i,1);
                    movie[0].save();
                    res.sendStatus(200);
                    return;
                }
            }
        },
            function (error) {
                res.sendStatus(404);
            });
}