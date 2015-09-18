'use strict';
app.controller('loginController', function ($scope, $modalInstance, authenticationService) {

    $scope.login = function () {
        //var success = authenticationService.login($scope.username, $scope.password);

        //if (success) $modalInstance.dismiss();
        authenticationService.login($scope.username, $scope.password)
            .then(function (username) {
                console.log(username + ' logged in.');
                $scope.invalid = false;
                $scope.username = username;
                $modalInstance.close(username);
            }, function (reason) {
                console.log('error authenticating: ' + reason);
                $scope.invalid = true;
            });
    };
});