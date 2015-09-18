(function(){
  angular.module('projectyr.current', [])
  .controller('CurrentController', CurrentController);

  function CurrentController ($scope, $rootScope, $interval, Project, Auth, Visual, $location) {
    /* set up page */
    $rootScope.initIndex();
    
    $rootScope.init = function ()  {
      Project.getOpen()
        .then(function(all) {
          $scope.projects = all.projects;
          $scope.running = false;
          $scope.timeToAdd = 0;
          $scope.currentProject = $rootScope.project || $scope.projects[$scope.projects.length-1];
          $scope.running = false;
          $scope.started = false;
          $scope.options = Visual.options; 
          $scope.barOptions = Visual.barOptions; 
          $scope.project = Visual.setSelectedProject($scope.currentProject);
          $scope.donutData = $scope.project.createDonutData;
          $scope.barData = $scope.project.createBarData;   
        });
    }

    $rootScope.init(); 

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
      if(!$scope.started) {
        $scope.$broadcast('timer-start');
      } else {
        $scope.$broadcast('timer-resume');
      }
      $scope.started = $scope.started || true;
      $scope.running = true;
    };
    
    $scope.pause = function() {
      $scope.running = false;
      if (timerPromise) {
        $interval.cancel(timerPromise);
        timerPromise = undefined;
        totalElapsedMs += elapsedMs;
        elapsedMs = 0;
      }
      $scope.$broadcast('timer-stop');
      $scope.running = false;
    };

    $scope.reset = function(){
      $scope.running = false;
      totalElapsedMs = elapsedMs = 0;
      $scope.$broadcast('timer-reset');
    }
    
    $scope.addTime = function(){
      //$scope.actTime += Number(timeToAdd);
      totalElapsedMs += $scope.timeToAdd * 60 * 60 * 1000;
    };
    
    $scope.stop = function() {
      $scope.running = false;
      startTime = undefined;
      if(totalElapsedMs > 0){
        $scope.timeToAdd = Number((totalElapsedMs / (60 * 60 * 1000)).toFixed(2));
        if($scope.timeToAdd < 0.01){
          $scope.timeToAdd = 0.01;
        }
      }
      totalElapsedMs = elapsedMs = 0;
      $scope.$broadcast('timer-reset');
    };
    
    $scope.getTime = function() {
      return time;
    };
    
    $scope.getElapsedMs = function() {
      return totalElapsedMs + elapsedMs;
    };

    $scope.timeAssign = function () {
      totalElapsedMs = elapsedMs = 0;
      Project.timeAssign($scope.currentProject)
        .then(function(data){
          $rootScope.init();
        })
    };

    $scope.completeProject = function(project){
      Project.completeProject(project)
        .then(function(data){
          $rootScope.init();
          $rootScope.initIndex();
          $window.location.reload();
        })  
    }   
  
  }

})();
