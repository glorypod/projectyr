(function(){
  angular.module('projectyr.closed', ['tc.chartjs'])
  .controller('ClosedController', ClosedController)
  
  function ClosedController($scope, $location, Auth, Project, Visual) {
    $scope.options = Visual.options; 
    $scope.barOptions = Visual.barOptions; 

    $scope.$watch(Auth.isAuth, function(authed) {
      if (authed) $location.path('/closed');
      else $location.path('/');
    }, true);

    $scope.init = function() {
      Project.getClosed()
        .then(function(data) {
          $scope.projects = data.projects;
          $scope.project = Visual.makeProject($scope.projects[0]);
          console.log($scope.project);
          $scope.setSelectedProject($scope.project);          
        })
    }

    $scope.setSelectedProject = function(selected) {
      $scope.project = Visual.setSelectedProject(selected);
      $scope.donutData = $scope.project.createDonutData;
      $scope.barData = $scope.project.createBarData;
    }

   $scope.reopenProject = function (selected){
      Project.reopenProject(selected)
        .then(function(data){
          $scope.init();
        })
   } 
   
  }
})();




