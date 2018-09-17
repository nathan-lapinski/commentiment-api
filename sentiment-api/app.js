var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var routes = require("./routes.js");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var PORT = process.env.PORT || 3000;

var server = app.listen(PORT, function () {
    console.log("app running on port.", server.address().port);
});

