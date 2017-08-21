(function () {
    'use strict';
    angular.module('BalanceMod').controller('ExpenseDashboardController', ['$scope', 'ExpenseService', function($scope, ExpenseService) {
        var vm = this;
        vm.notification = '';
        vm.dashboard = { };
        vm.dashTotals = { amount : 0, usedAmount : 0 };
        var today = new Date();
        vm.months = [{id : 1, label : "Enero"}, {id : 2, label : "Febrero"}, {id : 3, label : "Marzo"}, {id : 4, label : "Abril"}, {id : 5, label : "Mayo"}, {id : 6, label : "Junio"}, {id : 7, label : "Julio"}, {id : 8, label : "Agosto"}, {id : 9, label : "Septiembre"}, {id : 10, label : "Octubre"}, {id : 11, label : "Noviembre"}, {id : 12, label : "Diciembre"}];
        vm.years = [2017, 2018, 2019, 2020, 2021];
        vm.filter = { month: today.getMonth() + 1, year: today.getFullYear() };

        vm.getExpenseDashboard = function() {
            var year = vm.filter.year;
            var month = vm.filter.month;
            ExpenseService.dashboard(year, month).then(function(val){
                console.log("Dashboard loaded succesfully");
                vm.dashTotals.amount = 0;
                vm.dashTotals.usedAmount = 0;
                val.forEach(function(expense) {
                    expense.amount = expense.amount * vm.getTypeMultiplier(expense.type);
                    expense.usedAmount = expense.usedAmount * vm.getTypeMultiplier(expense.type);
                    if( expense.type !== "TF" && expense.type !== "JD" ){
                        vm.dashTotals.amount += expense.amount;
                        vm.dashTotals.usedAmount += expense.usedAmount;
                    }
                });
                vm.dashboard = val;
            }).catch(function(err){
                vm.notification = "Could not load the dashboard information " + err;
            });
        };
        
        vm.getProgressClass = function(alloc){
            var percent = vm.getPercentageUsed(alloc);
            return {
                "progress-bar-success": (percent <= 100.0),
                "progress-bar-warning": (percent > 100.0 && percent <= 110.0),
                "progress-bar-danger": (percent > 110.0)
            };
        }
        
		vm.getPercentageForBar = function(alloc){
           var percent = vm.getPercentageUsed(alloc);
		   return percent <= 100.0 ? percent : 100.0;
        };
		
        vm.getPercentageUsed = function(alloc){
           return (alloc.usedAmount * 100) / ( alloc.amount !== 0 ? alloc.amount : 1 ); 
        };
        
        vm.getTypeMultiplier = function(type){
            return ( type === "TF" || type === "JD" ) ? 1 : -1;
        }

        vm.getExpenseDashboard();
    }]);
})();
