var express = require('express');
var path = require('path');
var app = express();
var exphbs = require('express-handlebars');
var minimist = require('minimist');

var BASE_PATH = path.join(__dirname, 'server');

// Templating
var viewsPath = path.join(BASE_PATH, 'views');
var exphbsConfig = {
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(viewsPath, 'layouts'),
    partialsDir: path.join(viewsPath, 'partials')
};

app.set('views', viewsPath);
app.engine('.hbs', exphbs(exphbsConfig));
app.set('view engine', '.hbs');

// Caching
//app.enable('view cache');

// Command Line Parsing
var argv = minimist(process.argv.slice(2));

// Routes
var web = require(path.join(BASE_PATH, 'routes', 'web.js'));
app.use('/', web);

// Static files
app.use(express.static(path.join(BASE_PATH, 'static')));

// Go server, go!
var port = argv.p || 3000;
var server = app.listen(port, function () {
    console.log("Express server running on port: " + port);
});