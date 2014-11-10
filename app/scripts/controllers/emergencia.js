'use strict';

/**
 * @ngdoc function
 * @name yacareMatriculacionApp.controller:EmergenciaCtrl
 * @description
 * # EmergenciaCtrl
 * Controller of the yacareMatriculacionApp
 */
angular.module('yacareMatriculacionApp')
  .controller('EmergenciaCtrl', function ($scope) {
 
  $scope.contactos = [{
    apellido:"Perez",
    nombre:"Juan",
    tel:"+54 9 351 6123456",
    comentario:"Esto es un cometario del contacto en caso de emergencia"
   	},
   	{
    apellido:"Rios",
    nombre:"Juan",
    tel:"+54 9 351 6123456",
    comentario:"Cometario del contacto en caso de emergencia"
   	}
  ];

	 $scope.setSelected = function(index){
  		$scope.selected = index;
  		$.extend($scope.tmpContacto, $scope.contactos[index]);
  	};

	$scope.removeContact = function(index){
		$scope.contactos.splice(index, 1);
	};

	$scope.cleanModal = function(){
		$scope.nvoContacto = {
			apellido:"",
	    	nombre:"",
	    	tel:"",
	    	comentario:""
    	};
	};

	$scope.updateContact = function(){
		$.extend($scope.contactos[$scope.selected], $scope.tmpContacto);        
    $('#myEditModalContactoEmergencia').modal('hide');
	};

	$scope.nvoContacto = {
		apellido:"",
    	nombre:"",
    	tel:"",
    	comentario:""
    };

    $scope.tmpContacto = {
		apellido:"",
    	nombre:"",
    	tel:"",
    	comentario:""
    };

    $scope.saveContact = function() {
        $scope.contactos.push($scope.nvoContacto);
        $('#myNvoModalContactoEmergencia').modal('hide');
        $scope.form_nvo_emergencia.$setPristine();
    }

  });
