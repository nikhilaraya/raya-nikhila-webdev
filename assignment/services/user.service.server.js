var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.get ('/api/assignment/user/:userId', findUserById);
app.get ('/api/assignment/user', findUserByCredentials);
app.post('/api/assignment/user', createUser);
app.put ('/api/assignment/user/:userId', updateUser);
app.delete ('/api/assignment/user/:userId', deleteUser);
app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/assignment/register', register);
app.get   ('/api/assignment/loggedin', loggedin);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function register(req, res) {
    var userObj = req.body;
    req.body.password=bcrypt.hashSync(req.body.password);
    //user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}


function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function login(req, res) {
    res.json(req.user);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
    // var userId = req.params.userId;
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         users.splice(u, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function updateUser(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
    // var user = req.body;
    // for(var u in users) {
    //     if(users[u]._id === req.params.userId) {
    //         users[u] = user;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
    // var userId = req.params['userId'];
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         res.send(users[u]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
        // for(var u in users) {
        //     var user = users[u];
        //     if( user.username === username &&
        //         user.password === password) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // res.json(null);
        // return;
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
        // for(var u in users) {
        //     var user = users[u];
        //     if( user.username === username) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // res.json(null);
        // return;
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
        //res.json(users);
    }
    }


function serializeUser(user, done) {
    console.log("in serialize");
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                console.log("in deserialize");
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            console.log("error in bcrypt");
            console.log(user);
            console.log(user.password);
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
    console.log(profile);
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