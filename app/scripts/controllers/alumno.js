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

$scope.initCalendar = function(){
  $('#datetimepicker').datetimepicker({
    dayOfWeekStart : 1,
    lang:'es',
    value: $scope.tmpAlumno.nac,
    format:'d/m/Y',
    maxDate: new Date(),
    //mask:'39/19/9999',
    timepicker:false
  });
} ;

  $scope.applyCrop = function() {
    //var imageSrc = "images/nico-perfil.jpg";
   $('#image-cropper').cropit({
      imageState: {
         src: 'images/nico-perfil-big.jpg'
      },
      imageBackground: true
    });
   $('.export').click(function() {
          var imageData = $('#image-cropper').cropit('export', {type: 'image/png'});
          
          window.open(imageData);
    });
  };

$scope.applyCropUp = function() {

     $('.image-editor').cropit({
          width: 300,
          height: 300,
          exportZoom: 1.25,
          imageState: {
          
          },
          imageBackground: true,
          allowCrossOrigin: true
        });
    $('.export').click(function() {
          var imageData = $('.image-editor').cropit('export', {type: 'image/png'});
          console.log(imageData);
          window.open(imageData);
    });
  };

 
 $scope.onChangePhoto = false;
 $scope.showPhotoUp = function() {
  $scope.$apply(function () {
    $scope.onChangePhoto = true;
        });
    alert($scope.onChangePhoto);
 }
  
  $scope.opened = false;
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.matricula = {
    anio:"Primer año",
    turno:""
  };

  //$scope.anios = ['Primer año','Segundo año','Tercer año','Cuarto año','Quinto año','Sexto año','Séptimo año'];
  $scope.turnos = ['Turno mañana', 'Turno tarde'];

  $scope.$watch('alumno.nac', function() {
      $scope.tmpAlumno.nac = $scope.alumno.nac;
      var parsedDate = $scope.tmpAlumno.nac.split("/");
      $scope.alumno.nacimiento.dia = parsedDate[0];
      switch (parsedDate[1]) {
          case '01':
              $scope.alumno.nacimiento.mes = "Enero";
              break;
          case '02':
              $scope.alumno.nacimiento.mes = "Febrero";
              break;
          case '03':
              $scope.alumno.nacimiento.mes = "Marzo";
              break;
          case '04':
              $scope.alumno.nacimiento.mes = "Abril";
              break;
          case '05':
              $scope.alumno.nacimiento.mes = "Mayo";
              break;
          case '06':
              $scope.alumno.nacimiento.mes = "Junio";
              break;
          case '07':
              $scope.alumno.nacimiento.mes = "Julio";
              break;
          case '08':
              $scope.alumno.nacimiento.mes = "Agosto";
              break;
          case '09':
              $scope.alumno.nacimiento.mes = "Septiembre";
              break;
          case '10':
              $scope.alumno.nacimiento.mes = "Octubre";
              break;
          case '11':
              $scope.alumno.nacimiento.mes = "Noviembre";
              break;
          case '12':
              $scope.alumno.nacimiento.mes = "Diciembre";
              break;

          
} 
      $scope.alumno.nacimiento.anio = parsedDate[2];
   });

  $scope.alumno = {
    nombre: "Nicolás",
    apellido: "Legresti",
    tipo_documento: "DNI",
    nro_documento: "22.222.222",
    nro_cuil: "20-22.222.222-9",
    genero: "Hombre",   
    grupo_sanguineo: "0",
    factor_rh: "Positivo",
    nac: "08/06/1990",
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

  $scope.genero = ['Mujer','Hombre'];
  $scope.grupo_sanguineo = ['0', 'A', 'B', 'AB'];
  $scope.factor_rh = ['Positivo','Negativo'];

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
    genero: "",
    grupo_sanguineo: "",
    factor_rh: "",
    nac: "",
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
      $.extend(true, $scope.tmpAlumno, $scope.alumno);
    };

    $scope.setSelectedDireccion = function(){
      $.extend(true, $scope.tmpDireccion, $scope.direccion_actual);
    };

   $scope.updateAlumno = function(){
    $.extend(true, $scope.alumno, $scope.tmpAlumno);
     $('#myEditModal').modal('hide');
   };

   $scope.updateDomicilio = function(){
    $.extend(true, $scope.direccion_actual, $scope.tmpDireccion);
    $('#editAddress').modal('hide');
    };

});
