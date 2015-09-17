(function(){
  angular.module('projectyr.current', [])
  .controller('CurrentController', CurrentController);

  function CurrentController ($scope, $rootScope, $interval, Project, Auth, $location) {
    $scope.setDefaults = function(){
      $scope.running = false;
      $scope.timeToAdd = 0;
      $scope.started = false;
      $scope.currentProject = $rootScope.project || $scope.projects[0];
      $scope.totalElapsed = $scope.currentProject.act_time * 60 * 60 * 1000;
    }
    $rootScope.init = function ()  {
      Project.getOpen()
        .then(function(all) {
          $scope.projects = all.projects;
          $scope.setDefaults();
        });
    }

    $scope.projects = {};
    $scope.currentProject = null;
    $scope.totalElapsed;
    $scope.timeToAdd;
    $rootScope.init();
    
    $scope.start = function() {
      if(!$scope.started) {
        $scope.$broadcast('timer-start');
      } else {
        $scope.$broadcast('timer-resume');
      }
      $scope.started = $scope.started || true;
      $scope.running = true;
    }

    $scope.stop = function() {
      $scope.$broadcast('timer-stop');
      $scope.running = false;
    }

    $scope.$on('timer-stopped', function(event, data){
      $scope.timeToAdd += data.millis;
      console.log($scope.timeToAdd);
    });

    $scope.end = function(){
      $scope.timeToAdd = Number(($scope.timeToAdd / (60 * 60 * 1000)).toFixed(2));
      if($scope.timeToAdd < 0.01) $scope.timeToAdd = 0.01;
      $scope.currentProject.act_time += $scope.timeToAdd;
      $scope.$broadcast('timer-reset');
      $scope.setDefaults();
    }

    $scope.timeAssign = function () {
      Project.timeAssign($scope.currentProject)
        .then(function(data){
          $rootScope.init();
        })
    };
  
  };

})();