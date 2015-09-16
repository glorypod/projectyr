(function(){
  angular.module('projectyr.current', [])
  .controller('CurrentController', CurrentController);

  function CurrentController ($scope, $interval, Project, Auth, $location) {
    /* set up page */
    $scope.init = function ()  {
      Project.getOpen()
        .then(function(all) {
          $scope.projects = all.projects;
          console.log($scope.projects);
        });
    }
    $scope.projects = {};
    $scope.currentProject = null;
    $scope.running = false;
    $scope.init();

    /* clock functions */
    $scope.sharedTime = new Date();
    $interval(function() {
      $scope.sharedTime = new Date();
    }, 500);

    var totalElapsedMs = 0;//$scope.current_Project ? $scope.current_Project.act_time * 60 * 60 * 1000 : 0; //min * seconds * ms
    var elapsedMs = 0;
    var time;
    var startTime;
    var timerPromise;
    if($scope.currentProject){
      console.log("Total time: ", $scope.currentProject.act_time);
    }

    $scope.start = function() {
      if (!timerPromise) {
        $scope.running = true;
        startTime = new Date();
        timerPromise = $interval(function() {
          var now = new Date();
          time = now;
          elapsedMs = now.getTime() - startTime.getTime();
        }, 31);
      }
    };
    
    $scope.pause = function() {
      $scope.running = false;
      if (timerPromise) {
        $interval.cancel(timerPromise);
        timerPromise = undefined;
        totalElapsedMs += elapsedMs;
        elapsedMs = 0;
      }
    };
    $scope.addTime = function(timeToAdd){
      //$scope.actTime += Number(timeToAdd);
      totalElapsedMs += timeToAdd * 60 * 60 * 1000;
    };
    
    $scope.stop = function() {
      startTime = undefined;
      if(totalElapsedMs > 0){
        var timeToAdd = Number((totalElapsedMs / (60 * 60 * 1000)).toFixed(2));
        if(timeToAdd < 0.01){
          timeToAdd = 0.01;
        }
        $scope.currentProject.act_time += timeToAdd;
      }
      totalElapsedMs = elapsedMs = 0;
    };
    
    $scope.getTime = function() {
      return time;
    };
    
    $scope.getElapsedMs = function() {
      return totalElapsedMs + elapsedMs;
    };
  
  };

})();