var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel',pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.findAllPages = findAllPages;
pageModel.createPageForWebsite = createPageForWebsite;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.deletePageFromWebsite = deletePageFromWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, newPage) {
    delete newPage._website;
    delete newPage.dateCreated;
    delete newPage.dateAccessed;
    console.log(newPage.title + newPage.name);
    return pageModel.update({_id: pageId}, {$set: newPage});
}

function createPageForWebsite(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id)
        })
}

function findAllPages() {
    return pageModel.find();
}

function deletePageFromWebsite(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (page) {
            return websiteModel
                .deletePage(websiteId,pageId);
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function deleteWidget(pageId,widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function addWidget(pageId , widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}