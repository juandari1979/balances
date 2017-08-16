global.logger.debug("EXPENSE ALLOCATION REQUIRED");
var db = require('../../config/db');
global.logger.debug('DB con exp ' + db.conn);
var col = db.conn.collection('ExpenseAllocations');


var validateExpenseAllocationAsObject = function(allocation){
    return !(allocation == undefined || allocation.type == undefined || allocation.amount == undefined || expense.date == undefined || expense.month == undefined || expense.year == undefined);   //Definition is incorrect as of now
};

var dbObject = {
    getFlatByMonth: function(year, month){
        global.logger.debug("In flat by month");
        return new Promise(function(resolve, reject){
            if(db){
                var m_period = global.formatter.pad(parseInt(year), 4) + global.formatter.pad(parseInt(month), 2);
                global.logger.debug("Checking period " + m_period);
                col.find({}).toArray(function(error, docArray) {  
                    if(error){
                        reject("[EXPENSE ALLOCATION] Error reading from cursor " + error);
                    }else{
                        global.logger.debug("Found allocations " + docArray.length);
                        var monthAllocations = new Array(); 
                        docArray.forEach(function (allocation, index) {
                            var allocatedAmount = 0;
                            var allocatedPeriod = '000000';
                            //Sort the amounts by period ascending
                            allocation.amounts.sort(function(a,b){ return a.period > b.period ? 1 : a.period < b.period ? -1 : 0; });
                            var i = 0;
                            while(i < allocation.amounts.length && allocation.amounts[i].period <= m_period){
                                allocatedAmount = allocation.amounts[i].amount;
                                allocatedPeriod = allocation.amounts[i].period;
                                i++;
                            }
                            global.logger.debug("Adding allocation" + allocation.type + " - " + allocation.description);
                            monthAllocations.push({type: allocation.type, description: allocation.description, amount: allocatedAmount, period: allocatedPeriod});
                        });
                        resolve(monthAllocations);
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