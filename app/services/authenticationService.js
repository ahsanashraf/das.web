'use strict';
app.factory('authenticationService', function ($http, $q) {
    var authenticationFactory = {};
    var userContext = null;
    var token;

    var _getUserContext = function () {
        return userContext;
    }

    var _setUserContext = function (user) {
        userContext = user;
    }

    var _login = function (username, password) {
        console.log(username + ' ' + password);
        //var requestUri = "http://10.0.11.231/das.api/api/Authentication/Login";
        var requestUri = "http://localhost/NARA.DAS.API/api/Authentication/Login";
        var credentials = {
            'Username': username,
            'Password': password
        };

        var deferred = $q.defer();
        $http.post(requestUri, credentials)
            .then(function (response) {
                userContext = username;
                token = response.data;
                console.log('token: ' + token);
                deferred.resolve(username);
            }, function (response) {
                console.log(response.status);
                deferred.reject(response.statusText)
            });

        return deferred.promise;

        // the below is run synchronously before the $http promise so token is still null
        if (token != null)
            return true;
        else return false;
    };

    var _logout = function()
    {
        console.log('logging out with token ' + token);
        //var requestUri = "http://10.0.11.231/das.api/api/Authentication/Logout";
        var requestUri = "http://localhost/NARA.DAS.API/api/Authentication/Logout";

        var deferred = $q.defer();
        var req = {
            method: 'GET',
            url: requestUri,
            headers: {
                'Authorization': 'token ' + token
            }
        };

        $http(req)
            .then(function (response) {
                if (response.data) {
                    console.log(userContext + ' is logged out.');
                    userContext = null;
                    token = null;
                    deferred.resolve(true);
                }
                else {
                    deferred.reject('Logout unsucessful');
                }
            }, function (response) {
                console.log(response.status);
                deferred.reject(response.statusText);
            });
        return deferred.promise;
    }

    authenticationFactory.getUserContext = _getUserContext;
    authenticationFactory.setUserContext = _setUserContext;
    authenticationFactory.login = _login;
    authenticationFactory.logout = _logout;

    return authenticationFactory;
});