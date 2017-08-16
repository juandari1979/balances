//var mongodb = require('mongodb');


global.logger.debug("EXPENSE REQUIRED");
var db = require('../../config/db');
global.logger.debug('DB con exp ' + db.conn);
var col = db.conn.collection('Expenses');

var validateExpenseAsObject = function(expense){
    return !(expense == undefined || expense.type == undefined || expense.amount == undefined || expense.date == undefined || expense.month == undefined || expense.year == undefined);
};

var dbObject = {
    create: function(expense){
        global.logger.debug("Creating expense...");
        return new Promise(function(resolve, reject){
            if(!validateExpenseAsObject(expense)){
                global.logger.debug("Malformed object");
                reject('Malformed object');
            }
            col.insert(expense).then(
                function(result){
                    resolve(result);
                },
                function(err){
                    global.logger.debug("INSERT FAILED " + err.message);
                    reject(''+err.message);
                }
            );
        });
    },
    find: function(){
        return new Promise(function(resolve, reject){
            global.logger.debug("FINDING EXPENSES");
            if(db){
                global.logger.debug("COLLECTION expenses found");
                col.find({}).toArray(function(error, docArray) {
                    if(error){
                        reject("Error reading from cursor " + error);
                    }else{
                        global.logger.debug("FIND RESULT " + docArray);
                        resolve(docArray);
                    }
                });
            }
            else{
                reject("THERE WAS NO db VARIABLE");
            }
        });
    },
    findByDate: function(year, month){
        var firstDay = new Date(year, month, 1, 0, 0, 0, 0);
        var lastDay = new Date(new Date(month == 11 ? year + 1 : year, (month+1)%12, 1, 0, 0, 0, 0) - 1);
        var nextMonth = (month+1)%12;
        global.logger.debug('Next month ' + nextMonth);
        return new Promise(function(resolve, reject){
            global.logger.debug('FINDING BY DATE ' + firstDay.toDateString() + " - " + lastDay.toDateString());
            if(db){
                global.logger.debug("COLLECTION expenses found");
                col.find({$and: [{"date":{$gte:firstDay}}, {"date":{$lte:lastDay}}]}).toArray(function(error, docArray) {
                    if(error){
                        reject("Error reading from cursor " + error);
                    }else{
                        global.logger.debug("FIND BY MONTH RESULT " + docArray.length);
                        resolve(docArray);
                    }
                });
            }
            else{
                reject("THERE WAS NO db VARIABLE");
            }
        });
    },
    findByMonth: function(year, month, type){
        var year_int = parseInt(year);
        var month_int = parseInt(month);
        return new Promise(function(resolve, reject){
            global.logger.debug('FINDING BY MONTH ' + firstDay.toDateString() + " - " + lastDay.toDateString());
            if(db){
                global.logger.debug("COLLECTION expenses found");
                col.find({$and: [{"month": month_int}, {"year":year_int}]}).toArray(function(error, docArray) {
                    if(error){
                        reject("Error reading from cursor " + error);
                    }else{
                        global.logger.debug("FIND BY MONTH RESULT " + docArray.length);
                        resolve(docArray);
                    }
                });
            }
            else{
                reject("THERE WAS NO db VARIABLE");
            }
        });
    },
    accumulateByMonth: function(year, month){
        var year_int = parseInt(year);
        var month_int = parseInt(month);
        return new Promise(function(resolve, reject){
            global.logger.debug('ACCUMULATING BY YEAR/MONTH ' + year_int + "/" + month_int);
            if(col){
                col.aggregate([ { $match: {"month":month_int, "year":year_int} }, {$group: {_id: {"type":"$type"}, "amount":{$sum:"$amount"}}}, {$project: {_id:0, "type":"$_id.type", "amount":"$amount"}} ]).toArray(function(error, docArray) {
                    if(error){
                        reject("Error reading from cursor " + error);
                    }else{
                        global.logger.debug("FIND BY MONTH RESULT " + docArray.length);
                        resolve(docArray);
                    }
                });
            }
            else{
                reject("THERE WAS NO db VARIABLE");
            }
        });
    }
};

module.exports = dbObject;
