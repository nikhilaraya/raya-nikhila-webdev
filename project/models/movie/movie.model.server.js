/**
 * Created by user on 15-06-2017.
 */

var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('userModel', movieSchema);

var api={
    findMovieById : findMovieById,
    findAllMovies: findAllMovies,
    updateRatingAndReview: updateRatingAndReview,
    createMovie: createMovie
};
return api;

function findMovieById() {
    return movieModel.find({tmdbId: id});
}

function findAllMovies(){
    return movieModel.find();
}

function updateRatingAndReview(id,ratingsAndReviews) {
    var ratings = ratingsAndReviews.ratings;
    var reviews = ratingAndReviews.reviews;
    return movieModel
        .update({tmdbId: id},
            {$push:
                {ratings:ratings,
                    reviews: reviews}});
}

function createMovie(movie) {
    return movieModel.create(movie);
}