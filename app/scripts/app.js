'use strict';

/**
 * @ngdoc overview
 * @name yacareMatriculacionApp
 * @description
 * # yacareMatriculacionApp
 *
 * Main module of the application.
 */
angular
  .module('yacareMatriculacionApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/alumno.html',
        controller: 'AlumnoCtrl'
      })
      .when('/tutor', {
        templateUrl: 'views/tutor.html',
        controller: 'TutorCtrl'
      })
      .when('/emergencia', {
        templateUrl: 'views/emergencia.html',
        controller: 'EmergenciaCtrl'
      })
      .when('/resumen', {
        templateUrl: 'views/resumen.html',
        controller: 'ResumenCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
