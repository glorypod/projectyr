(function() {
  angular.module('projectyr.open', ['tc.chartjs'])
    .controller('OpenController', OpenController);

  function OpenController($scope, $rootScope, $location, Auth, Project, Visual) {
    $scope.options = Visual.options; 
    $scope.barOptions = Visual.barOptions; 
    $scope.hasProjects = false;

    $scope.$watch(Auth.isAuth, function(authed) {
      if (authed) $location.path('/open');
      else $location.path('/');
    }, true);

    $scope.init = function() {
      Project.getOpen()
        .then(function(data) {
          $scope.projects = data.projects;
          if ($scope.projects.length > 0) {$scope.hasProjects = true;}
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

    $scope.completeProject = function(project){
      Project.completeProject($scope.toClose)
        .then(function(data){
          $scope.init();
          $rootScope.initIndex();
        })  
    }

    $scope.closeProject = function(project){
      $scope.toClose = project;
    } 
    
  }
})();