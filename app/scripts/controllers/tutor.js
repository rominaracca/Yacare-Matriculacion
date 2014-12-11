'use strict';

/**
 * @ngdoc function
 * @name yacareMatriculacionApp.controller:TutorCtrl
 * @description
 * # TutorCtrl
 * Controller of the yacareMatriculacionApp
 */
 angular.module('yacareMatriculacionApp')
 .controller('TutorCtrl', function ($scope, $location, toasty, backend, $rootScope) {

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

$scope.initCalendar = function(){
  $('#datetimepicker').datetimepicker({
    dayOfWeekStart : 1,
    lang:'es',
    value: $scope.tmpTutor.fecha_nacimiento,
    format:'d/m/Y',
    maxDate: new Date(),
    //mask:'39/19/9999',
    timepicker:false
  });
} ;



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

if(!$rootScope.tutores) {
  backend.tutor(function(err, tutores) {
    if(err) {
      toasty.pop.error({
        title: 'Error',
        msg: 'Ha ocurrido un error: '+err.message
      });
      //$location.path('/login');
    } else {
      $scope.tutores = $rootScope.tutores = tutores.data;
      $scope.update = tutores.update;
    }
  });
}


 backend.alumno(function(err, alumnoObj) {
    if(err) {
    toasty.pop.error({
      title: 'Error',
      msg: 'Ha ocurrido un error: '+err.message
    });
    //$location.path('/resumen');
    } else {
      for(var i in alumnoObj.data) {
          $scope[i] = alumnoObj.data[i];
      }
    }
  }); 

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

$scope.open = function($event) {
   $event.preventDefault();
   $event.stopPropagation();
   $scope.opened = true;
 };

!$scope.tutores&&($scope.tutores=[]);

$scope.$watch('tutores', function(newTut, oldTut){
  newTut.forEach(function(tutor, i) {
    //if(tutor.fecha_nacimiento != oldTut[i].fecha_nacimiento) {
      tutor.nacimiento = parseDate(tutor.fecha_nacimiento);
    //}
  });
}, true);

/*
 $scope.tutores = [
 {
  nombre:"Juan",
  apellido:"Legresti",
  tipo_relacion:"Padre",
  tipo_documento:"DNI",
  nro_documento:"16.132.456",
  genero:"Hombre",
  fecha_nacimiento: "08/06/1960",
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
{
  nombre:"Maria",
  apellido:"Perez",
  tipo_relacion:"Madre",
  tipo_documento:"DNI",
  nro_documento:"17.214.237",
  genero:"Mujer",
  fecha_nacimiento: "09/10/1962",
  nacimiento : {
    dia:"09",
    mes:"Octubre",
    anio:"1962"
  },
  lugar_nacimiento: {
    ciudad: "Buenos Aires",
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
  mail:"maria.perez@gmail.com",
  telefono: "+54 9 6 654321"
},
];
*/

$scope.genero = ['Mujer','Hombre'];

$scope.nvoTutor = {};

$scope.tmpTutor = {};

$scope.nvoTutor = {
  nombre:"",
  apellido:"",
  tipo_relacion:"",
  tipo_documento:"",
  nro_documento:"",
  sexo:"",
  fecha_nacimiento: "",
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

$scope.tmpTutor = {
  nombre:"",
  apellido:"",
  tipo_relacion:"",
  tipo_documento:"",
  nro_documento:"",
  sexo:"",
  fecha_nacimiento: "",
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
  telefono: "",
};

$scope.setSelected = function(index){
  $scope.selected = index;
  $scope.tmpTutor = $.extend(true, {}, $scope.tutores[index]);
};

$scope.removeTutor = function(index){
  $scope.tutores.splice(index, 1);
  backend.update({tutores: $scope.tutores});
};


$scope.cleanModal = function(){
  $scope.nvoTutor = {};
};

$scope.updateTutor = function(){
  $.extend(true, $scope.tutores[$scope.selected], $scope.tmpTutor);
  backend.update({tutores: $scope.tutores});
  $('#myEditModalTutor').modal('hide');
};

$scope.saveTutor = function(){
  $scope.tutores.push($scope.nvoTutor);
  backend.update({tutores: $scope.tutores});
  $('#myNvoModalTutor').modal('hide');
  $scope.form_nvo_tutor.$setPristine();
};

$scope.hasBirthdate = function(index) {
  return ($scope.tutores[index].fecha_nacimiento);
};

$scope.hasPlaceOfBirth = function(index) {
  return ($scope.tutores[index].lugar_nacimiento);
};

$scope.hasAddress = function(index) {
    if($scope.tutores[index].hasOwnProperty('direccion_actual')){
        return ($scope.tutores[index].direccion_actual.calle && $scope.tutores[index].direccion_actual.nro 
            && $scope.tutores[index].direccion_actual.barrio && $scope.tutores[index].direccion_actual.cp
            && $scope.tutores[index].direccion_actual.ciudad && $scope.tutores[index].direccion_actual.provincia_id
            && $scope.tutores[index].direccion_actual.pais_id);
    }else{
      return false;
    }
  };

  $scope.isBuilding = function(index) {
    return ($scope.tutores[index].direccion_actual.piso && $scope.tutores[index].direccion_actual.depto);
  };

});
