(function(){
  angular.module('projectyr.open', ['tc.chartjs'])
  .controller('OpenController', OpenController);
  
  function OpenController ($scope, $window, $location, Auth, Project) {
$scope.projects = {};
    $scope.data = [];
    $scope.barData = {};
    $scope.init = function () {
      Project.getOpen()
      .then(function (data) {
        $scope.projects = data.projects;
        console.log($scope.projects, 'all current projects');
        var selectedProject = $scope.projects[0];
        $scope.i = 0;
        
        $scope.data = [
          {
            value: Math.round(selectedProject[selectedProject.skill1] / selectedProject.act_time * 100),
            color:'#F7464A', 
            highlight: '#FF5A5E',
            label: selectedProject.skill1
          },
          {
            value: Math.round(selectedProject[selectedProject.skill2] / selectedProject.act_time * 100),
            color: '#46BFBD',
            highlight: '#5AD3D1',
            label: selectedProject.skill2
          },
          {
            value: Math.round(selectedProject[selectedProject.skill3] / selectedProject.act_time * 100),
            color: '#FDB45C',
            highlight: '#FFC870',
            label: selectedProject.skill3
          }
        ];

        $scope.barData = {
          labels: ['times'],
          datasets: [
        {
          label: 'estimated time: ' + selectedProject.est_time + 'hrs',
          fillColor: 'rgba(220,220,220,0.5)',
          strokeColor: 'rgba(220,220,220,0.8)',
          highlightFill: 'rgba(220,220,220,0.75)',
          highlightStroke: 'rgba(220,220,220,1)',
          data: [selectedProject.est_time]
        },
        {
          label: 'actual time: ' +selectedProject.act_time + 'hrs',
          fillColor: 'rgba(151,187,205,0.5)',
          strokeColor: 'rgba(151,187,205,0.8)',
          highlightFill: 'rgba(151,187,205,0.75)',
          highlightStroke: 'rgba(151,187,205,1)',
          data: [selectedProject.act_time]
        }
          ]
        };
      })
    }


    $scope.options =  {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,

      //String - The colour of each segment stroke
      segmentStrokeColor : '#fff',

      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 70, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect
      animationEasing : 'easeOutBounce',

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };

    $scope.barOptions =  {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      // scaleBeginAtZero : true,

      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : false,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - If there is a stroke on each bar
      barShowStroke : true,

      //Number - Pixel width of the bar stroke
      barStrokeWidth : 2,

      //Number - Spacing between each of the X value sets
      barValueSpacing : 5,

      //Number - Spacing between data sets within X values
      barDatasetSpacing : 10,

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
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



