/**
 * Created by user on 15-06-2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var q = require('q');

var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    findAllUsers: findAllUsers,
    updateUser: updateUser,
    updateRatingAndReview: updateRatingAndReview,
    deleteUser: deleteUser,
    followUser: followUser,
    unfollowUser: unfollowUser,

};
return api;

function findUserById(userId) {
    var deferred = q.defer();
    userModel
        .findById(userId,function (error,user) {
            if(error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(user);
            }
    });
    return deferred.promise;
}

function updateRatingAndReview(userId,rateAndReview) {
    var rating = rateAndReview.rates;
    var review = rateAndReview.reviews;
    return userModel
        .update({_id: userId},
                {$push: {rates: rating,
                         reviews: review}});
}

function findUserByUsername(username) {
    var deferred = q.defer();
    userModel
        .findOne({username: username},function (error,user) {
         if(error){
             deferred.reject(error);
         }
         else{
             deferred.resolve(user);
         }
    });
    return deferred.promise;
}

function updateUser(userId,user){
    delete user._id;
    return userModel
        .update({_id:userId},
                {$set: {firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        admin: user.admin}}
    );
}

function deleteUser(userId) {
    var deferred = q.defer();
    userModel
        .findUserByIdAndRemove(userId,function (error,user) {
        if(error){
            deferred.reject(error);
        }
        else
        {
            deferred.resolve(user);
        }
    });
    return deferred.promeis;
}

function followUser(userId,follows) {
    return userModel
        .update({_id: id},
                {$push: {follows: follows}});
}

function unfollowUser(id,username){
    return userModel
        .update({_id: id},
                {$pull:{follows:{username: username}}});
}

function findUserByCredentials(username,passowrd) {
    var deferred = q.defer();
    userModel.findOne({username:username,password:passowrd},function (error,user) {
        if(error)
        {
            deferred.reject(error);
        }
        else
        {
            deferred.resolve(user);
        }

    });
    return deferred.promise;
}

function createUser(user) {
    var deferred = q.defer();
    userModel.create(user,function (error,user) {
        if(error)
        {
            deferred.reject(error);
        }
        else
        {
            deferred.resolve(user);
        }
    });
    return deferred.promise;
}

