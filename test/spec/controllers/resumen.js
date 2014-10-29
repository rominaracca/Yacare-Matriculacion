'use strict';

describe('Controller: ResumenCtrl', function () {

  // load the controller's module
  beforeEach(module('yacareMatriculacionApp'));

  var ResumenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResumenCtrl = $controller('ResumenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
