var app = angular.module('spaApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "welcome.html"
    })
    .when("/red", {
      templateUrl: "hello.html"
    })
    .when("/green", {
      templateUrl: "niceday.html"
    });
});

/*
app.controller("helloCtrl", function($scope) {
	$scope.msg = "Hello World";
});

app.controller("nicedayCtrl", function($scope) {
	$scope.msg = "Have a Nice Day!";
});*/
