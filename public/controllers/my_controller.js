var app = angular.module("myApp", []);

app.run(function($rootScope) {
	//root scope color
	$rootScope.color = "brown";
});

app.controller("myCtrl", function($scope, $http, $location, 
								  $timeout, $interval) {
	$scope.firstName = "Kishorchand";
	$scope.lastName  = "Rawat";
	$scope.currentEventName = "";
	$scope.mouseMoveCounter = 0;
	$scope.totalEventCounter = 0;

	$scope.names = [
	 {name:"Kishore", relation:"Self"},
	 {name:"Usha", relation:"Wife"},
	 {name:"Prajeet", relation:"Son"},
	 {name:"Shaurya", relation:"Son"}
	];

	$scope.selectedName = $scope.names[0];

	$scope.cities = [
		{city:"Bangalore", state:"Karnataka"},
		{city:"Mumbai", state:"Maharashtra"},
		{city:"New Delhi", state:"NCR"},
		{city:"Bhopal", state:"Madhya Pradesh"},
		{city:"Mangalore", state:"Karnataka"},
		{city:"Pune", state:"Maharashtra"},
		{city:"Noida", state:"Uttar Pradesh"},
		{city:"Chennai", state:"Tamilnadu"},
		{city:"Kolkata", state:"West Bengal"}
	];

	//define an Object for the Select example
	$scope.cars = {
		car01	: {brand: "Mahindra", model: "Scorpio", color: "black" },
		car02	: {brand: "Maruti Suzuki", model: "Vitara", color: "silver"},
		car03	: {brand: "Hyundai", model: "Creta", color: "red"}
	};

	$scope.orderByMe=function(x) {
		$scope.myOrderBy = x;
	}

	$scope.changeName=function() {
		if($scope.firstName=="Prajeet") {
			$scope.firstName = "Shaurya";
		} else {
			$scope.firstName = "Prajeet";
		}
	}

	$scope.setDefaultValues=function() {
		if($scope.quantity == null)
			$scope.quantity = 0;
		if($scope.price == null)
			$scope.price = 0;
	}


  	$http.get("welcome.html").then(function (response) {
    	$scope.myWelcome = response.data;
    	//alert(response.data);
  	}, function errorCallback(response) {
  		$scope.myWelcome = "error getting HTML";
  	});


  	//return the contactlist data from Mongodb
  	$scope.getContacts = function() {
	  	$http.get('/contactlist').success(function(response) {
  			console.log("I got the data I requested");
  			$scope.contacts = response;
  		});
	};

  	$scope.myHeader = "Hello World!";
  	$timeout(function() {
  		$scope.myHeader = "How are you today?";
  	}, 2000);

  	$scope.theTime = new Date().toLocaleTimeString();
  	$interval(function() {
  		$scope.theTime = new Date().toLocaleTimeString();
  	}, 1000);

	//controller scope color
	$scope.color = "magenta";

	$scope.myAbsUrl = $location.absUrl();
	//TODO - this function $location.url() is not working 
	//       need to check why
	$scope.myUrl = $location.url(); 
	$scope.myProtocol = $location.protocol();
	$scope.myHost = $location.host();
	$scope.myHostWithPort = location.host;

	//function for mouseEnter event 
	$scope.mouseEnter = function() {
		console.log("mouseenter");
		$scope.currentEventName += "mouseenter-";
		$scope.totalEventCounter++;
	};
	//function for mouseOver event 
	$scope.mouseOver = function() {
		console.log("mouseover");
		$scope.currentEventName += "mouseover-";
		$scope.totalEventCounter++;
	};
	//function for mousemove event
	//this function only increments the counter, no message shown
	$scope.mouseMove = function() {
		console.log("mousemove");
		$scope.mouseMoveCounter++;
		$scope.totalEventCounter++;
		//reset the event text message if the total events reach 500
		if($scope.totalEventCounter >= 500) {
			$scope.totalEventCounter = 0;
			$scope.mouseMoveCounter = 0;
			$scope.currentEventName = "";
		}
	};
	//function for mouseleave event 
	//this function also shows the mousemove counter value
	$scope.mouseLeave = function() {
		console.log("mouseleave");
		$scope.currentEventName += "mousemove ("+$scope.mouseMoveCounter + ")"+"-mouseleave-";
		$scope.mouseMoveCounter = 0;
		$scope.totalEventCounter++;
	};

	//function for mousedown event
	$scope.mouseDown = function($event) {
		console.log("mousedown" + $event.which);
		var whichButton = "";
		switch($event.which) {
			case 1: whichButton="Left";break;
			case 3: whichButton="Right";break;
		}
		$scope.currentEventName += "mousedown("+whichButton+")-";
		$scope.totalEventCounter++;
	};

	//function for mouseup event
	$scope.mouseUp = function() {
		console.log("mouseup");
		$scope.currentEventName += "mouseup-";
		$scope.totalEventCounter++;
	};

	//function for mouse left button click event
	$scope.mouseClick = function($event) {
		console.log("click");
		$scope.currentEventName += "click-";
		$scope.totalEventCounter++;
	};

	$scope.doubleClick = function($event) {
		console.log("dblclick");
		$scope.currentEventName += "dblclick-";
		$scope.totalEventCounter++;
	};
});

//user defined service - return the average of an array of numbers
//TODO - this is not working , need to check
app.service('getavg', function() {
	this.myFunc = function(a) {
		var avg = 0;
		var sum = 0;
		for(i=0;i<a.length;i++) {
			sum += a[i];
		}
		avg = sum / x.length;
		return avg;
	}
});

//user defined directive returning HTML template
app.directive("myDirective", function() {
	return {
	  //restrict: "E", to show if only used as an element
	  //other possible values are "A"-Attribute, "C"-class
	  //and "M"-Comment
	  template: "<h2>I am made by a user-defined directive!</h2>"
	};
});

//user defined directive for input text validation
//User Valid: if the input text contains letter "e"
//As per the syntax rules the directive name is "my-validation",
//hence the method name is "myValidation"
app.directive("myValidation", function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
			function charEValidation(value) {
				if(value.indexOf("e") > -1) {
					mCtrl.$setValidity('charE', true);
				} else {
					mCtrl.$setValidity('charE', false);
				}
				return value;
			}
			mCtrl.$parsers.push(charEValidation);
		}
	};
});

//user defined filter - convert every alternate character into uppercase
app.filter("myFilter", function () {
	return function(x) {
		var i, c, txt = "";

		for(i=0;i<x.length;i++) {
			c = x[i];
			if(i % 2 == 0) {
				c = c.toUpperCase();
			}
			txt += c;
		}
		return txt;
	};
});