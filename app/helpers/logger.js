var loggerFunctions = {
    info: function info(message){
        log('I', message);
    },
    error: function error(message){
        log('E', message);
    },
    warning: function warning(message){
        log('W', message);
    },
    debug: function debug(message){
        log('D', message);
    }
};

function log(type, message){
    console.log("[" + new Date().toISOString() + "] [" + getTypeAsString(type) + "] " + message);
}

function getTypeAsString(type){
    switch(type){
        case 'E':
            return "ERROR";
        case 'W':
            return "WARN ";
        case 'I':
            return "INFO ";
        case 'D':
            return "DEBUG";
        default:
            return "UNDEFINED";
    }
}

module.exports = loggerFunctions;