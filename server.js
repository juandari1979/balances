// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

global.logger || (global.logger = require('./app/helpers/logger'));
global.formatter || (global.formatter = require('./app/helpers/formatting'));

global.logger.debug('Starting');

// configuration ===========================================

// config files
var db = require('./config/db');
global.logger.debug('Calling db init');
db.initDb(function(){

    // set our port
    var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'


    // get all data/stuff of the body (POST) parameters
    // parse application/json
    app.use(bodyParser.json());

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override'));

    // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public'));

    // routes ==================================================
    require('./app/routes')(app); // configure our routes

    // start app ===============================================
    // startup our app at http://localhost:8080
    app.listen(server_port, server_ip_address, function(){
      global.logger.info("Listening on " + server_ip_address + ", server_port " + server_port)
    });

});

// expose app
exports = module.exports = app;
