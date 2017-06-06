var app = require('./express');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(app.express.static(__dirname + '/public'));

require('./assignment/app');

app.listen(process.env.PORT || 3000);