'use strict';

/**
 * @ngdoc function
 * @name yacareMatriculacionApp.controller:AlumnoCtrl
 * @description
 * # AlumnoCtrl
 * Controller of the yacareMatriculacionApp
 */
angular.module('yacareMatriculacionApp')
  .controller('AlumnoCtrl', function ($scope, toasty, backend, $rootScope) {

var numToMonth = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre'
}

var parseDate = function(dateStr) {
  if(!dateStr) return {};
  if(typeof dateStr == 'string') {
    var d = dateStr.split('/');
    if(d.length > 1) {
      return {dia: parseInt(d[0], 10), mes: numToMonth[parseInt(d[1],10)], anio: parseInt(d[2], 10)};
    } 
    var d = dateStr.split('-');
    if(d.length > 1) {
      return {dia: parseInt(d[2], 10), mes: numToMonth[parseInt(d[1],10)], anio: parseInt(d[0], 10)};
    }
  } else if(dateStr.getDate) {
    return {dia: dateStr.getDate(), mes: numToMonth[dateStr.getMonth()+1], anio: dateStr.getFullYear()};
  } 
  return {};
};

$scope.genero = ['Mujer','Hombre'];
$scope.imagenSubida = "";

if(!$rootScope.alumno) {
  $scope.imagenActual = "";
  backend.alumno(function(err, alumnoObj) {
    if(err) {
      toasty.pop.error({
        title: 'Error',
        msg: 'Ha ocurrido un error: '+err.message
      });
      //$location.path('/login');
    } else {
      for(var i in alumnoObj.data) {
        $rootScope[i] = $scope[i] = alumnoObj.data[i];
      }
    }
  });
}

backend.dominios(function(err, dominios) {
  if(err) {
    toasty.pop.error({
      title: 'Error',
      msg: 'Ha ocurrido un error: '+err.message
    });
    //$location.path('/login');
  } else {
    $scope.dominios = dominios;
  }
});
$scope.search = backend.search;

$scope.getProfilePicture = function(){
  if($scope.imagenActual == "" || $scope.imagenActual == "images/default-male.png" || $scope.imagenActual == "images/default-female.png"){
    if ($scope.alumno.genero=='Mujer')
      return "images/default-female.png";
    else
      return "images/default-male.png";
  }
  else
    return $scope.imagenActual;
};

$scope.open = function($event) {
   $event.preventDefault();
   $event.stopPropagation();
   $scope.opened = true;
 };

 /* $scope.applyCrop = function() {
   $('#image-cropper').cropit({
      imageState: {
         src: 'images/nico-perfil-big.jpg'
      },
      imageBackground: true
    });
   $('.export').click(function() {
          $scope.imagenActual = $('#image-cropper').cropit('export', {type: 'image/png'});
          //backend.update({foto: $scope.imagenActual});
          window.open($scope.imagenActual);
    });
  };
*/
$scope.applyCropUp = function() {

     $('.image-editor').cropit({
          width: 300,
          height: 300,
          exportZoom: 1.25,
          imageState: {
          },
          imageBackground: true,
        });
    $('.export').click(function() {
          $scope.imagenSubida = $('.image-editor').cropit('export', {type: 'image/png'});
          //backend.update({foto: $scope.imagenSubida});
          //window.open($scope.imagenSubida);
          $scope.$apply(function () {
            $scope.imagenActual = $scope.imagenSubida;
            backend.update({imagenActual: $scope.imagenActual});
            $scope.onChangePhoto = false;
          });
    });
  };

 
 $scope.onChangePhoto = false;
 $scope.showPhotoUp = function() {
  $scope.$apply(function () {
    $scope.onChangePhoto = true;
  });
 }
  
  $scope.opened = false;
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  !$scope.alumno&&($scope.alumno={});

  $scope.$watch('alumno.nac', function() {
      if(!$scope.alumno.nac) return;
      $scope.alumno.nacimiento = parseDate($scope.alumno.nac);
   });

 $scope.tmpAlumno = {};
 $scope.tmpDireccion = {};

    $scope.setSelectedAlumno = function(){
      $.extend(true, $scope.tmpAlumno, $scope.alumno);
    };

    $scope.setSelectedDireccion = function(){
      $.extend(true, $scope.tmpDireccion, $scope.direccion_actual);
    };

   $scope.updateAlumno = function(){
    $.extend(true, $scope.alumno, $scope.tmpAlumno);
    backend.update({alumno: $scope.alumno});
     $('#myEditModal').modal('hide');
   };

   $scope.updateDomicilio = function(){
    $.extend(true, $scope.direccion_actual, $scope.tmpDireccion);
    backend.update({direccion_actual: $scope.direccion_actual});
    $('#editAddress').modal('hide');
    };

    $scope.hasBirthdate = function() {
      return ($scope.alumno.nac);
    };

    $scope.hasPlaceOfBirth = function() {
      return ($scope.alumno.lugar_nacimiento);
    };

    $scope.hasAddress = function() {
      return ($scope.direccion_actual && $scope.direccion_actual.ciudad 
        && $scope.direccion_actual.calle && $scope.direccion_actual.nro);
  };

  $scope.isBuilding = function() {
    return ($scope.direccion_actual.piso && $scope.direccion_actual.depto);
  };

});
