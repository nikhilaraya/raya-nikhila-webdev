/**
 * Created by user on 15-06-2017.
 */
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    tmdbId: String,
    title: String,
    ratings:[{
        userId: String,
        username: String,
        value: Number
    }],
     reviews:[{
         userId: String,
         username: String,
         text: String,
         visible: String,
         flagged: String
     }],
      imageUrl: String
}, {collection: "project_movie"});
