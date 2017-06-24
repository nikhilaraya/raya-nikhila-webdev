/**
 * Created by user on 15-06-2017.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var googleConfig = {
    clientID     : '909983813107-a8uki3pkeajhcff653k1jes0v0an53oe.apps.googleusercontent.com',
    clientSecret : '8nht77_nJzPDqZUgjulcCJub',
    callbackURL  : 'http://localhost:3000/auth/google/callback'
};

/*var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};*/
app.post("/api/project/register", register);
app.get("/api/project/user/:userId", findUserById);
app.delete("/api/project/user/:userId",deleteUser);
app.put("/api/project/user/:userId",updateUser);
app.get("/api/project/user",getParticularUser);
app.post("/api/project/logout", logout);
app.get('/api/project/findAllUsers',findAllUsers);
app.post("/api/project/user",createUser);
app.put("/api/project/:userId/rateAndReview", updateRatingAndReview);
app.put("/api/project/user/follows/:userId",followUser);
app.put("/api/project/user/:userId/unfollows/:username",unfollowUser);
app.post("/api/project/login", passport.authenticate('local'), login);
app.get("/api/project/loggedIn",loggedIn);
app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#/profile',
        failureRedirect: '/project/#/login'
    }));

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

    userModel
        .updateRatingAndReview(id,rateAndReview)
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

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function register(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user){
                res.sendStatus(400).send("Username has already been taken");
            }
            else{
                req.body.password = bcrypt.hashSync(req.body.password);
                return userModel
                    .createUser(req.body);
            }
        },
        function (error) {
            res.sendStatus(400);
        })
        .then(function (user) {
            if(user){
                req.login(user,function (error) {
                    if(error){
                        res.sendStatus(400).send(err);
                    }
                    else {
                        res.json(user);
                    }
                })
            }
        },
        function (error) {
            re.sendStatus(400)
        });
}

function loggedIn(req,res) {
    if(req.isAuthenticated()){
        res.json(req.user);
    }else{
        res.send('0');
    }
}

function createUser(req,res) {
    var username = req.body.username;
    userModel
        .findUserByUsername(username)
        .then(
            function (user) {
                if(user){
                res.send("Username already exists");
                }
                else{
                    req.body.password = bcrypt.hashSync(req.body.password);
                    return userModel
                        .createUser(req.body)
                }
            },
            function (error) {
                res.sendStatus(400)
            }
        )
        .then(
            function (user) {
                if(user){
                    res.sendStatus(200);
                }
            },
            function (error) {
                res.sendStatus(400)
            }
        );
}