(function(){
  angular.module('projectyr.dashboard', [])
  .controller('DashboardController', DashboardController);

  function DashboardController ($scope, Project, Auth, $location) {
    $scope.start = null;
    $scope.end = null;
    $scope.actTime = 0;
    $scope.projects = [{project_name: "Sudokool", est_time: 100, act_time:50, skill1: "Javascript", skill2: "CSS", skill3: "other"}, {project_name: "Sudokool-Fangting", est_time: 100, act_time:50, skill1: "CSS", skill2: "HTML", skill3: "other"}];
    $scope.skills = [{skills_name: "Javascript", act_time: 100}, {skills_name: "CSS", act_time: 20}];
    $scope.timeAssignPro = $scope.projects[0];

    $scope.$watch(Auth.isAuth, function(authed){
        if (authed) {
          $location.path('/dashboard');
        } else {
          $location.path('/signin')
        } 
      }, true);

    $scope.$watch("selectPro", function () {
      for (var i = 0; i < $scope.projects.length; i ++) {
        if ($scope.projects[i].project_name === $scope.selectPro) {
            $scope.timeAssignPro = $scope.projects[i]; 
            console.log($scope.timeAssignPro);
        }
      }
    })

    $scope.init = function () {
      console.log("dashboard init says hi");
      Project.getAll()
        .then(function(all) {
          console.log("all ", all)
          $scope.skills = all.skills// [] od obj, has skill name/time.
          $scope.projects = all.projects;
        });
    };

    $scope.startClock = function () {
      $scope.start = new Date();
      $scope.end = null;
    };

    $scope.endClock = function () {
      $scope.end = new Date();
      $scope.actTime = (($scope.end - $scope.start)/(1000*60*60)).toFixed(5);
      $scope.start = null;
    };

    $scope.timeAssign = function () {
      console.log($scope.timeAssignPro);
      console.log($scope.skillRem);
      Project.timeAssign($scope.timeAssignPro)
        .then(function(){
          $scope.init();
        })
    }

  };

})();