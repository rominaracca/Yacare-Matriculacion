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

  $scope.applyCrop = function() {
    //var imageSrc = "images/nico-perfil.jpg";
   $('#image-cropper').cropit({
      imageState: {
          src: 'images/nico-perfil-big.jpg'
      },
      imageBackground: true
    });
  };

/*

  $scope.applyCrop = function() {
     // Create variables (in this scope) to hold the API and image size
    var jcrop_api,
        boundx,
        boundy,

        // Grab some information about the preview pane
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pimg = $('#preview-pane .preview-container img'),

        xsize = $pcnt.width(),
        ysize = $pcnt.height();
    
    console.log('init',[xsize,ysize]);
    $('#editPhoto').Jcrop({
      onChange: updatePreview,
      onSelect: updatePreview,
      aspectRatio: 1
    },function(){
      // Use the API to get the real image size
      var bounds = this.getBounds();
      boundx = bounds[0];
      boundy = bounds[1];
      // Store the API in the jcrop_api variable
      jcrop_api = this;

      // Move the preview into the jcrop container for css positioning
      $preview.appendTo(jcrop_api.ui.holder);
    });

    function updatePreview(c)
    {
      if (parseInt(c.w) > 0)
      {
        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $pimg.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
      }
    };
  };

*/  
  
  $scope.opened = false;
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.matricula = {
    anio:"Segundo año",
    turno:"Turno tarde"
  };

  $scope.alumno = {
    nombre: "Nicolás",
    apellido: "Legresti",
    tipo_documento: "DNI",
    nro_documento: "22.222.222",
    nro_cuil: "20-22.222.222-9",
    genero: "Hombre",   
    grupo_sanguineo: "0",
    factor_rh: "Positivo",
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
     $('#myEditModal').modal('hide');
   };

   $scope.updateDomicilio = function(){
    $.extend($scope.direccion_actual, $scope.tmpDireccion);
    $('#editAddress').modal('hide');
    };

});
