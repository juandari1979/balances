//var mongodb = require('mongodb');


console.log("EXPENSE REQUIRED");
var db = require('../../config/db');

module.exports = {
    create: function(type, value){
        console.log("CREATING EXPENSE %s, %s", type, value );
    },
    find: function(){
        return new Promise(function(resolve, reject){
            console.log("FINDING EXPENSES");
            if(db){
                var col = db.conn.collection('counts');
                console.log("COLLECTION counts found");
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
    }
};
