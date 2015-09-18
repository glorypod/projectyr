(function() {
  angular.module('projectyr.open', ['tc.chartjs'])
    .controller('OpenController', OpenController);

  function OpenController($scope, $window, $location, Auth, Project, Visual) {
    $scope.options = Visual.options;
    $scope.barOptions = Visual.barOptions;

    $scope.projects = {};
    $scope.data = [];
    $scope.barData = {};

    $scope.init = function() {
      Project.getOpen()
        .then(function(data) {
          $scope.projects = data.projects;
          $scope.selectedProject = $scope.projects[0];
          $scope.changeProject($scope.selectedProject);

          console.log($scope.projects, 'all open projects');
        })
    }

    $scope.changeProject = function(project) {
      $scope.getAllSkills(project);
      $scope.createDonutData();
      $scope.createBarData();
    }

    $scope.setSelectedProject = function(project) {
      $scope.selectedProject = project;
      $scope.getAllSkills(project);
      console.log('selected projects skills are: ', $scope.allSkills);
      $scope.createDonutData();
      $scope.createBarData();
    }

    // returns an array of all the skills for that project (anywhere from 1 to 5 items)
    $scope.getAllSkills = function(project) {
      $scope.allSkills = [];

      for (var key in project) {
        if (key === 'skill1' || key === 'skill2' || key === 'skill3' ||
          key === 'skill4' || key === 'skill5') {
          if (project[key] !== null) {
            $scope.allSkills.push(project[key]);
          }
        }
      }
      return $scope.allSkills;
    };

    $scope.createDonutData = function() {
      $scope.donutData = [];
      var colors = ['#F7464A', '#46BFBD', '#FDB45C', '#3399FF', '#FF9933'];
      var highlights = ['#FF5A5E', '#5AD3D1', '#FFC870', '#70B8FF',
        '#FFC285'
      ];

      for (var i = 0; i < $scope.allSkills.length; i++) {
        var data = {
          value: Math.round($scope.selectedProject[$scope.allSkills[i]] /
            $scope.selectedProject.act_time * 100),
          color: colors[i],
          highlight: highlights[i],
          label: $scope.allSkills[i] + ': ' + Math.round($scope.selectedProject[
              $scope.allSkills[i]] / $scope.selectedProject.act_time *
            100) + '%'
        }
        $scope.donutData.push(data);
      }
    }

    $scope.createBarData = function() {
      return $scope.barData = {
        labels: ['times'],
        datasets: [{
          label: 'estimated time: ' + $scope.selectedProject.est_time +
            'hrs',
          fillColor: 'rgba(220,220,220,0.5)',
          strokeColor: 'rgba(220,220,220,0.8)',
          highlightFill: 'rgba(220,220,220,0.75)',
          highlightStroke: 'rgba(220,220,220,1)',
          data: [Math.round($scope.selectedProject.est_time)]
        }, {
          label: 'actual time: ' + Math.round($scope.selectedProject
              .act_time) +
            'hrs',
          fillColor: 'rgba(151,187,205,0.5)',
          strokeColor: 'rgba(151,187,205,0.8)',
          highlightFill: 'rgba(151,187,205,0.75)',
          highlightStroke: 'rgba(151,187,205,1)',
          data: [Math.round($scope.selectedProject.act_time)]
        }]
      };
    }

    $scope.$watch(Auth.isAuth, function(authed) {
      if (authed) {
        $location.path('/open');
      } else {
        $location.path('/');
      }
    }, true);
  }
})();