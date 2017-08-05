(function () {
    'use strict';
    angular.module('BalanceMod').controller('ExpenseDashboardController', ['$scope', 'ExpenseService', function($scope, ExpenseService) {
        var vm = this;
        vm.notification = '';
        vm.dashboard = { };

        vm.getExpenseDashboard = function(year, month) {
            ExpenseService.dashboard(year, month).then(function(val){
                console.log("Dashboard loaded succesfully");
            }).catch(function(err){
                vm.notification = "Could not load the dashboard information " + err;
            });
        };

        vm.getExpenseDashboard(2017, 8);
    }]);
})();
