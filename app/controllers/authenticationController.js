﻿'use strict';
app.controller('authenticationController', function ($scope, authenticationService, $modal) {

    //$scope.$watch('authenticationService.userContext', function (newval, oldval) {
    //    $scope.username = newval;
    //});

    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modals/login.htm',
            controller: 'loginController'
        });

        modalInstance.result.then(function (username) {
            $scope.username = username;
        }, function () {
            console.log('Login modal dismissed at: ' + new Date());
        });
    };
});