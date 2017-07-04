// public/js/appRoutes.js
    angular.module('BalanceMod').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/expense', {
            templateUrl: 'views/expense.html',
            controller: 'ExpenseController'
        });

    $locationProvider.html5Mode(true);

}]);
