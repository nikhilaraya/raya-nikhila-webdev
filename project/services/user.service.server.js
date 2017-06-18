/**
 * Created by user on 15-06-2017.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.get("/api/project/user/:userId", findUserById);
app.delete("/api/project/user/:userId",deleteUser);
app.put("/api/project/user/:userId",updateUser);
app.get("/api/project/user",getParticularUser);
app.post("/api/project/logout", logout);
app.get('/api/project/findAllUsers',findAllUsers);
app.put("/api/project/:userId/rateAndReview", updateRatingAndReview);
app.put("/api/project/user/follows/:userId",followUser);
app.put("/api/project/user/:userId/unfollows/:username",unfollowUser);

function logout(req,res) {
    req.logout();
    res.sendStatus(200);
}

function findUserById(req,res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        },function (error) {
            res.sendStatus(404);
        });
}

function deleteUser(req,res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        },
        function (errorStatus) {
            res.sendStatus(404);
        });
}

function findUserByCredentials(req,res,username,password) {
    userModel
        .findUserByCredentials(username,passowrd)
        .then(function (user) {
            req.session.currentUser = user;
            res.json(user);
        },
        function (error) {
          res.sendStatus(404);  
        });
}

function getParticularUser(req,res) {
    var username = req.query.username;
    var password = req.query.password;

    // if the username and password or only username exists
    // we get the particular user else all the users are retrieved

    if(username && password) {
        findUserByCredentials(req,res,username,password);
    } else if (username) {
        findUserByUsername(username,req,res);
    } else {
        findAllUsers();
    }
}

function findUserByUsername(username,req,res) {
    userModel
        .findUserByUsername(username)
        .then(
            function (user) {
                res.json(user);
            },
            function (error) {
                res.sendStatus(404)
            }
        );
}

function findAllUsers(req,res){
    userModel
        .findAllUsers()
        .then(
            function (users) {
                res.json(users);
            },
            function (error) {
                res.sendStatus(404);
            }
        );
}

function updateRatingAndReview(req,res){
    var userId = req.params.userId;
    var rateAndReview = req.body;

    userModel.updateRatingAndReview(id,rateAndReview)
        .then(function (status) {
            res.sendStatus(200);
        },
        function (error) {
            res.sendStatus(404);
        });
}

function followUser(req,res) {
    var userId = req.params.userId;
    var follows = req.body;
    userModel
        .followUser(userId,follows)
        .then(
            function (status) {
                res.sendStatus(200);
             },
            function (error) {
                res.sendStatus(404);
            }
        );
}

function unfollowUser(req,res) {
    var userId = req.params.userId;
    var username = req.params.username;
    userModel
        .unfollowUser(userId,username)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            }
         );
}
