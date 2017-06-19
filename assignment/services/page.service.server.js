const app = require('../../express');
var pageModel = require('../models/page/page.model.server');
var websiteModel = require('../models/website/website.model.server');

var pages =
    [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

app.get("/api/assignment/website/:websiteId/page", findPagesByWebsiteId);
app.get("/api/assignment/website/:websiteId/page/:pageId", findPageById);
app.post("/api/assignment/website/:websiteId/page",createPage);
app.delete ('/api/assignment/website/:websiteId/page/:pageId', deletePage);
app.put ('/api/assignment/website/:websiteId/page/:pageId', updatePage);

function findPagesByWebsiteId(req, res) {
    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        })
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPageForWebsite(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function findPageById(req,res) {
    pageModel
        .findPageById(req.params.pageId)
        .then(function (page) {
            res.json(page);
        })
}

function deletePage(req,res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    return pageModel
        .deletePageFromWebsite(websiteId,pageId)
        .then(function (page) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function updatePage(req,res) {
    var page = req.body;
    pageModel
        .updatePage(req.params.pageId, page)
        .then(function (status) {
            res.send(status);
        });
}