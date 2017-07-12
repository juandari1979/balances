//var mongodb = require('mongodb');


console.log("EXPENSE REQUIRED");
var db = require('../../config/db');
console.log('DB con exp ' + db.conn);
var col = db.conn.collection('Expenses');

var dbObject = {
    create: function(document){
        document.date = new Date(document.date);
        return new Promise(function(resolve, reject){
            col.insert(document).then(
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
