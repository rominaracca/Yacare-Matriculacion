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
  })

  .directive('ngFocus', [function() {
    var FOCUS_CLASS = "ng-focused";
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$focused = false;
        element.bind('focus', function(evt) {
          element.addClass(FOCUS_CLASS);
          scope.$apply(function() {ctrl.$focused = true;});
        }).bind('blur', function(evt) {
          element.removeClass(FOCUS_CLASS);
          scope.$apply(function() {ctrl.$focused = false;});
        });
      }
    }
  }]);

