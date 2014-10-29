'use strict';

/**
 * @ngdoc function
 * @name yacareMatriculacionApp.controller:TutorCtrl
 * @description
 * # TutorCtrl
 * Controller of the yacareMatriculacionApp
 */
angular.module('yacareMatriculacionApp')
  .controller('TutorCtrl', function ($scope) {
	   
	$scope.today = function() {
    	$scope.dt = new Date();
  	};
  	$scope.today();
  
  	$scope.open = function($event) {
    	$event.preventDefault();
    	$event.stopPropagation();
	    $scope.opened = true;
  	};

  });
