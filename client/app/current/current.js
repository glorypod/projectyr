(function(){
  angular.module('projectyr.current', [])
  .controller('CurrentController', CurrentController);

  function CurrentController ($scope, $rootScope, $interval, Project, Auth, $location) {
    /* set up page */
    $rootScope.init = function (project)  {
      Project.getOpen()
        .then(function(all) {
          $scope.projects = all.projects;
          $scope.running = false;
          $scope.timeToAdd = 0;
          $scope.currentProject = project || $scope.projects[0];
        });
    }

    $rootScope.init();

    $scope.start = function() {
      $scope.$broadcast('timer-start');
      $scope.running = true;
    }

    $scope.stop = function() {
      $scope.$broadcast('timer-stop');
      $scope.running = false;
    }

    $scope.timeAssign = function () {
      Project.timeAssign($scope.currentProject)
        .then(function(data){
          $rootScope.init();
        })
    };
  
  };

})();