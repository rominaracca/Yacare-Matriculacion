'use strict';

describe('Controller: TutorCtrl', function () {

  // load the controller's module
  beforeEach(module('yacareMatriculacionApp'));

  var TutorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TutorCtrl = $controller('TutorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
