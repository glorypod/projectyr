(function() {

  angular.module('projectyr.service')
    .factory('Visual', Visual);

  function Visual($location, $window) {

    var makeProject = function(project) {

      project.skills = (function() {
        skills = [];
        for (var key in project) {
          if (key === 'skill1' || key === 'skill2' || key ===
            'skill3' ||
            key === 'skill4' || key === 'skill5') {
            if (project[key] !== null) {
              skills.push(project[key]);
            }
          }
        }
        return skills;
      })();

      project.createDonutData = (function() {
        var donutData = [];
        var colors = ['#F7464A', '#3366FF', '#CCFF33', '#3399FF', '#FF9933'];
        var highlights = ['#FF5A5E', '#99B2FF', '#E6FF99', '#70B8FF', '#FFC285'];

        for (var i = 0; i < skills.length; i++) {
          var data = {
            value: Math.round(project[skills[i]] / project.act_time * 100),
            color: colors[i],
            highlight: highlights[i],
            label: skills[i]
          }
          donutData.push(data);
        }
        return donutData;
      })();

      project.createBarData = (function() {
        return barData = {
          labels: ['times'],
          datasets: [{
            label: 'estimate: ' + project.est_time + 'hrs',
            fillColor: '#3366FF',
            strokeColor: '#3366FF',
            highlightFill: '#99B2FF',
            highlightStroke: '#99B2FF',
            data: [project.est_time]
          }, {
            label: 'actual: ' + Math.round(project.act_time) + 'hrs',
            fillColor: '#CCFF33',
            strokeColor: '#CCFF33',
            highlightFill: '#E6FF99',
            highlightStroke: '#E6FF99',
            data: [Math.round(project.act_time)]
          }]
        };
      })();

      return project;
    }

    var setSelectedProject = function(selected) {
      project = makeProject(selected);
      return project;
    };

    // var options for charts (used by Chartjs)
    var options = {
      responsive: true,
      segmentShowStroke: true,
      segmentStrokeColor: '#fff',
      segmentStrokeWidth: 2,
      percentageInnerCutout: 70,
      animationSteps: 100,
      animationEasing: 'easeOutBounce',
      animateRotate: true,
      animateScale: false,
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };

    var barOptions = {
      responsive: true,
      scaleBeginAtZero: true,
      scaleShowGridLines: false,
      scaleGridLineColor: "rgba(0,0,0,.05)",
      scaleGridLineWidth: 1,
      barShowStroke: true,
      barStrokeWidth: 2,
      barValueSpacing: 5,
      barDatasetSpacing: 10,
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };

    return {
      makeProject: makeProject,
      setSelectedProject: setSelectedProject,
      options: options,
      barOptions: barOptions
    };

  }
})();