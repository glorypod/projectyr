(function() {
  angular.module('projectyr.open', ['tc.chartjs'])
    .controller('OpenController', OpenController);

  function OpenController($scope, $location, Auth, Project, Visual) {
    $scope.options = Visual.options; 
    $scope.barOptions = Visual.barOptions; 

    $scope.$watch(Auth.isAuth, function(authed) {
      if (authed) $location.path('/open');
      else $location.path('/');
    }, true);

    $scope.init = function() {
      Project.getOpen()
        .then(function(data) {
          $scope.projects = data.projects;
          $scope.project = Visual.makeProject($scope.projects[0]);
          console.log($scope.project, 'the project');
          $scope.setSelectedProject($scope.project);
        })
    }

    $scope.setSelectedProject = function(selected) {
      $scope.project = Visual.setSelectedProject(selected);
      $scope.donutData = $scope.project.createDonutData;
      $scope.barData = $scope.project.createBarData;      
    }

  }
})();