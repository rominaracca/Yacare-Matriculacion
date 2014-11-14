'use strict';

/**
 * @ngdoc function
 * @name yacareMatriculacionApp.controller:TutorCtrl
 * @description
 * # TutorCtrl
 * Controller of the yacareMatriculacionApp
 */
 angular.module('yacareMatriculacionApp')
 .controller('TutorCtrl', function ($scope, $location, toasty, backend) {

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
  var d = dateStr.split('/');
  if(d.length > 1) {
    return {dia: parseInt(d[0], 10), mes: numToMonth[parseInt(d[1],10)], anio: parseInt(d[2], 10)};
  } 
  var d = dateStr.split('-');
  if(d.length > 1) {
    return {dia: parseInt(d[2], 10), mes: numToMonth[parseInt(d[1],10)], anio: parseInt(d[0], 10)};
  } 
  return {};
}

backend.tutor(function(err, tutores) {
  if(err) {
    toasty.pop.error({
      title: 'Error',
      msg: 'Ha ocurrido un error: '+err.message
    });
    //$location.path('/login');
  } else {
    $scope.tutores = tutores.data;

    $scope.update = tutores.update;
  }
});

$scope.today = function() {
   $scope.dt = new Date();
};

 $scope.today();

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

 /*$scope.tutores = [
 {
  nombre:"Juan",
  apellido:"Legresti",
  tipo_relacion:"Padre",
  tipo_documento:"DNI",
  nro_documento:"16.132.456",
  genero:"Hombre",
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

];*/

$scope.genero = ['Mujer','Hombre'];
$scope.tipo_documento = ['DNI', 'Pasaporte', 'Otro'];
$scope.tipo_relacion = ['Padre','Madre','Hijo','Sobrino','Primo','Tio','Hermano','Abuelo','Tutor'];


$scope.nvoTutor = {
  nombre:"",
  apellido:"",
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

$scope.tmpTutor = {
  nombre:"",
  apellido:"",
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
  telefono: "",
};

$scope.setSelected = function(index){
  $scope.selected = index;
  $.extend(true, $scope.tmpTutor, $scope.tutores[index]);
  console.log($scope.tmpTutor);
};

$scope.removeTutor = function(index){
  $scope.tutores.splice(index, 1);
};


$scope.cleanModal = function(){
  $scope.nvoTutor = {
    nombre:"",
    apellido:"",
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

};

$scope.updateTutor = function(){
  $.extend(true, $scope.tutores[$scope.selected], $scope.tmpTutor);
  $('#myEditModalTutor').modal('hide');
};

$scope.saveTutor = function(){
  $scope.tutores.push($scope.nvoTutor);
  $('#myNvoModalTutor').modal('hide');
  $scope.form_nvo_tutor.$setPristine();
};


});
