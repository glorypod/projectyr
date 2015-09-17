(function(){
  angular.module('projectyr.closed', ['tc.chartjs'])
  .controller('ClosedController', ClosedController)
  
  function ClosedController ($scope, $window, $location, Auth, Project, Visual) {
    $scope.projects = {};
    $scope.data = [];
    $scope.barData = {};

    $scope.setSelectedProject = function(project) {
      $scope.selectedProject = project;
      $scope.getAllSkills(project);
      console.log('selected projects skills are: ', $scope.allSkills);
      $scope.createDonutData();
      $scope.createBarData();
    }

    $scope.init = function() {
      Project.getOpen()
        .then(function(data) {
          $scope.projects = data.projects;
          $scope.selectedProject = $scope.projects[0];
          $scope.getAllSkills($scope.selectedProject);
          $scope.createDonutData();
          $scope.createBarData();

          console.log($scope.projects, 'all open projects');
        })
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
          data: [$scope.selectedProject.est_time]
        }, {
          label: 'actual time: ' + $scope.selectedProject.act_time +
            'hrs',
          fillColor: 'rgba(151,187,205,0.5)',
          strokeColor: 'rgba(151,187,205,0.8)',
          highlightFill: 'rgba(151,187,205,0.75)',
          highlightStroke: 'rgba(151,187,205,1)',
          data: [$scope.selectedProject.act_time]
        }]
      };
    }

    $scope.options = {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke: true,

      //String - The colour of each segment stroke
      segmentStrokeColor: '#fff',

      //Number - The width of each segment stroke
      segmentStrokeWidth: 2,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 70, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps: 100,

      //String - Animation easing effect
      animationEasing: 'easeOutBounce',

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate: true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale: false,

      //String - A legend template
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };

    $scope.barOptions = {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      // scaleBeginAtZero : true,

      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: false,

      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth: 1,

      //Boolean - If there is a stroke on each bar
      barShowStroke: true,

      //Number - Pixel width of the bar stroke
      barStrokeWidth: 2,

      //Number - Spacing between each of the X value sets
      barValueSpacing: 5,

      //Number - Spacing between data sets within X values
      barDatasetSpacing: 10,

      //String - A legend template
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


    $scope.$watch(Auth.isAuth, function(authed) {
      if (authed) {
        $location.path('/open');
      } else {
        $location.path('/')
      }
    }, true);
  }
})();