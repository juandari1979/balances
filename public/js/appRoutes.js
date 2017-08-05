// public/js/appRoutes.js
    angular.module('BalanceMod').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // expense add page
        .when('/expense-dashboard', {
            templateUrl: 'views/expense-dashboard.html',
            controller: 'ExpenseDashboardController',
            controllerAs: 'expenseDashCtrl'
        })

        // expense add page
        .when('/expense', {
            templateUrl: 'views/expense.html',
            controller: 'ExpenseController',
            controllerAs: 'expenseCtrl'
        });

    $locationProvider.html5Mode(true);

}]);
