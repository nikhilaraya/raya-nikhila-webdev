var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel',widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.findAllWidgets = findAllWidgets;
widgetModel.createWidgetForPage = createWidgetForPage;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.deleteWidgetFromPage = deleteWidgetFromPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;

module.exports = widgetModel;

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, newWidget) {
    delete newWidget._page;
    delete newWidget.dateCreated;
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}

function createWidgetForPage(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            pageModel
                .addWidget(pageId, widget._id)
            return widget;
        });
}

function findAllWidgets() {
    return widgetModel.find();
}

function deleteWidgetFromPage(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (widget) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}
