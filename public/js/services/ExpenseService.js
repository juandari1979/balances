angular.module('BalanceMod').factory('ExpenseService', [
    '$resource',
    function($resource) {
    var resources = {
        expenses: $resource(
            '/api/expense/:id', null,
            {
                'put': {method: 'PUT'}
            }
        )
    };

    var factory = {
        get: function (id) {
                return resources.expenses.get({ expenseId: id }).$promise;
            },
        query: function () {
                return resources.expenses.query().$promise;
            },
        create: function(expense){
            return resources.expenses.put(expense).$promise;
        }
    }
    return factory;
}]);
