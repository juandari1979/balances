(function () {
    'use strict';
    angular.module('BalanceMod').controller('ExpenseDetailController', ['$scope', '$routeParams', '$window', 'ExpenseService', function($scope, $routeParams, $window, ExpenseService) {
        var vm = this;
        vm.notification = '';
        vm.expenses = [];
        var today = new Date();
        vm.description = $routeParams.desc;
        
        vm.getExpenses = function() {
            vm.year = $routeParams.year;
            vm.month = $routeParams.month;
            vm.type = $routeParams.type;
            
            console.log("Route params " + vm.year + " - " + vm.month + " - " + vm.type);
            ExpenseService.query(vm.month, vm.year, vm.type).then(function(val){
                console.log("Expenses loaded successfully");
                val.forEach(function(expense) {
                    expense.amount = expense.amount * vm.getTypeMultiplier(expense.type);
                    expense.usedAmount = expense.usedAmount * vm.getTypeMultiplier(expense.type);
                });
                vm.expenses = val;
            }).catch(function(err){
                vm.notification = "Could not load the expenses information " + err;
            });
        };
        
        vm.getTypeMultiplier = function(type){
            return ( type === "TF" || type === "JD" ) ? 1 : -1;
        };
        
        vm.goBack = function(){
            $window.history.back();
        };

        vm.getExpenses();
    }]);
})();
