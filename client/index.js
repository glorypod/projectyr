(function(){
  angular.module('projectyr.index', [])
  .controller('IndexController', IndexController);

  function IndexController ($scope, $interval, Project, Auth, $location) {

    Project.getOpen()
      .then(function(all) {
        $scope.projects = all.projects;
      });

  }

})();