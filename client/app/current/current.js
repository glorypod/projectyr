(function(){
  angular.module('projectyr.current', [])
  .controller('CurrentController', CurrentController);

  function CurrentController ($scope, $interval, Project, Auth, $location) {
    /* set up page */
    $scope.init = function ()  {
      Project.getOpen()
        .then(function(all) {
          $scope.projects = all.projects;
          $scope.running = false;
          $scope.timeToAdd = 0;
          $scope.currentProject = $scope.projects[0];
        });
    }
    
    $scope.projects = {};
    $scope.currentProject = null;
    $scope.running = false;
    $scope.init();

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
          $scope.init();
        })
    };
  
  };

})();