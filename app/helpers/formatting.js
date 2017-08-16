var formatFunctions = {
    pad : function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    },
    period : function period(year, month) {
        return formatterFunctions.pad(parseInt(year), 4) + formatterFunctions.pad(parseInt(month), 2);
    }
};

module.exports = formatFunctions;