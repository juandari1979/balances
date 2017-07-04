angular.module('BalanceMod').controller('ExpenseController', ['$scope', 'ExpenseService', function($scope, ExpenseService) {
    $scope.m_expenses = [{"_id":"fake id"}];
    $scope.tagline = 'Nothing beats a pocket protector!';
    ExpenseService.query().then(function(val){
        console.log("I just queried");
        $scope.m_expenses = val;
    });
}]);
