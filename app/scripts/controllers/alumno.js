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

  $scope.matricula = {
    anio:"Primer año",
    turno:"Turno tarde"
  };

  $scope.alumno = {
    nombre: "Nicolás",
    apellido: "Legresti",
    tipo_documento: "DNI",
    nro_documento: "22.222.222",
    nro_cuil: "20-22.222.222-9",
    sexo: "Hombre",
    grupo_sanguineo: "0+",
    nacimiento: {
      dia: "08",
      mes: "Junio",
      anio: "1989"
    },
    lugar_nacimiento: {
      ciudad: "Córdoba",
      pais: "Argentina"
    },
    nacionalidades: [" argentina", "italiana"]
  };

  $scope.direccion_actual = {
    calle: "Av. Emilio Olmos",
    nro: "700",
    barrio: "Nueva Córdoba",
    edificio: "Vicente I",
    piso: "1",
    depto: "B",
    ciudad: "Córdoba",
    cp:"5000"
  };


 $scope.tmpAlumno = {
    nombre: "",
    apellido: "",
    tipo_documento: "",
    nro_documento: "",
    nro_cuil: "",
    sexo: "",
    grupo_sanguineo: "",
    nacimiento: {
      dia: "",
      mes: "",
      anio: ""
    },
    lugar_nacimiento: {
      ciudad: "",
      pais: ""
    },
    nacionalidades: []
  };


   $scope.tmpDireccion = {
    calle: "",
    nro: "",
    barrio: "",
    edificio: "",
    piso: "",
    depto: "",
    ciudad: "",
    cp:""
  };

    $scope.setSelectedAlumno = function(){
      $.extend($scope.tmpAlumno, $scope.alumno);
      $scope.tmpAlumno.lugar_nacimiento["ciudad"] = $scope.alumno.lugar_nacimiento["ciudad"];
    };

    $scope.setSelectedDireccion = function(){
      $.extend($scope.tmpDireccion, $scope.direccion_actual);
    };

   $scope.updateAlumno = function(){
    $.extend($scope.alumno, $scope.tmpAlumno);
     $scope.alumno.lugar_nacimiento["ciudad"] = $scope.tmpAlumno.lugar_nacimiento["ciudad"];
   };

   $scope.updateDomicilio = function(){
    $.extend($scope.direccion_actual, $scope.tmpDireccion);
    };

});
