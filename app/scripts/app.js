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
    'ngRoute'
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
      .when('/matricula', {
        templateUrl: 'views/matricula.html',
        controller: 'MatriculaCtrl'
      })
      .when('/resumen', {
        templateUrl: 'views/resumen.html',
        controller: 'ResumenCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
