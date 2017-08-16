global.logger.debug("DB REQUIRED");
var mongoConnManager = {
    url : process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/',
    conn : null,
    initDb : function(callback) {
        if (mongoConnManager.conn != null) return;

        var mongodb = require('mongodb');
        if (mongodb == null)
        {
            global.logger.debug('Something went wrong, mongodb is null!!!');
            return;
        }

        mongodb.connect(mongoConnManager.url, function(err, conn) {
            if (err) {
                global.logger.debug('ERROR CONNECTING TO MONGO ' + err);
                //callback(err);
                return;
            }

            mongoConnManager.conn = conn;
            global.logger.debug('Connected to MongoDB at: %s', mongoConnManager.url);
            callback();
        });
    }
};
mongoConnManager.url = mongoConnManager.url + 'balances';
module.exports = mongoConnManager;
