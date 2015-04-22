var app = angular.module('myApp', []);

app.controller('myController', function($scope,$http) {
    $scope.hello="hello world";

$http.get("/developer").success(function (response) {
           $scope.developer = response;
       });

});

