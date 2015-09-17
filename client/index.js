(function(){
  angular.module('projectyr.index', [])
  .controller('IndexController', IndexController);

  function IndexController ($scope, $rootScope, $interval, Project, Auth, $location) {

    Project.getOpen()
      .then(function(all) {
        $scope.projects = all.projects;
      });

    $scope.setProject = function(project){
      $rootScope.init(project);
    }

  }

})();