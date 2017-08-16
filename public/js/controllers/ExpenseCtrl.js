(function () {
    'use strict';
    angular.module('BalanceMod').controller('ExpenseController', ['$scope', 'ExpenseService', function($scope, ExpenseService) {
        var vm = this;
        vm.notification = '';
        vm.expenseTypes = [
            {id: "TF", label: "Pago Tatiana"},
            {id: "JD", label: "Pago JuanD"},
            {id: "GA", label: "Gasolina"},
            {id: "ME", label: "Mercado"},
            {id: "AR", label: "Arriendo"},
            {id: "EM", label: "Empleada"},
            {id: "CL", label: "Celular"},
            {id: "PJ", label: "Peaje"},
            {id: "LZ", label: "Luz"},
            {id: "AG", label: "Agua"},
            {id: "BC", label: "BabyCare"},
            {id: "LE", label: "Leela"},
            {id: "SG", label: "Seguro Carro"},
            {id: "LX", label: "Lexus"},
            {id: "PI", label: "Piscina"},
            {id: "LD", label: "Landscape"},
            {id: "HO", label: "Admon"},
            {id: "LF", label: "Life Insurance"},
            {id: "OT", label: "Otros"},
            {id: "IT", label: "Internet"}
        ];
        
        vm.hasNotification = function() {
            return vm.notification !== '';
        };
        
        vm.clearNotification = function() {
            vm.notification = '';
        };
        
        vm.saveExpense = function() {
            ExpenseService.create(vm.adaptExpense(vm.expense)).then(function(val){
                console.log("Expense saved succesfully");
                vm.notification = "Expense Saved";
            }).catch(function(err){
                vm.notification = "Could not save expense " + err;
            });
        };
        
        vm.adaptExpense = function(rawExpense) {
            return {
                type: rawExpense.type,
                month: rawExpense.month,
                year: rawExpense.year,
                amount: rawExpense.amount * vm.getTypeMultiplier(rawExpense.type),
                date: rawExpense.date,
                notes: rawExpense.notes,
                match: rawExpense.match,
            };
        };
        
        vm.getTypeMultiplier = function(type){
            return ( type === "TF" || type === "JD" ) ? 1 : -1;
        };
        
        vm.setCurrentDate = function() {
            vm.expense.date = new Date();
            vm.setMonthAndYearFromDate();            
        };
        
        vm.setMonthAndYearFromDate = function() {
            vm.expense.month = vm.expense.date.getMonth() + 1;
            vm.expense.year = vm.expense.date.getFullYear();
        };
        
        vm.toggleMatchPago = function() {
            switch(vm.expense.match){
                case "":
                    vm.expense.match = "tf";
                    vm.matchPago = "Tatiana";
                    break;
                case "tf":
                    vm.expense.match = "jd";
                    vm.matchPago = "JuanD";
                    break;
                case "jd":
                    vm.expense.match = "";
                    vm.matchPago = "None";
                    break;
            };
        };
        
        vm.expense = { type: "", notes: "", match: "" };
        vm.matchPago = 'None';
        vm.setCurrentDate();
    }]);
})();
