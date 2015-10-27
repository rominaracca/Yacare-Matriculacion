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
    templateUrl: 'views/form.html',
    controller: function($scope, backend, $rootScope) {

      $scope.hayCambios = function() { return $rootScope.hayCambios };

/*          $scope.$on('backendHayCambios',function() {
            $rootScope.hayCambios = true;
          });

          $scope.$on('backendCambiosGuardados',function() {
            $rootScope.hayCambios = false;
          });
  */
  $scope.guardar = function() {
    backend.guardar();
    //location.reload();
  };

  $scope.cerrarSesion = function() {
    $rootScope.alumno = null;
    $rootScope.tutores = null;
    $rootScope.contactos = null;
    backend.logout();
  };

}
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
.factory('backend', ['$http', '$location', 'toasty', '$rootScope', function($http, $location, toasty, $rootScope) {

  var defaultCb = function(err, data) {
    if(err) {
      toasty.pop.error({
        title: 'Error!',
        msg: data.message
      });
    }
  };

  var dominios = false;

  var search = false;

  var globalData = {};

  var fromPath = '/alumno';
  $rootScope.hayCambios = false;

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
    logout: function(data) {
      $http.get('/api/logout', data)
      .success(function(data) {
        $location.path('/login');
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
          data: data
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
      var self = this;
      fromPath = '/tutor';
      if(!cb) cb = defaultCb;
      $http.get('/api/tutor')
      .success(function(data) {
        var tutor = {
          data: data
          
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
      var self = this;
      fromPath = '/emergencia';
      if(!cb) cb = defaultCb;
      $http.get('/api/emergencia')
      .success(function(data) {
        var emergencia = {
          data: data
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
    dominios: function(cb) {
      if(!cb) return;
      if(!dominios) {
        $http.get('/api/dominios')
        .success(function(data) {
          search = {};
          for(var i in data) {
            search[i] = {};
            data[i].forEach(function(item) {
              search[i][item.key] = item;
            });
          }
          cb(null, data);
        })
        .error(function(err) {
          cb(err);
        });
      } else {
        cb(null, dominios);
      }
    },
    search: function(item, key) {
      return search[item]&&search[item][key]?search[item][key]:{};
    },
    update: function(data) {
      $rootScope.hayCambios = true;
      $.extend(globalData, data);
    },
    guardar: function() {
      $http.post('/api/guardar', globalData)
      .success(function(data) {
       globalData = {};
       $rootScope.hayCambios = false;
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

