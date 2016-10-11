var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $timeout, $interval, $window) {

	$scope.colorCtr = 0;
	$scope.currentColor = "";
	$scope.delayMilliSeconds = 500;
	var promise;


	$scope.resetData = function() {
		$scope.colorCtr = 0;
		$scope.currentColor = "";
		//check if an interval is already running,
		//and stop it
		if(promise != null) {
			$scope.stopColors();
			$window.location.reload();
		}
	};

	$scope.stopColors = function() {
		$interval.cancel(promise);
	};

	$scope.startColors = function() {
		
		//check if an interval is already running,
		//and stop it
		if(promise != null) {
			$scope.stopColors();
		}

		promise = $interval(function() {
			if($scope.colorCtr <= CSS_COLOR_NAMES.length) {
				$scope.currentColor = CSS_COLOR_NAMES[$scope.colorCtr];
				$scope.colorCtr++;
			} else {
				$scope.colorCtr = 0;
			}
		}, $scope.delayMilliSeconds);
	};
});