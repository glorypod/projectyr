(function(){
  angular.module('projectyr.index', [])
  .controller('IndexController', IndexController);

  function IndexController ($scope, $rootScope, $interval, Project, Auth, $location) {
    
    $scope.$watch(Auth.isAuth, function(authed){
        if (authed) {
          $scope.authed = true;
        } else {
          $scope.authed = false;
        } 
      }, true);

    $rootScope.initIndex = function() {
      Project.getOpen()
      .then(function(all) {
        $scope.projects = all.projects;
      });
    }

    $rootScope.initIndex();
    
    $scope.setProject = function(project){
      $rootScope.project = project;
      $rootScope.init();
    }

  }

})();