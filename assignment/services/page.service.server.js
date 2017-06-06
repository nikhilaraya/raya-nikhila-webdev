const app = require('../../express');

var pages =
    [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

app.get("/api/assignment/user/:userId/website/:websiteId/page", findPagesByWebsiteId);
app.get("/api/assignment/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.post("/api/assignment/user/:userId/website/:websiteId/page",createPage);
app.delete ('/api/assignment/user/:userId/website/:websiteId/page/:pageId', deletePage);
app.put ('/api/assignment/user/:userId/website/:websiteId/page/:pageId', updatePage);

function findPagesByWebsiteId(req, res) {
    var results = [];

    for(var p in pages) {
        if(pages[p].websiteId === req.params.websiteId) {
            results.push(pages[p]);
        }
    }
    res.json(results);
}

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function findPageById(req,res) {
    var pageId = req.params.pageId;
    for (var p in pages) {
        if (pages[p]._id === pageId) {
            res.send(pages[p]);
            return;
        }
    }
}

function deletePage(req,res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req,res) {

    var page = req.body;
    for(var p in pages) {
        if(pages[p]._id === page._id) {
            pages[p] = page;
            res.sendStatus(200);

        }
    }
}