const app = require('../../express');
var websiteModel = require('../models/website/website.model.server');
var userModel = require('../models/user/user.model.server');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/assignment/website", findAllWebsitesForUser);
app.get("/api/assignment/website/:websiteId", findWebsiteById);
app.post("/api/assignment/website",createWebsite);
app.put ('/api/assignment/website/:websiteId', updateWebsite);
app.delete ('/api/assignment/website/:websiteId', deleteWebsite);

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.user._id)
        .then(function (websites) {
            res.json(websites);
        })
}

function createWebsite(req,res) {
    var website = req.body;
    var userId = req.user._id;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function updateWebsite(req,res) {
    var website = req.body;
    websiteModel
        .updateWebsite(req.params.websiteId, website)
        .then(function (status) {
            res.send(status);
        });

    //
    // for(var w in websites) {
    //     if(websites[w]._id === website._id) {
    //         websites[w] = website;
    //         res.sendStatus(200);
    //
    //     }
    // }
}

function deleteWebsite(req,res) {
    var websiteId = req.params.websiteId;
    var userId = req.user._id;
    return websiteModel
        .deleteWebsiteFromUser(userId,websiteId)
        .then(function (website) {
        res.sendStatus(200);
    },function (err) {
        res.sendStatus(404);
    });
}

function findWebsiteById(req,res) {
    websiteModel
        .findWebsiteById(req.params.websiteId)
        .then(function (website) {
            res.json(website);
        })
}