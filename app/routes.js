// app/routes.js

// grab the nerd model we just created
var Expense = require('./models/expense');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/expense', function(req, res) {
            // use mongoose to get all nerds in the database
            Expense.find().then(
                function(expenses){
                    res.json(expenses);
                },
                function(error){
                    // if there is an error retrieving, send the error.
                    // nothing after res.send(err) will execute
                    res.send(err);
                }
            );
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
