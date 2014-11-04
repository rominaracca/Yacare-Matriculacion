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

  $scope.tutores = [
    {
      nombre:"Juan",
      apellido:"Legresti",
      tipo_relacion:"Padre",
      tipo_documento:"DNI",
      nro_documento:"16.132.456",
      sexo:"Hombre",
      nacimiento : {
        dia:"08",
        mes:"Junio",
        anio:"1960"
      },
      lugar_nacimiento: {
        ciudad: "Córdoba",
        pais: "Argentina"
      },
      direccion_actual : {
        calle: "Av. Emilio Olmos",
        nro: "700",
        barrio: "Nueva Córdoba",
        edificio: "Vicente I",
        piso: "1",
        depto: "B",
        ciudad: "Córdoba",
        provincia: "Córdoba",
        pais:"Argentina",
        cp:"5000"
      },
      mail:"juan.legresti@dominio.com",
      telefono: "+54 9 6 123456"
    },

  ];

  $scope.newTutor = {
      nombre:"",
      apellido:"Rios",
      tipo_relacion:"",
      tipo_documento:"",
      nro_documento:"",
      sexo:"",
      nacimiento: {
        dia:"",
        mes:"",
        anio:""
      },
      lugar_nacimiento: {
        ciudad: "",
        pais: ""
      },
      direccion_actual: {
        calle: "",
        nro: "",
        barrio: "",
        edificio: "",
        piso: "",
        depto: "",
        ciudad: "",
        provincia: "",
        pais:"",
        cp:""
      },
      mail:"",
      telefono: ""
    };
    


  });
