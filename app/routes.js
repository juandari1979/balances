// app/routes.js

// grab the nerd model we just created
var Expense = require('./models/expense');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        app.get('/health', function(req, res) {
            res.writeHead(200);
            res.end();
        });

        // sample api route
        app.get('/api/expense', function(req, res) {
            // use mongoose to get all nerds in the database
            if(req.query.year && req.query.month){
                Expense.findByMonth(parseInt(req.query.year), parseInt(req.query.month)).then(
                    function(expenses){
                        res.json(expenses);
                    },
                    function(error){
                        // if there is an error retrieving, send the error.
                        // nothing after res.send(err) will execute
                        res.send(500);
                    }
                );
            }
            else{
                Expense.find().then(
                    function(expenses){
                        res.json(expenses);
                    },
                    function(error){
                        // if there is an error retrieving, send the error.
                        // nothing after res.send(err) will execute
                        res.send(500);
                    }
                );
            }
        });

        app.put('/api/expense', function(req, res) {
            console.log('PUT CALLED WITH ' + req);
            Expense.create(req.body).then(
                    function(data){
                        res.end();
                    },
                    function(error){
                        res.send(500);
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
