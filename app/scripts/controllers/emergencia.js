'use strict';

/**
 * @ngdoc function
 * @name yacareMatriculacionApp.controller:EmergenciaCtrl
 * @description
 * # EmergenciaCtrl
 * Controller of the yacareMatriculacionApp
 */
angular.module('yacareMatriculacionApp')
  .controller('EmergenciaCtrl', function ($scope, backend, toasty, $rootScope) {

  if(!$rootScope.contactos) {
    backend.emergencia(function(err, contactos) {
      if(err) {
        toasty.pop.error({
          title: 'Error!',
          msg: err.message
        });
      } else {

  /*
  Cada contacto queda con el siguiente json:

  {
  	tel: '+54 ....',
  	xml: {
  		name: '...',
  		lastname: '...',
  		comment: '....'
  	}
  }
  */
        $rootScope.contactos = $scope.contactos = contactos.data;
      }
    });
   }

  $scope.nvoContacto = {};
  $scope.tmpContacto = {};

	 $scope.setSelected = function(index){
  		$scope.selected = index;
  		$scope.tmpContacto = $.extend(true, {}, $scope.contactos[index]);
  	};

	$scope.removeContact = function(index){
		$scope.contactos.splice(index, 1);
    backend.update({contactos: $scope.contactos});
	};

	$scope.cleanModal = function(){
  	$scope.nvoContacto = {
      tel:"",
    	xml: {
    		name: '',
    		lastname: '',
    		comment: ''
    	}
    };
	};

	$scope.updateContact = function(){
    if (!!!$scope.tmpContacto.xml.comment)
      $scope.tmpContacto.xml.comment = " ";
		$.extend($scope.contactos[$scope.selected], $scope.tmpContacto);        
    backend.update({contactos:$scope.contactos});
    $('#myEditModalContactoEmergencia').modal('hide');
	};

  $scope.saveContact = function() {
      $scope.contactos.push($scope.nvoContacto);
      backend.update({contactos:$scope.contactos});
      $('#myNvoModalContactoEmergencia').modal('hide');
      $scope.form_nvo_emergencia.$setPristine();
  };

  $scope.hasOwner = function(index){
    return ($scope.contactos[index].xml&&$scope.contactos[index].xml.lastname && $scope.contactos[index].xml.name);
  }

  });
