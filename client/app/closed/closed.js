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
          $scope.makeLineGraph();
          $scope.project = $scope.projects[0];
          console.log($scope.project);
          $scope.setSelectedProject($scope.project);          
        })
    };

    $scope.setSelectedProject = function(selected) {
      $scope.project = Visual.setSelectedProject(selected);
      $scope.donutData = $scope.project.createDonutData;
      $scope.barData = $scope.project.createBarData;
    };

    $scope.makeLineGraph = function() {
      var allLabels = [];
      var dataEstimate = [];
      var dataActual = [];
      for (var i = 0; i < $scope.projects.length; i++) {
        allLabels.push($scope.projects[i].completion_time.split(",")[0]);
        dataEstimate.push($scope.projects[i].est_time);
        dataActual.push($scope.projects[i].act_time);
      }

      $scope.lineData = {
        labels: allLabels,
        datasets: [{
          label: 'Estimates',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: dataEstimate
        }, {
          label: 'Actual',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: dataActual
        }]
      };
      $scope.lineData;
    };

   $scope.reopenProject = function (selected){
      Project.reopenProject(selected)
        .then(function(data){
          $scope.init();
        })
   }; 
  }
})();

