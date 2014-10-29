'use strict';

/**
 * @ngdoc function
 * @name yacareMatriculacionApp.controller:AlumnoCtrl
 * @description
 * # AlumnoCtrl
 * Controller of the yacareMatriculacionApp
 */
angular.module('yacareMatriculacionApp')
  .controller('AlumnoCtrl', function ($scope) {

 $scope.today = function() {
    $scope.dt = new Date();
  };
  
  $scope.opened = false;
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.addPhone = function() {	
  	$scope.contacts.push();
   	$scope.contacts.push();
  }	


	$scope.addEmail = function(last) {
		if(last) {
			$scope.eMails.push({type: '', eMail: ''});
		}
	};

	$scope.removeEmail = function(array, idx) {
		$scope.eMails.splice(idx, 1);
		$scope.$apply();
	};

	$scope.eMails = [
      {type:'institucional',
       eMail: 'nlegresti@psi.unc.edu.ar'
      },
      {type:'personal',
       eMail: 'nicolegresti@gmail.com'
      },
      {type:'otro',
       eMail: 'otronico@hotmail.com'
      }
    ]

    $scope.phones = [
      {type:'personal',
       eMail: 'nlegresti@psi.unc.edu.ar'
      },
      {type:'fijo',
       eMail: 'nicolegresti@gmail.com'
      },
      {type:'celular',
       eMail: 'otronico@hotmail.com'
      }
    ]

  });
