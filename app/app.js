var app = angular.module('DAS', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "modals/login.htm"
    });
});