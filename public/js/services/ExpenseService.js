angular.module('BalanceMod').factory('ExpenseService', [
    '$resource',
    function($resource) {
    var resources = {
        expenses: $resource(
            '/api/expense/'
        )
    };

    var factory = {
        get: function (id) {
                return resources.expenses.get({ expenseId: id }).$promise;
            },
        query: function () {
                return resources.expenses.query().$promise;
            }
    }
    return factory;
}]);
