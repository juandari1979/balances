//var mongodb = require('mongodb');


console.log("EXPENSE REQUIRED");
var db = require('../../config/db');
console.log('DB con exp ' + db.conn);
var col = db.conn.collection('Expenses');

var validateExpenseAsObject = function(expense){
    return !(expense == undefined || expense.type == undefined || expense.amount == undefined || expense.date == undefined || expense.month == undefined || expense.year == undefined);
};

var dbObject = {
    create: function(expense){
        return new Promise(function(resolve, reject){
            if(!validateExpenseAsObject(expense)){
                console.log("Malformed object");
                reject('Malformed object');
            }
            col.insert(expense).then(
                function(result){
                    resolve();
                },
                function(err){
                    console.log("INSERT FAILED " + err.message);
                    reject(''+err.message);
                }
            );
        });
    },
    find: function(){
        return new Promise(function(resolve, reject){
            console.log("FINDING EXPENSES");
            if(db){
                console.log("COLLECTION expenses found");
                col.find({}).toArray(function(error, docArray) {
                    if(error){
                        reject("Error reading from cursor " + error);
                    }else{
                        console.log("FIND RESULT " + docArray);
                        resolve(docArray);
                    }
                });
            }
            else{
                reject("THERE WAS NO db VARIABLE");
            }
        });
    },
    findByMonth: function(year, month){
        var firstDay = new Date(year, month, 1, 0, 0, 0, 0);
        var lastDay = new Date(new Date(month == 11 ? year + 1 : year, (month+1)%12, 1, 0, 0, 0, 0) - 1);
        var nextMonth = (month+1)%12;
        console.log('Next month ' + nextMonth);
        return new Promise(function(resolve, reject){
            console.log('FINDING BY MONTH ' + firstDay.toDateString() + " - " + lastDay.toDateString());
            if(db){
                console.log("COLLECTION expenses found");
                col.find({$and: [{"date":{$gte:firstDay}}, {"date":{$lte:lastDay}}]}).toArray(function(error, docArray) {
                    if(error){
                        reject("Error reading from cursor " + error);
                    }else{
                        console.log("FIND BY MONTH RESULT " + docArray);
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
