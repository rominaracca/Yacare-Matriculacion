'use strict';

describe('Controller: AlumnoCtrl', function () {

  // load the controller's module
  beforeEach(module('yacareMatriculacionApp'));

  var AlumnoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlumnoCtrl = $controller('AlumnoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
