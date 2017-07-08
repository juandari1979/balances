console.log("DB REQUIRED");
var mongoConnManager = {
    url : process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/Balances',
    conn : null,
    initDb : function(callback) {
        if (mongoConnManager.conn != null) return;

        var mongodb = require('mongodb');
        if (mongodb == null)
        {
            console.log('Something went wrong, mongodb is null!!!');
            return;
        }

        mongodb.connect(mongoConnManager.url, function(err, conn) {
            if (err) {
                console.log('ERROR CONNECTING TO MONGO ' + err);
                //callback(err);
                return;
            }

            mongoConnManager.conn = conn;
            console.log('Connected to MongoDB at: %s', mongoConnManager.url);
        });
    }
}
module.exports = mongoConnManager;
