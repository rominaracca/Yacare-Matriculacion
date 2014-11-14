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
    'ui.bootstrap',
    'ui.router',
    'toasty'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/alumno");

    $stateProvider
      .state('form', {
        abstract: true,
        templateUrl: 'views/form.html'
      })
      .state('form.alumno', {
        url: '/alumno', 
        templateUrl: 'views/alumno.html',
        controller: 'AlumnoCtrl'
      })
      .state('form.tutor', {
        url: '/tutor',
        templateUrl: 'views/tutor.html',
        controller: 'TutorCtrl'
      })
      .state('form.emergencia', {
        url: '/emergencia',
        templateUrl: 'views/emergencia.html',
        controller: 'EmergenciaCtrl'
      })
      .state('form.resumen', {
        url: '/resumen',
        templateUrl: 'views/resumen.html',
        controller: 'ResumenCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: function($scope, backend) {
          $scope.data = {};
          $scope.login = function() {
            backend.login($scope.data);
          }
        }
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
  }])
  .factory('backend', ['$http', '$location', 'toasty', function($http, $location, toasty) {

    var defaultCb = function(err, data) {
      if(err) {
        toasty.pop.error({
          title: 'Error!',
          msg: data.message
        });
      }
    };

    var globalData = {};

    var fromPath = '/alumno';

    return {
      login: function(data) {
        $http.post('/api/login', data)
        .success(function(data) {
          $location.path(fromPath);
        })
        .error(function(data) {
          toasty.pop.error({
            title: 'Error!',
            msg: data.message
          });
        });
      },
      alumno: function(cb) {
        fromPath = '/alumno';
        if(!cb) cb = defaultCb;
        $http.get('/api/alumno')
        .success(function(data) {
          var alumno = {
            data: data,
            update: function(data) {
              globalData.alumno = data;
            }
          }
          cb(null, alumno);
        })
        .error(function(err, status) {
          if(status == 401) {
            $location.path('/login');
          } else {
            cb(err);
          }
        });
      },
      tutor: function(cb) {
        fromPath = '/tutor';
        if(!cb) cb = defaultCb;
        $http.get('/api/tutor')
        .success(function(data) {
          var tutor = {
            data: data,
            update: function(data) {
              globalData.tutor = data;
            }
          }
          cb(null, tutor);
        })
        .error(function(err, status) {
          if(status == 401) {
            $location.path('/login');
          } else {
            cb(err);
          }
        });
      },
      emergencia: function(cb) {
        fromPath = '/emergencia';
        if(!cb) cb = defaultCb;
        $http.get('/api/emergencia')
        .success(function(data) {
          var emergencia = {
            data: data,
            update: function(data) {
              globalData.emergencia = data;
            }
          }
          cb(null, emergencia);
        })
        .error(function(err, status) {
          if(status == 401) {
            $location.path('/login');
          } else {
            cb(err);
          }
        });
      },
      guardar: function() {
        $http.get('/api/guardar')
        .success(function(data) {
          toasty.pop.success({
            title: 'Éxito!',
            msg: 'Los datos se guardaron con éxito.'
          });
        })
        .error(function(data) {
          toasty.pop.error({
            title: 'Error!',
            msg: data.message
          });
        });
      }
    };
  }]);

