'use strict';

/**
 * @ngdoc function
 * @name yacareMatriculacionApp.controller:ResumenCtrl
 * @description
 * # ResumenCtrl
 * Controller of the yacareMatriculacionApp
 */
angular.module('yacareMatriculacionApp')
  .controller('ResumenCtrl', function ($scope, $rootScope, $http, toasty, backend) {

	$scope.hayCambios = function() { 
		return $rootScope.hayCambios 
	};

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
			$scope.alumno.nacimiento = parseDate($scope.alumno.nac);
		}
	});	

  backend.tutor(function(err, tutores) {
	if(err) {
		toasty.pop.error({
	    title: 'Error',
	    msg: 'Ha ocurrido un error: '+err.message
    });
    //$location.path('/login');
	} else {
		$scope.tutores = tutores.data;

		$scope.tutores.forEach(function(tutor, i){
			tutor.nacimiento = parseDate(tutor.fecha_nacimiento);
		});

/*
		for (var i = tutores.length - 1; i >= 0; i--) {
			$scope.tutores[i].nacimiento = parseDate($scope.tutores[i].fecha_nacimiento);
		};
		*/
		console.log($scope.tutores);
	  }
	});

   	backend.emergencia(function(err, contactos) {
	    if(err) {
	      toasty.pop.error({
	        title: 'Error!',
	        msg: err.message
	      });
	    } else {
	      $scope.contactos = contactos.data;
	    }
   	})

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

	$scope.reporte = function() {
		$http.post('/api/matricula', {matricula: $scope.matricula})
		.success(function() {
			window.open('api/report');
		})
		.error(function(data){
			toasty.pop.error({
				title: "Error",
				msg: "No se pudo guardar su matricula. "+data.message
			});
		});
		
	};

	$scope.isBuilding_Student = function() {
    	return ($scope.direccion_actual.piso && $scope.direccion_actual.depto 
		&& $scope.direccion_actual.edificio);
  	};

  	$scope.isBuilding_Tutor = function(index) {
    	return ($scope.tutores[index].direccion_actual.piso && $scope.tutores[index].direccion_actual.depto 
		&& $scope.tutores[index].direccion_actual.edificio);
  	};

  	$scope.existsContact = function(){
  		if ($scope.contactos != null)
  			if($scope.contactos.length > 0)
  				return true;
  		return false;
  	};

  	$scope.existsTutor = function(){
  		if ($scope.tutores != null)
  			if($scope.tutores.length > 0)
  				return true;
  		return false;
  	};

  	$scope.isRegistrationComplete = function(){
  		return (!$scope.hayCambios() && $scope.existsContact() && $scope.existsTutor()
  			 && $scope.isStudentDataComplete() && $scope.isTutorDataComplete()
  			 && $scope.isContactDataComplete());
  	};

	$scope.isStudentDataComplete = function(){
		return ($scope.direccion_actual && $scope.direccion_actual.calle && $scope.direccion_actual.nro 
			&& $scope.direccion_actual.barrio && $scope.direccion_actual.cp
			&& $scope.alumno.nombre && $scope.alumno.apellido 
			&& $scope.alumno.tipo_documento && $scope.alumno.nro_documento
			&& $scope.alumno.genero
			&& $scope.alumno.grupo_sanguineo && $scope.alumno.factor_rh
			&& $scope.alumno.nac && $scope.alumno.lugar_nacimiento
			&& $scope.alumno.nacionalidad);
	};
 
	$scope.isTutorDataComplete = function(){
		var t = true;
		if($scope.tutores != null){
			for (var i = $scope.tutores.length - 1; i >= 0 && t; i--) {
				t = ($scope.tutores[i].nombre && $scope.tutores[i].apellido
					&& $scope.tutores[i].tipo_relacion && $scope.tutores[i].nro_documento
					&& $scope.tutores[i].genero && $scope.tutores[i].fecha_nacimiento
					&& $scope.tutores[i].lugar_nacimiento
					&& $scope.tutores[i].direccion_actual.calle && $scope.tutores[i].direccion_actual.nro
					&& $scope.tutores[i].direccion_actual.barrio && $scope.tutores[i].direccion_actual.ciudad
					&& $scope.tutores[i].direccion_actual.provincia && $scope.tutores[i].direccion_actual.pais
					&& $scope.tutores[i].direccion_actual.cp && $scope.tutores[i].telefono);
			};
		}else{
			return false;
		}
		return t;
	};

	$scope.isContactDataComplete = function(){
		var t = true;
		if($scope.contactos != null){
			for (var i = $scope.contactos.length - 1; i >= 0 && t; i--) {
				t = ($scope.contactos[i].xml.lastname && $scope.contactos[i].xml.name
					&& $scope.contactos[i].tel);
			};
		}else{
			return false;
		}
		return t;
	};

  });