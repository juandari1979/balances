// app/routes.js

// grab the nerd model we just created
var Expense = require('./models/expense');
var Allocation = require('./models/expenseAllocation');

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
            if(req.query.year && req.query.month){
                Expense.findByMonth(parseInt(req.query.year), parseInt(req.query.month), req.query.type).then(
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
            var expenseToCreate = req.body;
            if(expenseToCreate.date != undefined) {
                var tmpDate = new Date(expenseToCreate.date);
                expenseToCreate.date = new Date(Date.UTC(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate(), 0, 0, 0, 0));
                global.logger.debug("Modified date " + expenseToCreate.date);
            }
            Expense.create(expenseToCreate).then(
                    function(dataOriginal){
                        if(expenseToCreate.match && expenseToCreate.match !== ""){
                            var matchExpenseToCreate = {
                                type : expenseToCreate.match === "jd" ? "JD" : "TF",
                                amount : -expenseToCreate.amount,
                                notes : "matched from " + expenseToCreate.type,
                                date : expenseToCreate.date,
                                month : expenseToCreate.month,
                                year : expenseToCreate.year
                            };
                            global.logger.debug("Creating match " + matchExpenseToCreate.type);
                            return Expense.create(matchExpenseToCreate);
                        }
                        return new Promise(function(resolve, reject){ resolve(dataOriginal); });
                    }
                    /*,
                    function(error){
                        global.logger.debug("Error on original expense create ");
                        res.send(500);
                    }*/
            ).then(
                                function(dataMatch){
                                    res.json(dataMatch); 
                                }/*,
                                function(error){
                                    global.logger.debug("Error on expense match create " + error);
                                    res.send(500);
                                }*/)
            .catch(function(error){
                global.logger.debug("Error in api/expense creating expenses " + error);
                res.status(500).json({error: error});
            });
        });
        
        app.get('/api/allocations', function(req, res) {
            if(req.query.year && req.query.month){
                Allocation.getFlatByMonth(parseInt(req.query.year), parseInt(req.query.month)).then(
                    function(allocations){
                        res.json(allocations);
                    },
                    function(error){
                        // if there is an error retrieving, send the error.
                        // nothing after res.send(err) will execute
                        res.send(500);
                    }
                );
            }
            else{
                res.send(404);
            }
        });
        
        app.get('/api/allocations/dashboard', function(req, res) {
            if(req.query.year && req.query.month){
                Allocation.getFlatByMonth(parseInt(req.query.year), parseInt(req.query.month)).then(
                    function(allocations){
                        allocations.forEach(function(allocation){
                            allocation.usedAmount = 0.0;
                        });
                        Expense.accumulateByMonth(parseInt(req.query.year), parseInt(req.query.month)).then(
                            function(expenses){
                                expenses.forEach(function(expense){
                                    var matchAlloc = allocations.find(function(alloc){
                                        return alloc.type === expense.type;
                                    });
                                    if(matchAlloc) {
                                        matchAlloc.usedAmount = Math.round(expense.amount * 100) / 100;
                                    }
                                });
                                res.json(allocations);
                            },
                            function(error){
                                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                                res.send(500, "Error finding the expenses");
                            }
                        );
                    },
                    function(error){
                        // if there is an error retrieving, send the error.
                        // nothing after res.send(err) will execute
                        res.send(500, "Error finding the allocations");
                    }
                );
            }
            else{
                res.send(404);
            }
        });
        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
