const app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');

var widgets =
    [
        {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]

app.get("/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget", findWidgetByPageId);
app.get("/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.post("/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget",createWidget);
app.delete("/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId",deleteWidget);
app.put ("/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.put("/api/assignment/page/:pageId/widget", sortingWidgets);

function sortingWidgets(req,res) {
    var startIndex = req.query.initial;
    var stopIndex = req.query.final;
    var pageId = req.params.pageId;
    var widgetsWithPageId=[];

    for(var v in widgets) {
        if (widgets[v].pageId === pageId) {
            widgetsWithPageId.push(widgets[v]);
        }
    }
    var startWidget = widgetsWithPageId[startIndex];
    widgetsWithPageId.splice(startIndex,1);
    firstPart= widgetsWithPageId.slice(0,stopIndex);
    lastPart= widgetsWithPageId.slice(stopIndex,widgetsWithPageId.length);
    firstPart.push(startWidget);
    firstPart= firstPart.concat(lastPart);

    var count = 0;
    var count1 = 0;
    var count2 =0;
    var complete =[];

    while(count2<widgets.length)
    {
        if(widgets[count1] === firstPart[count2])
        {
            complete[count++] = widgets[count1];
            count1++;
            count2++;
        }
        else if(firstPart.indexOf(widgets[count1]) === -1)
        {
            complete[count++] = widgets[count1++];
        }
        else if(firstPart.indexOf(widgets[count1]) >= 0)
        {
            complete[count++] = firstPart[count2++];
            count1++;
        }
    }

    widgets = complete;
    res.json(widgets);
}

function findWidgetByPageId(req,res) {
     var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        })
}

function findWidgetById(req,res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            console.log(widget._id);
            res.json(widget);
        })
}

function createWidget(req,res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidgetForPage(pageId, widget)
        .then(function (widget) {
            console.log("in server service create"+widget._id);
            res.json(widget);
        });
}

function deleteWidget(req,res) {
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    return widgetModel
        .deleteWidgetFromPage(pageId,widgetId)
        .then(function (widget) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function updateWidget(req,res) {

    var widget = req.body;
    widgetModel
        .updateWidget(req.params.widgetId,widget)
        .then(function (status) {
            res.send(status);
        });
}


    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widget = null;
        var newW={url:'/assignment/uploads/' + filename};
        widgetModel
            .updateWidget(widgetId,newW)
            .then(function (status) {
            var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            res.redirect(callbackUrl);
        })

}