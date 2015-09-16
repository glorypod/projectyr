(function(){
  angular.module('projectyr.dashboard', [])
  .controller('DashboardController', DashboardController);

  function DashboardController ($scope, Project, Auth, $location) {
    $scope.start = null;
    $scope.end = null;
    $scope.actTime = 0;

    // make sure user is authorized when they access create page
    // direct user to signin if not authorized
    $scope.$watch(Auth.isAuth, function(authed){
        if (authed) {
          $location.path('/dashboard');
        } else {
          $location.path('/signin')
        } 
      }, true);

    // for time assign pop up window, watch select project drop down
    // and set the project and skills as the selected one, so user can assign time to different skills for the peoject
    $scope.$watch("selectPro", function () {
      for (var i = 0; i < $scope.projects.length||0; i ++) {
        if ($scope.projects[i].project_name === $scope.selectPro) {
            $scope.timeAssignPro = $scope.projects[i]; 
        }
      }
    })

    // init func set the look of the page
    $scope.init = function ()  {
      Project.getOpen()
        .then(function(all) {
          var temp = all.projects;
          var skills = [];

          // loop through the projects array received from server
          // create a unique skills array >> skills
          for (var i = 0; i < temp.length; i ++) {
            if (temp[i].skill1) {
              if (skills.indexOf(temp[i].skill1) === -1) {
                skills.push(temp[i].skill1);
              }
            }
            if (temp[i].skill2) {
              if (skills.indexOf(temp[i].skill2) === -1) {
                skills.push(temp[i].skill2);
              }
            }
            if (temp[i].skill3) {
              if (skills.indexOf(temp[i].skill3) === -1) {
                skills.push(temp[i].skill3);
              }
            }
          }
          $scope.projects = temp;
          $scope.skills = skills;

          // default the timeassign project as the first project for the user before user select a project in the time assign pop up window
          $scope.timeAssignPro = $scope.projects[0];

           // reset satrt and end so the page show properly.
          $scope.start = null;
          $scope.end = null;
        });
    };

    $scope.startClock = function () {
      $scope.start = new Date();
      $scope.end = null;
    };

    $scope.addTime = function(){
      var timeToAdd = prompt("How much time would you like to assign to a project (enter in a fraction of hours (2.00, 0.50, 1.25 etc))?");
      $scope.actTime = Number(timeToAdd);
      $scope.end = new Date();
    };

    $scope.endClock = function () {
      $scope.end = new Date();
      $scope.actTime = (($scope.end - $scope.start)/(1000*60*60)/* + 3*/).toFixed(2);
        if($scope.actTime < .01){
          $scope.actTime= .01;
        }
      $scope.start = null;
    };

    // after completeProject send request to server complete, run init file to rerender the dashboard page with new data added
    $scope.completeProject = function (project) {
      Project.completeProject(project)
        .then(function(data){
          $scope.init();
        })
    };

   // after timeAssign send request to server complete, run init file to rerender the dashboard page with new data added
    $scope.timeAssign = function () {
      Project.timeAssign($scope.timeAssignPro)
        .then(function(data){
          $scope.init();
        })
    }

    $scope.setProject = function(project){
      $scope.project = project
    }

  };

})();