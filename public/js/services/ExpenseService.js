angular.module('BalanceMod').factory('ExpenseService', [
    '$resource',
    function($resource) {
    var resources = {
        expenses: $resource(
            '/api/expense/:id', null,
            {
                'put': {method: 'PUT'},
                'dashboard' : {method: 'GET', params: {year: '@year', month: '@month'}, url: '/api/allocations/dashboard/', isArray: true }
            }
        )
    };

    var factory = {
        get: function (id) {
                return resources.expenses.get({ expenseId: id }).$promise;
            },
        query: function (month, year, type) {
                var queryObject = {};
                if(month && month != "") queryObject.month = month;
                if(year && year != "") queryObject.year = year;
                if(type && type != "") queryObject.type = type;
                return resources.expenses.query(queryObject).$promise;
            },
        create: function(expense){
            return resources.expenses.put(expense).$promise;
        },
        dashboard: function(year, month){
            return resources.expenses.dashboard({year: year, month:month}).$promise;
        }
    }
    return factory;
}]);
