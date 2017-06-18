/**
 * Created by user on 15-06-2017.
 */

var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('UserModel', movieSchema);
var q = require('q');
