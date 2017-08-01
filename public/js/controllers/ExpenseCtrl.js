(function () {
    'use strict';
    angular.module('BalanceMod').controller('ExpenseController', ['$scope', 'ExpenseService', function($scope, ExpenseService) {
        var vm = this;
        vm.notification = '';
        /*vm.m_expenses = [{"id":"fake id"}];
        vm.tagline = 'Nothing beats a pocket protector!';
        ExpenseService.query().then(function(val){
            console.log("I just queried");
            vm.m_expenses = val;
        });*/
        vm.expense = { type: "tf", month: 3 };

        vm.saveExpense = function() {
            ExpenseService.create(vm.expense).then(function(val){
                console.log("Expense saved succesfully");
                vm.notification = "Expense Saved";
            }).catch(function(err){
                vm.notification = "Could not save expense " + err;
            });
        }
    }]);
})();
